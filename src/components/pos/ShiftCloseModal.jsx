import React, { useState } from 'react';
import { Icon } from '../Icons';

export const ShiftCloseModal = ({
  isOpen,
  user,
  openingCash,
  cashSales,
  cardSales,
  totalInvoices,
  onClose,
  onEndShift,
}) => {
  const [countedCash, setCountedCash] = useState(openingCash + cashSales);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const expectedCash = openingCash + cashSales;
  const variance = (Number(countedCash) || 0) - expectedCash;

  const handleFinish = () => {
    alert(`Shift reconciled successfully! Total Drawer Balance: Rs. ${Number(countedCash).toLocaleString()}`);
    onEndShift();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Icon name="calculator" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Till Reconcile & Shift Closeout</h3>
              <p className="text-xs text-slate-400">{user?.counter} • Cashier: {user?.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        {/* Financial Overview Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-0.5">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Opening Float</span>
            <div className="text-sm font-bold font-mono text-slate-200">
              Rs. {openingCash.toLocaleString()}
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-0.5">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Total Cash Sales</span>
            <div className="text-sm font-bold font-mono text-emerald-400">
              +Rs. {cashSales.toLocaleString()}
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-0.5">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Digital / Card Sales</span>
            <div className="text-sm font-bold font-mono text-blue-400">
              Rs. {cardSales.toLocaleString()}
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-0.5">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Total Invoices</span>
            <div className="text-sm font-bold font-mono text-amber-400">
              {totalInvoices} Bills
            </div>
          </div>
        </div>

        {/* Expected Cash in Hand */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Expected Cash in Drawer:</span>
            <span className="text-xl font-extrabold font-mono text-white">
              Rs. {expectedCash.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase block">Shift Duration</span>
            <span className="text-xs font-mono text-slate-300">4 hrs 12 mins</span>
          </div>
        </div>

        {/* Cashier Actual Count Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Physical Cash Counted in Till:</span>
            <span
              className={`text-[11px] font-mono font-bold ${
                variance === 0
                  ? 'text-emerald-400'
                  : variance > 0
                  ? 'text-blue-400'
                  : 'text-red-400'
              }`}
            >
              {variance === 0 ? '✓ Balanced' : variance > 0 ? `+Rs. ${variance} Excess` : `-Rs. ${Math.abs(variance)} Short`}
            </span>
          </label>
          <input
            type="number"
            value={countedCash}
            onChange={(e) => setCountedCash(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold text-amber-400 outline-none focus:border-amber-500"
          />
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Handover Notes / Discrepancy:</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. All cash deposited in main safe, float Rs. 5000 left for night shift."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none placeholder-slate-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleFinish}
            className="flex-2 py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl text-xs transition shadow-lg shadow-red-600/20"
          >
            End Shift & Lock Register
          </button>
        </div>
      </div>
    </div>
  );
};
