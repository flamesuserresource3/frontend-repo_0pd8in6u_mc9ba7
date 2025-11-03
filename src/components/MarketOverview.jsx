import React from 'react';
import { ArrowDownRight, ArrowUpRight, Activity } from 'lucide-react';

const Badge = ({ positive }) => (
  <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
    positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
  }`}>
    {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
    {positive ? 'Up' : 'Down'}
  </span>
);

const MarketOverview = ({ symbols, selectedSymbol, onSelect }) => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="text-blue-600" size={18} /> Market Overview
        </h2>
        <p className="text-xs text-neutral-500">Click a market to trade</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {symbols.map((s) => {
          const positive = s.change >= 0;
          return (
            <button
              key={s.symbol}
              onClick={() => onSelect(s.symbol)}
              className={`group text-left w-full border rounded-xl p-4 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                selectedSymbol === s.symbol
                  ? 'border-blue-500/60 bg-blue-50/50'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-neutral-500">{s.symbol}</p>
                  <h3 className="text-base font-semibold">{s.name}</h3>
                </div>
                <Badge positive={positive} />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-xl font-bold tracking-tight">${s.price.toFixed(2)}</p>
                <p className={`text-sm font-medium ${
                  positive ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {positive ? '+' : ''}{s.change.toFixed(2)}%
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MarketOverview;
