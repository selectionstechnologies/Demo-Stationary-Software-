import React, { useState } from 'react';
import { Icon } from '../Icons';

export const SalesInvoicesView = ({
  recentBills = [],
  onReprintBill,
  onRefundBill,
  onNavigatePOS,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Completed' | 'Refunded'

  const filteredBills = recentBills.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.customer?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.customer?.phone || '').includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalSalesPKR = recentBills
    .filter((b) => b.status === 'Completed')
    .reduce((s, b) => s + (b.total || 0), 0);

  const completedCount = recentBills.filter((b) => b.status === 'Completed').length;
  const refundedCount = recentBills.filter((b) => b.status === 'Refunded').length;

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#080E1A] overflow-y-auto no-scrollbar select-none p-3.5 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 sm:p-4 shadow-sm">
        <div>
          <h1 className="text-base sm:text-lg font-black font-display text-white tracking-tight flex items-center gap-2">
            <Icon name="receipt" className="w-5 h-5 text-purple-400" />
            Counter Sales Invoices & Billing Register
          </h1>
          <p className="text-xs text-slate-400">
            Audit completed transactions, reprint receipts & process refunds
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigatePOS}
          className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-md shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Icon name="cart" className="w-3.5 h-3.5" />
          <span>New Sale (POS)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Register Sales</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
            Rs. {totalSalesPKR.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-500">{completedCount} finalized invoices</p>
        </div>

        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Invoices</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-white">
            {completedCount}
          </div>
          <p className="text-[10px] text-emerald-400 font-semibold">Active shift balance</p>
        </div>

        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Void / Refunds</span>
          <div className="text-xl sm:text-2xl font-black font-mono text-rose-400">
            {refundedCount}
          </div>
          <p className="text-[10px] text-slate-500">Items restored to inventory</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3">
        <div className="relative flex-1 max-w-md">
          <Icon name="search" className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice # (e.g. RS-), customer name or phone..."
            className="w-full bg-[#080E1A] border border-slate-700/80 focus:border-purple-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['all', 'Completed', 'Refunded'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                statusFilter === status
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-[#080E1A] border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {status === 'all' ? 'All Invoices' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl overflow-hidden shadow-sm">
        {filteredBills.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-1">
            <Icon name="receipt" className="w-8 h-8 mx-auto stroke-1" />
            <p className="text-sm font-bold text-slate-300">No invoices found</p>
            <p className="text-xs text-slate-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3">Invoice #</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Customer Account</th>
                  <th className="py-2.5 px-3">Items Count</th>
                  <th className="py-2.5 px-3">Payment Mode</th>
                  <th className="py-2.5 px-3 text-right">Grand Total</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredBills.map((bill) => {
                  const isRefunded = bill.status === 'Refunded';

                  return (
                    <tr key={bill.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                        #{bill.id}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">
                        {bill.time}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">
                          {bill.customer?.name || 'Walk-In Customer'}
                        </div>
                        {bill.customer?.phone && (
                          <div className="text-[10px] font-mono text-slate-400">
                            {bill.customer.phone}
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 font-mono">
                        {bill.items?.length || 0} line items
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                          {bill.paymentMode || 'Cash'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-black text-emerald-400 text-sm">
                        Rs. {(bill.total || 0).toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            isRefunded
                              ? 'bg-rose-950/50 text-rose-400 border border-rose-500/30'
                              : 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {bill.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onReprintBill && onReprintBill(bill)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white rounded-lg transition"
                            title="Reprint Thermal Receipt"
                          >
                            <Icon name="printer" className="w-3.5 h-3.5" />
                          </button>
                          {!isRefunded && onRefundBill && (
                            <button
                              type="button"
                              onClick={() => onRefundBill(bill)}
                              className="p-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 rounded-lg transition"
                              title="Void and Refund Bill"
                            >
                              <Icon name="trash" className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
