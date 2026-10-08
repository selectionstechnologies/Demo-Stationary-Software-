import React from 'react';
import { Icon } from '../Icons';

export const HeldBillsModal = ({
  isOpen,
  heldBills,
  onClose,
  onResumeBill,
  onDiscardBill,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Icon name="pause" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Parked / Held Bills</h3>
              <p className="text-xs text-slate-400">
                {heldBills.length} bills currently placed on hold
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {heldBills.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-1">
              <p className="text-sm font-medium">No held bills right now.</p>
              <p className="text-xs text-slate-600">
                Click "Hold (F4)" while building a bill to park it.
              </p>
            </div>
          ) : (
            heldBills.map((held) => (
              <div
                key={held.id}
                className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-amber-400">
                      {held.heldId}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {held.time}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 truncate">
                    {held.customer?.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {held.items.length} items • Subtotal:{' '}
                    <strong className="text-slate-300 font-mono">
                      Rs. {held.items.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onDiscardBill(held.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition"
                    title="Discard Held Bill"
                  >
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onResumeBill(held)}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                  >
                    <Icon name="play" className="w-3.5 h-3.5" />
                    <span>Resume Bill</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
