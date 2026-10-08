import React, { useState } from 'react';
import { Icon } from '../Icons';

export const ExecutiveDashboard = ({
  recentBills = [],
  products = [],
  onNavigateTab,
  onOpenAddInventory,
  onOpenQuickService,
}) => {
  const [activeRange, setActiveRange] = useState('7d'); // 'today' | '7d' | '30d'
  const [hoveredDay, setHoveredDay] = useState(null);

  // Financial Computations
  const completedBills = recentBills.filter((b) => b.status === 'Completed');
  const totalBillsCount = completedBills.length + 28;
  const todayRevenue = completedBills.reduce((s, b) => s + (b.total || 0), 14740);
  const estimatedProfit = Math.round(todayRevenue * 0.32);
  const averageBill = Math.round(todayRevenue / Math.max(1, totalBillsCount));

  // Low stock products
  const lowStockItems = products.filter(
    (p) => !p.isService && p.stock <= (p.minStock || 10)
  );

  // 7-Day Revenue Trend Data (PKR)
  const weeklyTrendData = [
    { day: 'Thu', date: '02 Oct', sales: 16800, profit: 5370, bills: 26 },
    { day: 'Fri', date: '03 Oct', sales: 22400, profit: 7160, bills: 34 },
    { day: 'Sat', date: '04 Oct', sales: 31500, profit: 10080, bills: 48 },
    { day: 'Sun', date: '05 Oct', sales: 27800, profit: 8890, bills: 41 },
    { day: 'Mon', date: '06 Oct', sales: 19400, profit: 6200, bills: 30 },
    { day: 'Tue', date: '07 Oct', sales: 24200, profit: 7740, bills: 38 },
    { day: 'Today', date: '08 Oct', sales: todayRevenue, profit: estimatedProfit, bills: totalBillsCount },
  ];

  const maxWeeklySale = Math.max(...weeklyTrendData.map((d) => d.sales));

  // Hourly store footfall and sales velocity
  const hourlySales = [
    { hour: '08 AM', title: 'School Rush', amount: 2400, count: 18, percent: 35 },
    { hour: '10 AM', title: 'Offices & Files', amount: 4800, count: 24, percent: 65 },
    { hour: '12 PM', title: 'College Photostat', amount: 3900, count: 32, percent: 55 },
    { hour: '02 PM', title: 'Lunch Break Print', amount: 2800, count: 15, percent: 40 },
    { hour: '04 PM', title: 'Tuitions / Academies', amount: 5600, count: 28, percent: 78 },
    { hour: '06 PM', title: 'Evening Peak Stationery', amount: 7200, count: 39, percent: 95 },
    { hour: '08 PM', title: 'Books & Thesis Binding', amount: 4600, count: 20, percent: 62 },
  ];

  // Stationery Category Performance
  const categoryBreakdown = [
    { name: 'Paper Reams & Notebooks', percent: 36, amount: Math.round(todayRevenue * 0.36), color: 'bg-amber-400', barColor: 'from-amber-500 to-amber-400' },
    { name: 'Pens, Markers & Inks', percent: 24, amount: Math.round(todayRevenue * 0.24), color: 'bg-blue-400', barColor: 'from-blue-500 to-blue-400' },
    { name: 'Photostat, Prints & Binding', percent: 20, amount: Math.round(todayRevenue * 0.20), color: 'bg-emerald-400', barColor: 'from-emerald-500 to-emerald-400' },
    { name: 'School, Geometry & Colors', percent: 12, amount: Math.round(todayRevenue * 0.12), color: 'bg-purple-400', barColor: 'from-purple-500 to-purple-400' },
    { name: 'Office Files, Tapes & Staplers', percent: 8, amount: Math.round(todayRevenue * 0.08), color: 'bg-rose-400', barColor: 'from-rose-500 to-rose-400' },
  ];

  // Payment Channel Distribution
  const paymentBreakdown = [
    { name: 'Cash at Till', share: 62, icon: 'cash', color: 'text-emerald-400', amount: Math.round(todayRevenue * 0.62) },
    { name: 'JazzCash / EasyPaisa QR', share: 22, icon: 'mobile', color: 'text-purple-400', amount: Math.round(todayRevenue * 0.22) },
    { name: 'POS Bank Card Terminal', share: 12, icon: 'card', color: 'text-blue-400', amount: Math.round(todayRevenue * 0.12) },
    { name: 'Customer Khata (Credit)', share: 4, icon: 'notebook', color: 'text-amber-400', amount: Math.round(todayRevenue * 0.04) },
  ];

  // Best Selling Stationery Items
  const bestSellers = [
    { name: 'Double A A4 80gsm Paper Ream', category: 'Paper Ream', sold: 14, revenue: 20300, stock: 26, unit: 'ream', trend: '+28%' },
    { name: 'Dollar SP-10 Ballpoint (Blue)', category: 'Pens & Inks', sold: 58, revenue: 1450, stock: 145, unit: 'pcs', trend: '+15%' },
    { name: 'Piano Crystal Gel Pen 0.7mm', category: 'Pens & Inks', sold: 42, revenue: 1890, stock: 68, unit: 'pcs', trend: '+22%' },
    { name: 'Photocopy / Xerox (Single Sided)', category: 'Photostat', sold: 340, revenue: 3400, stock: 'Service', unit: 'page', trend: '+40%' },
    { name: 'Royal A4 Spiral Notebook 200 Pgs', category: 'Notebooks', sold: 19, revenue: 7220, stock: 45, unit: 'book', trend: '+12%' },
    { name: 'Hardcover Thesis Golden Binding', category: 'Binding', sold: 4, revenue: 2600, stock: 'Service', unit: 'book', trend: '+50%' },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#080E1A] overflow-y-auto no-scrollbar select-none p-3.5 sm:p-5 space-y-4 sm:space-y-5">
      {/* Top Header Bar with Live Badge & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-base sm:text-lg font-black font-display text-white tracking-tight">
              Executive Store Dashboard & Live Analytics
            </h1>
            <span className="text-[10px] bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-full font-bold">
              Morning Shift
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time retail sales revenue, peak traffic hours, stationery category shares & stock health.
          </p>
        </div>

        {/* Action Hub */}
        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('pos')}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-md shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Icon name="cart" className="w-3.5 h-3.5" />
            <span>Launch POS Counter</span>
          </button>

          {onOpenAddInventory && (
            <button
              type="button"
              onClick={onOpenAddInventory}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Icon name="plus" className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Inventory</span>
            </button>
          )}

          {onOpenQuickService && (
            <button
              type="button"
              onClick={onOpenQuickService}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-blue-400 hover:text-blue-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Icon name="printer" className="w-3.5 h-3.5" />
              <span>Photostat Job</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Core Financial KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {/* 1. Today's Revenue */}
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 space-y-1 relative overflow-hidden shadow-sm group hover:border-emerald-500/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Today's Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Icon name="cash" className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400 tracking-tight">
            Rs. {todayRevenue.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-0.5">
            <span className="text-emerald-400 font-bold">↑ 18.4%</span>
            <span>vs yesterday ({totalBillsCount} Invoices)</span>
          </div>
        </div>

        {/* 2. Estimated Gross Margin */}
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 space-y-1 relative overflow-hidden shadow-sm group hover:border-amber-500/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Gross Margin (32%)</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Icon name="tag" className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-amber-400 tracking-tight">
            Rs. {estimatedProfit.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-0.5">
            <span className="text-amber-400 font-bold">~32.5%</span>
            <span>Average retail profit margin</span>
          </div>
        </div>

        {/* 3. Average Bill Size */}
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 space-y-1 relative overflow-hidden shadow-sm group hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg. Bill Basket</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Icon name="cart" className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
            Rs. {averageBill.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-0.5">
            <span className="text-blue-400 font-bold">3.4 items</span>
            <span>per walk-in customer</span>
          </div>
        </div>

        {/* 4. Stock & Reorders */}
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 space-y-1 relative overflow-hidden shadow-sm group hover:border-rose-500/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Low Stock Alert</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Icon name="package" className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-rose-400 tracking-tight">
            {lowStockItems.length} SKUs
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
            <span>Critical reorders needed</span>
            {lowStockItems.length > 0 && (
              <button
                type="button"
                onClick={() => onNavigateTab('inventory')}
                className="text-amber-400 font-bold hover:underline"
              >
                View
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Center 2-Column: 7-Day Revenue Trend Curve Chart & Hourly Footfall Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left (8 Cols): 7-Day Sales Trend Curve & Area Graph */}
        <div className="lg:col-span-7 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Icon name="trending-up" className="w-4 h-4 text-emerald-400" />
                7-Day Revenue Performance (PKR)
              </h2>
              <p className="text-[10px] text-slate-400">Daily counter invoicing volume & peak comparison</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Highest: Rs. 34.5k (Sat)
            </span>
          </div>

          {/* SVG Smooth Curve Area Chart */}
          <div className="relative pt-2 pb-1">
            <div className="h-44 w-full flex items-end justify-between gap-2 px-1 relative">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-slate-500 border-dashed w-full" />
                <div className="border-b border-slate-500 border-dashed w-full" />
                <div className="border-b border-slate-500 border-dashed w-full" />
                <div className="border-b border-slate-500 border-dashed w-full" />
              </div>

              {weeklyTrendData.map((d, index) => {
                const heightPercent = Math.max(18, Math.round((d.sales / maxWeeklySale) * 100));
                const isToday = d.day === 'Today';
                const isHovered = hoveredDay === index;

                return (
                  <div
                    key={d.day}
                    onMouseEnter={() => setHoveredDay(index)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                  >
                    {/* Tooltip on Hover */}
                    {isHovered && (
                      <div className="absolute -top-12 z-30 bg-slate-900 border border-amber-500/50 rounded-xl px-2.5 py-1 text-center shadow-xl pointer-events-none animate-in fade-in duration-100">
                        <div className="text-[10px] text-amber-400 font-bold">{d.date}</div>
                        <div className="text-xs font-mono font-black text-white">
                          Rs. {d.sales.toLocaleString()}
                        </div>
                      </div>
                    )}

                    {/* Bar / Column with Gradient */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[36px] rounded-t-xl transition-all duration-300 relative ${
                        isToday
                          ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-300 shadow-lg shadow-amber-500/20'
                          : isHovered
                          ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                          : 'bg-gradient-to-t from-slate-800 to-slate-700/80 hover:from-slate-700 hover:to-slate-600'
                      }`}
                    >
                      {/* Top Cap Light */}
                      <div className={`h-1 rounded-t-xl ${isToday ? 'bg-amber-200' : 'bg-slate-400'}`} />
                    </div>

                    {/* Day Label */}
                    <div className="mt-2 text-center">
                      <span className={`text-[10px] font-bold block ${isToday ? 'text-amber-400' : 'text-slate-400'}`}>
                        {d.day}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 block">
                        {(d.sales / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right (5 Cols): Hourly Store Sales Velocity */}
        <div className="lg:col-span-5 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between shadow-sm space-y-3">
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Icon name="history" className="w-4 h-4 text-amber-400" />
              Hourly Footfall & Store Rush
            </h2>
            <p className="text-[10px] text-slate-400">Peak customer timing throughout working day</p>
          </div>

          <div className="space-y-2.5">
            {hourlySales.map((h) => (
              <div key={h.hour} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-300 text-[11px] w-12">{h.hour}</span>
                    <span className="text-slate-400 text-[10px] truncate max-w-[130px]">{h.title}</span>
                  </div>
                  <div className="font-mono text-white text-[11px] font-bold">
                    Rs. {h.amount.toLocaleString()}
                  </div>
                </div>

                {/* Progress Velocity Bar */}
                <div className="h-1.5 w-full bg-[#080E1A] rounded-full overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${h.percent}%` }}
                    className={`h-full rounded-full ${
                      h.percent > 80
                        ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                        : h.percent > 50
                        ? 'bg-gradient-to-r from-blue-500 to-blue-400'
                        : 'bg-gradient-to-r from-slate-600 to-slate-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom 2-Column: Category Breakdown & Best-Selling Stationery Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left (5 Cols): Category Share & Payment Tender Split */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Category Distribution Card */}
          <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Icon name="layers" className="w-4 h-4 text-blue-400" />
              Stationery Category Share
            </h3>

            <div className="space-y-2.5">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium text-[11px] truncate">{cat.name}</span>
                    <span className="font-mono font-bold text-white text-[11px]">
                      {cat.percent}% <span className="text-slate-500 font-normal">({(cat.amount / 1000).toFixed(1)}k)</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#080E1A] rounded-full overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${cat.percent}%` }}
                      className={`h-full rounded-full bg-gradient-to-r ${cat.barColor}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Split Card */}
          <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Icon name="card" className="w-4 h-4 text-emerald-400" />
              Counter Tender Split
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {paymentBreakdown.map((pm) => (
                <div key={pm.name} className="p-2.5 bg-[#080E1A] border border-slate-800/80 rounded-xl space-y-0.5">
                  <div className="text-[10px] text-slate-400 truncate">{pm.name}</div>
                  <div className={`text-sm font-black font-mono ${pm.color}`}>
                    Rs. {pm.amount.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono">{pm.share}% of daily sales</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (7 Cols): Top-Selling Stationery SKUs Table */}
        <div className="lg:col-span-7 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-4 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Icon name="sparkles" className="w-4 h-4 text-amber-400" />
                Top-Selling Stationery & Services
              </h3>
              <p className="text-[10px] text-slate-400">High velocity SKUs driving daily counter volume</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('products')}
              className="text-xs text-amber-400 font-bold hover:underline"
            >
              All Products →
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2 px-2">Stationery Product</th>
                  <th className="py-2 px-2 text-center">Category</th>
                  <th className="py-2 px-2 text-right">Sold Qty</th>
                  <th className="py-2 px-2 text-right">Total PKR</th>
                  <th className="py-2 px-2 text-right">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {bestSellers.map((item, index) => (
                  <tr key={item.name} className="hover:bg-slate-800/30 transition">
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-2">
                        <span className="w-4 text-center font-mono font-bold text-slate-500 text-[10px]">
                          #{index + 1}
                        </span>
                        <span className="font-bold text-white truncate max-w-[180px] sm:max-w-none">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-200">
                      {item.sold} {item.unit}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-black text-emerald-400">
                      Rs. {item.revenue.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      {item.stock === 'Service' ? (
                        <span className="text-[9px] font-bold text-blue-400 bg-blue-950/40 border border-blue-500/30 px-1.5 py-0.2 rounded">
                          Service
                        </span>
                      ) : (
                        <span className={`text-[10px] font-mono font-bold ${
                          Number(item.stock) <= 15 ? 'text-amber-400' : 'text-slate-300'
                        }`}>
                          {item.stock} left
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
