import React from 'react';
import { Employee } from '../../types';
import { formatNumber } from '../../utils/format';

interface HRAppProps {
    employees: Employee[];
    money: number;
    onHire: (employeeId: string) => void;
}

const EmployeeCard: React.FC<{ employee: Employee; money: number; onHire: () => void; }> = ({ employee, money, onHire }) => {
    const cost = employee.baseCost * Math.pow(1.2, employee.level);
    const canAfford = money >= cost;

    const boost = employee.mpsBoost > 0 
        ? `+$${formatNumber(employee.mpsBoost)}/s`
        : `+$${formatNumber(employee.mpcBoost)}/click`;

    return (
        <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4 border border-gray-700">
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{employee.name}</h3>
                    <span className="bg-gray-900 text-cyan-300 text-sm font-semibold px-3 py-1 rounded-full">{employee.level}</span>
                </div>
                 <p className="text-sm text-gray-400">{employee.description}</p>
                 <p className="text-sm font-semibold text-green-400 mt-1">Boost: {boost}</p>
            </div>
            <button
                onClick={onHire}
                disabled={!canAfford}
                className={`px-4 py-2 rounded-lg font-bold transition-colors w-32 text-left ${
                    canAfford
                        ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
            >
                توظيف بـ ${formatNumber(cost)}
            </button>
        </div>
    );
};


const HRApp: React.FC<HRAppProps> = ({ employees, money, onHire }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-700 pb-2">إدارة الموظفين (HR)</h2>
            <div className="space-y-4 overflow-y-auto h-[calc(100vh-250px)] pr-2">
                {employees.map(employee => (
                    <EmployeeCard 
                        key={employee.id} 
                        employee={employee} 
                        money={money} 
                        onHire={() => onHire(employee.id)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default HRApp;
