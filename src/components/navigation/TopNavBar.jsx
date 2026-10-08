import React, { useState, useEffect } from 'react';
import { Icon } from '../Icons';

export const TopNavBar = ({
  activeTab,
  setActiveTab,
  drawerCash,
  heldBillsCount,
  recentBillsCount,
  onOpenHeldBills,
  onOpenRecentBills,
  onOpenShiftClose,
  onLogout,
  user,
  isBrightView,
  onToggleBrightView,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'pos', label: 'Counter POS', icon: 'cart', badge: heldBillsCount > 0 ? heldBillsCount : null },
    { id: 'inventory', label: 'Inventory', icon: 'package' },
    { id: 'analytics', label: 'Analytics', icon: 'chart' },
    { id: 'khata', label: 'Customer Khata', icon: 'users' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <header className="h-14 sm:h-15 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/90 px-3 sm:px-4 flex items-center justify-between shrink-0 select-none shadow-md z-30 gap-2">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 shrink-0">
          <Icon name="crown" className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight font-display text-sm text-white">
              ROYAL STATIONERS
            </span>
            <span className="text-[9px] bg-amber-500/15 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-500/30">
              POS
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-none mt-0.5">
            {user?.counter?.split('—')[0]?.trim() || 'Counter 01'} • {user?.name || 'Manager'}
          </p>
        </div>
      </div>

      {/* Center Navigation Tabs (Compact & Responsive) */}
      <nav className="flex items-center gap-1 bg-slate-950/90 border border-slate-800/90 p-1 rounded-xl overflow-x-auto no-scrollbar max-w-full">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon name={item.icon} className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black bg-slate-950 text-amber-400">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Invoices, Drawer Cash, Shift, Clock, Logout */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Invoices History Button (Integrated right in the header, NO OVERLAPPING!) */}
        <button
          onClick={onOpenRecentBills}
          className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          title="Today's Completed Invoices"
        >
          <Icon name="history" className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden xl:inline">Invoices</span>
          <span className="px-1.5 py-0.2 rounded-md bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold">
            {recentBillsCount}
          </span>
        </button>

        {/* Bright View / Daylight Toggle Button */}
        <button
          onClick={onToggleBrightView}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
            isBrightView
              ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-sm'
              : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-amber-400 hover:text-amber-300'
          }`}
          title={isBrightView ? 'Switch to Dark Night View' : 'Switch to Bright Daytime View'}
        >
          <Icon name={isBrightView ? 'moon' : 'sun'} className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isBrightView ? 'Dark View' : 'Bright View'}</span>
        </button>

        {/* Drawer Cash Pill */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Cash:</span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            Rs. {drawerCash.toLocaleString()}
          </span>
        </div>

        {/* Live Clock */}
        <div className="hidden 2xl:flex items-center gap-1 bg-slate-800/50 border border-slate-700/50 px-2 py-1 rounded-lg text-xs font-mono text-slate-300">
          <Icon name="clock" className="w-3 h-3 text-amber-400" />
          <span>{currentTime}</span>
        </div>

        {/* Shift Close */}
        <button
          onClick={onOpenShiftClose}
          className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
          title="Shift Reconcile & Day End"
        >
          <Icon name="calculator" className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Shift</span>
        </button>

        {/* Sign Out */}
        <button
          onClick={onLogout}
          className="p-1.5 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-lg transition cursor-pointer"
          title="Lock / Sign Out"
        >
          <Icon name="logout" className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
