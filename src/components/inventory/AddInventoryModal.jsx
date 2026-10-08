import React, { useState } from 'react';
import { Icon } from '../Icons';

export const AddInventoryModal = ({
  isOpen,
  onClose,
  products = [],
  categories = [],
  onAddStockToExisting,
  onAddNewProduct,
}) => {
  const [activeMode, setActiveMode] = useState('existing'); // 'existing' | 'new'

  // Mode 1: Existing Product Restock
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [restockQty, setRestockQty] = useState(25);
  const [newCostPrice, setNewCostPrice] = useState('');
  const [newSellingPrice, setNewSellingPrice] = useState('');
  const [supplierInvoiceNo, setSupplierInvoiceNo] = useState('');

  // Mode 2: Brand New Product Entry
  const [name, setName] = useState('');
  const [category, setCategory] = useState('paper');
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [stock, setStock] = useState(50);
  const [minStock, setMinStock] = useState(10);
  const [unit, setUnit] = useState('pcs');
  const [supplier, setSupplier] = useState('Dollar Stationery Ltd');

  if (!isOpen) return null;

  const currentSelectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handleGenerateBarcode = () => {
    const randomCode = `896400${Math.floor(1000 + Math.random() * 9000)}`;
    setBarcode(randomCode);
  };

  const handleSubmitRestock = (e) => {
    e.preventDefault();
    if (!currentSelectedProduct) return;

    const addedQty = Number(restockQty) || 0;
    if (addedQty <= 0) {
      alert('Please enter a valid stock quantity.');
      return;
    }

    onAddStockToExisting({
      productId: currentSelectedProduct.id,
      quantityAdded: addedQty,
      costPrice: newCostPrice ? Number(newCostPrice) : currentSelectedProduct.costPrice,
      sellingPrice: newSellingPrice ? Number(newSellingPrice) : currentSelectedProduct.price,
      supplierInvoice: supplierInvoiceNo,
    });

    onClose();
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      alert('Product name and selling price are required.');
      return;
    }

    onAddNewProduct({
      id: `prod-custom-${Date.now()}`,
      name: name.trim(),
      category,
      barcode: barcode.trim() || `896400${Math.floor(1000 + Math.random() * 9000)}`,
      price: Number(price) || 0,
      costPrice: Number(costPrice) || Math.round(Number(price) * 0.7),
      stock: Number(stock) || 0,
      minStock: Number(minStock) || 10,
      unit,
      supplier,
      isService: false,
      emoji: category === 'pens' ? '🖊️' : category === 'paper' ? '📓' : '📦',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Icon name="package" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Add Inventory & Stock</h2>
              <p className="text-[11px] text-slate-400">Supplier shipment entry & barcode assignment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Restock Existing vs Add Brand New SKU */}
        <div className="grid grid-cols-2 gap-2 bg-[#080E1A] p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveMode('existing')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeMode === 'existing'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon name="history" className="w-3.5 h-3.5" />
            <span>Restock Existing SKU</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('new')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeMode === 'new'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon name="plus" className="w-3.5 h-3.5" />
            <span>Create New SKU</span>
          </button>
        </div>

        {/* Mode 1: Restock Existing Product */}
        {activeMode === 'existing' && (
          <form onSubmit={handleSubmitRestock} className="space-y-3.5">
            {/* Select Product */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Select Stationery Item to Restock:</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-[#080E1A] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
              >
                {products
                  .filter((p) => !p.isService)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Current Stock: {p.stock} {p.unit || 'pcs'})
                    </option>
                  ))}
              </select>
            </div>

            {currentSelectedProduct && (
              <div className="p-3 bg-[#080E1A] border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-mono">Barcode: {currentSelectedProduct.barcode}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{currentSelectedProduct.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Current Stock</div>
                  <div className="text-sm font-black font-mono text-emerald-400">{currentSelectedProduct.stock}</div>
                </div>
              </div>
            )}

            {/* Restock Quantity */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Units Received (+):</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={restockQty}
                  onChange={(e) => setRestockQty(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-amber-400 outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Supplier Invoice / Batch #:</label>
                <input
                  type="text"
                  placeholder="e.g. INV-9481"
                  value={supplierInvoiceNo}
                  onChange={(e) => setSupplierInvoiceNo(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Optional Pricing Revision */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400">Cost Price (PKR):</label>
                <input
                  type="number"
                  placeholder={`Current: Rs. ${currentSelectedProduct?.costPrice || 0}`}
                  value={newCostPrice}
                  onChange={(e) => setNewCostPrice(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400">Retail Price (PKR):</label>
                <input
                  type="number"
                  placeholder={`Current: Rs. ${currentSelectedProduct?.price || 0}`}
                  value={newSellingPrice}
                  onChange={(e) => setNewSellingPrice(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-emerald-400 outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                Confirm Restock & Update Inventory
              </button>
            </div>
          </form>
        )}

        {/* Mode 2: Create Brand New SKU */}
        {activeMode === 'new' && (
          <form onSubmit={handleSubmitNew} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Stationery Product Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. Double A A4 80gsm Paper Ream (500 Sheets)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="paper">Notebooks & Paper Reams</option>
                  <option value="pens">Pens, Markers & Inks</option>
                  <option value="school">Geometry & School Supplies</option>
                  <option value="art">Art & Poster Colors</option>
                  <option value="office">Files, Staplers & Office</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Barcode (EAN):</span>
                  <button
                    type="button"
                    onClick={handleGenerateBarcode}
                    className="text-[10px] text-amber-400 hover:underline"
                  >
                    Auto-Generate
                  </button>
                </label>
                <input
                  type="text"
                  placeholder="Scan or generate barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Cost (PKR):</label>
                <input
                  type="number"
                  placeholder="Wholesale"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Retail (PKR):</label>
                <input
                  type="number"
                  required
                  placeholder="Selling"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-400 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Opening Qty:</label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-400 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Unit Type:</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="pcs">Pieces (pcs)</option>
                  <option value="pack">Pack / Box</option>
                  <option value="ream">Paper Ream (500 pgs)</option>
                  <option value="book">Register / Book</option>
                  <option value="set">Color Set</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Supplier Name:</label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="e.g. Dollar, Piano, Double A"
                  className="w-full bg-[#080E1A] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                Save New Product into Catalog
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
