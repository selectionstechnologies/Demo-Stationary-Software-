import React from 'react';
import { Icon } from '../Icons';

export const ThermalReceiptModal = ({
  isOpen,
  orderData,
  onClose,
  onNewSale,
}) => {
  if (!isOpen || !orderData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 my-auto">
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Icon name="check" className="w-5 h-5" />
            <span className="font-bold text-sm">Sale Completed Successfully</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        {/* 80mm Authentic Thermal Receipt Preview Card */}
        <div
          id="thermal-receipt"
          className="bg-white text-slate-950 p-6 rounded-xl font-mono text-[11px] leading-relaxed shadow-lg border border-slate-200 select-text"
        >
          {/* Header */}
          <div className="text-center space-y-0.5 border-b border-dashed border-slate-400 pb-3">
            <h2 className="text-base font-extrabold uppercase tracking-tight">
              ROYAL STATIONERS
            </h2>
            <p className="text-[10px] text-slate-600 uppercase">
              Books • Stationery • Photostat
            </p>
            <p className="text-[9px] text-slate-500">
              Shop #12, Commercial Plaza, Main Market
            </p>
            <p className="text-[9px] text-slate-500">
              Tel: 051-2358941 | NTN: 9481920-4
            </p>
          </div>

          {/* Invoice Meta */}
          <div className="py-2.5 border-b border-dashed border-slate-400 space-y-0.5 text-[10px]">
            <div className="flex justify-between">
              <span>Bill No: <strong>{orderData.id}</strong></span>
              <span>{orderData.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Date: {new Date().toLocaleDateString()}</span>
              <span>Till: Counter 01</span>
            </div>
            <div className="flex justify-between">
              <span>Cashier: {orderData.cashier || 'Ali Raza'}</span>
              <span>Mode: {orderData.paymentMode}</span>
            </div>
            <div className="truncate text-slate-700">
              Customer: {orderData.customer?.name || 'Walk-in Retail Customer'}
            </div>
          </div>

          {/* Items Table */}
          <div className="py-2 border-b border-dashed border-slate-400">
            <div className="flex justify-between font-bold text-[10px] border-b border-slate-300 pb-1 mb-1">
              <span className="w-1/2">Item Description</span>
              <span className="w-1/6 text-center">Qty</span>
              <span className="w-1/3 text-right">Amount</span>
            </div>
            <div className="space-y-1.5">
              {orderData.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <div className="w-1/2 pr-1 truncate font-medium">{item.name}</div>
                  <div className="w-1/6 text-center">{item.qty}</div>
                  <div className="w-1/3 text-right">
                    {(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="py-2.5 border-b border-dashed border-slate-400 space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rs. {orderData.subtotal?.toLocaleString()}</span>
            </div>
            {orderData.discountAmount > 0 && (
              <div className="flex justify-between text-slate-700">
                <span>Discount:</span>
                <span>-Rs. {orderData.discountAmount?.toLocaleString()}</span>
              </div>
            )}
            {orderData.taxAmount > 0 && (
              <div className="flex justify-between">
                <span>GST (5%):</span>
                <span>Rs. {Math.round(orderData.taxAmount).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-extrabold text-sm pt-1 border-t border-slate-300 text-slate-950">
              <span>NET PAYABLE:</span>
              <span>Rs. {orderData.total?.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment breakdown */}
          <div className="py-2 border-b border-dashed border-slate-400 space-y-0.5 text-[10px]">
            <div className="flex justify-between">
              <span>Cash Tendered:</span>
              <span>Rs. {orderData.cashTendered?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Change Returned:</span>
              <span>Rs. {orderData.changeDue?.toLocaleString()}</span>
            </div>
          </div>

          {/* Barcode & Footer notes */}
          <div className="pt-3 text-center space-y-2">
            <div className="inline-block tracking-[0.25em] text-[10px] font-bold text-slate-700">
              ||||| | |||| |||||| || | |||| |||||
            </div>
            <p className="text-[9px] text-slate-600">
              Exchange accepted within 3 days with this bill.
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider">
              Thank You For Your Visit!
            </p>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
          >
            <Icon name="printer" className="w-4 h-4 text-amber-400" />
            <span>Print Receipt</span>
          </button>

          <button
            type="button"
            onClick={onNewSale}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <span>Next Sale</span>
            <span className="text-[10px] bg-slate-950/20 px-1 py-0.5 rounded font-mono">↵</span>
          </button>
        </div>
      </div>
    </div>
  );
};
