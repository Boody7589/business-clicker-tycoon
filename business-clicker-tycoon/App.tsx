
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Business, FloatingNumber as FloatingNumberType, Transaction, AppId, Stock, PlayerStock, Employee, Achievement, NewsEvent, GameState, PlayerLoan, ActiveCampaign, RealEstateProperty, Car, Location, SocialDeal, Upgrade } from './types';
import { ALL_BUSINESSES, INITIAL_STOCKS, INITIAL_EMPLOYEES, ACHIEVEMENTS_LIST, NEWS_EVENT_TEMPLATES, AVAILABLE_LOANS, MARKETING_CAMPAIGNS, REAL_ESTATE_PROPERTIES, AVAILABLE_CARS, LOCATIONS, SOCIAL_DEALS } from './constants';
import { useGameLoop } from './hooks/useGameLoop';
import { formatNumber } from './utils/format';
import StatDisplay from './components/StatDisplay';
import FloatingNumber from './components/FloatingNumber';
import Dock from './components/Dock';

// App Components
import BusinessesApp from './components/apps/BusinessesApp';
import WalletApp from './components/apps/WalletApp';
import StocksApp from './components/apps/StocksApp';
import HRApp from './components/apps/HRApp';
import NewsApp from './components/apps/NewsApp';
import AchievementsApp from './components/apps/AchievementsApp';
import LoansApp from './components/apps/LoansApp';
import AdsApp from './components/apps/AdsApp';
import RealEstateApp from './components/apps/RealEstateApp';
import CarsApp from './components/apps/CarsApp';
import TravelApp from './components/apps/TravelApp';
import SocialApp from './components/apps/SocialApp';
import SettingsApp from './components/apps/SettingsApp';


const SAVE_KEY = 'businessClickerSaveData_v1';

const getInitialState = (): GameState => {
    const defaultState: GameState = {
        money: 100,
        businesses: ALL_BUSINESSES.map(b => ({ ...b, level: 0, upgrades: b.upgrades.map(u => ({ ...u, purchased: false })) })),
        transactions: [],
        stocks: INITIAL_STOCKS,
        playerStocks: [],
        employees: INITIAL_EMPLOYEES.map(e => ({ ...e, level: 0 })),
        achievements: ACHIEVEMENTS_LIST.map(a => ({ ...a, unlocked: false, unlockedAt: undefined })),
        newsFeed: [],
        activeNewsEvent: null,
        playerLoans: [],
        activeCampaigns: [],
        ownedProperties: REAL_ESTATE_PROPERTIES.map(p => ({ ...p, level: 0, upgrades: p.upgrades.map(u => ({ ...u, purchased: false })) })),
        ownedCars: [],
        currentLocationId: 'new_york',
        availableDeals: [],
    };

    try {
        const savedData = localStorage.getItem(SAVE_KEY);
        if (!savedData) return defaultState;

        const parsedData = JSON.parse(savedData) as Partial<GameState>;

        // Hydrate state: merge saved progress with latest constant data
        const hydratedState: GameState = { ...defaultState, ...parsedData };

        // Hydrate businesses
        hydratedState.businesses = ALL_BUSINESSES.map(constBusiness => {
            const savedBusiness = parsedData.businesses?.find(b => b.id === constBusiness.id);
            if (savedBusiness) {
                const hydratedUpgrades = constBusiness.upgrades.map(constUpgrade => {
                    const savedUpgrade = savedBusiness.upgrades.find(u => u.id === constUpgrade.id);
                    return { ...constUpgrade, purchased: savedUpgrade?.purchased || false };
                });
                return { ...constBusiness, level: savedBusiness.level, upgrades: hydratedUpgrades };
            }
            return { ...constBusiness, level: 0, upgrades: constBusiness.upgrades.map(u => ({...u, purchased: false})) };
        });

        // Hydrate properties
        hydratedState.ownedProperties = REAL_ESTATE_PROPERTIES.map(constProp => {
            const savedProp = parsedData.ownedProperties?.find(p => p.id === constProp.id);
            if (savedProp) {
                const hydratedUpgrades = constProp.upgrades.map(constUpgrade => {
                    const savedUpgrade = savedProp.upgrades.find(u => u.id === constUpgrade.id);
                    return { ...constUpgrade, purchased: savedUpgrade?.purchased || false };
                });
                return { ...constProp, level: savedProp.level, upgrades: hydratedUpgrades };
            }
            return { ...constProp, level: 0, upgrades: constProp.upgrades.map(u => ({...u, purchased: false})) };
        });

        // Hydrate employees
        hydratedState.employees = INITIAL_EMPLOYEES.map(constEmp => {
            const savedEmp = parsedData.employees?.find(e => e.id === constEmp.id);
            return savedEmp ? { ...constEmp, level: savedEmp.level } : { ...constEmp, level: 0 };
        });
        
        // Hydrate achievements
        hydratedState.achievements = ACHIEVEMENTS_LIST.map(constAch => {
            const savedAch = parsedData.achievements?.find(a => a.id === constAch.id);
            return savedAch ? { ...constAch, unlocked: savedAch.unlocked, unlockedAt: savedAch.unlockedAt } : { ...constAch, unlocked: false };
        });


        return hydratedState;
    } catch (error) {
        console.error("Failed to load saved game state:", error);
        return defaultState;
    }
};

const App: React.FC = () => {
    // UI State
    const [activeApp, setActiveApp] = useState<AppId>('businesses');

    // Load full game state
    const [gameState, setGameState] = useState<GameState>(getInitialState);

    // Destructure for easier access and dependency tracking
    const { 
        money, businesses, transactions, stocks, playerStocks, employees, 
        achievements, newsFeed, activeNewsEvent, playerLoans, activeCampaigns, 
        ownedProperties, ownedCars, currentLocationId, availableDeals 
    } = gameState;

    // Derived state for UI components that need individual state setters
    const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumberType[]>([]);

    const updateGameState = useCallback((newState: Partial<GameState>) => {
        setGameState(prevState => ({ ...prevState, ...newState }));
    }, []);

    const addTransaction = useCallback((description: string, amount: number, type: 'income' | 'expense') => {
        const newTransaction: Transaction = {
            id: Date.now() + Math.random(),
            timestamp: Date.now(),
            description,
            amount,
            type
        };
        updateGameState({ transactions: [newTransaction, ...transactions.slice(0, 99)] });
    }, [transactions, updateGameState]);
    
    // Auto Save
    useEffect(() => {
        const intervalId = setInterval(() => {
            localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
            console.log("Game saved automatically.");
        }, 30000); // Save every 30 seconds

        return () => clearInterval(intervalId);
    }, [gameState]);

    const handleManualSave = useCallback(() => {
        localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
        alert("تم حفظ اللعبة بنجاح!");
    }, [gameState]);

    const handleResetGame = useCallback(() => {
        if(window.confirm("هل أنت متأكد من أنك تريد إعادة ضبط اللعبة؟ سيتم حذف كل التقدم.")) {
            localStorage.removeItem(SAVE_KEY);
            window.location.reload();
        }
    }, []);

    const moneyPerSecond = useMemo(() => {
        const businessIncome = businesses.reduce((total, b) => {
            if (b.level === 0) return total;
            const upgradeMultiplier = b.upgrades.reduce((mult, upg) => upg.purchased ? mult * upg.multiplier : mult, 1);
            return total + (b.level * b.incomePerSecond * upgradeMultiplier);
        }, 0);
        
        const propertyIncome = ownedProperties.reduce((total, prop) => {
            if (prop.level === 0) return total;
            const upgradeMultiplier = prop.upgrades.reduce((mult, upg) => upg.purchased ? mult * upg.multiplier : mult, 1);
            return total + (prop.level * prop.incomePerSecond * upgradeMultiplier);
        }, 0);

        const employeeBoost = employees.reduce((total, emp) => total + emp.level * emp.mpsBoost, 0);

        let total = businessIncome + employeeBoost + propertyIncome;

        ownedCars.forEach(carId => {
            const car = AVAILABLE_CARS.find(c => c.id === carId);
            if (car?.effect.type === 'global_mps_multiplier') {
                total *= car.effect.multiplier;
            }
        });

        activeCampaigns.forEach(campaign => {
            if(campaign.effect.type === 'global_mps_multiplier'){
                total *= campaign.effect.multiplier;
            }
        });
        
        if (activeNewsEvent?.effect.type === 'business_income_modifier') {
            const affectedBusiness = businesses.find(b => b.id === activeNewsEvent?.effect.payload.businessId);
            if(affectedBusiness) {
                const upgradeMultiplier = affectedBusiness.upgrades.reduce((mult, upg) => upg.purchased ? mult * upg.multiplier : mult, 1);
                const businessBaseIncome = affectedBusiness.level * affectedBusiness.incomePerSecond * upgradeMultiplier;
                total += businessBaseIncome * (activeNewsEvent.effect.payload.multiplier - 1);
            }
        }
        return total;
    }, [businesses, employees, activeNewsEvent, activeCampaigns, ownedProperties, ownedCars]);

    const moneyPerClick = useMemo(() => {
        const businessPower = businesses.reduce((total, upg) => {
             const upgradeMultiplier = upg.upgrades.reduce((mult, upg) => upg.purchased ? mult * upg.multiplier : mult, 1);
             return total + upg.level * upg.clickPower * upgradeMultiplier;
        }, 0);
        const employeeBoost = employees.reduce((total, emp) => total + emp.level * emp.mpcBoost, 0);
        
        let total = 1 + businessPower + employeeBoost;

        activeCampaigns.forEach(campaign => {
            if(campaign.effect.type === 'global_mpc_multiplier'){
                total *= campaign.effect.multiplier;
            }
        });

        return total;
    }, [businesses, employees, activeCampaigns]);

    useGameLoop(() => updateGameState({ money: money + moneyPerSecond / 10 }), 100);

    useGameLoop(() => {
        let totalRepayment = 0;
        const updatedLoans = playerLoans.map(loan => {
            const newRemaining = loan.amountRemaining - loan.repaymentPerSecond;
            totalRepayment += loan.repaymentPerSecond;
            return {...loan, amountRemaining: newRemaining};
        }).filter(loan => loan.amountRemaining > 0);

        const updatedCampaigns = activeCampaigns.filter(c => Date.now() < c.expiresAt);
        
        updateGameState({
            playerLoans: updatedLoans,
            activeCampaigns: updatedCampaigns,
            money: totalRepayment > 0 ? money - totalRepayment : money,
        });
    }, 1000);

    useGameLoop(() => {
        const updatedStocks = stocks.map(stock => {
            const changePercent = (Math.random() - 0.49) * 0.1;
            let newPrice = stock.price * (1 + changePercent);
            if (newPrice < 1) newPrice = 1;
            const newHistory = [...stock.history, newPrice].slice(-50);
            return { ...stock, price: newPrice, history: newHistory };
        });
        updateGameState({ stocks: updatedStocks });

        let newActiveNewsEvent = activeNewsEvent;
        let newNewsFeed = newsFeed;
        if (activeNewsEvent && Date.now() > activeNewsEvent.expires) {
            newActiveNewsEvent = null;
        } else if (!activeNewsEvent && Math.random() < 0.2) {
            const eventTemplate = NEWS_EVENT_TEMPLATES[Math.floor(Math.random() * NEWS_EVENT_TEMPLATES.length)];
            const newEvent: NewsEvent = { id: Date.now(), ...eventTemplate, timestamp: Date.now(), expires: Date.now() + eventTemplate.duration };
            newActiveNewsEvent = newEvent;
            newNewsFeed = [newEvent, ...newsFeed.slice(0, 49)];
        }

        let newAvailableDeals = availableDeals;
        if (availableDeals.length < 3 && Math.random() < 0.25) {
            const unusedDeals = SOCIAL_DEALS.filter(d => !availableDeals.find(ad => ad.id === d.id));
            if(unusedDeals.length > 0) {
                 const newDeal = unusedDeals[Math.floor(Math.random() * unusedDeals.length)];
                 newAvailableDeals = [...availableDeals, newDeal];
            }
        }
        updateGameState({ activeNewsEvent: newActiveNewsEvent, newsFeed: newNewsFeed, availableDeals: newAvailableDeals });

    }, 5000);
    
    useEffect(() => {
        const updatedAchievements = achievements.map(ach => {
            if (!ach.unlocked && ach.condition(gameState)) {
                return { ...ach, unlocked: true, unlockedAt: Date.now() };
            }
            return ach;
        });
        if(JSON.stringify(updatedAchievements) !== JSON.stringify(achievements)){
            updateGameState({ achievements: updatedAchievements });
        }
    }, [gameState, achievements, updateGameState]);

    const handleMoneyClick = (e: React.MouseEvent<HTMLElement>) => {
        const newMoney = moneyPerClick;
        updateGameState({ money: money + newMoney });
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newFloatingNumber: FloatingNumberType = { id: Date.now() + Math.random(), value: newMoney, x, y };
        setFloatingNumbers(prev => [...prev, newFloatingNumber]);
        setTimeout(() => setFloatingNumbers(current => current.filter(fn => fn.id !== newFloatingNumber.id)), 2000);
    };
    
    const handlePurchaseBusiness = useCallback((businessId: string) => {
        const business = businesses.find(u => u.id === businessId);
        if (!business) return;
        const currentCost = business.baseCost * Math.pow(1.15, business.level);
        if (money >= currentCost) {
            updateGameState({ 
                money: money - currentCost,
                businesses: businesses.map(u => u.id === businessId ? { ...u, level: u.level + 1 } : u)
            });
            addTransaction(`شراء: ${business.name}`, currentCost, 'expense');
        }
    }, [money, businesses, addTransaction, updateGameState]);

    const handlePurchaseUpgrade = useCallback((type: 'business' | 'property', entityId: string, upgradeId: string) => {
        if (type === 'business') {
            const business = businesses.find(b => b.id === entityId);
            const upgrade = business?.upgrades.find(u => u.id === upgradeId);
            if (!business || !upgrade || upgrade.purchased || money < upgrade.cost) return;
            
            updateGameState({
                money: money - upgrade.cost,
                businesses: businesses.map(b => {
                    if (b.id === entityId) {
                        return {
                            ...b,
                            upgrades: b.upgrades.map(u => u.id === upgradeId ? { ...u, purchased: true } : u)
                        };
                    }
                    return b;
                })
            });
            addTransaction(`ترقية ${business.name}: ${upgrade.name}`, upgrade.cost, 'expense');

        } else if (type === 'property') {
            const property = ownedProperties.find(p => p.id === entityId);
            const upgrade = property?.upgrades.find(u => u.id === upgradeId);
             if (!property || !upgrade || upgrade.purchased || money < upgrade.cost) return;

            updateGameState({
                money: money - upgrade.cost,
                ownedProperties: ownedProperties.map(p => {
                    if (p.id === entityId) {
                        return {
                            ...p,
                            upgrades: p.upgrades.map(u => u.id === upgradeId ? { ...u, purchased: true } : u)
                        };
                    }
                    return p;
                })
            });
            addTransaction(`ترقية ${property.name}: ${upgrade.name}`, upgrade.cost, 'expense');
        }
    }, [money, businesses, ownedProperties, addTransaction, updateGameState]);
    
    const handleHireEmployee = useCallback((employeeId: string) => {
        const employee = employees.find(e => e.id === employeeId);
        if (!employee) return;
        const cost = employee.baseCost * Math.pow(1.2, employee.level);
        if (money >= cost) {
            updateGameState({
                money: money - cost,
                employees: employees.map(e => e.id === employeeId ? {...e, level: e.level + 1} : e)
            });
            addTransaction(`توظيف: ${employee.name}`, cost, 'expense');
        }
    }, [money, employees, addTransaction, updateGameState]);
    
    const handleBuyStock = useCallback((stockId: string, amount: number) => {
        const stock = stocks.find(s => s.id === stockId);
        if(!stock || amount <= 0) return;
        const cost = stock.price * amount;
        if(money >= cost) {
            const updatedPlayerStocks = [...playerStocks];
            const existing = updatedPlayerStocks.find(ps => ps.stockId === stockId);
            if (existing) {
                existing.shares += amount;
            } else {
                updatedPlayerStocks.push({ stockId, shares: amount });
            }
            updateGameState({
                money: money - cost,
                playerStocks: updatedPlayerStocks
            });
            addTransaction(`شراء ${amount} أسهم ${stock.name}`, cost, 'expense');
        }
    }, [money, stocks, playerStocks, addTransaction, updateGameState]);
    
    const handleSellStock = useCallback((stockId: string, amount: number) => {
        const stock = stocks.find(s => s.id === stockId);
        const playerStock = playerStocks.find(ps => ps.stockId === stockId);
        if(!stock || !playerStock || amount <= 0 || playerStock.shares < amount) return;
        const income = stock.price * amount;
        updateGameState({
            money: money + income,
            playerStocks: playerStocks.map(ps => ps.stockId === stockId ? {...ps, shares: ps.shares - amount} : ps).filter(ps => ps.shares > 0)
        });
        addTransaction(`بيع ${amount} أسهم ${stock.name}`, income, 'income');
    }, [playerStocks, stocks, money, addTransaction, updateGameState]);

    const handleTakeLoan = useCallback((loanId: string) => {
        const loan = AVAILABLE_LOANS.find(l => l.id === loanId);
        if (!loan || money < loan.requiredAssets) return;
        updateGameState({
            money: money + loan.amount,
            playerLoans: [...playerLoans, {
                loanId: loan.id,
                amountRemaining: loan.amount + loan.interest,
                repaymentPerSecond: (loan.amount + loan.interest) / loan.termSeconds
            }]
        });
        addTransaction(`قرض: ${loan.name}`, loan.amount, 'income');
    }, [money, playerLoans, addTransaction, updateGameState]);

    const handleStartCampaign = useCallback((campaignId: string) => {
        const campaign = MARKETING_CAMPAIGNS.find(c => c.id === campaignId);
        if (!campaign || money < campaign.cost) return;
        updateGameState({
            money: money - campaign.cost,
            activeCampaigns: [...activeCampaigns, {
                campaignId: campaign.id,
                expiresAt: Date.now() + campaign.duration,
                effect: campaign.effect
            }]
        });
        addTransaction(`تسويق: ${campaign.name}`, campaign.cost, 'expense');
    }, [money, activeCampaigns, addTransaction, updateGameState]);

    const handleBuyProperty = useCallback((propertyId: string) => {
        const prop = ownedProperties.find(p => p.id === propertyId);
        if (!prop || money < prop.cost || prop.level > 0) return;
        updateGameState({
            money: money - prop.cost,
            ownedProperties: ownedProperties.map(p => p.id === propertyId ? { ...p, level: 1 } : p)
        });
        addTransaction(`شراء عقار: ${prop.name}`, prop.cost, 'expense');
    }, [money, ownedProperties, addTransaction, updateGameState]);

    const handleBuyCar = useCallback((carId: string) => {
        const car = AVAILABLE_CARS.find(c => c.id === carId);
        if (!car || money < car.cost || ownedCars.includes(carId)) return;
        updateGameState({
            money: money - car.cost,
            ownedCars: [...ownedCars, carId]
        });
        addTransaction(`شراء سيارة: ${car.name}`, car.cost, 'expense');
    }, [money, ownedCars, addTransaction, updateGameState]);

    const handleTravel = useCallback((locationId: string) => {
        const location = LOCATIONS.find(l => l.id === locationId);
        if (!location || money < location.travelCost || currentLocationId === locationId) return;
        updateGameState({
            money: money - location.travelCost,
            currentLocationId: locationId
        });
        addTransaction(`سفر إلى ${location.name}`, location.travelCost, 'expense');
    }, [money, currentLocationId, addTransaction, updateGameState]);

    const handleAcceptDeal = useCallback((dealId: string) => {
        const deal = availableDeals.find(d => d.id === dealId);
        if (!deal) return;
        updateGameState({
            activeCampaigns: [...activeCampaigns, {
                campaignId: `deal_${deal.id}`,
                expiresAt: Date.now() + deal.duration,
                effect: deal.effect
            }],
            availableDeals: availableDeals.filter(d => d.id !== dealId)
        });
        addTransaction(`صفقة: ${deal.title}`, 0, 'income');
    }, [availableDeals, activeCampaigns, addTransaction, updateGameState]);

    const renderActiveApp = () => {
        switch (activeApp) {
            case 'businesses':
                return <BusinessesApp businesses={businesses} money={money} onPurchase={handlePurchaseBusiness} currentLocationId={currentLocationId} onPurchaseUpgrade={(businessId, upgradeId) => handlePurchaseUpgrade('business', businessId, upgradeId)}/>;
            case 'real_estate':
                return <RealEstateApp money={money} properties={ownedProperties} onBuyProperty={handleBuyProperty} onPurchaseUpgrade={(propertyId, upgradeId) => handlePurchaseUpgrade('property', propertyId, upgradeId)} />;
            case 'wallet':
                return <WalletApp transactions={transactions} money={money} />;
            case 'stocks':
                return <StocksApp stocks={stocks} playerStocks={playerStocks} money={money} onBuy={handleBuyStock} onSell={handleSellStock} />;
            case 'hr':
                return <HRApp employees={employees} money={money} onHire={handleHireEmployee} />;
            case 'news':
                return <NewsApp newsFeed={newsFeed} activeEvent={activeNewsEvent} />;
            case 'achievements':
                return <AchievementsApp achievements={achievements} />;
            case 'loans':
                return <LoansApp money={money} playerLoans={playerLoans} onTakeLoan={handleTakeLoan} />;
            case 'ads':
                return <AdsApp money={money} activeCampaigns={activeCampaigns} onStartCampaign={handleStartCampaign} />;
            case 'cars':
                return <CarsApp money={money} ownedCars={ownedCars} onBuyCar={handleBuyCar} />;
            case 'travel':
                return <TravelApp money={money} currentLocationId={currentLocationId} onTravel={handleTravel} />;
            case 'social':
                return <SocialApp availableDeals={availableDeals} onAcceptDeal={handleAcceptDeal} />;
            case 'settings':
                return <SettingsApp onSave={handleManualSave} onReset={handleResetGame} />;
            default:
                return <BusinessesApp businesses={businesses} money={money} onPurchase={handlePurchaseBusiness} currentLocationId={currentLocationId} onPurchaseUpgrade={(businessId, upgradeId) => handlePurchaseUpgrade('business', businessId, upgradeId)}/>;
        }
    };


    return (
         <div className="w-full h-full flex p-2 sm:p-4 gap-2 sm:gap-4 bg-gradient-to-br from-gray-900 to-black">
            {/* Left Panel: Stats & Clicker */}
            <div className="flex flex-col w-1/4 max-w-xs p-2 sm:p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                <div className="flex flex-col items-center justify-center flex-grow text-center">
                    <p className="text-lg md:text-xl text-gray-400">الثروة الإجمالية</p>
                    <p className="text-3xl md:text-5xl font-bold text-cyan-400 tracking-wider my-2">${formatNumber(money)}</p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:gap-4 mb-4">
                    <StatDisplay label="الدخل/ثانية" value={`$${formatNumber(moneyPerSecond)}`} />
                    <StatDisplay label="الدخل/نقرة" value={`$${formatNumber(moneyPerClick)}`} />
                </div>
            
                <div className="relative">
                    <button
                        onClick={handleMoneyClick}
                        className="relative w-full h-32 md:h-48 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-2xl transform transition-transform duration-100 ease-in-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-300"
                        aria-label="Click to earn money"
                    >
                        اضغط هنا
                        {floatingNumbers.map(fn => (
                            <FloatingNumber key={fn.id} value={fn.value} x={fn.x} y={fn.y} />
                        ))}
                    </button>
                </div>
            </div>

            {/* Center Panel: Main Content */}
            <main className="flex-1 bg-gray-800/30 rounded-2xl p-2 sm:p-4 border border-gray-700/50 overflow-hidden">
                <div className="h-full overflow-y-auto">
                    {renderActiveApp()}
                </div>
            </main>

            {/* Right Panel: Dock */}
            <Dock activeApp={activeApp} setActiveApp={setActiveApp} />
        </div>
    );
};

export default App;
