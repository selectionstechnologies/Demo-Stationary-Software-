import React, { useState } from 'react';
import { Icon } from '../Icons';

export const QuickServiceModal = ({ isOpen, onClose, onAddServiceItem }) => {
  const [serviceType, setServiceType] = useState('Photocopy (B&W)');
  const [customName, setCustomName] = useState('');
  const [rate, setRate] = useState(10);
  const [qty, setQty] = useState(5);

  if (!isOpen) return null;

  const presetServices = [
    { name: 'Photocopy (B&W Single Sided)', rate: 10, unit: 'page' },
    { name: 'Photocopy (B&W Double Sided)', rate: 15, unit: 'page' },
    { name: 'Color Printout (Laser Normal)', rate: 40, unit: 'page' },
    { name: 'High-Res Photo Paper Print', rate: 100, unit: 'page' },
    { name: 'Spiral Book Binding (Small)', rate: 150, unit: 'book' },
    { name: 'Hardcover Golden Thesis Binding', rate: 650, unit: 'book' },
    { name: 'A4 Plastic Heat Lamination', rate: 80, unit: 'doc' },
    { name: 'ID Card Lamination', rate: 50, unit: 'card' },
  ];

  const handleSelectPreset = (preset) => {
    setServiceType(preset.name);
    setRate(preset.rate);
    setCustomName('');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const finalName = customName.trim() || serviceType;
    if (!finalName) return;

    onAddServiceItem({
      id: `custom-${Date.now()}`,
      cartId: `cart-custom-${Date.now()}`,
      name: finalName,
      price: Number(rate) || 0,
      qty: Number(qty) || 1,
      isService: true,
      emoji: '🖨️',
      category: 'service',
      unit: 'job',
    });

    onClose();
  };

  const total = (Number(rate) || 0) * (Number(qty) || 1);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Icon name="printer" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Photostat & Custom Service</h3>
              <p className="text-xs text-slate-400">Add on-counter print, photocopy or binding charges</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Grid */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400">Fast Presets:</label>
          <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
            {presetServices.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-2 rounded-xl text-left border text-xs transition cursor-pointer flex flex-col justify-between ${
                  serviceType === preset.name
                    ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-semibold truncate">{preset.name}</span>
                <span className="text-[10px] text-amber-400 font-mono mt-0.5">
                  Rs. {preset.rate} / {preset.unit}
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleAdd} className="space-y-4">
          {/* Custom Description */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Custom Title / Note (Optional):</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder={serviceType}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          {/* Rate & Qty */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Rate per Unit (PKR):</label>
              <input
                type="number"
                min="1"
                required
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-emerald-400 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Total Quantity / Pages:</label>
              <input
                type="number"
                min="1"
                required
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-amber-400 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Subtotal Preview */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Charge Total:</span>
            <span className="text-lg font-extrabold font-mono text-emerald-400">
              Rs. {total.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-extrabold transition shadow-lg shadow-blue-600/20"
            >
              Add To Active Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
