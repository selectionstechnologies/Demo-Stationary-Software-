import React from 'react';
import { Icon } from '../Icons';

export const KpiBanner = ({
  totalItemsCount = 152,
  todaySales = 12480,
  totalBillsCount = 28,
  averageBillValue = 445,
}) => {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-3 pt-2 pb-0.5 shrink-0">
      {/* 1. Total Items (Emerald) */}
      <div className="bg-[#0F172A]/95 hover:bg-[#1E293B]/90 border border-slate-800/90 rounded-xl p-2 sm:p-2.5 flex items-center justify-between transition group shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20 shrink-0">
            <Icon name="cart" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-none">Total Items</div>
            <div className="text-xs sm:text-sm font-extrabold font-mono text-white mt-0.5 leading-tight">
              {totalItemsCount}
            </div>
            <div className="text-[8px] sm:text-[9px] text-emerald-400 font-semibold mt-0.5 leading-none">In Stock</div>
          </div>
        </div>
        <Icon name="chevron-right" className="w-3 h-3 text-slate-600 group-hover:text-slate-400 transition shrink-0 hidden sm:block" />
      </div>

      {/* 2. Today's Sales (Royal Blue) */}
      <div className="bg-[#0F172A]/95 hover:bg-[#1E293B]/90 border border-slate-800/90 rounded-xl p-2 sm:p-2.5 flex items-center justify-between transition group shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20 shrink-0">
            <Icon name="cash" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-none">Today's Sales</div>
            <div className="text-xs sm:text-sm font-extrabold font-mono text-white mt-0.5 leading-tight">
              Rs. {todaySales.toLocaleString()}
            </div>
            <div className="text-[8px] sm:text-[9px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5 leading-none">
              <span>↑ 18%</span>
              <span className="text-slate-400 text-[8px] hidden sm:inline">vs yest.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Total Bills (Purple) */}
      <div className="bg-[#0F172A]/95 hover:bg-[#1E293B]/90 border border-slate-800/90 rounded-xl p-2 sm:p-2.5 flex items-center justify-between transition group shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-purple-600/20 shrink-0">
            <Icon name="receipt" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-none">Total Bills</div>
            <div className="text-xs sm:text-sm font-extrabold font-mono text-white mt-0.5 leading-tight">
              {totalBillsCount}
            </div>
            <div className="text-[8px] sm:text-[9px] text-slate-400 font-medium mt-0.5 leading-none">Today</div>
          </div>
        </div>
        <Icon name="chevron-right" className="w-3 h-3 text-slate-600 group-hover:text-slate-400 transition shrink-0 hidden sm:block" />
      </div>

      {/* 4. Average Bill Value (Orange/Amber) */}
      <div className="bg-[#0F172A]/95 hover:bg-[#1E293B]/90 border border-slate-800/90 rounded-xl p-2 sm:p-2.5 flex items-center justify-between transition group shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 shrink-0">
            <Icon name="user" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-none">Avg. Bill Value</div>
            <div className="text-xs sm:text-sm font-extrabold font-mono text-white mt-0.5 leading-tight">
              Rs. {averageBillValue.toLocaleString()}
            </div>
            <div className="text-[8px] sm:text-[9px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5 leading-none">
              <span>↑ 12%</span>
              <span className="text-slate-400 text-[8px] hidden sm:inline">vs yest.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
