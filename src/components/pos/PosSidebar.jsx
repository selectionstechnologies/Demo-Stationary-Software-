import React from 'react';
import { Icon } from '../Icons';

export const PosSidebar = ({
  activeTab,
  onSelectTab,
  user,
  onOpenSettings,
  onOpenAddInventory,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart' },
    { id: 'pos', label: 'POS Counter', icon: 'cart', badge: 'Sale' },
    { id: 'products', label: 'All Products', icon: 'layers' },
    { id: 'inventory', label: 'Inventory & Stock', icon: 'package' },
    { id: 'services', label: 'Photostat & Print', icon: 'printer' },
    { id: 'khata', label: 'Customer Khata', icon: 'notebook' },
    { id: 'sales', label: 'Sales & Invoices', icon: 'receipt' },
    { id: 'settings', label: 'Store Settings', icon: 'gear' },
  ];

  return (
    <aside className="w-14 sm:w-48 lg:w-52 xl:w-56 bg-[#0B1120] border-r border-slate-800/90 flex flex-col justify-between shrink-0 select-none h-full z-20 py-2 transition-all duration-200">
      {/* Top: Navigation Items */}
      <nav className="px-1.5 sm:px-2 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer text-left ${
                isActive
                  ? 'bg-amber-500/15 border border-amber-500/50 text-amber-400 shadow-sm shadow-amber-500/10 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
              title={item.label}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                  <Icon name={item.icon} className="w-4 h-4" />
                </span>
                <span className="truncate hidden sm:inline">{item.label}</span>
              </div>
              {item.badge && (
                <span className="hidden sm:inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Add Inventory Button in Sidebar */}
        {onOpenAddInventory && (
          <div className="pt-1 hidden sm:block">
            <button
              type="button"
              onClick={onOpenAddInventory}
              className="w-full py-1.5 px-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Icon name="plus" className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Inventory</span>
            </button>
          </div>
        )}
      </nav>

      {/* Bottom Area: Emblem & User Pill (Compact & fully visible) */}
      <div className="px-1.5 sm:px-2 pt-1.5 border-t border-slate-800/70 space-y-1.5 shrink-0">
        {/* Subtle Brand Emblem (Compact) */}
        <div className="text-center py-1.5 px-1 sm:px-2 bg-slate-950/60 rounded-xl border border-slate-800/50 hidden sm:block">
          <div className="inline-flex items-center justify-center text-amber-400/80 mb-0.5">
            <Icon name="crown" className="w-3.5 h-3.5" />
          </div>
          <div className="text-[11px] font-display font-bold text-amber-300/90 leading-tight">
            Royal Stationers
          </div>
          <p className="text-[9px] text-slate-500 font-sans tracking-wide mt-0.5">
            Quality • Stationery
          </p>
        </div>

        {/* User Profile Pill */}
        <div
          onClick={onOpenSettings}
          className="p-1.5 sm:p-2 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 rounded-xl flex items-center justify-center sm:justify-between cursor-pointer transition"
          title={`User: ${user?.name || 'Ali Raza'} (${user?.counter?.split('—')[0]?.trim() || 'Counter 01'})`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
              <Icon name="user" className="w-3 h-3" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <div className="text-xs font-bold text-white truncate leading-tight">
                {user?.name || 'Ali Raza'}
              </div>
              <div className="text-[10px] text-slate-400 truncate leading-none mt-0.5">
                {user?.counter?.split('—')[0]?.trim() || 'Counter 01'}
              </div>
            </div>
          </div>
          <Icon name="chevron-right" className="w-3 h-3 text-slate-500 shrink-0 hidden sm:block" />
        </div>
      </div>
    </aside>
  );
};
