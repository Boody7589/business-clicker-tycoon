import React from 'react';
import { PlayerLoan } from '../../types';
import { formatNumber } from '../../utils/format';
import { AVAILABLE_LOANS } from '../../constants';

interface LoansAppProps {
    money: number;
    playerLoans: PlayerLoan[];
    onTakeLoan: (loanId: string) => void;
}

const LoansApp: React.FC<LoansAppProps> = ({ money, playerLoans, onTakeLoan }) => {
    const hasLoan = (loanId: string) => playerLoans.some(pl => pl.loanId === loanId);
    
    return (
        <div className="p-2 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-2 px-2">القروض</h2>
            <div className="flex-1 overflow-y-auto p-1 space-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2 px-1 text-cyan-400">القروض المتاحة</h3>
                    <div className="space-y-2">
                        {AVAILABLE_LOANS.map(loan => {
                            const canTake = money >= loan.requiredAssets && !hasLoan(loan.id);
                            return (
                                <div key={loan.id} className="bg-gray-800 p-3 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold">{loan.name}</h4>
                                        <button 
                                            onClick={() => onTakeLoan(loan.id)}
                                            disabled={!canTake}
                                            className="bg-cyan-500 text-white px-3 py-1 rounded text-sm font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-600 transition"
                                        >
                                            احصل على قرض
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-400">المبلغ: ${formatNumber(loan.amount)} | الفائدة: ${formatNumber(loan.interest)}</p>
                                    <p className="text-xs text-gray-500">يتطلب أصول بقيمة ${formatNumber(loan.requiredAssets)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 px-1 text-cyan-400">قروضك الحالية</h3>
                    <div className="space-y-2">
                        {playerLoans.length > 0 ? playerLoans.map(pLoan => {
                             const loanDetails = AVAILABLE_LOANS.find(l => l.id === pLoan.loanId);
                             return (
                                <div key={pLoan.loanId} className="bg-gray-800 p-3 rounded-lg">
                                    <h4 className="font-bold">{loanDetails?.name}</h4>
                                    <p className="text-sm text-gray-300">
                                        المتبقي: <span className="text-red-400 font-mono">${formatNumber(pLoan.amountRemaining)}</span>
                                    </p>
                                </div>
                             );
                        }) : (
                            <p className="text-sm text-gray-500 px-1">ليس لديك قروض حالية.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoansApp;
