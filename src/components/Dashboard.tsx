

import React from 'react';
import { AnimalType, THIStatus, WeatherData, ForecastData, AnimalTHIData, Settings, Plan } from '../types';
import { ANIMAL_NAMES_TH, STATUS_TEXT_TH, CowIcon, PigIcon, ChickenIcon, DuckIcon, GoatIcon, SheepIcon } from '../../constants';
import { getTHIStatus } from '../services/weatherService';

interface DashboardProps {
    settings: Settings;
    loading: boolean;
    currentWeather: WeatherData | null;
    forecast: ForecastData[];
    thiData: AnimalTHIData[];
    plan: Plan;
}

const AnimalIcon: React.FC<{ animal: AnimalType, className?: string }> = ({ animal, className }) => {
    switch (animal) {
        case AnimalType.BeefCattle:
        case AnimalType.DairyCattle:
        case AnimalType.Buffalo:
            return <CowIcon className={className} />;
        case AnimalType.Pigs:
            return <PigIcon className={className} />;
        case AnimalType.NativeChicken:
        case AnimalType.BroilerChicken:
        case AnimalType.LayingHen:
            return <ChickenIcon className={className} />;
        case AnimalType.Duck:
            return <DuckIcon className={className} />;
        case AnimalType.Goat:
            return <GoatIcon className={className} />;
        case AnimalType.Sheep:
            return <SheepIcon className={className} />;
        default:
            return null;
    }
};

const getStatusColors = (status: THIStatus) => {
    switch (status) {
        case THIStatus.NoStress: return 'bg-no-stress text-no-stress-light border-no-stress';
        case THIStatus.MildStress: return 'bg-mild-stress text-mild-stress-light border-mild-stress';
        case THIStatus.ModerateStress: return 'bg-warning text-warning-light border-warning';
        case THIStatus.Danger: return 'bg-danger text-danger-light border-danger';
    }
};

const getStatusBgLight = (status: THIStatus) => {
    switch (status) {
        case THIStatus.NoStress: return 'bg-no-stress-light';
        case THIStatus.MildStress: return 'bg-mild-stress-light';
        case THIStatus.ModerateStress: return 'bg-warning-light';
        case THIStatus.Danger: return 'bg-danger-light';
    }
};

const getStatusText = (status: THIStatus) => {
    switch (status) {
        case THIStatus.NoStress: return 'text-no-stress';
        case THIStatus.MildStress: return 'text-mild-stress';
        case THIStatus.ModerateStress: return 'text-warning';
        case THIStatus.Danger: return 'text-danger';
    }
};


const AnimalCard: React.FC<{ data: AnimalTHIData }> = ({ data }) => {
    const statusColors = getStatusColors(data.status);
    const textStatusColor = getStatusText(data.status);

    return (
        <div className={`rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 ${getStatusBgLight(data.status)}`}>
            <div className={`p-4 flex items-center justify-between ${statusColors} bg-opacity-80`}>
                <div className="flex items-center">
                    <div className="bg-white/50 p-2 rounded-full">
                         <AnimalIcon animal={data.animal} className="w-8 h-8 text-white"/>
                    </div>
                    <span className="ml-3 text-lg font-bold text-white">{ANIMAL_NAMES_TH[data.animal]}</span>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-white">{data.thi}</div>
                    <div className={`text-sm font-semibold text-white/90`}>{STATUS_TEXT_TH[data.status]}</div>
                </div>
            </div>
             {data.recommendations.length > 0 && (
                <div className="p-3 text-sm">
                    <p className={`font-semibold mb-1 ${textStatusColor}`}>คำแนะนำด่วน:</p>
                    <ul className="list-disc list-inside text-stone-700">
                        {data.recommendations.slice(0, 2).map((rec, i) => <li key={i}>{rec}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ settings, loading, currentWeather, forecast, thiData, plan }) => {
    
    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div></div>;
    }

    if (settings.selectedAnimals.length === 0) {
        return (
             <div className="text-center p-8 text-stone-500">
                <p>กรุณาเลือกชนิดสัตว์เลี้ยงในการตั้งค่า</p>
                <p>เพื่อเริ่มใช้งาน</p>
            </div>
        );
    }

    if (plan === 'iot' && !currentWeather) {
         return (
             <div className="text-center p-8 text-stone-500">
                <p>กรุณากรอกข้อมูลจากเซ็นเซอร์ IoT ในหน้าตั้งค่า</p>
                <p>เพื่อเริ่มคำนวณค่า THI</p>
            </div>
        );
    }
    
    const overallStatus = thiData.reduce((max, current) => {
        const order = [THIStatus.NoStress, THIStatus.MildStress, THIStatus.ModerateStress, THIStatus.Danger];
        return order.indexOf(current.status) > order.indexOf(max) ? current.status : max;
    }, THIStatus.NoStress);


    return (
        <div className="p-4 space-y-6">
            {plan === 'free' && (
                <div className="p-3 rounded-lg bg-blue-100 border border-blue-300 text-blue-800 text-sm font-medium text-center">
                    <p>โหมดฟรี: ข้อมูลค่าประมาณจากกรมอุตุนิยมวิทยา</p>
                </div>
            )}
             {plan === 'iot' && (
                <div className="p-3 rounded-lg bg-blue-100 border border-blue-300 text-blue-800 text-sm font-medium text-center">
                    <p>💡 แสดงผลจากข้อมูลที่นำเข้าจาก IoT</p>
                </div>
            )}
            <div className={`p-4 rounded-xl shadow-lg ${getStatusBgLight(overallStatus)} border-l-4 ${getStatusColors(overallStatus)}`}>
                <h2 className="text-lg font-bold text-stone-800">สถานะโดยรวม</h2>
                <p className={`text-2xl font-bold ${getStatusText(overallStatus)}`}>
                    {STATUS_TEXT_TH[overallStatus]}
                </p>
                 {currentWeather && 
                    <div className="text-sm text-stone-600 grid grid-cols-2 gap-x-4 mt-2">
                        <p>อุณหภูมิ: <strong>{currentWeather.temperature}°C</strong></p>
                        <p>ความชื้น: <strong>{currentWeather.humidity}%</strong></p>
                        {currentWeather.windSpeed !== undefined && <p>ความเร็วลม: <strong>{currentWeather.windSpeed} m/s</strong></p>}
                        {currentWeather.solarRadiation !== undefined && <p>รังสีอาทิตย์: <strong>{currentWeather.solarRadiation} W/m²</strong></p>}
                    </div>
                }
            </div>

            <section>
                <h3 className="text-lg font-semibold text-brown-dark mb-3">ดัชนีความร้อนของสัตว์ (THI)</h3>
                <div className="grid grid-cols-1 gap-4">
                    {thiData.map(data => <AnimalCard key={data.animal} data={data} />)}
                </div>
            </section>
            
            {forecast.length > 0 && (
                <section>
                    <h3 className="text-lg font-semibold text-brown-dark mb-3">พยากรณ์ 7 วันข้างหน้า</h3>
                    <div className="flex overflow-x-auto space-x-3 pb-3 -mx-4 px-4">
                        {forecast.map(dayForecast => {
                            const T = dayForecast.temperature;
                            const RH = dayForecast.humidity;
                            const thi = Math.round((0.8 * T) + ((RH / 100) * (T - 14.4)) + 46.4);

                            return (
                                <div key={dayForecast.day} className="w-40 flex-shrink-0 p-3 bg-content-bg rounded-lg shadow-sm border border-stone-200">
                                    <h4 className="font-bold text-center text-stone-800 mb-2">{dayForecast.day}</h4>
                                    <div className="text-center text-sm text-stone-600 space-y-1 mb-3 pb-3 border-b border-stone-200">
                                        <p>อุณหภูมิ: <span className="font-semibold">{dayForecast.temperature}°C</span></p>
                                        <p>ความชื้น: <span className="font-semibold">{dayForecast.humidity}%</span></p>
                                        <p>THI: <span className="font-bold text-lg text-brown">{thi}</span></p>
                                    </div>
                                    <div className="space-y-2 text-sm mt-2">
                                        {settings.selectedAnimals.map(animal => {
                                            const status = getTHIStatus(thi, animal);
                                            const statusColor = getStatusText(status);

                                            return (
                                                <div key={animal} className="flex items-center gap-1.5">
                                                    <AnimalIcon animal={animal} className="w-4 h-4 text-stone-500" />
                                                    <span className="font-medium text-stone-700">{ANIMAL_NAMES_TH[animal]}:</span>
                                                    <span className={`font-bold ${statusColor}`}>{STATUS_TEXT_TH[status]}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Dashboard;