import { AnimalType, THIStatus, WeatherData, ForecastData, AnimalTHIData, NationwideTHIData } from '../types';
import { THI_THRESHOLDS } from '../constants';

// Function to calculate THI using the new formula
const calculateTHI = (temperature: number, humidity: number): number => {
    const T = temperature;
    const RH = humidity;
    // THI = (0.8 * T) + ((RH / 100) * (T - 14.4)) + 46.4
    const thi = (0.8 * T) + ((RH / 100) * (T - 14.4)) + 46.4;
    return Math.round(thi);
};

// Function to determine THI status based on the new 4-level thresholds
export const getTHIStatus = (thi: number, animal: AnimalType): THIStatus => {
    const thresholds = THI_THRESHOLDS[animal];
    if (thi > thresholds.danger) return THIStatus.Danger;
    if (thi >= thresholds.moderate) return THIStatus.ModerateStress;
    if (thi >= thresholds.mild) return THIStatus.MildStress;
    return THIStatus.NoStress;
};

// Simplified status for map (average across animals) - Updated based on user image
const getGeneralTHIStatus = (thi: number): THIStatus => {
    if (thi >= 80) return THIStatus.Danger;
    if (thi >= 75) return THIStatus.ModerateStress;
    if (thi >= 70) return THIStatus.MildStress;
    return THIStatus.NoStress;
};


// Mock weather data
export const getMockWeatherData = async (location: string): Promise<{ current: WeatherData; forecast: ForecastData[] }> => {
    console.log(`Fetching weather for ${location}...`); // Simulate API call
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Set a specific initial state where two animals are in Danger and one is in Moderate Stress
    const currentTemp = 32;
    const currentHumidity = 50; 

    return {
        current: {
            temperature: parseFloat(currentTemp.toFixed(1)),
            humidity: parseFloat(currentHumidity.toFixed(1)),
            windSpeed: parseFloat((2 + Math.random() * 2).toFixed(1)), // 2-4 m/s
            solarRadiation: parseFloat((600 + Math.random() * 200).toFixed(1)), // 600-800 W/m^2
        },
        forecast: [
            { day: 'พรุ่งนี้', temperature: 35.5, humidity: 70 },
            { day: 'มะรืน', temperature: 36.2, humidity: 75 },
            { day: '3 วัน', temperature: 34.8, humidity: 68 },
            { day: '4 วัน', temperature: 35.1, humidity: 72 },
            { day: '5 วัน', temperature: 36.5, humidity: 78 },
            { day: '6 วัน', temperature: 35.9, humidity: 74 },
            { day: '7 วัน', temperature: 34.5, humidity: 70 },
        ],
    };
};

export const getAnimalTHIData = (weather: WeatherData, animals: AnimalType[]): AnimalTHIData[] => {
    return animals.map(animal => {
        const thi = calculateTHI(weather.temperature, weather.humidity);
        const status = getTHIStatus(thi, animal);
        
        // Recommendations are now primarily handled by the AI for more specific advice
        let recommendations: string[] = [];
        if (status === THIStatus.ModerateStress) {
            recommendations = ['เพิ่มการระบายอากาศ'];
        } else if (status === THIStatus.Danger) {
            recommendations = ['พิจารณาพ่นละอองน้ำ', 'ลดความหนาแน่น', 'ใช้มาตรการลดความร้อนฉุกเฉิน', 'ปรึกษาสัตวแพทย์'];
        }
        return { animal, thi, status, recommendations };
    });
};

// Mock nationwide data
export const getMockNationwideTHIData = async (): Promise<NationwideTHIData[]> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    // Predefined data to ensure a colorful map with a mix of statuses (green, yellow, orange, red)
    const data: NationwideTHIData[] = [
        { region: 'North', thi: 84, status: getGeneralTHIStatus(84) },      // Danger
        { region: 'Northeast', thi: 79, status: getGeneralTHIStatus(79) }, // ModerateStress
        { region: 'Central', thi: 75, status: getGeneralTHIStatus(75) },   // ModerateStress
        { region: 'West', thi: 68, status: getGeneralTHIStatus(68) },      // NoStress
        { region: 'East', thi: 81, status: getGeneralTHIStatus(81) },      // Danger
        { region: 'South', thi: 73, status: getGeneralTHIStatus(73) },     // MildStress
    ];

    return data;
};