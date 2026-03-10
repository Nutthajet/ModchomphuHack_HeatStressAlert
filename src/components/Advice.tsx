

import React, { useState } from 'react';
import { AnimalType, Settings, WeatherData } from '../types';
import { getHeatStressAdvice } from '../services/geminiService';
import { ANIMAL_NAMES_TH } from '../../constants';

interface AdviceProps {
    settings: Settings;
    currentWeather: WeatherData | null;
}

const Advice: React.FC<AdviceProps> = ({ settings, currentWeather }) => {
    const [selectedAnimal, setSelectedAnimal] = useState<AnimalType | ''>(settings.selectedAnimals[0] || '');
    const [advice, setAdvice] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleGetAdvice = async () => {
        if (!selectedAnimal) {
            setError('กรุณาเลือกชนิดสัตว์');
            return;
        }
        if (!currentWeather) {
            setError('ไม่สามารถโหลดข้อมูลสภาพอากาศได้');
            return;
        }

        setError('');
        setLoading(true);
        setAdvice('');
        try {
            const result = await getHeatStressAdvice(selectedAnimal, currentWeather, settings.animalFactors);
            setAdvice(result);
        } catch (err) {
            setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold text-brown-dark">คำแนะนำจาก AI</h2>
            <p className="text-sm text-stone-600">เลือกชนิดสัตว์เพื่อรับคำแนะนำในการจัดการความเครียดจากความร้อนที่ปรับให้เหมาะกับข้อมูลสภาพอากาศและข้อมูลฟาร์มของคุณ</p>

            <div className="space-y-2">
                <label htmlFor="animal-select" className="block text-sm font-medium text-stone-700">
                    ชนิดสัตว์
                </label>
                <select
                    id="animal-select"
                    value={selectedAnimal}
                    onChange={(e) => setSelectedAnimal(e.target.value as AnimalType)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-stone-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
                    disabled={settings.selectedAnimals.length === 0}
                >
                    <option value="" disabled>-- เลือกสัตว์ --</option>
                    {settings.selectedAnimals.map(animal => (
                        <option key={animal} value={animal}>{ANIMAL_NAMES_TH[animal]}</option>
                    ))}
                </select>
                {settings.selectedAnimals.length === 0 && <p className="text-xs text-red-500">กรุณาเลือกสัตว์ในหน้าตั้งค่าก่อน</p>}
            </div>

            <button
                onClick={handleGetAdvice}
                disabled={loading || !selectedAnimal || !currentWeather}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        กำลังประมวลผล...
                    </>
                ) : 'ขอคำแนะนำ'}
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {advice && (
                <div className="mt-4 p-4 bg-content-bg rounded-lg shadow-md border border-stone-200">
                    <h3 className="font-bold text-lg text-stone-800 mb-2">
                        คำแนะนำสำหรับ {ANIMAL_NAMES_TH[selectedAnimal as AnimalType]}
                    </h3>
                    <div className="prose prose-sm max-w-none text-stone-700 whitespace-pre-wrap">
                        {advice.split('\n').map((line, index) => {
                             const trimmedLine = line.trim();
                             if (trimmedLine.startsWith('### ')) {
                                 return <h3 key={index} className="font-bold text-base mt-3 mb-1">{trimmedLine.substring(4)}</h3>;
                             }
                             if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                                 return <p key={index} className="font-bold my-1">{trimmedLine.substring(2, trimmedLine.length - 2)}</p>;
                             }
                             if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                                 return <li key={index} className="ml-4">{trimmedLine.substring(2)}</li>;
                             }
                             return <p key={index} className="my-1">{line}</p>;
                         })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Advice;
