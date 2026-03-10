import React, { useState, useEffect, useCallback } from 'react';
import { Screen, Settings, AnimalType, WeatherData, ForecastData, AnimalTHIData, Notification, THIStatus, Plan } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import Advice from './components/Advice';
import SettingsScreen from './components/Settings';
import Map from './components/Map';
import NotificationsPanel from './components/NotificationsPanel';
import { getMockWeatherData, getAnimalTHIData } from './services/weatherService';
import { ANIMAL_NAMES_TH, STATUS_TEXT_TH } from '../constants';


const App: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
    const [settings, setSettings] = useState<Settings>({
        plan: 'free',
        selectedAnimals: [AnimalType.LayingHen, AnimalType.Pigs, AnimalType.DairyCattle],
        location: 'ขอนแก่น, ประเทศไทย',
        animalFactors: '',
    });
    
    const [weather, setWeather] = useState<{ current: WeatherData | null; forecast: ForecastData[] }>({ current: null, forecast: [] });
    const [iotWeather, setIotWeather] = useState<WeatherData | null>(null);
    const [thiData, setThiData] = useState<AnimalTHIData[]>([]);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);


    const fetchData = useCallback(async () => {
        setLoading(true);
        // Fetch weather data (especially forecast) regardless of the plan.
        const weatherData = await getMockWeatherData(settings.location);
        setWeather(weatherData);
        setLoading(false);
    }, [settings.location]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Effect to set a static example for IoT data
    useEffect(() => {
        if (settings.plan === 'iot') {
            // Set a single, static example value for IoT data
            const exampleIotData: WeatherData = {
                temperature: 33.5,
                humidity: 68.2,
                windSpeed: 3.1,
                solarRadiation: 750,
            };
            setIotWeather(exampleIotData);

            // Cleanup function to clear data when switching plans
            return () => {
                setIotWeather(null);
            };
        }
    }, [settings.plan]);


    useEffect(() => {
        const currentWeatherData = settings.plan === 'iot' ? iotWeather : weather.current;

        if (currentWeatherData) {
            const calculatedThiData = getAnimalTHIData(currentWeatherData, settings.selectedAnimals);
            setThiData(calculatedThiData);

            // --- Notification Generation Logic ---
            calculatedThiData.forEach(data => {
                if (data.status === THIStatus.Danger) {
                    setNotifications(prevNotifications => {
                        const similarNotificationExists = prevNotifications.some(
                            n => n.animal === data.animal && n.status === data.status && !n.read
                        );
                        if (!similarNotificationExists) {
                             const newNotification: Notification = {
                                id: `${Date.now()}-${data.animal}`,
                                animal: data.animal,
                                status: data.status,
                                message: `ระดับความเครียดของ ${ANIMAL_NAMES_TH[data.animal]} อยู่ในเกณฑ์ '${STATUS_TEXT_TH[data.status]}' (THI: ${data.thi})`,
                                timestamp: Date.now(),
                                read: false
                            };
                            return [newNotification, ...prevNotifications];
                        }
                        return prevNotifications;
                    });
                }
            });
            // --- End Notification Logic ---

        } else {
            setThiData([]);
        }
    }, [weather.current, iotWeather, settings.plan, settings.selectedAnimals]);


    const handleToggleNotifications = () => {
        setIsNotificationsOpen(prev => !prev);
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };
    
    const renderScreen = () => {
        const currentDisplayWeather = settings.plan === 'iot' ? iotWeather : weather.current;
        const forecastToDisplay = weather.forecast; // Always use the fetched forecast
        
        switch (activeScreen) {
            case 'dashboard':
                return <Dashboard 
                            settings={settings} 
                            loading={loading && settings.plan === 'free'}
                            currentWeather={currentDisplayWeather}
                            forecast={forecastToDisplay}
                            thiData={thiData}
                            plan={settings.plan}
                        />;
            case 'map':
                return <Map />;
            case 'advice':
                return <Advice settings={settings} currentWeather={currentDisplayWeather} />;
            case 'settings':
                return <SettingsScreen 
                            settings={settings} 
                            setSettings={setSettings}
                            iotWeather={iotWeather}
                        />;
            default:
                 return <Dashboard 
                            settings={settings} 
                            loading={loading && settings.plan === 'free'}
                            currentWeather={currentDisplayWeather}
                            forecast={forecastToDisplay}
                            thiData={thiData}
                            plan={settings.plan}
                        />;
        }
    };

    return (
        <div className="bg-page-bg min-h-screen font-sans">
            <div className="relative max-w-md mx-auto bg-content-bg flex flex-col min-h-screen shadow-2xl overflow-hidden">
                <Header 
                    location={settings.location} 
                    onNotificationClick={handleToggleNotifications}
                    hasUnreadNotifications={notifications.some(n => !n.read)}
                />
                <main className="flex-grow overflow-y-auto pb-20">
                    {renderScreen()}
                </main>
                <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
                <NotificationsPanel 
                    isOpen={isNotificationsOpen}
                    notifications={notifications}
                    onClose={handleToggleNotifications}
                    onMarkAllAsRead={handleMarkAllAsRead}
                />
            </div>
        </div>
    );
};

export default App;