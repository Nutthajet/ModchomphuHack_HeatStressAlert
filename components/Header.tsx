import React from 'react';

interface HeaderProps {
    location: string;
    onNotificationClick: () => void;
    hasUnreadNotifications: boolean;
}

const Header: React.FC<HeaderProps> = ({ location, onNotificationClick, hasUnreadNotifications }) => {
    return (
        <header className="bg-content-bg/80 backdrop-blur-lg p-4 shadow-md sticky top-0 z-10 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-primary">Heat-Stress Alert</h1>
                    <div className="flex items-center text-sm text-stone-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{location}</span>
                    </div>
                </div>
                 <button onClick={onNotificationClick} className="relative p-2 rounded-full hover:bg-stone-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {hasUnreadNotifications && <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>}
                </button>
            </div>
        </header>
    );
};

export default Header;