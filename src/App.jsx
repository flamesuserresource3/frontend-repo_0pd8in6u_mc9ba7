import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import MarketOverview from './components/MarketOverview';
import Portfolio from './components/Portfolio';
import TradePanel from './components/TradePanel';

const initialSymbols = [
  { symbol: 'BTC-USD', name: 'Bitcoin', price: 67000, change: 0 },
  { symbol: 'ETH-USD', name: 'Ethereum', price: 3400, change: 0 },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 190, change: 0 },
  { symbol: 'TSLA', name: 'Tesla', price: 235, change: 0 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 880, change: 0 },
  { symbol: 'MSFT', name: 'Microsoft', price: 410, change: 0 },
  { symbol: 'SOL-USD', name: 'Solana', price: 165, change: 0 },
  { symbol: 'DOGE-USD', name: 'Dogecoin', price: 0.12, change: 0 },
];

function App() {
  const [symbols, setSymbols] = useState(initialSymbols);
  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbols[0].symbol);
  const [cash, setCash] = useState(100000);
  const [holdings, setHoldings] = useState({});
  const [orders, setOrders] = useState([]);

  // Simulate live price updates
  useEffect(() => {
    const id = setInterval(() => {
      setSymbols(prev => prev.map(s => {
        const volatility = Math.max(0.2, Math.min(2, s.price / 5000));
        const delta = s.price * (Math.random() - 0.5) * 0.0025 * volatility; // up to ~0.25%
        const next = Math.max(0.0001, s.price + delta);
        const change = ((next - s.price) / s.price) * 100;
        return { ...s, price: next, change };
      }));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const priceMap = useMemo(() => Object.fromEntries(symbols.map(s => [s.symbol, s.price])), [symbols]);

  const equity = useMemo(() => {
    const holdingsValue = Object.entries(holdings).reduce((sum, [sym, qty]) => sum + (priceMap[sym] || 0) * qty, 0);
    return cash + holdingsValue;
  }, [cash, holdings, priceMap]);

  const handleTrade = ({ side, symbol, quantity }) => {
    if (!quantity || quantity <= 0) return;
    const price = priceMap[symbol] || 0;
    const cost = price * quantity;

    if (side === 'BUY') {
      if (cost > cash) {
        alert('Insufficient cash');
        return;
      }
      setCash(c => c - cost);
      setHoldings(h => ({ ...h, [symbol]: (h[symbol] || 0) + quantity }));
    } else {
      const available = holdings[symbol] || 0;
      if (quantity > available) {
        alert('Insufficient quantity');
        return;
      }
      setCash(c => c + cost);
      setHoldings(h => ({ ...h, [symbol]: available - quantity }));
    }

    setOrders(o => [
      { side, symbol, quantity, price, time: new Date().toISOString() },
      ...o,
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <Header equity={equity} cash={cash} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <MarketOverview
          symbols={symbols}
          selectedSymbol={selectedSymbol}
          onSelect={setSelectedSymbol}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Portfolio cash={cash} holdings={holdings} symbols={symbols} orders={orders} />
          </div>
          <div className="lg:col-span-1">
            <TradePanel
              selectedSymbol={selectedSymbol}
              symbols={symbols}
              onTrade={handleTrade}
              cash={cash}
            />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-neutral-500">
        Built with ❤️ for seamless trading experiences.
      </footer>
    </div>
  );
}

export default App;
