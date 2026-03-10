import React from 'react';
import { Notification, THIStatus } from '../types';
import { ANIMAL_NAMES_TH } from '../../constants';

interface NotificationsPanelProps {
    isOpen: boolean;
    notifications: Notification[];
    onClose: () => void;
    onMarkAllAsRead: () => void;
}

const timeAgo = (timestamp: number) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)} ปีที่แล้ว`;
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)} เดือนที่แล้ว`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} วันที่แล้ว`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} ชั่วโมงที่แล้ว`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} นาทีที่แล้ว`;
    return 'เมื่อสักครู่';
};

const getStatusColor = (status: THIStatus) => {
    switch (status) {
        case THIStatus.Danger: return 'border-danger';
        case THIStatus.ModerateStress: return 'border-warning';
        default: return 'border-stone-300';
    }
}


const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, notifications, onClose, onMarkAllAsRead }) => {
    if (!isOpen) return null;

    const hasUnread = notifications.some(n => !n.read);

    return (
        <div className="fixed inset-0 z-20">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

            {/* Panel */}
            <div className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-page-bg shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <header className="p-4 flex justify-between items-center border-b border-stone-200 bg-content-bg">
                    <h2 className="text-lg font-bold text-stone-800">การแจ้งเตือน</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-stone-500 hover:bg-stone-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>
                
                {notifications.length > 0 ? (
                     <div className="flex-grow overflow-y-auto">
                        <div className="p-2 text-right">
                           <button 
                                onClick={onMarkAllAsRead} 
                                disabled={!hasUnread}
                                className="text-sm text-primary font-medium hover:underline disabled:text-stone-400 disabled:no-underline"
                            >
                                ทำเครื่องหมายว่าอ่านทั้งหมดแล้ว
                            </button>
                        </div>
                        <ul className="divide-y divide-stone-200">
                            {notifications.map(n => (
                                <li key={n.id} className={`p-4 flex items-start gap-3 transition-colors duration-200 ${!n.read ? 'bg-primary-light' : 'bg-content-bg'}`}>
                                    {!n.read && <div className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>}
                                    <div className={`flex-grow ${n.read ? 'ml-4' : ''}`}>
                                        <p className="text-sm text-stone-800">{n.message}</p>
                                        <p className="text-xs text-stone-500 mt-1">{timeAgo(n.timestamp)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col justify-center items-center text-stone-500 p-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <p className="mt-4 font-medium">ไม่มีการแจ้งเตือน</p>
                        <p className="text-sm text-center">การแจ้งเตือนใหม่ๆ จะปรากฏที่นี่</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPanel;