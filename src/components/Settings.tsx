import React, { useState, useEffect } from 'react';
import { AnimalType, Settings, WeatherData, Plan } from '../types';
import { ANIMAL_NAMES_TH } from '../constants';

interface SettingsProps {
    settings: Settings;
    setSettings: (settings: Settings) => void;
    iotWeather: WeatherData | null;
}

const SettingsToggle: React.FC<{ label: string; checked: boolean; onChange: () => void; }> = ({ label, checked, onChange }) => (
    <label className="flex items-center justify-between p-3 bg-content-bg rounded-lg shadow-sm border border-stone-200">
        <span className="font-medium text-stone-800">{label}</span>
        <div className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={onChange}
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </div>
    </label>
);

const PlanSelector: React.FC<{ selectedPlan: Plan; onSelect: (plan: Plan) => void }> = ({ selectedPlan, onSelect }) => {
    return (
        <div className="grid grid-cols-2 gap-2 p-1 bg-stone-200 rounded-lg">
            <button
                onClick={() => onSelect('free')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${selectedPlan === 'free' ? 'bg-primary text-white shadow' : 'bg-transparent text-stone-600'}`}
            >
                แพลนฟรี
            </button>
            <button
                onClick={() => onSelect('iot')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${selectedPlan === 'iot' ? 'bg-primary text-white shadow' : 'bg-transparent text-stone-600'}`}
            >
                นำเข้าค่าจาก IoT
            </button>
        </div>
    );
};


const SettingsScreen: React.FC<SettingsProps> = ({ settings, setSettings, iotWeather }) => {
    
    const handleAnimalToggle = (animal: AnimalType) => {
        const newSelected = settings.selectedAnimals.includes(animal)
            ? settings.selectedAnimals.filter(a => a !== animal)
            : [...settings.selectedAnimals, animal];
        setSettings({ ...settings, selectedAnimals: newSelected });
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, location: e.target.value });
    };
    
    const handleAnimalFactorsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSettings({ ...settings, animalFactors: e.target.value });
    };

    const handlePlanChange = (plan: Plan) => {
        setSettings({ ...settings, plan });
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-brown-dark">ตั้งค่า</h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700">
                    แพลนการใช้งาน
                </label>
                <PlanSelector selectedPlan={settings.plan} onSelect={handlePlanChange} />
            </div>
            
            {settings.plan === 'free' && (
                 <div className="p-3 bg-content-bg rounded-lg shadow-sm border border-stone-200 text-sm text-stone-600">
                    <p className="font-semibold text-stone-800">แพลนฟรี</p>
                    <p>แอปจะจำลองข้อมูลสภาพอากาศตามตำแหน่งที่ตั้งที่คุณระบุ เหมาะสำหรับการดูแนวโน้มและรับคำแนะนำทั่วไป</p>
                </div>
            )}

            {settings.plan === 'iot' && (
                <div className="space-y-4 p-4 bg-stone-100 rounded-lg border border-stone-200">
                    <h3 className="text-lg font-semibold text-brown-dark">ข้อมูลจาก IoT</h3>
                    {iotWeather ? (
                         <>
                            <p className="text-sm text-stone-600 -mt-3">
                                แสดงข้อมูลล่าสุดที่ได้รับจากเซ็นเซอร์ในฟาร์ม (อัปเดตอัตโนมัติ)
                            </p>
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <p className="text-sm text-stone-500">อุณหภูมิ</p>
                                    <p className="text-xl font-bold text-primary">{iotWeather.temperature.toFixed(1)}°C</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <p className="text-sm text-stone-500">ความชื้น</p>
                                    <p className="text-xl font-bold text-primary">{iotWeather.humidity.toFixed(1)}%</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <p className="text-sm text-stone-500">ความเร็วลม</p>
                                    <p className="text-xl font-bold text-primary">{(iotWeather.windSpeed || 0).toFixed(1)} m/s</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <p className="text-sm text-stone-500">รังสีอาทิตย์</p>
                                    <p className="text-xl font-bold text-primary">{Math.round(iotWeather.solarRadiation || 0)} W/m²</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                             <svg className="animate-spin mx-auto h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             <p className="mt-2 text-sm text-stone-600">กำลังเชื่อมต่อกับอุปกรณ์ IoT...</p>
                         </div>
                    )}
                     <div className="space-y-2 pt-2">
                        <label className="block text-sm font-medium text-stone-700">
                            ปัจจัยเพิ่มเติมจากฟาร์ม (ถ้ามี)
                        </label>
                        <textarea
                            value={settings.animalFactors}
                            onChange={handleAnimalFactorsChange}
                            placeholder="เช่น โรงเรือนไม่มีหลังคากันร้อน, สัตว์อยู่กันอย่างแออัด, ไม่มีร่มเงา"
                            rows={3}
                            className="block w-full border border-stone-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm p-2 rounded-md shadow-sm"
                        ></textarea>
                    </div>
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="location-input" className="block text-sm font-medium text-stone-700">
                    ตำแหน่งฟาร์ม (สำหรับแพลนฟรี)
                </label>
                <input
                    type="text"
                    id="location-input"
                    value={settings.location}
                    onChange={handleLocationChange}
                    placeholder="เช่น อ.เมือง จ.ขอนแก่น"
                    className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-stone-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
                />
            </div>
            
            <div className="space-y-2">
                 <label className="block text-sm font-medium text-stone-700">
                    สัตว์เลี้ยงในฟาร์มของคุณ
                </label>
                <div className="space-y-2 pt-2">
                    {Object.values(AnimalType).map(animal => (
                       <SettingsToggle 
                            key={animal}
                            label={ANIMAL_NAMES_TH[animal]}
                            checked={settings.selectedAnimals.includes(animal)}
                            onChange={() => handleAnimalToggle(animal)}
                       />
                    ))}
                </div>
            </div>

            <div className="text-center text-xs text-stone-400 pt-8">
                <p>Heat-Stress Alert v3.0.0</p>
            </div>
        </div>
    );
};

export default SettingsScreen;