import React, { useState } from 'react';
import { Icon } from '../Icons';
import { ProductVisual } from '../pos/ProductVisual';

export const AllProductsCatalog = ({
  products = [],
  categories = [],
  onAddToCart,
  onOpenAddProduct,
  onOpenAddInventory,
  onQuickStockAdjust,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'in' | 'low' | 'out'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode?.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStock = true;
    if (stockFilter === 'low') {
      matchesStock = !p.isService && p.stock <= (p.minStock || 10) && p.stock > 0;
    } else if (stockFilter === 'out') {
      matchesStock = !p.isService && p.stock <= 0;
    } else if (stockFilter === 'in') {
      matchesStock = p.isService || p.stock > (p.minStock || 10);
    }

    return matchesCategory && matchesSearch && matchesStock;
  });

  // Analytics
  const totalSKUs = products.length;
  const inStockCount = products.filter((p) => p.isService || p.stock > 0).length;
  const lowStockCount = products.filter((p) => !p.isService && p.stock <= (p.minStock || 10) && p.stock > 0).length;
  const outOfStockCount = products.filter((p) => !p.isService && p.stock <= 0).length;

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#080E1A] overflow-y-auto no-scrollbar select-none p-3.5 sm:p-5 space-y-4">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3.5 sm:p-4 shadow-sm">
        <div>
          <h1 className="text-base sm:text-lg font-black font-display text-white tracking-tight flex items-center gap-2">
            <Icon name="layers" className="w-5 h-5 text-amber-400" />
            All Stationery Products & Catalog
          </h1>
          <p className="text-xs text-slate-400">
            Browse, manage wholesale pricing, barcodes, stock levels & add products
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {onOpenAddInventory && (
            <button
              type="button"
              onClick={onOpenAddInventory}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Icon name="plus" className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Stock / Restock</span>
            </button>
          )}

          {onOpenAddProduct && (
            <button
              type="button"
              onClick={onOpenAddProduct}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-md shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Icon name="plus" className="w-3.5 h-3.5 text-slate-950" />
              <span>New Product</span>
            </button>
          )}
        </div>
      </div>

      {/* Stock Health Quick Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={() => setStockFilter('all')}
          className={`p-2.5 sm:p-3 rounded-xl border text-left transition cursor-pointer ${
            stockFilter === 'all'
              ? 'bg-slate-800/80 border-slate-600 text-white shadow-sm'
              : 'bg-[#0F172A] border-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Products</div>
          <div className="text-lg sm:text-xl font-black font-mono text-white mt-0.5">{totalSKUs}</div>
          <div className="text-[10px] text-slate-500">All registered SKUs</div>
        </button>

        <button
          type="button"
          onClick={() => setStockFilter('in')}
          className={`p-2.5 sm:p-3 rounded-xl border text-left transition cursor-pointer ${
            stockFilter === 'in'
              ? 'bg-emerald-950/40 border-emerald-500/60 text-white shadow-sm'
              : 'bg-[#0F172A] border-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">In Stock</div>
          <div className="text-lg sm:text-xl font-black font-mono text-emerald-400 mt-0.5">{inStockCount}</div>
          <div className="text-[10px] text-emerald-500/80">Available for billing</div>
        </button>

        <button
          type="button"
          onClick={() => setStockFilter('low')}
          className={`p-2.5 sm:p-3 rounded-xl border text-left transition cursor-pointer ${
            stockFilter === 'low'
              ? 'bg-amber-950/40 border-amber-500/60 text-white shadow-sm'
              : 'bg-[#0F172A] border-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Low Stock</div>
          <div className="text-lg sm:text-xl font-black font-mono text-amber-400 mt-0.5">{lowStockCount}</div>
          <div className="text-[10px] text-amber-500/80">Below min alert level</div>
        </button>

        <button
          type="button"
          onClick={() => setStockFilter('out')}
          className={`p-2.5 sm:p-3 rounded-xl border text-left transition cursor-pointer ${
            stockFilter === 'out'
              ? 'bg-rose-950/40 border-rose-500/60 text-white shadow-sm'
              : 'bg-[#0F172A] border-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Out of Stock</div>
          <div className="text-lg sm:text-xl font-black font-mono text-rose-400 mt-0.5">{outOfStockCount}</div>
          <div className="text-[10px] text-rose-500/80">Needs purchase order</div>
        </button>
      </div>

      {/* Search Bar & Category Filter Pills */}
      <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3 space-y-2.5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Icon name="search" className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by product name, brand or barcode..."
              className="w-full bg-[#080E1A] border border-slate-700/80 focus:border-amber-500 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <Icon name="x" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Toggle: Grid vs Table */}
          <div className="flex items-center gap-1 bg-[#080E1A] border border-slate-800 rounded-xl p-1 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Icon name="layers" className="w-3.5 h-3.5" />
              <span className="text-[10px]">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <Icon name="receipt" className="w-3.5 h-3.5" />
              <span className="text-[10px]">Table</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-[#080E1A] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon name={cat.icon || 'tag'} className="w-3 h-3" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Content: Grid Mode or Table Mode */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center text-slate-500 space-y-2">
          <Icon name="search" className="w-8 h-8 mx-auto stroke-1" />
          <p className="text-sm font-bold text-slate-300">No stationery products found</p>
          <p className="text-xs text-slate-500">Try adjusting your search query or category filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Mode */
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {filteredProducts.map((product) => {
            const isOutOfStock = !product.isService && product.stock <= 0;
            const isLowStock = !product.isService && product.stock <= (product.minStock || 10) && product.stock > 0;
            const margin = product.costPrice
              ? Math.round(((product.price - product.costPrice) / product.price) * 100)
              : 30;

            return (
              <div
                key={product.id}
                className="bg-[#0F172A] border border-slate-800/90 rounded-2xl p-3 flex flex-col justify-between hover:border-slate-700 transition shadow-sm space-y-2 group"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono capitalize">
                    {product.category}
                  </span>
                  {product.isService ? (
                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-blue-950/50 text-blue-400 border border-blue-500/30">
                      Service
                    </span>
                  ) : isOutOfStock ? (
                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-rose-950/50 text-rose-400 border border-rose-500/30">
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-amber-950/50 text-amber-400 border border-amber-500/30 animate-pulse">
                      Low: {product.stock}
                    </span>
                  ) : (
                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
                      Stock: {product.stock}
                    </span>
                  )}
                </div>

                {/* Product Visual */}
                <div className="h-16 w-full flex items-center justify-center py-1">
                  <ProductVisual product={product} className="w-12 h-12" />
                </div>

                {/* Product Details */}
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition line-clamp-1 leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                    <span>{product.barcode}</span>
                    {product.unit && <span>• {product.unit}</span>}
                  </div>
                </div>

                {/* Pricing & Margins */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-400 font-medium">Retail Price</div>
                    <div className="text-sm font-black font-mono text-emerald-400">
                      Rs. {product.price.toLocaleString()}
                    </div>
                  </div>
                  {product.costPrice && (
                    <div className="text-right">
                      <div className="text-[9px] text-slate-500">Margin</div>
                      <div className="text-xs font-bold font-mono text-amber-400">
                        {margin}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Add to Active POS Bill */}
                <button
                  type="button"
                  onClick={() => onAddToCart && onAddToCart(product)}
                  className="w-full py-1.5 bg-[#080E1A] hover:bg-amber-500 hover:text-slate-950 border border-slate-800 text-slate-200 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Icon name="cart" className="w-3 h-3" />
                  <span>Add to POS Bill</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table Mode */
        <div className="bg-[#0F172A] border border-slate-800/90 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 font-mono">Barcode</th>
                  <th className="py-2.5 px-3 text-right">Cost (PKR)</th>
                  <th className="py-2.5 px-3 text-right">Retail (PKR)</th>
                  <th className="py-2.5 px-3 text-right">Margin</th>
                  <th className="py-2.5 px-3 text-center">Stock</th>
                  <th className="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredProducts.map((p) => {
                  const isLow = !p.isService && p.stock <= (p.minStock || 10) && p.stock > 0;
                  const isOut = !p.isService && p.stock <= 0;
                  const margin = p.costPrice
                    ? Math.round(((p.price - p.costPrice) / p.price) * 100)
                    : 30;

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[#080E1A] border border-slate-800 flex items-center justify-center shrink-0">
                            <ProductVisual product={p} className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-white">{p.name}</div>
                            {p.color && <div className="text-[10px] text-slate-400">{p.color}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-slate-300 capitalize text-[11px]">{p.category}</td>
                      <td className="py-2 px-3 font-mono text-[10px] text-slate-400">{p.barcode}</td>
                      <td className="py-2 px-3 text-right font-mono text-slate-400">
                        {p.costPrice ? `Rs. ${p.costPrice}` : '—'}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-400">
                        Rs. {p.price.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-amber-400 font-bold">
                        {margin}%
                      </td>
                      <td className="py-2 px-3 text-center">
                        {p.isService ? (
                          <span className="text-[9px] font-bold text-blue-400 bg-blue-950/40 border border-blue-500/30 px-2 py-0.5 rounded-full">
                            Service
                          </span>
                        ) : isOut ? (
                          <span className="text-[9px] font-bold text-rose-400 bg-rose-950/40 border border-rose-500/30 px-2 py-0.5 rounded-full">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-full">
                            {p.stock} (Low)
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            {p.stock} in stock
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => onAddToCart && onAddToCart(p)}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] rounded-lg transition cursor-pointer"
                        >
                          + Add to Bill
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
