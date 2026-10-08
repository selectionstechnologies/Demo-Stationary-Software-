import React, { useRef, useEffect } from 'react';
import { Icon } from '../Icons';

export const PosTopNav = ({
  searchQuery,
  setSearchQuery,
  onOpenQuickService,
  isBrightView,
  onToggleBrightView,
  onOpenSettings,
  onOpenAddInventory,
  user,
}) => {
  const searchInputRef = useRef(null);

  return (
    <header className="h-14 bg-[#0B1120] border-b border-slate-800/80 px-3 sm:px-4 flex items-center justify-between gap-3 shrink-0 select-none z-30">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 shrink-0">
          <Icon name="crown" className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <h1 className="font-extrabold tracking-tight font-display text-xs sm:text-sm text-white leading-tight truncate">
            ROYAL STATIONERS
          </h1>
          <p className="text-[10px] text-slate-400 font-sans truncate hidden sm:block">
            {user?.counter?.split('—')[0]?.trim() || 'Counter 01'} • {user?.name || 'Ali Raza'}
          </p>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-lg min-w-0 relative flex items-center">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Icon name="search" className="w-3.5 h-3.5" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Stationery — pen, notebook, paper, file..."
          className="w-full bg-[#0F172A] border border-slate-700/80 focus:border-amber-500/80 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-100 placeholder-slate-400 outline-none transition shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <Icon name="x" className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Right Controls: Add Stock, Photostat, Bright View, Online Badge, Settings */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Add Inventory Button */}
        {onOpenAddInventory && (
          <button
            onClick={onOpenAddInventory}
            className="px-2.5 sm:px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Add New Inventory / Stock"
          >
            <Icon name="plus" className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Add Stock</span>
          </button>
        )}

        {/* Photostat Service Button */}
        <button
          onClick={onOpenQuickService}
          className="px-2.5 sm:px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-blue-400 hover:text-blue-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          title="Custom Photostat / Print Job"
        >
          <Icon name="printer" className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="hidden sm:inline">Photostat</span>
        </button>

        {/* Bright View Toggle */}
        <button
          onClick={onToggleBrightView}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
            isBrightView
              ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 text-amber-400 hover:text-amber-300'
          }`}
          title={isBrightView ? 'Switch to Dark Night View' : 'Switch to Bright Daytime View'}
        >
          <Icon name={isBrightView ? 'moon' : 'sun'} className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="hidden md:inline">{isBrightView ? 'Dark View' : 'Bright View'}</span>
        </button>

        {/* POS Online Status Pill */}
        <div className="px-2.5 py-1.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-xs font-semibold text-emerald-400 hidden lg:inline">POS Online</span>
        </div>

        {/* Settings Gear */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 sm:p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white rounded-xl transition cursor-pointer shrink-0"
          title="Store Settings & Configuration"
        >
          <Icon name="gear" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </header>
  );
};
