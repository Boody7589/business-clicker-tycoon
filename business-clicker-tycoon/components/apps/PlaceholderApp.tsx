import React from 'react';

interface PlaceholderAppProps {
    appName: string;
}

const PlaceholderApp: React.FC<PlaceholderAppProps> = ({ appName }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-gray-800 rounded-xl p-8">
            <h2 className="text-4xl font-bold text-cyan-400 mb-4">{appName}</h2>
            <p className="text-2xl text-gray-300">قريباً!</p>
            <p className="text-gray-400 mt-2 max-w-md">
                هذا التطبيق قيد التطوير حالياً. ترقبوا التحديثات المستقبلية التي ستجلب المزيد من الميزات المثيرة لعالم الأعمال الخاص بكم!
            </p>
        </div>
    );
};

export default PlaceholderApp;
