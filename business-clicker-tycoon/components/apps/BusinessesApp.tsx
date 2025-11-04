import React from 'react';
import { Business } from '../../types';
import BusinessCard from '../BusinessCard';

interface BusinessesAppProps {
    businesses: Business[];
    money: number;
    onPurchase: (id: string) => void;
    onPurchaseUpgrade: (businessId: string, upgradeId: string) => void;
    currentLocationId: string;
}

const BusinessesApp: React.FC<BusinessesAppProps> = ({ businesses, money, onPurchase, onPurchaseUpgrade, currentLocationId }) => {
    const availableBusinesses = businesses.filter(b => b.locationId === currentLocationId);
    
    return (
        <div className="h-full">
            <h2 className="text-xl font-bold mb-4 px-2">المشاريع المتاحة</h2>
            <div className="space-y-4 h-full pr-2">
                {availableBusinesses.length > 0 ? availableBusinesses.map(business => (
                    <BusinessCard
                        key={business.id}
                        business={business}
                        onPurchase={onPurchase}
                        onPurchaseUpgrade={(bId, uId) => onPurchaseUpgrade(bId, uId)}
                        money={money}
                    />
                )) : (
                    <div className="text-center text-gray-400 p-8">
                        <p>لا توجد مشاريع متاحة في هذا الموقع.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessesApp;