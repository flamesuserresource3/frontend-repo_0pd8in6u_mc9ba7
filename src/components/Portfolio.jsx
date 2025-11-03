import React, { useMemo } from 'react';
import { Wallet, Coins } from 'lucide-react';

function formatCurrency(v) {
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

const Portfolio = ({ cash, holdings, symbols, orders }) => {
  const priceMap = useMemo(() => Object.fromEntries(symbols.map(s => [s.symbol, s.price])), [symbols]);
  const rows = Object.entries(holdings).filter(([, qty]) => qty > 0);
  const holdingsValue = rows.reduce((sum, [sym, qty]) => sum + (priceMap[sym] || 0) * qty, 0);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 border rounded-xl p-4 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Coins size={18} className="text-amber-600" /> Holdings</h2>
          <p className="text-sm text-neutral-500">{rows.length} assets</p>
        </div>
        {rows.length === 0 ? (
          <p className="text-sm text-neutral-500">No holdings yet. Place a trade to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-neutral-500">
                  <th className="text-left font-medium py-2">Symbol</th>
                  <th className="text-right font-medium py-2">Qty</th>
                  <th className="text-right font-medium py-2">Price</th>
                  <th className="text-right font-medium py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([sym, qty]) => {
                  const price = priceMap[sym] || 0;
                  const value = price * qty;
                  return (
                    <tr key={sym} className="border-t border-neutral-100 dark:border-neutral-800">
                      <td className="py-2">{sym}</td>
                      <td className="py-2 text-right">{qty}</td>
                      <td className="py-2 text-right">${price.toFixed(2)}</td>
                      <td className="py-2 text-right font-medium">{formatCurrency(value)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 flex items-center justify-end text-sm text-neutral-600 dark:text-neutral-300">
          <span className="mr-2">Holdings Value:</span>
          <span className="font-semibold">{formatCurrency(holdingsValue)}</span>
        </div>
      </div>

      <div className="border rounded-xl p-4 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Wallet size={18} className="text-blue-600" /> Cash</h2>
        </div>
        <p className="text-2xl font-bold tracking-tight">{formatCurrency(cash)}</p>
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-sm text-neutral-500">No orders yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {orders.slice(0, 6).map((o, idx) => (
                <li key={idx} className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                  <span className={`font-medium ${o.side === 'BUY' ? 'text-emerald-600' : 'text-rose-600'}`}>{o.side}</span>
                  <span>{o.symbol}</span>
                  <span>@ ${o.price.toFixed(2)}</span>
                  <span>× {o.quantity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
