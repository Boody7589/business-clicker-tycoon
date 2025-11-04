import React from 'react';
import { formatNumber } from '../../utils/format';
import { LOCATIONS } from '../../constants';

interface TravelAppProps {
    money: number;
    currentLocationId: string;
    onTravel: (locationId: string) => void;
}

const TravelApp: React.FC<TravelAppProps> = ({ money, currentLocationId, onTravel }) => {
    return (
        <div className="p-2 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-2 px-2">السفر العالمي</h2>
            <div className="flex-1 overflow-y-auto p-1 space-y-2">
                {LOCATIONS.map(location => {
                    const canAfford = money >= location.travelCost;
                    const isCurrent = currentLocationId === location.id;
                    return (
                        <div key={location.id} className="bg-gray-800 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold">{location.name}</h4>
                                    {!isCurrent && <p className="text-sm text-gray-400">التكلفة: ${formatNumber(location.travelCost)}</p>}
                                </div>
                                <button 
                                    onClick={() => onTravel(location.id)}
                                    disabled={!canAfford || isCurrent}
                                    className="bg-cyan-500 text-white px-3 py-1 rounded text-sm font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-600 transition"
                                >
                                    {isCurrent ? 'أنت هنا' : 'سافر'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TravelApp;
