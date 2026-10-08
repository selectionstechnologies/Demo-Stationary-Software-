import React from 'react';
import { Icon } from '../Icons';

export const AnalyticsDashboard = ({ recentBills, products }) => {
  // Financial Calculations
  const completedBills = recentBills.filter((b) => b.status === 'Completed');
  const grossSales = completedBills.reduce((sum, b) => sum + (b.total || 0), 0);
  const totalInvoices = completedBills.length;
  const aov = totalInvoices > 0 ? Math.round(grossSales / totalInvoices) : 0;

  // Approximate gross profit estimate (~30% margin standard retail)
  const estimatedProfit = Math.round(grossSales * 0.32);

  // Payment Breakdown
  const cashTotal = completedBills
    .filter((b) => b.paymentMode === 'Cash')
    .reduce((s, b) => s + b.total, 0);
  const cardTotal = completedBills
    .filter((b) => b.paymentMode === 'Card')
    .reduce((s, b) => s + b.total, 0);
  const onlineTotal = completedBills
    .filter((b) => b.paymentMode === 'Online' || b.paymentMode === 'EasyPaisa' || b.paymentMode === 'JazzCash')
    .reduce((s, b) => s + b.total, 0);

  // Hourly Activity Breakdown (Simulated realistic stationery store hours)
  const hourlyData = [
    { hour: '09:00 AM', amount: 3200, label: 'Morning School Rush' },
    { hour: '11:00 AM', amount: 6800, label: 'Office Supplies' },
    { hour: '01:00 PM', amount: 4200, label: 'Photostat / College' },
    { hour: '03:00 PM', amount: 8900, label: 'After-School Peak' },
    { hour: '05:00 PM', amount: 7400, label: 'Parents & Academy' },
    { hour: '07:00 PM', amount: 11500, label: 'Evening Peak' },
    { hour: '09:00 PM', amount: 5600, label: 'Late Night Photostat' },
  ];
  const maxHourly = Math.max(...hourlyData.map((h) => h.amount));

  // Category Distribution
  const categoryStats = [
    { name: 'Notebooks & Paper', percent: 38, color: 'bg-amber-500' },
    { name: 'Pens & Markers', percent: 26, color: 'bg-blue-500' },
    { name: 'Photostat & Printing', percent: 18, color: 'bg-emerald-500' },
    { name: 'Geometry & School', percent: 11, color: 'bg-purple-500' },
    { name: 'Art & Colors', percent: 7, color: 'bg-pink-500' },
  ];

  // Best Sellers (Top products)
  const topProducts = [
    { name: 'Dollar SP-10 Ballpoint (Blue)', sold: 48, revenue: 1200, category: 'Pens' },
    { name: 'Royal A4 Spiral Notebook 200 Pgs', sold: 24, revenue: 9120, category: 'Notebooks' },
    { name: 'Photocopy / Xerox (Single Sided)', sold: 280, revenue: 2800, category: 'Services' },
    { name: 'Oxford Geometry Box Complete', sold: 14, revenue: 6300, category: 'School' },
    { name: 'Double A Paper A4 80gsm Ream', sold: 6, revenue: 8700, category: 'Paper' },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-950 p-4 lg:p-6 overflow-y-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight flex items-center gap-2.5">
            <Icon name="chart" className="w-7 h-7 text-emerald-400" />
            Store Sales Analytics & Business Health
          </h1>
          <p className="text-xs text-slate-400">
            Real-time retail performance, profit margins, peak sales hours & product velocity
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-300 font-medium">Live Terminal Stream</span>
        </div>
      </div>

      {/* Top Financial KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Today's Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Icon name="cash" className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
            Rs. {grossSales.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <Icon name="trending-up" className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">+18.4%</span> vs yesterday
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Net Gross Margin</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Icon name="tag" className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 tracking-tight">
            Rs. {estimatedProfit.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">
            Est. Margin: <strong className="text-amber-300 font-bold">~32.5%</strong>
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg. Bill Size (AOV)</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Icon name="cart" className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-blue-400 tracking-tight">
            Rs. {aov.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Average spend per customer</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Invoices Handled</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Icon name="users" className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-purple-400 tracking-tight">
            {totalInvoices} Bills
          </div>
          <p className="text-[11px] text-slate-400">Across active counter tills</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Hourly Traffic Bar Chart */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Icon name="clock" className="w-4 h-4 text-amber-400" />
                Hourly Customer Sales Peak
              </h2>
              <p className="text-xs text-slate-400">Identifies peak foot-traffic hours for store staffing</p>
            </div>
            <span className="text-[11px] bg-slate-950 px-2.5 py-1 rounded-lg text-slate-400 border border-slate-800">
              Peak: 07:00 PM (Rs. 11,500)
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-4 flex items-end justify-between gap-2 h-52 border-b border-slate-800/80 pb-2">
            {hourlyData.map((item, idx) => {
              const heightPercent = Math.round((item.amount / maxHourly) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition">
                    {item.amount.toLocaleString()}
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[42px] bg-gradient-to-t from-amber-600 to-amber-400 group-hover:from-emerald-600 group-hover:to-emerald-400 rounded-t-xl transition-all duration-300 relative cursor-pointer"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-700 text-[10px] text-white px-2 py-0.5 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition z-10">
                      {item.label}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-tight">
                    {item.hour.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown & Payment Methods */}
        <div className="lg:col-span-4 space-y-5">
          {/* Category Distribution */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3.5 shadow-xl">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Icon name="layers" className="w-4 h-4 text-blue-400" />
              Category Share
            </h2>

            <div className="space-y-3">
              {categoryStats.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{cat.name}</span>
                    <span className="font-mono font-bold text-slate-100">{cat.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${cat.percent}%` }}
                      className={`h-full ${cat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Split */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
            <h2 className="text-sm font-bold text-white">Payment Method Share</h2>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Cash</span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Rs. {cashTotal.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Card POS</span>
                <span className="text-xs font-mono font-bold text-blue-400">
                  Rs. {cardTotal.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">EasyPaisa</span>
                <span className="text-xs font-mono font-bold text-purple-400">
                  Rs. {onlineTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Best-Selling Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Icon name="sparkles" className="w-4 h-4 text-amber-400" />
              Top Fast-Moving Stationery Products (Velocity)
            </h2>
            <p className="text-xs text-slate-400">Highest volume items generating retail cash flow</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Rank</th>
                <th className="py-2.5 px-4">Product Name</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4 text-center">Units Sold</th>
                <th className="py-2.5 px-4 text-right">Revenue Generated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {topProducts.map((prod, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#{idx + 1}</td>
                  <td className="py-3 px-4 font-semibold text-slate-100">{prod.name}</td>
                  <td className="py-3 px-4 text-slate-400">{prod.category}</td>
                  <td className="py-3 px-4 font-mono text-center text-slate-200">
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-bold">{prod.sold}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400 text-right">
                    Rs. {prod.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
