import React from 'react';
import { Achievement } from '../../types';
import { AchievementsIcon } from '../Icons';

interface AchievementsAppProps {
    achievements: Achievement[];
}

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
    return (
        <div className={`p-4 rounded-lg flex items-center gap-4 border ${achievement.unlocked ? 'bg-cyan-900 border-cyan-700' : 'bg-gray-800 border-gray-700'}`}>
            <div className={`text-3xl ${achievement.unlocked ? 'text-cyan-400' : 'text-gray-500'}`}>
                <AchievementsIcon />
            </div>
            <div>
                <h3 className={`font-bold text-lg ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>{achievement.name}</h3>
                <p className={`text-sm ${achievement.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>{achievement.description}</p>
                {achievement.unlockedAt && (
                     <p className="text-xs text-cyan-300 mt-1">
                        تم الفتح في: {new Date(achievement.unlockedAt).toLocaleString('ar')}
                     </p>
                )}
            </div>
        </div>
    );
};

const AchievementsApp: React.FC<AchievementsAppProps> = ({ achievements }) => {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

    return (
        <div>
            <div className="flex justify-between items-center mb-4 border-b-2 border-gray-700 pb-2">
                <h2 className="text-2xl font-bold">الإنجازات</h2>
                <span className="text-lg font-semibold text-cyan-400">{unlockedCount} / {totalCount}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-[calc(100vh-270px)] pr-2">
                {achievements.map(ach => (
                    <AchievementCard key={ach.id} achievement={ach} />
                ))}
            </div>
        </div>
    );
};

export default AchievementsApp;
