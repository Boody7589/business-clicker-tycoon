import React from 'react';
import { formatNumber } from '../../utils/format';
import { AVAILABLE_CARS } from '../../constants';

interface CarsAppProps {
    money: number;
    ownedCars: string[];
    onBuyCar: (carId: string) => void;
}

const CarsApp: React.FC<CarsAppProps> = ({ money, ownedCars, onBuyCar }) => {
    return (
        <div className="p-2 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-2 px-2">وكالة السيارات</h2>
            <div className="flex-1 overflow-y-auto p-1 space-y-2">
                {AVAILABLE_CARS.map(car => {
                    const canAfford = money >= car.cost;
                    const isOwned = ownedCars.includes(car.id);
                    return (
                        <div key={car.id} className="bg-gray-800 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold">{car.name}</h4>
                                    <p className="text-sm text-cyan-400">تعزيز الدخل x{car.effect.multiplier}</p>
                                </div>
                                <button 
                                    onClick={() => onBuyCar(car.id)}
                                    disabled={!canAfford || isOwned}
                                    className="bg-cyan-500 text-white px-3 py-1 rounded text-sm font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-600 transition"
                                >
                                    {isOwned ? 'تم الشراء' : `$${formatNumber(car.cost)}`}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CarsApp;
