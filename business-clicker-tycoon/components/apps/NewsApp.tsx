import React from 'react';
import { NewsEvent } from '../../types';

interface NewsAppProps {
    newsFeed: NewsEvent[];
    activeEvent: NewsEvent | null;
}

const NewsApp: React.FC<NewsAppProps> = ({ newsFeed, activeEvent }) => {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 h-full">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-700 pb-2">أخبار الأعمال</h2>
            
            {activeEvent && (
                <div className="mb-6 bg-cyan-900 border border-cyan-700 p-4 rounded-lg animate-pulse">
                    <h3 className="text-lg font-bold text-cyan-300">حدث مباشر!</h3>
                    <p className="text-cyan-100">{activeEvent.headline}</p>
                </div>
            )}

            <h3 className="text-xl font-semibold mb-3">آخر الأخبار</h3>
            <div className="space-y-3 overflow-y-auto h-[calc(100%-150px)] pr-2 bg-gray-900 p-3 rounded-lg">
                {newsFeed.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        <p>لا توجد أخبار حالياً.</p>
                        <p className="text-sm">تابع هذه المساحة لمعرفة التطورات الاقتصادية.</p>
                    </div>
                ) : (
                    newsFeed.map(item => (
                        <div key={item.id} className={`bg-gray-700 p-3 rounded-md border-l-4 ${item.id === activeEvent?.id ? 'border-cyan-400' : 'border-gray-600'}`}>
                            <p className="font-medium">{item.headline}</p>
                            <p className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleTimeString('ar')}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NewsApp;
