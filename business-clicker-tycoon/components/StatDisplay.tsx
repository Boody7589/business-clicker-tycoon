
import React from 'react';

interface StatDisplayProps {
    label: string;
    value: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-md text-center">
            <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-cyan-400">{value}</p>
        </div>
    );
};

export default StatDisplay;
