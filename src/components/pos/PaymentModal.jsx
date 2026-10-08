import React, { useState } from 'react';
import { Icon } from '../Icons';

export const PaymentModal = ({ isOpen, billSummary, customer, onClose, onCompletePayment }) => {
  const [paymentMode, setPaymentMode] = useState('Cash'); // 'Cash' | 'Card' | 'Online'
  const [cashTendered, setCashTendered] = useState(billSummary?.grandTotal || 0);
  const [txnRef, setTxnRef] = useState('');

  if (!isOpen || !billSummary) return null;

  const grandTotal = billSummary.grandTotal;
  const changeDue = Math.max(0, (Number(cashTendered) || 0) - grandTotal);
  const remainingDue = Math.max(0, grandTotal - (Number(cashTendered) || 0));

  const quickAmounts = [
    grandTotal,
    Math.ceil(grandTotal / 500) * 500 || 500,
    1000,
    2000,
    5000,
  ].filter((v, idx, arr) => arr.indexOf(v) === idx && v >= grandTotal);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMode === 'Cash' && Number(cashTendered) < grandTotal) {
      alert('Cash tendered is less than the grand total!');
      return;
    }

    onCompletePayment({
      paymentMode,
      total: grandTotal,
      cashTendered: paymentMode === 'Cash' ? Number(cashTendered) : grandTotal,
      changeDue: paymentMode === 'Cash' ? changeDue : 0,
      txnRef: paymentMode !== 'Cash' ? txnRef : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold font-display text-white">Payment Checkout</h2>
            <p className="text-xs text-slate-400">Customer: {customer?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Grand Total Display */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Payable Amount
          </span>
          <div className="text-3xl font-black font-mono text-emerald-400 tracking-tight">
            Rs. {grandTotal.toLocaleString()}
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setPaymentMode('Cash');
              setCashTendered(grandTotal);
            }}
            className={`py-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
              paymentMode === 'Cash'
                ? 'bg-amber-500/10 border-amber-500 text-amber-400 ring-2 ring-amber-500/30'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Icon name="cash" className="w-5 h-5" />
            <span className="text-xs font-bold">Cash</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMode('Card')}
            className={`py-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
              paymentMode === 'Card'
                ? 'bg-blue-500/10 border-blue-500 text-blue-400 ring-2 ring-blue-500/30'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Icon name="card" className="w-5 h-5" />
            <span className="text-xs font-bold">Card / POS</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMode('Online')}
            className={`py-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
              paymentMode === 'Online'
                ? 'bg-purple-500/10 border-purple-500 text-purple-400 ring-2 ring-purple-500/30'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Icon name="mobile" className="w-5 h-5" />
            <span className="text-xs font-bold">JazzCash / EP</span>
          </button>
        </div>

        {/* Mode Specific Inputs */}
        {paymentMode === 'Cash' ? (
          <div className="space-y-4">
            {/* Quick Cash Buttons */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-2">
                Quick Tendered Amount:
              </label>
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCashTendered(amt)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition cursor-pointer ${
                      Number(cashTendered) === amt
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    Rs. {amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Cash Input */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Cash Received from Customer:</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  Rs.
                </span>
                <input
                  type="number"
                  min="0"
                  required
                  value={cashTendered}
                  onChange={(e) => setCashTendered(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-lg font-mono font-bold text-emerald-400 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Change Due Highlight Box */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                remainingDue > 0
                  ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
              }`}
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider block">
                  {remainingDue > 0 ? 'Remaining Due Amount' : 'Change to Return Customer'}
                </span>
                <span className="text-2xl font-black font-mono">
                  Rs. {(remainingDue > 0 ? remainingDue : changeDue).toLocaleString()}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-950/60 flex items-center justify-center font-bold">
                {remainingDue > 0 ? '⚠️' : '💵'}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <label className="text-xs font-medium text-slate-300 block">
              {paymentMode === 'Card' ? 'Card Transaction / Approval Slip #' : 'JazzCash / EasyPaisa TID:'}
            </label>
            <input
              type="text"
              value={txnRef}
              onChange={(e) => setTxnRef(e.target.value)}
              placeholder="e.g. TID-948102948"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Icon name="check" className="w-3.5 h-3.5 text-emerald-400" />
              Verified via digital terminal
            </p>
          </div>
        )}

        {/* Action Buttons */}
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
            onClick={handleSubmit}
            className="flex-2 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="printer" className="w-4 h-4" />
            <span>Complete Sale & Print Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
