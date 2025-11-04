import React from 'react';
import { SocialDeal } from '../../types';

interface SocialAppProps {
    availableDeals: SocialDeal[];
    onAcceptDeal: (dealId: string) => void;
}

const SocialApp: React.FC<SocialAppProps> = ({ availableDeals, onAcceptDeal }) => {
    return (
        <div className="p-2 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-2 px-2">التواصل والصفقات</h2>
            <div className="flex-1 overflow-y-auto p-1 space-y-3">
                {availableDeals.length > 0 ? availableDeals.map(deal => (
                    <div key={deal.id} className="bg-gray-800 p-3 rounded-lg border-l-4 border-cyan-500">
                        <p className="text-xs text-cyan-300 font-semibold">{deal.npc}</p>
                        <h4 className="font-bold mb-1">{deal.title}</h4>
                        <p className="text-sm text-gray-300 mb-2">{deal.description}</p>
                        <button 
                            onClick={() => onAcceptDeal(deal.id)}
                            className="w-full bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-green-600 transition"
                        >
                            قبول الصفقة
                        </button>
                    </div>
                )) : (
                    <div className="text-center text-gray-500 p-8">
                        <p>صندوق الوارد فارغ.</p>
                        <p className="text-sm">ترقب العروض الخاصة من جهات اتصالك!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialApp;
