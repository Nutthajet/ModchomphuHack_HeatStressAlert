import React from 'react';
import { THIStatus } from '../types';

// Helper function to provide color classes for the legend
const getStatusFillColor = (status: THIStatus) => {
    switch (status) {
        case THIStatus.NoStress: return 'bg-no-stress';
        case THIStatus.MildStress: return 'bg-mild-stress';
        case THIStatus.ModerateStress: return 'bg-warning';
        case THIStatus.Danger: return 'bg-danger';
    }
};

const Legend: React.FC = () => {
    const items = [
        { status: THIStatus.NoStress, label: 'ปกติ (Comfort Zone)', range: '< 70' },
        { status: THIStatus.MildStress, label: 'เครียดเล็กน้อย (Mild Stress)', range: '70 - 74' },
        { status: THIStatus.ModerateStress, label: 'เครียดปานกลาง (Moderate Stress)', range: '75 - 79' },
        { status: THIStatus.Danger, label: 'เครียดรุนแรง / อันตราย (Severe Stress)', range: '≥ 80' },
    ];
    return (
        <div className="p-3 bg-content-bg rounded-lg shadow-sm border border-stone-200">
             <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-sm text-stone-700">ระดับความเครียด</h3>
                <h3 className="font-bold text-sm text-stone-700">ช่วงค่า THI โดยเฉลี่ย</h3>
            </div>
            <div className="space-y-2">
                {items.map(item => (
                    <div key={item.status} className="flex items-center justify-between text-xs text-stone-600">
                        <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-2 ${getStatusFillColor(item.status)}`}></div>
                            <span>{item.label}</span>
                        </div>
                         <span className="font-semibold">{item.range}</span>
                    </div>
                ))}
            </div>
        </div>
    )
};


const Map: React.FC = () => {
    // URL ของรูปภาพแผนที่ที่คุณต้องการให้แสดง
    const mapImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Map_TH_provinces_by_thaimed.png';

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold text-brown-dark">ภาพรวม THI ทั่วประเทศ</h2>
            <div className="relative w-full bg-stone-100 rounded-lg overflow-hidden shadow-inner border border-stone-200">
                <img
                    src={mapImageUrl}
                    alt="แผนที่ประเทศไทยแบ่งตามภูมิภาค"
                    className="w-full h-auto object-contain"
                />
            </div>
            <Legend />
        </div>
    );
};

export default Map;