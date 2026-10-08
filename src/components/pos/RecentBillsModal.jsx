import React, { useState } from 'react';
import { Icon } from '../Icons';

export const RecentBillsModal = ({
  isOpen,
  bills,
  onClose,
  onReprintBill,
  onRefundBill,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filteredBills = bills.filter(
    (b) =>
      b.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.customer?.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Icon name="history" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Today's Invoices & Sales</h3>
              <p className="text-xs text-slate-400">
                Total {bills.length} sales processed in current shift
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

        {/* Filter input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon name="search" className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search by Bill # or customer name..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
          />
        </div>

        {/* Bills List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredBills.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-1">
              <p className="text-sm">No bills matching query.</p>
            </div>
          ) : (
            filteredBills.map((bill) => (
              <div
                key={bill.id}
                className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-2xl flex items-center justify-between gap-3 hover:border-slate-700 transition"
              >
                {/* Left Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-amber-400">
                      {bill.id}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      {bill.time}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        bill.status === 'Refunded'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {bill.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {bill.customer}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Mode: <strong className="text-slate-300">{bill.paymentMethod}</strong> •{' '}
                    {bill.items?.length || bill.itemsCount} items
                  </div>
                </div>

                {/* Right Amount & Actions */}
                <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
                  <div className="text-sm font-black font-mono text-emerald-400">
                    Rs. {bill.total.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onReprintBill(bill)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold rounded-lg border border-slate-700 flex items-center gap-1 transition"
                      title="Re-print Thermal Receipt"
                    >
                      <Icon name="printer" className="w-3 h-3 text-amber-400" />
                      <span>Print</span>
                    </button>

                    {bill.status !== 'Refunded' && (
                      <button
                        onClick={() => onRefundBill(bill)}
                        className="px-2 py-1 bg-red-950/40 hover:bg-red-900/40 text-red-400 text-[11px] font-semibold rounded-lg border border-red-500/30 transition"
                        title="Void / Refund Sale"
                      >
                        Refund
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Counter 01 Station Journal</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
