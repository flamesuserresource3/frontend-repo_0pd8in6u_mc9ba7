import React, { useMemo, useState } from 'react';

function formatCurrency(v) {
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

const TradePanel = ({ selectedSymbol, symbols, onTrade, cash }) => {
  const [quantity, setQuantity] = useState(1);
  const [side, setSide] = useState('BUY');

  const current = useMemo(() => symbols.find(s => s.symbol === selectedSymbol), [symbols, selectedSymbol]);
  const est = current ? current.price * (Number(quantity) || 0) : 0;

  const canBuy = side === 'BUY' ? cash >= est && est > 0 : true;

  return (
    <section className="border rounded-xl p-4 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Trade</h2>
        <div className="flex items-center gap-2 text-xs">
          <span className={`px-2 py-0.5 rounded ${side === 'SELL' ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-blue-600 text-white'}`}>Buy</span>
          <button
            aria-label="toggle side"
            onClick={() => setSide(prev => (prev === 'BUY' ? 'SELL' : 'BUY'))}
            className="h-6 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800 relative"
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white dark:bg-neutral-700 shadow transition-all ${side === 'BUY' ? 'left-0.5' : 'left-[18px]'}`} />
          </button>
          <span className={`px-2 py-0.5 rounded ${side === 'BUY' ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-rose-600 text-white'}`}>Sell</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-neutral-500">Market</label>
          <select
            value={selectedSymbol}
            onChange={() => {}}
            className="w-full mt-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm"
          >
            {symbols.map(s => (
              <option key={s.symbol} value={s.symbol}>{s.symbol} — {s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-neutral-500">Quantity</label>
          <input
            type="number"
            min="0"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full mt-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">Price</span>
          <span className="font-medium">{current ? `$${current.price.toFixed(2)}` : '-'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">Est. {side === 'BUY' ? 'Cost' : 'Proceeds'}</span>
          <span className="font-semibold">{formatCurrency(est)}</span>
        </div>
        <button
          disabled={!current || !canBuy}
          onClick={() => onTrade({ side, symbol: selectedSymbol, quantity: Number(quantity) })}
          className={`w-full mt-2 py-2 rounded-lg font-medium text-white transition ${
            side === 'BUY' ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300' : 'bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300'
          }`}
        >
          {side === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}
        </button>
        {!canBuy && side === 'BUY' && (
          <p className="text-xs text-rose-600">Insufficient cash to place this order.</p>
        )}
      </div>
    </section>
  );
};

export default TradePanel;
