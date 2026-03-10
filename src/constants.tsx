import React from 'react';
import { AnimalType, THIStatus } from './types';

// THI Thresholds for different animals based on Thai research data
// These are the lower bounds for each category.
export const THI_THRESHOLDS = {
  [AnimalType.BeefCattle]: { danger: 84, moderate: 79, mild: 74 },
  [AnimalType.DairyCattle]: { danger: 78, moderate: 73, mild: 68 },
  [AnimalType.Buffalo]: { danger: 80, moderate: 75, mild: 70 },
  [AnimalType.Pigs]: { danger: 78, moderate: 75, mild: 70 },
  [AnimalType.NativeChicken]: { danger: 86, moderate: 82, mild: 78 },
  [AnimalType.BroilerChicken]: { danger: 82, moderate: 78, mild: 72 },
  [AnimalType.LayingHen]: { danger: 81, moderate: 76, mild: 70 },
  [AnimalType.Duck]: { danger: 88, moderate: 84, mild: 80 },
  [AnimalType.Goat]: { danger: 86, moderate: 81, mild: 76 },
  [AnimalType.Sheep]: { danger: 85, moderate: 80, mild: 75 },
};


// UI text mappings
export const ANIMAL_NAMES_TH: { [key in AnimalType]: string } = {
    [AnimalType.BeefCattle]: 'โคเนื้อ',
    [AnimalType.DairyCattle]: 'โคนม',
    [AnimalType.Buffalo]: 'กระบือ',
    [AnimalType.Pigs]: 'สุกร',
    [AnimalType.NativeChicken]: 'ไก่พื้นเมือง/ลูกผสม',
    [AnimalType.BroilerChicken]: 'ไก่เนื้อ',
    [AnimalType.LayingHen]: 'ไก่ไข่',
    [AnimalType.Duck]: 'เป็ด',
    [AnimalType.Goat]: 'แพะ',
    [AnimalType.Sheep]: 'แกะ',
};

export const STATUS_TEXT_TH: { [key in THIStatus]: string } = {
    [THIStatus.NoStress]: 'ปกติ',
    [THIStatus.MildStress]: 'เริ่มเครียด',
    [THIStatus.ModerateStress]: 'เครียดปานกลาง',
    [THIStatus.Danger]: 'อันตราย',
};

// SVG Icons as React components
export const CowIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 128 128">
        <defs>
            <radialGradient id="cow_head_gradient" cx="50%" cy="10%" r="90%" fx="50%" fy="10%">
                <stop offset="0%" stopColor="#FFFFFF"/>
                <stop offset="100%" stopColor="#E6E6E6"/>
            </radialGradient>
            <linearGradient id="cow_muzzle_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FADBD0"/>
                <stop offset="100%" stopColor="#F3C8B9"/>
            </linearGradient>
            <linearGradient id="cow_horn_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E0E0E0"/>
                <stop offset="100%" stopColor="#C0C0C0"/>
            </linearGradient>
        </defs>
        {/* Head base */}
        <path d="M112 42 c0 20 -10 40 -25 55 c-15 15 -20 18 -23 18 s-8 -3 -23 -18 C26 82 16 62 16 42 C16 12 38 4 64 4 S112 12 112 42 Z" fill="#E6E6E6"/>
        {/* Ears */}
        <path d="M14 52 C 5 32, 22 17, 37 32 C 47 42, 32 62, 14 52 Z" fill="#E0E0E0"/>
        <path d="M114 52 C 123 32, 106 17, 91 32 C 81 42, 96 62, 114 52 Z" fill="#E0E0E0"/>
        <path d="M20 50 C 17 37, 27 27, 37 34 C 42 40, 32 57, 20 50 Z" fill="#FADBD0"/>
        <path d="M108 50 C 111 37, 101 27, 91 34 C 86 40, 96 57, 108 50 Z" fill="#FADBD0"/>
        {/* Head top layer */}
        <path d="M110 44 c0 18 -9 38 -24 52 c-14 13 -19 16 -22 16 s-8 -3 -22 -16 C27 82 18 62 18 44 C18 14 40 6 64 6 S110 14 110 44 Z" fill="url(#cow_head_gradient)"/>
        {/* Horns */}
        <path d="M40 25 C 25 10, 30 0, 50 12 C 60 20, 50 35, 40 25 Z" fill="url(#cow_horn_gradient)"/>
        <path d="M88 25 C 103 10, 98 0, 78 12 C 68 20, 78 35, 88 25 Z" fill="url(#cow_horn_gradient)"/>
        {/* Muzzle */}
        <path d="M90 75 c0 18 -10 32 -26 32 s-26 -14 -26 -32 c0 -15 8 -25 20 -28 c4 -1 8 -1 12 0 c12 3 20 13 20 28 Z" fill="url(#cow_muzzle_gradient)"/>
        {/* Nostrils */}
        <ellipse cx="56" cy="85" rx="5" ry="3.5" fill="#C7927F" opacity="0.8"/>
        <ellipse cx="72" cy="85" rx="5" ry="3.5" fill="#C7927F" opacity="0.8"/>
        {/* Eyes */}
        <circle cx="48" cy="55" r="9" fill="#2c2c2c"/>
        <circle cx="80" cy="55" r="9" fill="#2c2c2c"/>
        <circle cx="46" cy="52" r="2.5" fill="white"/>
        <circle cx="78" cy="52" r="2.5" fill="white"/>
    </svg>
);

export const PigIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 128 128">
        <defs>
            <radialGradient id="pig_gradient" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
                <stop offset="0%" style={{stopColor: '#ffdeeb'}} />
                <stop offset="100%" style={{stopColor: '#ffc0d7'}} />
            </radialGradient>
        </defs>
        <circle cx="64" cy="64" r="54" fill="#ffc0d7"/>
        <circle cx="64" cy="64" r="52" fill="url(#pig_gradient)"/>
        <ellipse cx="64" cy="88" rx="28" ry="22" fill="#f4a5c1"/>
        <circle cx="55" cy="85" r="7" fill="#e3729d"/>
        <circle cx="73" cy="85" r="7" fill="#e3729d"/>
        <path fill="#4c4c4c" d="M45 55c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7zm38 0c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z"/>
        <circle cx="47" cy="57" r="2" fill="#fff"/>
        <circle cx="85" cy="57" r="2" fill="#fff"/>
        <path fill="#f4a5c1" d="M30 20c-15 15-5 40 10 40 10 0 15-15 10-25-5-10-10-15-20-15zm68 0c15 15 5 40-10 40-10 0-15-15-10-25 5-10 10-15 20-15z"/>
    </svg>
);

export const ChickenIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 128 128">
         <defs>
            <radialGradient id="chicken_gradient" cx="50%" cy="50%" r="70%" fx="60%" fy="40%">
                <stop offset="0%" style={{stopColor: '#ffffff'}} />
                <stop offset="100%" style={{stopColor: '#f0f0f0'}} />
            </radialGradient>
        </defs>
        <path fill="#f0f0f0" d="M100 45 C115 65 110 95 90 110 C70 125 40 120 25 100 C10 80 15 50 35 35 C55 20 85 25 100 45 Z"/>
        <path fill="url(#chicken_gradient)" d="M98 47 C112 65 108 93 88 108 C70 122 42 118 27 98 C12 78 17 52 37 37 C55 23 85 28 98 47 Z"/>
        <path fill="#ff4b4b" d="M60 10 C70 5 85 8 90 20 S85 45 75 50 C65 55 55 45 60 30 S50 15 60 10 Z"/>
        <path fill="#ff4b4b" d="M10 95 C5 105 10 120 25 120 S40 110 35 100 S25 85 10 95 Z"/>
        <path fill="#ffcc4d" d="M5 60 L45 80 L30 50 Z"/>
        <circle cx="70" cy="55" r="10" fill="#4c4c4c"/>
        <circle cx="68" cy="53" r="3" fill="#fff"/>
    </svg>
);

export const DuckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 128 128">
        <defs>
            <radialGradient id="duck_gradient" cx="50%" cy="50%" r="70%" fx="60%" fy="40%">
                <stop offset="0%" stopColor="#FFFFE0" />
                <stop offset="100%" stopColor="#FFFACD" />
            </radialGradient>
        </defs>
        <path fill="#FFFACD" d="M105,70 C120,80 115,105 95,115 C75,125 50,120 35,100 C20,80 25,55 45,45 C65,35 90,60 105,70 Z" />
        <path fill="url(#duck_gradient)" d="M103,72 C117,80 113,103 93,113 C75,122 52,118 37,98 C22,78 27,57 47,47 C65,38 90,63 103,72 Z" />
        <circle cx="55" cy="45" r="25" fill="#FFFACD" />
        <circle cx="55" cy="45" r="23" fill="url(#duck_gradient)" />
        <path fill="#FFC107" d="M25,45 C30,35 45,35 50,45 L45,55 L30,55 Z" />
        <circle cx="65" cy="40" r="5" fill="#2c2c2c" />
    </svg>
);

export const GoatIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 128 128">
         <defs>
            <linearGradient id="goat_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5F5F5" />
                <stop offset="100%" stopColor="#D3D3D3" />
            </linearGradient>
        </defs>
        <path fill="url(#goat_gradient)" d="M95,115 C85,125 70,125 60,115 L50,80 C40,50 50,20 70,15 C90,10 100,40 90,70 L85,90 Z" />
        <path fill="#A9A9A9" d="M68,15 C75,5 90,10 90,25 C90,40 75,40 65,30 Z" />
        <path fill="#A9A9A9" d="M52,30 C45,20 30,25 30,40 C30,55 45,55 55,45 Z" />
        <circle cx="80" cy="50" r="5" fill="#2c2c2c" />
        <path fill="#E0E0E0" d="M64,80 C60,85 68,85 64,95 C60,85 68,85 64,80 Z" />
    </svg>
);

export const SheepIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 128 128">
        <defs>
            <radialGradient id="wool_gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0.7" stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#E8E8E8" />
            </radialGradient>
        </defs>
        <circle cx="64" cy="70" r="40" fill="url(#wool_gradient)" />
        <circle cx="78" cy="75" r="20" fill="url(#wool_gradient)" />
        <circle cx="50" cy="75" r="20" fill="url(#wool_gradient)" />
        <circle cx="64" cy="50" r="25" fill="url(#wool_gradient)" />
        <path fill="#F0E4D7" d="M64,30 C75,25 85,35 85,50 C85,65 75,70 64,65 C53,70 43,65 43,50 C43,35 53,25 64,30 Z" />
        <circle cx="56" cy="50" r="5" fill="#2c2c2c" />
        <circle cx="72" cy="50" r="5" fill="#2c2c2c" />
        <path fill="#E0CFC0" d="M50,25 C45,15 50,5 60,15 L64,30 Z" />
        <path fill="#E0CFC0" d="M78,25 C83,15 78,5 68,15 L64,30 Z" />
    </svg>
);