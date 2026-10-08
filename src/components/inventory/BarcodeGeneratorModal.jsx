import React, { useState } from 'react';
import { Icon } from '../Icons';

export const BarcodeGeneratorModal = ({ isOpen, products, onClose }) => {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [copies, setCopies] = useState(12);

  if (!isOpen) return null;

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Icon name="barcode" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Print Barcode Price Tags</h3>
              <p className="text-xs text-slate-400">Generate adhesive barcode stickers for stationery items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Choose Stationery Item:</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — Rs. {p.price}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Number of Stickers to Print:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-400 outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Stickers Grid Preview */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <label className="text-xs font-semibold text-slate-400 block">Sticker Sheet Preview (Thermal / A4):</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            {Array.from({ length: Math.min(Number(copies) || 1, 24) }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white text-slate-950 p-2.5 rounded-xl border border-slate-300 shadow-sm flex flex-col items-center justify-between text-center select-none"
              >
                <div className="text-[9px] font-extrabold uppercase tracking-tight text-slate-700">
                  ROYAL STATIONERS
                </div>
                <div className="text-[10px] font-bold text-slate-900 truncate max-w-full my-0.5">
                  {product?.name}
                </div>
                {/* Visual Barcode Graphic */}
                <div className="my-1 font-mono tracking-[0.2em] text-[10px] font-bold text-slate-800">
                  |||||| |||| |||||| ||
                </div>
                <div className="text-[9px] font-mono text-slate-600">
                  {product?.barcode}
                </div>
                <div className="mt-1 text-xs font-extrabold font-mono text-slate-950 border-t border-slate-200 pt-0.5 w-full">
                  Rs. {product?.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          {Number(copies) > 24 && (
            <p className="text-[11px] text-slate-500 text-center">
              + {Number(copies) - 24} more stickers will be formatted across subsequent pages on print.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Paper: 50mm × 25mm Thermal Label / A4 Sheet</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <Icon name="printer" className="w-4 h-4" />
              <span>Print {copies} Labels</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
