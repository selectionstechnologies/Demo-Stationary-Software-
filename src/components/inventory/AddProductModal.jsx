import React, { useState } from 'react';
import { Icon } from '../Icons';

export const AddProductModal = ({ isOpen, categories, onClose, onSaveProduct, initialProduct }) => {
  const [name, setName] = useState(initialProduct?.name || '');
  const [category, setCategory] = useState(initialProduct?.category || 'pens');
  const [barcode, setBarcode] = useState(initialProduct?.barcode || `8964000${Math.floor(100 + Math.random() * 900)}`);
  const [price, setPrice] = useState(initialProduct?.price || '');
  const [costPrice, setCostPrice] = useState(initialProduct?.costPrice || '');
  const [stock, setStock] = useState(initialProduct?.stock || '');
  const [minStock, setMinStock] = useState(initialProduct?.minStock || 10);
  const [unit, setUnit] = useState(initialProduct?.unit || 'pcs');
  const [emoji, setEmoji] = useState(initialProduct?.emoji || '📦');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      alert('Product Name and Price are required.');
      return;
    }

    onSaveProduct({
      id: initialProduct?.id || `prod-${Date.now()}`,
      name,
      category,
      barcode,
      price: Number(price) || 0,
      costPrice: Number(costPrice) || Math.round(Number(price) * 0.75),
      stock: Number(stock) || 0,
      minStock: Number(minStock) || 10,
      unit,
      emoji: emoji || '📦',
    });

    onClose();
  };

  const emojiOptions = ['🖊️', '✒️', '🖍️', '🖋️', '📓', '📕', '📄', '🗒️', '📘', '📐', '📏', '🧼', '✏️', '🎨', '🖼️', '🖌️', '📁', '📎', '🧴', '📦'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Icon name="package" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {initialProduct ? 'Edit Stationery Item' : 'Add New Stationery Product'}
              </h3>
              <p className="text-xs text-slate-400">Manage catalog specs, pricing & barcode</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Emoji */}
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-3 space-y-1">
              <label className="text-xs font-medium text-slate-300">Emoji Icon:</label>
              <select
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-2 text-xl text-center cursor-pointer outline-none"
              >
                {emojiOptions.map((em, idx) => (
                  <option key={idx} value={em}>
                    {em}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-9 space-y-1">
              <label className="text-xs font-medium text-slate-300">Product Name:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dollar SP-10 Ballpoint (Blue)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Category & Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
              >
                {categories
                  .filter((c) => c.id !== 'all')
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Selling Unit:</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="pcs">Pieces (pcs)</option>
                <option value="pack">Pack</option>
                <option value="box">Box</option>
                <option value="ream">Paper Ream</option>
                <option value="book">Book / Register</option>
                <option value="pad">Pad</option>
                <option value="set">Set</option>
              </select>
            </div>
          </div>

          {/* Barcode */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-300">Barcode / SKU:</label>
              <button
                type="button"
                onClick={() => setBarcode(`8964000${Math.floor(100 + Math.random() * 900)}`)}
                className="text-[11px] text-amber-400 hover:underline"
              >
                Generate Random Barcode
              </button>
            </div>
            <input
              type="text"
              required
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 outline-none focus:border-amber-500"
            />
          </div>

          {/* Pricing: Cost vs Sale Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Cost Price (Purchase PKR):</label>
              <input
                type="number"
                min="0"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="e.g. 18"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-300 outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Selling Price (Retail PKR):</label>
              <input
                type="number"
                min="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 25"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-400 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Stock Levels */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Current Stock in Hand:</label>
              <input
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="e.g. 50"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-400 outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Low Stock Alert Level:</label>
              <input
                type="number"
                min="1"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                placeholder="e.g. 10"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Modal Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black transition shadow-lg shadow-amber-500/20"
            >
              {initialProduct ? 'Update Product' : 'Add to Inventory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
