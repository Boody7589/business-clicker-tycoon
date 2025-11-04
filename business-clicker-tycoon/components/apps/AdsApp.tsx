import React, { useEffect, useState } from 'react';
import { ActiveCampaign } from '../../types';
import { formatNumber } from '../../utils/format';
import { MARKETING_CAMPAIGNS } from '../../constants';

interface AdsAppProps {
    money: number;
    activeCampaigns: ActiveCampaign[];
    onStartCampaign: (campaignId: string) => void;
}

const AdsApp: React.FC<AdsAppProps> = ({ money, activeCampaigns, onStartCampaign }) => {
    
    return (
        <div className="p-2 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-2 px-2">مدير الإعلانات</h2>
            <div className="flex-1 overflow-y-auto p-1 space-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2 px-1 text-cyan-400">إطلاق حملة</h3>
                    <div className="space-y-2">
                        {MARKETING_CAMPAIGNS.map(campaign => {
                            const canAfford = money >= campaign.cost;
                            const isActive = activeCampaigns.some(ac => ac.campaignId === campaign.id);
                            return (
                                <div key={campaign.id} className="bg-gray-800 p-3 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold">{campaign.name}</h4>
                                            <p className="text-xs text-gray-400 max-w-[180px]">{campaign.description}</p>
                                        </div>
                                        <button 
                                            onClick={() => onStartCampaign(campaign.id)}
                                            disabled={!canAfford || isActive}
                                            className="bg-cyan-500 text-white px-3 py-1 rounded text-sm font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-600 transition"
                                        >
                                            {isActive ? 'نشطة' : `ابدأ بـ $${formatNumber(campaign.cost)}`}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 px-1 text-cyan-400">الحملات النشطة</h3>
                    <div className="space-y-2">
                        {activeCampaigns.length > 0 ? activeCampaigns.map(ac => {
                            const campaignDetails = MARKETING_CAMPAIGNS.find(c => c.id === ac.campaignId);
                            if (!campaignDetails) return null;
                            const timeLeft = Math.ceil((ac.expiresAt - Date.now()) / 1000);
                             return (
                                <div key={ac.campaignId} className="bg-gray-800 p-3 rounded-lg animate-pulse">
                                    <h4 className="font-bold text-cyan-300">{campaignDetails.name}</h4>
                                    <p className="text-sm text-gray-300">
                                        الوقت المتبقي: {timeLeft > 0 ? `${timeLeft} ثانية` : '...'}
                                    </p>
                                </div>
                             );
                        }) : (
                            <p className="text-sm text-gray-500 px-1">لا توجد حملات نشطة.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdsApp;
