import React, { useState } from 'react';
import { Icon } from '../Icons';

export const StoreSettings = () => {
  const [storeProfile, setStoreProfile] = useState({
    name: 'ROYAL STATIONERS & PHOTOSTAT',
    tagline: 'Books • Fine Stationery • High-Speed Photostat',
    address: 'Shop #12, Commercial Plaza, Main Market, Islamabad',
    phone: '051-2358941 / 0300-5544332',
    ntn: '9481920-4',
    receiptPolicy: 'Items exchanged within 3 days with original bill.',
    printerWidth: '80mm',
    autoPrint: true,
  });

  const [suppliers, setSuppliers] = useState([
    {
      id: 'sup-01',
      name: 'Dollar Industries Pvt Ltd',
      contact: 'Tahir Mehmood (Area Manager)',
      phone: '0300-4128900',
      category: 'Pens, Markers & Pointers',
      terms: 'Net 15 Days',
      payable: 28400,
    },
    {
      id: 'sup-02',
      name: 'Double A Paper & Packages Co.',
      contact: 'Zahid Hussain (Distributor)',
      phone: '0321-9988112',
      category: 'Paper Reams, Registers & Files',
      terms: 'Cash on Delivery',
      payable: 0,
    },
    {
      id: 'sup-03',
      name: 'Oxford Stationery Importers',
      contact: 'Salman Sheikh',
      phone: '0333-5120488',
      category: 'Geometry Boxes & School Accessories',
      terms: 'Net 30 Days',
      payable: 14500,
    },
    {
      id: 'sup-04',
      name: 'Art & Colors Hub (Faber-Castell & Camel)',
      contact: 'Bilal Khan',
      phone: '0313-7722100',
      category: 'Art Paints, Brushes & Canvas',
      terms: 'Net 15 Days',
      payable: 8200,
    },
  ]);

  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [newSupName, setNewSupName] = useState('');
  const [newSupContact, setNewSupContact] = useState('');
  const [newSupPhone, setNewSupPhone] = useState('');
  const [newSupCategory, setNewSupCategory] = useState('');
  const [newSupPayable, setNewSupPayable] = useState('0');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Store profile and receipt configuration saved successfully!');
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    if (!newSupName.trim()) return;

    setSuppliers((prev) => [
      ...prev,
      {
        id: `sup-${Date.now()}`,
        name: newSupName,
        contact: newSupContact,
        phone: newSupPhone,
        category: newSupCategory || 'General Stationery',
        terms: 'Net 15 Days',
        payable: Number(newSupPayable) || 0,
      },
    ]);

    setIsAddSupplierOpen(false);
    setNewSupName('');
    setNewSupContact('');
    setNewSupPhone('');
    setNewSupCategory('');
  };

  const totalPayableToSuppliers = suppliers.reduce((s, sup) => s + sup.payable, 0);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-950 p-4 lg:p-6 overflow-y-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight flex items-center gap-2.5">
          <Icon name="settings" className="w-7 h-7 text-amber-400" />
          Store Profile, Receipt & Suppliers
        </h1>
        <p className="text-xs text-slate-400">
          Configure thermal printer layout, billing rules and stationery vendor purchase ledger
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Store & Thermal Receipt Settings */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Icon name="printer" className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Thermal Receipt Layout</h2>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-medium text-slate-300">Store Trading Name on Bill:</label>
              <input
                type="text"
                required
                value={storeProfile.name}
                onChange={(e) => setStoreProfile({ ...storeProfile, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-slate-300">Tagline / Services Subhead:</label>
              <input
                type="text"
                value={storeProfile.tagline}
                onChange={(e) => setStoreProfile({ ...storeProfile, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-slate-300">Physical Store Address:</label>
              <input
                type="text"
                value={storeProfile.address}
                onChange={(e) => setStoreProfile({ ...storeProfile, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-medium text-slate-300">Store Contact Number:</label>
                <input
                  type="text"
                  value={storeProfile.phone}
                  onChange={(e) => setStoreProfile({ ...storeProfile, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-300">Tax / NTN Registration:</label>
                <input
                  type="text"
                  value={storeProfile.ntn}
                  onChange={(e) => setStoreProfile({ ...storeProfile, ntn: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-medium text-slate-300">Footer Return & Exchange Policy:</label>
              <input
                type="text"
                value={storeProfile.receiptPolicy}
                onChange={(e) => setStoreProfile({ ...storeProfile, receiptPolicy: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={storeProfile.autoPrint}
                  onChange={(e) => setStoreProfile({ ...storeProfile, autoPrint: e.target.checked })}
                  className="rounded border-slate-700 text-amber-500 bg-slate-950"
                />
                <span>Automatically trigger thermal print on payment</span>
              </label>

              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition shadow-md shadow-amber-500/20"
              >
                Save Layout
              </button>
            </div>
          </form>
        </div>

        {/* Right: Stationery Suppliers / Vendors */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Icon name="truck" className="w-5 h-5 text-blue-400" />
              <div>
                <h2 className="text-base font-bold text-white">Stationery Suppliers (Vendors)</h2>
                <p className="text-[11px] text-slate-400">Total Payable: Rs. {totalPayableToSuppliers.toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddSupplierOpen(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-1 shadow-md shadow-blue-600/20"
            >
              <Icon name="plus" className="w-3.5 h-3.5" />
              <span>Add Supplier</span>
            </button>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[460px] pr-1">
            {suppliers.map((sup) => (
              <div
                key={sup.id}
                className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl flex items-center justify-between gap-3 hover:border-slate-700 transition"
              >
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-slate-100 truncate">{sup.name}</h4>
                  <p className="text-[11px] text-slate-400">{sup.category}</p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {sup.contact} • {sup.phone}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Balance Payable</span>
                  <span
                    className={`text-xs font-mono font-bold ${
                      sup.payable > 0 ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    Rs. {sup.payable.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block">{sup.terms}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Supplier Modal */}
      {isAddSupplierOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add New Stationery Vendor</h3>
              <button
                onClick={() => setIsAddSupplierOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSupplier} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Supplier / Company Name:</label>
                <input
                  type="text"
                  required
                  value={newSupName}
                  onChange={(e) => setNewSupName(e.target.value)}
                  placeholder="e.g. Piano Pen Distributors"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Contact Person Name:</label>
                <input
                  type="text"
                  value={newSupContact}
                  onChange={(e) => setNewSupContact(e.target.value)}
                  placeholder="e.g. Asif Raza (Sales Officer)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Phone Number:</label>
                  <input
                    type="text"
                    value={newSupPhone}
                    onChange={(e) => setNewSupPhone(e.target.value)}
                    placeholder="0300-1122334"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Opening Balance (PKR):</label>
                  <input
                    type="number"
                    min="0"
                    value={newSupPayable}
                    onChange={(e) => setNewSupPayable(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Category Provided:</label>
                <input
                  type="text"
                  value={newSupCategory}
                  onChange={(e) => setNewSupCategory(e.target.value)}
                  placeholder="e.g. Ballpoints, Gels & Highlighters"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSupplierOpen(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition"
                >
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
