import React, { useState } from 'react';
import { Icon } from '../Icons';
import { AddProductModal } from './AddProductModal';
import { BarcodeGeneratorModal } from './BarcodeGeneratorModal';

export const InventoryManager = ({
  products,
  categories,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onQuickStockAdjust,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'low' | 'out'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode?.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStock = true;
    if (stockFilter === 'low') {
      matchesStock = !p.isService && p.stock <= p.minStock && p.stock > 0;
    } else if (stockFilter === 'out') {
      matchesStock = !p.isService && p.stock <= 0;
    }

    return matchesCategory && matchesSearch && matchesStock;
  });

  // KPI Calculations
  const totalItems = products.length;
  const totalStockUnits = products.reduce((sum, p) => sum + (p.isService ? 0 : p.stock), 0);
  const totalCostValuation = products.reduce(
    (sum, p) => sum + (p.isService ? 0 : (p.costPrice || 0) * p.stock),
    0
  );
  const totalRetailValuation = products.reduce(
    (sum, p) => sum + (p.isService ? 0 : (p.price || 0) * p.stock),
    0
  );
  const lowStockCount = products.filter(
    (p) => !p.isService && p.stock <= p.minStock && p.stock > 0
  ).length;

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-950 p-4 lg:p-6 overflow-y-auto space-y-6">
      {/* Page Title & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight flex items-center gap-2.5">
            <Icon name="package" className="w-7 h-7 text-amber-400" />
            Stationery Inventory & Stock Manager
          </h1>
          <p className="text-xs text-slate-400">
            Real-time SKU catalog, purchase vs selling margins & barcode label printing
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsBarcodeModalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Icon name="barcode" className="w-4 h-4 text-amber-400" />
            <span>Print Price Tags</span>
          </button>

          <button
            onClick={() => {
              setEditingProduct(null);
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Icon name="plus" className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Products</span>
          <div className="text-2xl font-black font-mono text-white">{totalItems} SKUs</div>
          <p className="text-[11px] text-slate-500">Across {categories.length - 1} stationery categories</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Stock in Hand</span>
          <div className="text-2xl font-black font-mono text-amber-400">
            {totalStockUnits.toLocaleString()} <span className="text-xs font-sans text-slate-400">units</span>
          </div>
          <p className="text-[11px] text-slate-500">Physically counted in store</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Retail Valuation</span>
          <div className="text-2xl font-black font-mono text-emerald-400">
            Rs. {totalRetailValuation.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Cost: Rs. {totalCostValuation.toLocaleString()}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Low Stock Warnings</span>
          <div className="text-2xl font-black font-mono text-red-400 flex items-center gap-2">
            <span>{lowStockCount} Items</span>
            {lowStockCount > 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
          </div>
          <p className="text-[11px] text-slate-500">Need supplier re-order</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon name="search" className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items or barcode..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-amber-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-amber-500 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Stock Condition */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setStockFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                stockFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStockFilter('low')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                stockFilter === 'low'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Low Stock ({lowStockCount})
            </button>
            <button
              onClick={() => setStockFilter('out')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                stockFilter === 'out'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Out of Stock
            </button>
          </div>
        </div>
      </div>

      {/* Products Inventory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Stationery Item</th>
                <th className="py-3 px-4">Barcode</th>
                <th className="py-3 px-4">Cost Price</th>
                <th className="py-3 px-4">Retail Price</th>
                <th className="py-3 px-4">Profit Margin</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-500">
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLow = !p.isService && p.stock <= p.minStock && p.stock > 0;
                  const isOut = !p.isService && p.stock <= 0;
                  const marginPercent =
                    p.costPrice && p.price
                      ? Math.round(((p.price - p.costPrice) / p.price) * 100)
                      : 25;

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition">
                      {/* Name & Icon */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl p-1.5 rounded-xl bg-slate-950 border border-slate-800">
                            {p.emoji || '📦'}
                          </span>
                          <div>
                            <div className="font-semibold text-slate-100">{p.name}</div>
                            <div className="text-[11px] text-slate-400 capitalize">
                              {p.category} {p.unit && `• ${p.unit}`}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Barcode */}
                      <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                        {p.barcode || '—'}
                      </td>

                      {/* Cost */}
                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        {p.costPrice ? `Rs. ${p.costPrice.toLocaleString()}` : '—'}
                      </td>

                      {/* Retail Price */}
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                        Rs. {p.price.toLocaleString()}
                      </td>

                      {/* Margin % */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          +{marginPercent}%
                        </span>
                      </td>

                      {/* Stock Level with Quick Adjustment */}
                      <td className="py-3.5 px-4">
                        {p.isService ? (
                          <span className="text-slate-500 text-[11px]">Unlimited (Service)</span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => onQuickStockAdjust(p.id, Math.max(0, p.stock - 1))}
                              className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
                              title="Decrease 1"
                            >
                              -
                            </button>
                            <span className="font-mono font-bold text-xs text-white min-w-[32px] text-center">
                              {p.stock}
                            </span>
                            <button
                              onClick={() => onQuickStockAdjust(p.id, p.stock + 5)}
                              className="px-1.5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-bold"
                              title="Add +5 Stock"
                            >
                              +5
                            </button>
                            <button
                              onClick={() => onQuickStockAdjust(p.id, p.stock + 20)}
                              className="px-1.5 h-5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/30"
                              title="Add +20 Stock"
                            >
                              +20
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        {p.isService ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            On-Counter
                          </span>
                        ) : isOut ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                            Low ({p.stock})
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400">
                            In Stock
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsAddModalOpen(true);
                            }}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                            title="Edit Product"
                          >
                            <Icon name="edit" className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${p.name} from catalog?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-lg transition"
                            title="Delete"
                          >
                            <Icon name="trash" className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        categories={categories}
        initialProduct={editingProduct}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
        onSaveProduct={(prod) => {
          if (editingProduct) {
            onUpdateProduct(prod);
          } else {
            onAddProduct(prod);
          }
        }}
      />

      <BarcodeGeneratorModal
        isOpen={isBarcodeModalOpen}
        products={products.filter((p) => !p.isService)}
        onClose={() => setIsBarcodeModalOpen(false)}
      />
    </div>
  );
};
