import React, { useState } from 'react';
import { Icon } from '../Icons';
import { ProductVisual } from './ProductVisual';

export const ProductCatalog = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
}) => {
  const [quantities, setQuantities] = useState({});
  const [activeHoverId, setActiveHoverId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 8 items per page fits 2 full rows perfectly without vertical clipping!

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      selectedCategory === 'dashboard' ||
      p.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const getQty = (id) => quantities[id] || 1;

  const updateCardQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAdd = (product) => {
    const qty = getQty(product.id);
    for (let i = 0; i < qty; i++) {
      onAddToCart(product);
    }
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#080E1A] overflow-hidden h-full">
      {/* Category Pills Bar (Compact, Responsive, No Scrollbar) */}
      <div className="px-3.5 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 border-b border-slate-800/60">
        {categories.map((cat) => {
          const isActive =
            selectedCategory === cat.id ||
            (selectedCategory === 'dashboard' && cat.id === 'all');

          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold'
                  : 'bg-[#0F172A] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80'
              }`}
            >
              <Icon name={cat.icon || 'layers'} className="w-3 h-3" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Product Grid Area (Compact & Proportioned for 2 Complete Visible Rows) */}
      <div className="flex-1 p-2 sm:p-2.5 overflow-y-auto no-scrollbar min-h-0">
        {currentProducts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 select-none">
            <Icon name="search" className="w-8 h-8 stroke-1" />
            <p className="text-xs font-medium">No stationery items found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1.5 sm:gap-2">
            {currentProducts.map((product) => {
              const isLowStock = !product.isService && product.stock <= product.minStock && product.stock > 0;
              const isOutOfStock = !product.isService && product.stock <= 0;
              const isHighlighted = activeHoverId === product.id || product.id === 'prod-003';

              return (
                <div
                  key={product.id}
                  onMouseEnter={() => setActiveHoverId(product.id)}
                  onMouseLeave={() => setActiveHoverId(null)}
                  className={`bg-[#0F172A] border rounded-xl p-1.5 sm:p-2 flex flex-col justify-between transition-all duration-150 select-none group relative ${
                    isHighlighted
                      ? 'border-amber-500 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/40'
                      : 'border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  {/* Top: Stock Badge */}
                  <div className="flex items-center justify-end w-full">
                    {product.isService ? (
                      <span className="text-[7px] sm:text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-blue-950/40 text-blue-400 border border-blue-500/30">
                        Service
                      </span>
                    ) : isOutOfStock ? (
                      <span className="text-[7px] sm:text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-red-950/40 text-red-400 border border-red-500/30">
                        Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="text-[7px] sm:text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/30 animate-pulse">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-[7px] sm:text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                        In Stock
                      </span>
                    )}
                  </div>

                  {/* Center: Realistic Product Visual */}
                  <div className="h-10 sm:h-11 w-full flex items-center justify-center py-0.5">
                    <ProductVisual product={product} className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>

                  {/* Info: Name, Barcode & Price */}
                  <div className="space-y-0.5 min-h-[34px] sm:min-h-[38px] flex flex-col justify-start">
                    <h3 className="text-[10px] sm:text-[11px] font-bold text-white group-hover:text-amber-400 transition line-clamp-1 leading-tight">
                      {product.name}
                    </h3>
                    <div className="text-[8px] sm:text-[9px] font-mono text-slate-400 flex items-center gap-1">
                      <span className="truncate">{product.barcode}</span>
                      {product.unit && <span className="hidden sm:inline">• {product.unit}</span>}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold font-mono text-emerald-400">
                      Rs. <span className="text-xs font-black">{product.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Bottom Action: [- 1 +] and Gold Add Button */}
                  <div className="pt-1 mt-0.5 border-t border-slate-800/80 flex items-center justify-between gap-1">
                    {/* Stepper */}
                    <div className="flex items-center bg-[#080E1A] border border-slate-800 rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCardQty(product.id, -1);
                        }}
                        className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded flex items-center justify-center text-slate-400 hover:text-white transition"
                      >
                        <Icon name="minus" className="w-2.5 h-2.5" />
                      </button>
                      <span className="w-3 sm:w-3.5 text-center text-[9px] sm:text-[10px] font-mono font-bold text-white">
                        {getQty(product.id)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCardQty(product.id, 1);
                        }}
                        className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded flex items-center justify-center text-slate-400 hover:text-white transition"
                      >
                        <Icon name="plus" className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* Gold Add Button */}
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => handleAdd(product)}
                      className="flex-1 py-1 px-1.5 sm:px-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-extrabold text-[9px] sm:text-[10px] rounded-lg transition shadow-sm cursor-pointer disabled:opacity-40"
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Footer Bar (Zero Text Collisions, Clean & Single Row) */}
      <div className="h-8 bg-[#0B1120] border-t border-slate-800/80 px-2 sm:px-3 flex items-center justify-between text-xs text-slate-400 shrink-0 select-none overflow-hidden gap-1.5 sm:gap-2">
        {/* Left: Catalog Information */}
        <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 text-[10px] sm:text-[11px]">
          <span className="text-slate-400">
            <span className="hidden sm:inline">Showing </span><strong className="text-white font-mono">{filteredProducts.length}</strong> items
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-emerald-400 font-semibold hidden md:inline text-[10px]">
            Ready for Counter Checkout
          </span>
        </div>

        {/* Center: Pagination */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono whitespace-nowrap shrink-0">
          <span className="text-slate-400 hidden md:inline">{filteredProducts.length} items</span>
          <div className="flex items-center gap-1 bg-[#0F172A] border border-slate-800 rounded px-1.5 py-0.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-slate-400 hover:text-white disabled:opacity-30"
            >
              <Icon name="chevron-left" className="w-2.5 h-2.5" />
            </button>
            <span className="text-white font-bold">{currentPage}/{totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-slate-400 hover:text-white disabled:opacity-30"
            >
              <Icon name="chevron-right" className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Right: Live Time & Wifi */}
        <div className="hidden lg:flex items-center gap-1.5 text-[10px] text-slate-400 font-mono whitespace-nowrap shrink-0">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <Icon name="wifi" className="w-3 h-3 text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
