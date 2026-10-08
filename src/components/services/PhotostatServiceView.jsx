import React, { useState } from 'react';
import { Icon } from '../Icons';

export const PhotostatServiceView = ({ onAddToCart, onNavigatePOS }) => {
  const [selectedService, setSelectedService] = useState('Photocopy / Xerox (Single Sided)');
  const [rate, setRate] = useState(10);
  const [pages, setPages] = useState(15);
  const [copies, setCopies] = useState(1);
  const [customNote, setCustomNote] = useState('');

  const servicesList = [
    { id: 'srv-1', name: 'Photocopy / Xerox (Single Sided B&W)', rate: 10, unit: 'page', icon: 'printer', desc: 'Standard 75gsm A4 sheet' },
    { id: 'srv-2', name: 'Photocopy / Xerox (Double Sided B&W)', rate: 15, unit: 'page', icon: 'printer', desc: 'Back-to-back duplex printing' },
    { id: 'srv-3', name: 'Color Laser Printout (Standard A4)', rate: 40, unit: 'page', icon: 'printer', desc: 'Crisp color laser 80gsm' },
    { id: 'srv-4', name: 'High-Res Photo Glossy Sheet (A4)', rate: 100, unit: 'page', icon: 'printer', desc: 'Glossy 220gsm photo print' },
    { id: 'srv-5', name: 'Spiral Wire Ring Binding', rate: 150, unit: 'book', icon: 'notebook', desc: 'Plastic sheet cover + spiral ring' },
    { id: 'srv-6', name: 'Golden Embossed Thesis Hardcover Binding', rate: 650, unit: 'book', icon: 'notebook', desc: 'University thesis with golden letter stamp' },
    { id: 'srv-7', name: 'A4 Document Plastic Heat Lamination', rate: 80, unit: 'doc', icon: 'layers', desc: '125 Micron waterproof pouch' },
    { id: 'srv-8', name: 'CNIC / Driving License Card Lamination', rate: 50, unit: 'card', icon: 'layers', desc: 'Pocket size protective lamination' },
  ];

  const handleSelectService = (item) => {
    setSelectedService(item.name);
    setRate(item.rate);
  };

  const totalPagesCount = (Number(pages) || 1) * (Number(copies) || 1);
  const jobTotalPKR = totalPagesCount * (Number(rate) || 0);

  const handleAddJobToCart = () => {
    if (jobTotalPKR <= 0) return;

    const jobItem = {
      id: `srv-${Date.now()}`,
      cartId: `cart-srv-${Date.now()}`,
      name: `${selectedService} (${totalPagesCount} total ${totalPagesCount > 1 ? 'units' : 'unit'}${customNote ? ` - ${customNote}` : ''})`,
      price: Math.round(jobTotalPKR),
      qty: 1,
      isService: true,
      emoji: '🖨️',
      category: 'service',
      barcode: 'PHOTOSTAT-JOB',
    };

    onAddToCart(jobItem);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#080E1A] overflow-y-auto no-scrollbar select-none p-3.5 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 sm:p-4 shadow-sm">
        <div>
          <h1 className="text-base sm:text-lg font-black font-display text-white tracking-tight flex items-center gap-2">
            <Icon name="printer" className="w-5 h-5 text-blue-400" />
            Photostat, Color Printing & Book Binding Counter
          </h1>
          <p className="text-xs text-slate-400">
            Rapid copier rate calculator, thesis hardcover binding & plastic laminations
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigatePOS}
          className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-md shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Icon name="cart" className="w-3.5 h-3.5" />
          <span>Go to Active Bill</span>
        </button>
      </div>

      {/* Main Grid: Rate Card Catalog & Live Fast Job Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left (7 Cols): Service Rate Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-bold text-slate-300">Select Service Preset:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {servicesList.map((srv) => {
              const isSelected = selectedService === srv.name;
              return (
                <div
                  key={srv.id}
                  onClick={() => handleSelectService(srv)}
                  className={`p-3 rounded-2xl border transition cursor-pointer space-y-1.5 shadow-sm ${
                    isSelected
                      ? 'bg-blue-950/40 border-blue-500 text-white ring-1 ring-blue-500/40'
                      : 'bg-[#0F172A] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{srv.name}</span>
                    <span className="text-xs font-mono font-black text-emerald-400">
                      Rs. {srv.rate}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{srv.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Paper Reams Live Inventory Status */}
          <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 shadow-sm space-y-2">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Icon name="layers" className="w-4 h-4 text-amber-400" />
              Copier Paper Ream Inventory
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-[#080E1A] rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Double A (80gsm)</div>
                <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">26 Reams</div>
              </div>
              <div className="p-2 bg-[#080E1A] rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">HP Copier (75gsm)</div>
                <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">18 Reams</div>
              </div>
              <div className="p-2 bg-[#080E1A] rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Legal Size (80gsm)</div>
                <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">9 Reams</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right (5 Cols): Live Job Cost Calculator */}
        <div className="lg:col-span-5 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Icon name="calculator" className="w-4 h-4 text-amber-400" />
                Live Job Billing Calculator
              </h3>
              <p className="text-[10px] text-slate-400">Auto-calculate pages × copies and push to till</p>
            </div>

            {/* Active Service Name */}
            <div className="p-3 bg-[#080E1A] border border-slate-800 rounded-xl space-y-0.5">
              <div className="text-[10px] text-slate-400">Selected Service</div>
              <div className="text-xs font-bold text-amber-300">{selectedService}</div>
            </div>

            {/* Inputs: Rate per unit, Pages, Copies */}
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400">Rate / Unit:</label>
                <div className="relative">
                  <span className="text-[10px] font-mono text-slate-500 absolute left-2 top-1/2 -translate-y-1/2">Rs</span>
                  <input
                    type="number"
                    min="1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full bg-[#080E1A] border border-slate-700 rounded-xl pl-6 pr-2 py-1.5 text-xs font-mono font-bold text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400">Original Pages:</label>
                <input
                  type="number"
                  min="1"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-2 py-1.5 text-xs font-mono font-bold text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400">Sets / Copies:</label>
                <input
                  type="number"
                  min="1"
                  value={copies}
                  onChange={(e) => setCopies(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-2 py-1.5 text-xs font-mono font-bold text-white outline-none"
                />
              </div>
            </div>

            {/* Note input */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400">Optional Customer Note (Name / Roll #):</label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Roll # 42 Chemistry Notes"
                className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>

            {/* Total Calculation Display */}
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-300 uppercase block">Total Job Amount</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {totalPagesCount} total sheets × Rs. {rate}
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-400">
                Rs. {Math.round(jobTotalPKR).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Add to Active Bill Button */}
          <button
            type="button"
            onClick={handleAddJobToCart}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="cart" className="w-4 h-4 text-slate-950" />
            <span>Add Job to Active POS Bill</span>
          </button>
        </div>
      </div>
    </div>
  );
};
