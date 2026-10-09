import React, { useState } from 'react';
import { Icon } from '../Icons';
import { ProductVisual } from './ProductVisual';

export const ActiveCart = ({
  cart,
  customers,
  selectedCustomer,
  onSelectCustomer,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onHoldBill,
  onCheckout,
  discount,
  setDiscount,
  discountType,
  setDiscountType,
  taxEnabled,
  setTaxEnabled,
  isMobileView = false,
  onCloseMobile = null,
}) => {
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  let discountAmount = 0;
  if (discountType === 'percent') {
    discountAmount = (subtotal * (Number(discount) || 0)) / 100;
  } else {
    discountAmount = Number(discount) || 0;
  }
  discountAmount = Math.min(discountAmount, subtotal);

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxEnabled ? taxableAmount * 0.05 : 0;
  const grandTotal = Math.round(taxableAmount + taxAmount);
  const totalItemsCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <aside
      className={`${
        isMobileView ? 'w-full flex-1 border-none' : 'w-72 xl:w-80 border-l border-slate-800/90'
      } bg-[#0B1120] flex flex-col h-full shrink-0 select-none z-20`}
    >
      {/* Mobile Top Return Bar */}
      {isMobileView && onCloseMobile && (
        <div className="p-2 sm:p-2.5 bg-[#0F172A] border-b border-slate-800/90 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-[#080E1A] hover:bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-700/80 transition cursor-pointer"
          >
            <Icon name="chevron-left" className="w-4 h-4" />
            <span>Back to Products</span>
          </button>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Icon name="cart" className="w-3.5 h-3.5 text-amber-400" />
            <span>Bill ({totalItemsCount} items)</span>
          </div>
        </div>
      )}

      {/* Customer Header Bar (Matching Mockup) */}
      <div className="p-2.5 sm:p-3 bg-[#0F172A] border-b border-slate-800/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
            <Icon name="user" className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate">
                {selectedCustomer.name}
              </span>
              {selectedCustomer.discountPercent > 0 && (
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded font-bold shrink-0">
                  {selectedCustomer.discountPercent}% VIP
                </span>
              )}
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-sans truncate mt-0.5">
              {selectedCustomer.phone || 'Counter Cash Sale'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCustomerModal(true)}
          className="text-[11px] bg-[#080E1A] hover:bg-slate-800 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 transition cursor-pointer font-medium shrink-0"
        >
          Change
        </button>
      </div>

      {/* Cart Items List Canvas */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-2 sm:p-2.5 space-y-1.5 min-h-0">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 p-4 text-center select-none">
            <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-slate-800 flex items-center justify-center text-slate-500">
              <Icon name="cart" className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-300">Bill is empty</p>
            <p className="text-[10px] text-slate-500 max-w-[180px] leading-relaxed">
              Scan barcode or click items to add to bill.
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.cartId || item.id}
              className="bg-[#0F172A] border border-slate-800 rounded-xl p-2 flex items-center justify-between gap-2 hover:border-slate-700 transition group shadow-sm"
            >
              {/* Product Visual Thumbnail */}
              <div className="w-8 h-8 rounded-lg bg-[#080E1A] border border-slate-800 flex items-center justify-center shrink-0 p-0.5">
                <ProductVisual product={item} className="w-6 h-6" />
              </div>

              {/* Product Title & Info */}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate leading-tight">
                  {item.name}
                </h4>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5 truncate">
                  {item.barcode} {item.unit && `• ${item.unit}`}
                </div>
              </div>

              {/* Right: Price & Stepper Row */}
              <div className="flex flex-col items-end gap-0.5 shrink-0">
                <div className="text-xs font-mono font-bold text-white">
                  Rs. {(item.price * item.qty).toLocaleString()}
                </div>

                <div className="flex items-center gap-1">
                  {/* Stepper */}
                  <div className="flex items-center bg-[#080E1A] border border-slate-800 rounded-md p-0.5">
                    <button
                      onClick={() => onUpdateQty(item.cartId || item.id, item.qty - 1)}
                      className="w-4 h-4 rounded flex items-center justify-center text-slate-400 hover:text-white transition"
                    >
                      <Icon name="minus" className="w-2 h-2" />
                    </button>
                    <span className="w-4 text-center text-[10px] font-mono font-bold text-white">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.cartId || item.id, item.qty + 1)}
                      className="w-4 h-4 rounded flex items-center justify-center text-slate-400 hover:text-white transition"
                    >
                      <Icon name="plus" className="w-2 h-2" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => onRemoveItem(item.cartId || item.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition"
                    title="Remove item"
                  >
                    <Icon name="trash" className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bill Calculations & Action Panel (Matching Mockup Exactly) */}
      <div className="p-2.5 sm:p-3 bg-[#0F172A] border-t border-slate-800 space-y-2 shrink-0">
        <div className="space-y-1 text-xs text-slate-300">
          {/* Subtotal */}
          <div className="flex justify-between items-center text-slate-400">
            <span>Subtotal ({totalItemsCount} items)</span>
            <span className="font-mono text-white font-bold">Rs. {subtotal.toLocaleString()}</span>
          </div>

          {/* Discount Section */}
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-slate-400">Discount:</span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-[#080E1A] border border-slate-800 rounded-lg overflow-hidden">
                <input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="0"
                  className="w-10 bg-transparent px-1.5 py-0.5 text-xs text-right font-mono text-amber-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setDiscountType(discountType === 'percent' ? 'flat' : 'percent')}
                  className="px-1.5 py-0.5 bg-slate-800 text-[9px] font-bold text-slate-300 hover:text-white"
                >
                  {discountType === 'percent' ? '%' : 'Rs'}
                </button>
              </div>
              <span className="font-mono text-amber-400 font-semibold text-xs text-right w-14">
                -Rs. {discountAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* GST Toggle */}
          <div className="flex justify-between items-center text-slate-400">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={taxEnabled}
                onChange={(e) => setTaxEnabled(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-[#080E1A] w-3.5 h-3.5 cursor-pointer"
              />
              <span className="text-[11px]">Include GST (5%)</span>
            </label>
            <span className="font-mono text-white font-bold text-xs">Rs. {Math.round(taxAmount)}</span>
          </div>

          {/* Grand Total (Matching Mockup with Bright Gold Text) */}
          <div className="pt-1.5 border-t border-slate-800 flex justify-between items-baseline">
            <span className="text-xs font-extrabold uppercase tracking-wider text-white">GRAND TOTAL</span>
            <div className="text-right flex items-baseline gap-1">
              <span className="text-xs font-extrabold text-amber-400 font-mono">PKR</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-amber-400 tracking-tight">
                {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: [Clear] [Hold (F4)] [PAY BILL F12] */}
        <div className="grid grid-cols-12 gap-1.5 pt-0.5">
          {/* Clear */}
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={onClearCart}
            className="col-span-3 py-2 bg-[#080E1A] hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
          >
            <Icon name="trash" className="w-3 h-3" />
            <span>Clear</span>
          </button>

          {/* Hold Bill */}
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={onHoldBill}
            className="col-span-4 py-2 bg-[#080E1A] hover:bg-slate-800 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40"
          >
            <Icon name="pause" className="w-3 h-3 text-amber-400" />
            <span>Hold Bill</span>
          </button>

          {/* PAY BILL (Prominent Gold Button) */}
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={() => onCheckout({ subtotal, discountAmount, taxAmount, grandTotal })}
            className="col-span-5 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <Icon name="card" className="w-3.5 h-3.5 text-slate-950" />
            <span>PAY BILL</span>
          </button>
        </div>
      </div>

      {/* Customer Switcher Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Icon name="user" className="w-5 h-5 text-amber-400" />
                Select Customer Account
              </h3>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {customers.map((cust) => {
                const isSelected = selectedCustomer.id === cust.id;
                return (
                  <div
                    key={cust.id}
                    onClick={() => {
                      onSelectCustomer(cust);
                      setShowCustomerModal(false);
                    }}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-[#080E1A] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{cust.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{cust.phone}</div>
                    </div>
                    {cust.discountPercent > 0 && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        {cust.discountPercent}% VIP Off
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
