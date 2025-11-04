import React from 'react';
import { Transaction } from '../../types';
import { formatNumber } from '../../utils/format';

interface WalletAppProps {
    transactions: Transaction[];
    money: number;
}

const WalletApp: React.FC<WalletAppProps> = ({ transactions, money }) => {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 h-full">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-700 pb-2">المحفظة الرقمية</h2>
            
            <div className="mb-6">
                <p className="text-lg text-gray-400">الرصيد الحالي</p>
                <p className="text-4xl font-bold text-cyan-400">${formatNumber(money)}</p>
            </div>

            <h3 className="text-xl font-semibold mb-3">سجل المعاملات</h3>
            <div className="space-y-3 overflow-y-auto h-[calc(100%-150px)] pr-2 bg-gray-900 p-3 rounded-lg">
                {transactions.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        <p>لا توجد معاملات بعد.</p>
                        <p className="text-sm">ابدأ بشراء مشروع لتظهر هنا.</p>
                    </div>
                ) : (
                    transactions.map(tx => (
                        <div key={tx.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-medium">{tx.description}</p>
                                <p className="text-xs text-gray-400">{new Date(tx.timestamp).toLocaleString('ar')}</p>
                            </div>
                            <p className={`font-bold text-lg ${tx.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                                {tx.type === 'expense' ? '-' : '+'}${formatNumber(Math.abs(tx.amount))}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WalletApp;
