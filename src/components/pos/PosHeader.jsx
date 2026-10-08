import React, { useState, useEffect } from 'react';
import { Icon } from '../Icons';

export const PosHeader = ({
  user,
  drawerCash,
  heldBillsCount,
  onOpenHeldBills,
  onOpenRecentBills,
  onOpenShiftClose,
  onLogout,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 select-none shadow-md z-20">
      {/* Brand & Terminal Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
          <Icon name="crown" className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight font-display text-base text-white">
              ROYAL STATIONERS
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
              COUNTER POS
            </span>
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-2">
            <span>{user?.counter || 'Counter 01'}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Online
            </span>
          </p>
        </div>
      </div>

      {/* Center Shortcuts Bar */}
      <div className="hidden lg:flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
        <span className="text-slate-400 text-[11px] font-semibold tracking-wider uppercase">Hotkeys:</span>
        <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 font-mono text-[11px]">
          <kbd className="text-amber-400 font-bold">F2</kbd> Search
        </span>
        <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 font-mono text-[11px]">
          <kbd className="text-amber-400 font-bold">F4</kbd> Hold Bill
        </span>
        <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 font-mono text-[11px]">
          <kbd className="text-amber-400 font-bold">F8</kbd> Photostat
        </span>
        <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 font-mono text-[11px]">
          <kbd className="text-emerald-400 font-bold">F12</kbd> Pay
        </span>
      </div>

      {/* Right Controls: Cash, Shifts, Actions */}
      <div className="flex items-center gap-2.5">
        {/* Drawer Cash Pill */}
        <div className="hidden sm:flex flex-col items-end bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Drawer Balance</span>
          <span className="text-sm font-mono font-bold text-emerald-400">
            Rs. {drawerCash.toLocaleString()}
          </span>
        </div>

        {/* Live Clock */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/60 px-2.5 py-1.5 rounded-xl text-xs font-mono text-slate-300">
          <Icon name="clock" className="w-3.5 h-3.5 text-amber-400" />
          <span>{currentTime}</span>
        </div>

        {/* Held Bills Button */}
        <button
          onClick={onOpenHeldBills}
          className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
            heldBillsCount > 0
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
          title="Recall Held Bills"
        >
          <Icon name="pause" className="w-3.5 h-3.5" />
          <span>Held Bills</span>
          {heldBillsCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 bg-amber-500 text-slate-950 rounded-full font-bold text-[10px]">
              {heldBillsCount}
            </span>
          )}
        </button>

        {/* Invoices History */}
        <button
          onClick={onOpenRecentBills}
          className="px-3 py-1.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          title="Today's Completed Bills"
        >
          <Icon name="history" className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Bills History</span>
        </button>

        {/* Shift Close / Reconcile */}
        <button
          onClick={onOpenShiftClose}
          className="px-3 py-1.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          title="Shift Closeout & Reconcile"
        >
          <Icon name="calculator" className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Close Shift</span>
        </button>

        {/* User Pill / Logout */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-xs">
            AR
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-xl transition cursor-pointer"
            title="Sign Out / Lock Terminal"
          >
            <Icon name="logout" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
