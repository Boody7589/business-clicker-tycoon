import React, { useState } from 'react';
import { Business, Upgrade } from '../types';
import { formatNumber } from '../utils/format';

interface BusinessCardProps {
    business: Business;
    onPurchase: (id: string) => void;
    onPurchaseUpgrade: (businessId: string, upgradeId: string) => void;
    money: number;
}

const UpgradeRow: React.FC<{ upgrade: Upgrade, onPurchase: () => void, money: number, businessLevel: number }> = ({ upgrade, onPurchase, money, businessLevel }) => {
    const canAfford = money >= upgrade.cost;
    const canPurchase = canAfford && !upgrade.purchased && businessLevel > 0;
    
    return (
        <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded-md">
            <div>
                <p className="font-semibold text-white">{upgrade.name}</p>
                <p className="text-xs text-gray-400">{upgrade.description} (x{upgrade.multiplier} income)</p>
            </div>
            <button 
                onClick={onPurchase}
                disabled={!canPurchase}
                className={`px-3 py-1 rounded-md text-sm font-bold transition-colors ${
                    upgrade.purchased
                        ? 'bg-green-600 text-white cursor-default'
                        : canPurchase
                        ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
            >
                {upgrade.purchased ? 'تم الشراء' : `$${formatNumber(upgrade.cost)}`}
            </button>
        </div>
    );
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onPurchase, onPurchaseUpgrade, money }) => {
    const [upgradesVisible, setUpgradesVisible] = useState(false);
    const cost = business.baseCost * Math.pow(1.15, business.level);
    const canAfford = money >= cost;

    return (
        <div className="bg-gray-800 rounded-lg flex flex-col gap-2 transition-all duration-300 border border-gray-700 p-4">
            <div className="flex items-center gap-4">
                <div className="text-cyan-400 text-3xl">{business.icon}</div>
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{business.name}</h3>
                        <span className="bg-gray-900 text-cyan-300 text-sm font-semibold px-3 py-1 rounded-full">{business.level}</span>
                    </div>
                    <p className="text-sm text-gray-400">{business.description}</p>
                </div>
                <button
                    onClick={() => onPurchase(business.id)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-lg font-bold transition-colors w-32 text-left ${
                        canAfford
                            ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    ${formatNumber(cost)}
                </button>
            </div>
            {business.upgrades.length > 0 && business.level > 0 && (
                <div>
                     <button onClick={() => setUpgradesVisible(!upgradesVisible)} className="text-xs text-cyan-400 hover:underline w-full text-left mt-2">
                        {upgradesVisible ? 'إخفاء الترقيات' : 'إظهار الترقيات'} ({business.upgrades.filter(u => u.purchased).length}/{business.upgrades.length})
                    </button>
                    {upgradesVisible && (
                        <div className="mt-2 space-y-2 border-t border-gray-700 pt-2">
                            {business.upgrades.map(upgrade => (
                                <UpgradeRow 
                                    key={upgrade.id} 
                                    upgrade={upgrade}
                                    money={money}
                                    businessLevel={business.level}
                                    onPurchase={() => onPurchaseUpgrade(business.id, upgrade.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BusinessCard;