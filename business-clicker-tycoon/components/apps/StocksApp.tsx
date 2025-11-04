import React, { useState } from 'react';
import { Stock, PlayerStock } from '../../types';
import { formatNumber } from '../../utils/format';

interface StocksAppProps {
    stocks: Stock[];
    playerStocks: PlayerStock[];
    money: number;
    onBuy: (stockId: string, amount: number) => void;
    onSell: (stockId: string, amount: number) => void;
}

const StockRow: React.FC<{ stock: Stock; playerStock?: PlayerStock; money: number; onBuy: (amount: number) => void; onSell: (amount: number) => void; }> = ({ stock, playerStock, money, onBuy, onSell }) => {
    const [amount, setAmount] = useState('1');
    const numAmount = parseInt(amount, 10) || 0;
    
    const canAfford = money >= stock.price * numAmount;
    const hasEnoughShares = playerStock ? playerStock.shares >= numAmount : false;

    const lastPrice = stock.history[stock.history.length - 2] || stock.price;
    const priceChange = stock.price - lastPrice;
    const priceChangeColor = priceChange >= 0 ? 'text-green-400' : 'text-red-400';

    return (
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row items-center gap-4 border border-gray-700">
            <div className="flex-grow w-full">
                <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg text-cyan-400">{stock.name}</h3>
                    <span className="text-sm text-gray-400">تملك: {playerStock?.shares || 0}</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-mono">${formatNumber(stock.price)}</p>
                    <p className={`text-sm font-mono ${priceChangeColor}`}>
                        {priceChange >= 0 ? '▲' : '▼'} ${formatNumber(Math.abs(priceChange))}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    className="bg-gray-900 border border-gray-600 rounded-md px-2 py-1 w-20 text-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                    onClick={() => onBuy(numAmount)}
                    disabled={!canAfford || numAmount <= 0}
                    className="px-3 py-1 rounded-md font-semibold bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                    شراء
                </button>
                <button
                    onClick={() => onSell(numAmount)}
                    disabled={!hasEnoughShares || numAmount <= 0}
                    className="px-3 py-1 rounded-md font-semibold bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                    بيع
                </button>
            </div>
        </div>
    );
};

const StocksApp: React.FC<StocksAppProps> = ({ stocks, playerStocks, money, onBuy, onSell }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-700 pb-2">سوق الأسهم</h2>
            <div className="space-y-4 overflow-y-auto h-[calc(100vh-250px)] pr-2">
                {stocks.map(stock => (
                    <StockRow
                        key={stock.id}
                        stock={stock}
                        playerStock={playerStocks.find(ps => ps.stockId === stock.id)}
                        money={money}
                        onBuy={(amount) => onBuy(stock.id, amount)}
                        onSell={(amount) => onSell(stock.id, amount)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StocksApp;
