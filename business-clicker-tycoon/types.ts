
import React from 'react';

// Core Types
export interface Upgrade {
    id: string;
    name: string;
    description: string;
    cost: number;
    multiplier: number;
    purchased: boolean;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  level: number;
  baseCost: number;
  incomePerSecond: number;
  clickPower: number;
  icon: React.ReactNode;
  locationId: string;
  upgrades: Upgrade[];
}

export interface FloatingNumber {
  id: number;
  value: number;
  x: number;
  y: number;
}

export interface Transaction {
    id: number;
    timestamp: number;
    description: string;
    amount: number;
    type: 'income' | 'expense';
}

// App-specific Types
export interface Stock {
    id: string;
    name: string;
    price: number;
    history: number[];
}

export interface PlayerStock {
    stockId: string;
    shares: number;
}

export interface Employee {
    id: string;
    name: string;
    description: string;
    level: number;
    baseCost: number;
    mpsBoost: number; // money per second boost
    mpcBoost: number; // money per click boost
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    unlocked: boolean;
    unlockedAt?: number;
    condition: (state: GameState) => boolean;
}

export interface NewsEvent {
    id: number;
    headline: string;
    timestamp: number;
    expires: number;
    effect: {
        type: 'business_income_modifier' | 'stock_price_modifier';
        payload: any;
    };
}

export interface Loan {
    id: string;
    name: string;
    amount: number;
    interest: number;
    termSeconds: number;
    requiredAssets: number; // Minimum money required to take the loan
}

export interface PlayerLoan {
    loanId: string;
    amountRemaining: number;
    repaymentPerSecond: number;
}

export interface Campaign {
    id: string;
    name: string;
    description: string;
    cost: number;
    duration: number; // in milliseconds
    effect: CampaignEffect;
}

export interface ActiveCampaign {
    campaignId: string;
    expiresAt: number;
    effect: CampaignEffect;
}

export interface RealEstateProperty {
    id: string;
    name: string;
    level: number; // 0 for not owned, 1 for owned
    cost: number;
    incomePerSecond: number;
    upgrades: Upgrade[];
}

export interface Car {
    id: string;
    name: string;
    cost: number;
    effect: {
        type: 'global_mps_multiplier';
        multiplier: number;
    };
}

export interface Location {
    id: string;
    name: string;
    travelCost: number;
}

export interface SocialDeal {
    id: string;
    title: string;
    description: string;
    npc: string; // Name of the character offering the deal
    duration: number; // in milliseconds
    effect: CampaignEffect;
}

type CampaignEffect = {
    type: 'global_mps_multiplier' | 'global_mpc_multiplier';
    multiplier: number;
};

// Game State & App ID
export interface GameState {
    money: number;
    businesses: Business[];
    transactions: Transaction[];
    stocks: Stock[];
    playerStocks: PlayerStock[];
    employees: Employee[];
    achievements: Achievement[];
    newsFeed: NewsEvent[];
    activeNewsEvent: NewsEvent | null;
    playerLoans: PlayerLoan[];
    activeCampaigns: ActiveCampaign[];
    ownedProperties: RealEstateProperty[];
    ownedCars: string[];
    currentLocationId: string;
    availableDeals: SocialDeal[];
}

export type AppId = 
  | 'businesses' 
  | 'wallet'
  | 'stocks'
  | 'loans'
  | 'hr'
  | 'ads'
  | 'cars'
  | 'travel'
  | 'real_estate'
  | 'social'
  | 'news'
  | 'achievements'
  | 'settings';
