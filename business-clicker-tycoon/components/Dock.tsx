
import React from 'react';
import { AppId } from '../types';
import { 
    BusinessIcon, WalletIcon, StocksIcon, LoansIcon, 
    HRIcon, AdsIcon, CarsIcon, TravelIcon, RealEstateIcon, 
    SocialIcon, NewsIcon, AchievementsIcon, SettingsIcon
} from './Icons';

interface DockProps {
    activeApp: AppId;
    setActiveApp: (appId: AppId) => void;
}

const apps: { id: AppId; name: string; icon: React.ReactNode }[] = [
    { id: 'businesses', name: 'المشاريع', icon: <BusinessIcon /> },
    { id: 'real_estate', name: 'العقارات', icon: <RealEstateIcon /> },
    { id: 'stocks', name: 'الأسهم', icon: <StocksIcon /> },
    { id: 'hr', name: 'الموظفين', icon: <HRIcon /> },
    { id: 'cars', name: 'السيارات', icon: <CarsIcon /> },
    { id: 'wallet', name: 'المحفظة', icon: <WalletIcon /> },
    { id: 'achievements', name: 'الإنجازات', icon: <AchievementsIcon /> },
    { id: 'news', name: 'الأخبار', icon: <NewsIcon /> },
    { id: 'loans', name: 'القروض', icon: <LoansIcon /> },
    { id: 'ads', name: 'التسويق', icon: <AdsIcon /> },
    { id: 'travel', name: 'السفر', icon: <TravelIcon /> },
    { id: 'social', name: 'التواصل', icon: <SocialIcon /> },
    { id: 'settings', name: 'الإعدادات', icon: <SettingsIcon /> },
];

const Dock: React.FC<DockProps> = ({ activeApp, setActiveApp }) => {
    return (
        <nav className="flex flex-col items-center gap-2 p-2 bg-gray-800/50 rounded-2xl border border-gray-700/50 h-full overflow-y-auto">
            {apps.map(app => (
                <button
                    key={app.id}
                    onClick={() => setActiveApp(app.id)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl transition-all duration-200 relative group
                        ${activeApp === app.id ? 'bg-cyan-500 text-white shadow-lg' : 'bg-gray-700/50 text-gray-400 hover:bg-cyan-500/50 hover:text-white'}`}
                    aria-label={app.name}
                >
                    <div className="transform scale-125">{app.icon}</div>
                    <span className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {app.name}
                    </span>
                </button>
            ))}
        </nav>
    );
};

export default Dock;
