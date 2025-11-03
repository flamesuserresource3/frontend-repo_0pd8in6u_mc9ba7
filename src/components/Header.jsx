import React from 'react';
import { LineChart, Wallet } from 'lucide-react';

function formatCurrency(value) {
  return value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

const Header = ({ equity, cash }) => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow">
            <LineChart size={22} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">NovaTrade</h1>
            <p className="text-xs text-neutral-500">Simple, fast, beautiful trading</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <Wallet className="text-blue-600" size={18} />
            <span className="text-neutral-500">Cash</span>
            <span className="font-medium">{formatCurrency(cash)}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-500">Total Equity</p>
            <p className="text-base sm:text-lg font-semibold">{formatCurrency(equity)}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
