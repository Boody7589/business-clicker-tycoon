
import React from 'react';

interface SettingsAppProps {
    onSave: () => void;
    onReset: () => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({ onSave, onReset }) => {
    return (
        <div className="p-4 h-full">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-700 pb-2">الإعدادات</h2>
            <div className="space-y-4 max-w-md mx-auto mt-8">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">حفظ اللعبة</h3>
                    <p className="text-sm text-gray-400 mb-2">
                        يتم حفظ اللعبة تلقائيًا كل 30 ثانية. يمكنك أيضًا الحفظ يدويًا هنا.
                    </p>
                    <button
                        onClick={onSave}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded transition"
                    >
                        حفظ الآن
                    </button>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-red-500/50">
                    <h3 className="font-semibold text-lg text-red-400">منطقة الخطر</h3>
                    <p className="text-sm text-gray-400 mb-2">
                        هل تريد البدء من جديد؟ سيؤدي هذا إلى مسح كل تقدمك بشكل دائم.
                    </p>
                    <button
                        onClick={onReset}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                        إعادة ضبط اللعبة
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsApp;
