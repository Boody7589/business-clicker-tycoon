import React, { useState } from 'react';
import { formatNumber } from '../../utils/format';
import { RealEstateProperty, Upgrade } from '../../types';

interface UpgradeRowProps {
    upgrade: Upgrade;
    onPurchase: () => void;
    money: number;
    propertyOwned: boolean;
}

const UpgradeRow: React.FC<UpgradeRowProps> = ({ upgrade, onPurchase, money, propertyOwned }) => {
    const canAfford = money >= upgrade.cost;
    const canPurchase = canAfford && !upgrade.purchased && propertyOwned;
    
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

interface PropertyCardProps {
    property: RealEstateProperty;
    onPurchase: (id: string) => void;
    onPurchaseUpgrade: (propertyId: string, upgradeId: string) => void;
    money: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPurchase, onPurchaseUpgrade, money }) => {
    const [upgradesVisible, setUpgradesVisible] = useState(false);
    const isOwned = property.level > 0;
    const canAfford = money >= property.cost;

    return (
        <div className="bg-gray-800 rounded-lg flex flex-col gap-2 transition-all duration-300 border border-gray-700 p-4">
            <div className="flex items-center gap-4">
                <div className="flex-grow">
                    <h3 className="font-bold text-lg">{property.name}</h3>
                    <p className="text-sm text-green-400">+${formatNumber(property.incomePerSecond)}/ثانية</p>
                </div>
                <button
                    onClick={() => onPurchase(property.id)}
                    disabled={!canAfford || isOwned}
                    className={`px-4 py-2 rounded-lg font-bold transition-colors w-32 text-left ${
                        isOwned
                            ? 'bg-gray-600 text-gray-400 cursor-default'
                            : canAfford
                            ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {isOwned ? 'تم الشراء' : `$${formatNumber(property.cost)}`}
                </button>
            </div>
            {property.upgrades.length > 0 && isOwned && (
                <div>
                     <button onClick={() => setUpgradesVisible(!upgradesVisible)} className="text-xs text-cyan-400 hover:underline w-full text-left mt-2">
                        {upgradesVisible ? 'إخفاء الترقيات' : 'إظهار الترقيات'} ({property.upgrades.filter(u => u.purchased).length}/{property.upgrades.length})
                    </button>
                    {upgradesVisible && (
                        <div className="mt-2 space-y-2 border-t border-gray-700 pt-2">
                            {property.upgrades.map(upgrade => (
                                <UpgradeRow 
                                    key={upgrade.id} 
                                    upgrade={upgrade}
                                    money={money}
                                    propertyOwned={isOwned}
                                    onPurchase={() => onPurchaseUpgrade(property.id, upgrade.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

interface RealEstateAppProps {
    money: number;
    properties: RealEstateProperty[];
    onBuyProperty: (propertyId: string) => void;
    onPurchaseUpgrade: (propertyId: string, upgradeId: string) => void;
}

const RealEstateApp: React.FC<RealEstateAppProps> = ({ money, properties, onBuyProperty, onPurchaseUpgrade }) => {
    return (
        <div className="h-full">
            <h2 className="text-xl font-bold mb-4 px-2">العقارات الفاخرة</h2>
            <div className="space-y-4 h-full pr-2">
                {properties.map(prop => (
                    <PropertyCard
                        key={prop.id}
                        property={prop}
                        money={money}
                        onPurchase={onBuyProperty}
                        onPurchaseUpgrade={onPurchaseUpgrade}
                    />
                ))}
            </div>
        </div>
    );
};

export default RealEstateApp;