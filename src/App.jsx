import React, { useState, useEffect } from 'react';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMERS,
  SAMPLE_RECENT_BILLS,
} from './data/mockData';
import { LoginScreen } from './components/LoginScreen';
import { PosTopNav } from './components/pos/PosTopNav';
import { PosSidebar } from './components/pos/PosSidebar';
import { KpiBanner } from './components/pos/KpiBanner';
import { ProductCatalog } from './components/pos/ProductCatalog';
import { ActiveCart } from './components/pos/ActiveCart';
import { PaymentModal } from './components/pos/PaymentModal';
import { ThermalReceiptModal } from './components/pos/ThermalReceiptModal';
import { RecentBillsModal } from './components/pos/RecentBillsModal';
import { HeldBillsModal } from './components/pos/HeldBillsModal';
import { ShiftCloseModal } from './components/pos/ShiftCloseModal';
import { QuickServiceModal } from './components/pos/QuickServiceModal';
import { InventoryManager } from './components/inventory/InventoryManager';
import { AddInventoryModal } from './components/inventory/AddInventoryModal';
import { ExecutiveDashboard } from './components/dashboard/ExecutiveDashboard';
import { AllProductsCatalog } from './components/products/AllProductsCatalog';
import { PhotostatServiceView } from './components/services/PhotostatServiceView';
import { SalesInvoicesView } from './components/sales/SalesInvoicesView';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { KhataLedger } from './components/khata/KhataLedger';
import { StoreSettings } from './components/settings/StoreSettings';
import { Icon } from './components/Icons';

export default function App() {
  // Authentication / User Session State
  const [currentUser, setCurrentUser] = useState({
    name: 'Ali Raza',
    role: 'Counter Manager',
    email: 'manager@royalstationers.com',
    counter: 'Counter 01',
    shift: 'Morning Shift',
    loginTime: '08:00 AM',
  });

  // Active Main Navigation: 'dashboard' | 'pos' | 'products' | 'inventory' | 'services' | 'khata' | 'sales' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobilePosView, setMobilePosView] = useState('catalog'); // 'catalog' | 'cart'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Bright View / Daylight Retail Theme State (persisted in localStorage)
  const [isBrightView, setIsBrightView] = useState(() => {
    return localStorage.getItem('royal_theme') === 'bright';
  });

  const toggleBrightView = () => {
    setIsBrightView((prev) => {
      const next = !prev;
      localStorage.setItem('royal_theme', next ? 'bright' : 'dark');
      showToast(next ? '☀️ Switched to Bright Daytime View' : '🌙 Switched to Dark Terminal View', 'info');
      return next;
    });
  };

  // Core Data States
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState(INITIAL_CUSTOMERS[0]);

  // Pre-seed Cart matching Mockup Screenshot exactly:
  // 1. Piano Crystal Gel Pen 0.7mm (Rs. 45)
  // 2. Royal A4 Spiral Notebook 200 Pgs (Rs. 380)
  // 3. 3M Post-it Neon Sticky Notes (Rs. 70)
  const [cart, setCart] = useState([
    {
      id: 'prod-003',
      name: 'Piano Crystal Gel Pen 0.7mm',
      category: 'pens',
      barcode: '8964000103',
      price: 45,
      qty: 1,
      unit: 'pcs',
      emoji: '✒️',
      cartId: 'cart-init-1',
    },
    {
      id: 'prod-007',
      name: 'Royal A4 Spiral Notebook (200 Pgs)',
      category: 'paper',
      barcode: '89640001021',
      price: 380,
      qty: 1,
      unit: 'book',
      emoji: '📓',
      cartId: 'cart-init-2',
    },
    {
      id: 'prod-010',
      name: '3M Post-it Neon Sticky Notes (3x3inch, 100 Sheets)',
      category: 'paper',
      barcode: '8964000301',
      price: 70,
      qty: 1,
      unit: 'pcs',
      emoji: '🗒️',
      cartId: 'cart-init-3',
    },
  ]);

  const [discount, setDiscount] = useState('0');
  const [discountType, setDiscountType] = useState('percent');
  const [taxEnabled, setTaxEnabled] = useState(true); // GST enabled to match mockup PKR 520

  // Registers & Operations
  const [heldBills, setHeldBills] = useState([]);
  const [recentBills, setRecentBills] = useState(SAMPLE_RECENT_BILLS);
  const [openingCash] = useState(5000);

  // Modals Visibility
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activeBillSummary, setActiveBillSummary] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState(null);
  const [isHeldBillsOpen, setIsHeldBillsOpen] = useState(false);
  const [isRecentBillsOpen, setIsRecentBillsOpen] = useState(false);
  const [isShiftCloseOpen, setIsShiftCloseOpen] = useState(false);
  const [isQuickServiceOpen, setIsQuickServiceOpen] = useState(false);
  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false);

  // Dynamic Toast Feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };


  // Customer selection
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    if (customer.discountPercent > 0) {
      setDiscount(customer.discountPercent);
      setDiscountType('percent');
      showToast(`${customer.discountPercent}% VIP discount applied for ${customer.name}`, 'success');
    } else {
      setDiscount('0');
    }
  };

  // Add Item to Bill
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartId: `cart-${product.id}-${Date.now()}`,
          qty: 1,
        },
      ];
    });
    showToast(`Added: ${product.name}`, 'info');
  };

  // Add Custom Service (Photostat / Print)
  const handleAddServiceItem = (serviceItem) => {
    setCart((prev) => [...prev, serviceItem]);
    showToast(`Added Service: ${serviceItem.name}`, 'info');
  };

  // Quantity Update
  const handleUpdateQty = (cartId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.cartId || item.id) === cartId ? { ...item, qty: newQty } : item
      )
    );
  };

  // Remove Line Item
  const handleRemoveItem = (cartId) => {
    setCart((prev) => prev.filter((item) => (item.cartId || item.id) !== cartId));
  };

  // Clear Bill
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear this active bill?')) {
      setCart([]);
      setDiscount('0');
      setSelectedCustomer(customers[0]);
      setMobilePosView('catalog');
      showToast('Active bill cleared', 'info');
    }
  };

  // Hold / Park Bill (F4)
  const handleHoldBill = () => {
    if (cart.length === 0) return;

    const newHeld = {
      id: `held-${Date.now()}`,
      heldId: `#PARK-${heldBills.length + 1}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customer: selectedCustomer,
      items: [...cart],
      discount,
      discountType,
    };

    setHeldBills((prev) => [newHeld, ...prev]);
    setCart([]);
    setDiscount('0');
    setSelectedCustomer(customers[0]);
    setMobilePosView('catalog');
    showToast(`Bill parked as ${newHeld.heldId}`, 'warning');
  };

  // Resume Parked Bill
  const handleResumeBill = (held) => {
    setCart(held.items);
    setSelectedCustomer(held.customer || customers[0]);
    setDiscount(held.discount || '0');
    setDiscountType(held.discountType || 'percent');
    setHeldBills((prev) => prev.filter((b) => b.id !== held.id));
    setIsHeldBillsOpen(false);
    showToast(`Resumed ${held.heldId}`, 'success');
  };

  // Discard Parked Bill
  const handleDiscardBill = (heldId) => {
    setHeldBills((prev) => prev.filter((b) => b.id !== heldId));
    showToast('Parked bill discarded', 'info');
  };

  // Trigger Checkout Modal
  const triggerCheckout = (summary) => {
    if (!summary) {
      const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
      let discAmount = discountType === 'percent' ? (subtotal * (Number(discount) || 0)) / 100 : Number(discount) || 0;
      discAmount = Math.min(discAmount, subtotal);
      const taxAmount = taxEnabled ? (subtotal - discAmount) * 0.05 : 0;
      const grandTotal = Math.round(subtotal - discAmount + taxAmount);
      summary = { subtotal, discountAmount: discAmount, taxAmount, grandTotal };
    }
    setActiveBillSummary(summary);
    setIsPaymentOpen(true);
  };

  // Complete Payment & Finalize Invoice
  const handleCompletePayment = (paymentDetails) => {
    const invoiceId = `RS-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = {
      id: invoiceId,
      time: paymentDetails.timestamp,
      customer: selectedCustomer,
      items: [...cart],
      subtotal: activeBillSummary.subtotal,
      discountAmount: activeBillSummary.discountAmount,
      taxAmount: activeBillSummary.taxAmount,
      total: activeBillSummary.grandTotal,
      paymentMode: paymentDetails.paymentMode,
      cashReceived: paymentDetails.cashTendered,
      changeDue: paymentDetails.changeDue,
      cashier: `${currentUser?.name} (${currentUser?.counter?.split('—')[0]?.trim() || 'Counter 01'})`,
      status: 'Completed',
    };

    // Auto Deduct Stock from Inventory
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((ci) => ci.id === prod.id);
        if (cartItem && !prod.isService) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartItem.qty),
          };
        }
        return prod;
      })
    );

    // Save to sales records
    setRecentBills((prev) => [newOrder, ...prev]);

    // Close payment modal & open Thermal Receipt Modal
    setIsPaymentOpen(false);
    setCompletedOrderData(newOrder);
    setIsReceiptOpen(true);

    // Reset active cart
    setCart([]);
    setDiscount('0');
    setSelectedCustomer(customers[0]);
    setMobilePosView('catalog');
    showToast(`Payment successful! Bill #${invoiceId} generated`, 'success');
  };

  // Re-print previous bill
  const handleReprintBill = (bill) => {
    setCompletedOrderData(bill);
    setIsRecentBillsOpen(false);
    setIsReceiptOpen(true);
  };

  // Void / Refund bill
  const handleRefundBill = (bill) => {
    if (window.confirm(`Are you sure you want to void and refund bill #${bill.id}?`)) {
      setRecentBills((prev) =>
        prev.map((b) => (b.id === bill.id ? { ...b, status: 'Refunded' } : b))
      );
      setProducts((prev) =>
        prev.map((prod) => {
          const item = bill.items?.find((bi) => bi.id === prod.id);
          if (item && !prod.isService) {
            return { ...prod, stock: prod.stock + item.qty };
          }
          return prod;
        })
      );
      showToast(`Bill #${bill.id} voided & refunded`, 'warning');
    }
  };

  // Inventory Management Handlers
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added ${newProduct.name} to inventory`, 'success');
  };

  const handleAddStockToExisting = ({ productId, quantityAdded, costPrice, sellingPrice }) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            stock: p.stock + quantityAdded,
            costPrice: costPrice !== undefined && costPrice !== '' ? Number(costPrice) : p.costPrice,
            price: sellingPrice !== undefined && sellingPrice !== '' ? Number(sellingPrice) : p.price,
          };
        }
        return p;
      })
    );
    showToast(`Restocked +${quantityAdded} units successfully!`, 'success');
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast(`Updated ${updatedProduct.name}`, 'info');
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog', 'warning');
  };

  const handleQuickStockAdjust = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  // Customer Khata Handlers
  const handleAddCustomer = (newCustomer) => {
    setCustomers((prev) => [...prev, newCustomer]);
    showToast(`Registered client: ${newCustomer.name}`, 'success');
  };

  // Total metrics
  const totalStockCount = products.reduce((s, p) => s + (p.isService ? 0 : p.stock), 0);
  const completedBills = recentBills.filter((b) => b.status === 'Completed');
  const todaySalesTotal = completedBills.reduce((s, b) => s + (b.total || 0), 12480);
  const totalBillsCount = completedBills.length + 26;
  const averageBillValue = Math.round(todaySalesTotal / totalBillsCount);

  // Cart summary calculations for mobile navigation
  const cartItemsCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let cartDiscountAmount = discountType === 'percent' ? (cartSubtotal * (Number(discount) || 0)) / 100 : Number(discount) || 0;
  cartDiscountAmount = Math.min(cartDiscountAmount, cartSubtotal);
  const cartTaxAmount = taxEnabled ? (cartSubtotal - cartDiscountAmount) * 0.05 : 0;
  const cartGrandTotal = Math.round(cartSubtotal - cartDiscountAmount + cartTaxAmount);

  // If not logged in, show Login Screen (with Bright View toggle support)
  if (!currentUser) {
    return (
      <div className={isBrightView ? 'bright-theme' : ''}>
        <LoginScreen
          onLogin={(user) => setCurrentUser(user)}
          isBrightView={isBrightView}
          onToggleBrightView={toggleBrightView}
        />
      </div>
    );
  }

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden font-sans select-none transition-colors duration-200 ${
        isBrightView
          ? 'bright-theme bg-slate-50 text-slate-900'
          : 'bg-[#080E1A] text-slate-100'
      }`}
    >
      {/* Top Header Bar */}
      <PosTopNav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenQuickService={() => setIsQuickServiceOpen(true)}
        isBrightView={isBrightView}
        onToggleBrightView={toggleBrightView}
        onOpenSettings={() => setActiveTab(activeTab === 'settings' ? 'pos' : 'settings')}
        onOpenAddInventory={() => setIsAddInventoryOpen(true)}
        user={currentUser}
        cartCount={cartItemsCount}
        onOpenMobileCart={() => {
          setActiveTab('pos');
          setMobilePosView('cart');
        }}
      />

      {/* Main Multi-Module SaaS Workspace */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* 1. Left Sidebar Navigation (Main Categories) */}
        <PosSidebar
          activeTab={activeTab}
          onSelectTab={(tabId) => {
            setActiveTab(tabId);
            if (tabId === 'pos') setMobilePosView('catalog');
          }}
          user={currentUser}
          onOpenSettings={() => setActiveTab('settings')}
          onOpenAddInventory={() => setIsAddInventoryOpen(true)}
          cartCount={cartItemsCount}
          onToggleMobilePosView={() => setMobilePosView((prev) => (prev === 'catalog' ? 'cart' : 'catalog'))}
        />

        {/* 2. Center Content Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-[#080E1A]">
          {/* A. Executive Store Dashboard (Charts, Graphs & KPIs) */}
          {activeTab === 'dashboard' && (
            <ExecutiveDashboard
              recentBills={recentBills}
              products={products}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAddInventory={() => setIsAddInventoryOpen(true)}
              onOpenQuickService={() => setIsQuickServiceOpen(true)}
            />
          )}

          {/* B. POS Counter Manager (Retail Billing Cockpit) */}
          {activeTab === 'pos' && (
            <>
              {/* Mobile Segmented Toggle Bar (Stationery Catalog vs Active Bill) */}
              <div className="lg:hidden flex items-center p-1.5 bg-[#0B1120] border-b border-slate-800 shrink-0 gap-1.5">
                <button
                  type="button"
                  onClick={() => setMobilePosView('catalog')}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    mobilePosView === 'catalog'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                      : 'bg-[#0F172A] text-slate-400 hover:text-white border border-slate-800/80'
                  }`}
                >
                  <Icon name="layers" className="w-3.5 h-3.5" />
                  <span>Catalog</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMobilePosView('cart')}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer relative ${
                    mobilePosView === 'cart'
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                      : 'bg-[#0F172A] text-slate-400 hover:text-white border border-slate-800/80'
                  }`}
                >
                  <Icon name="cart" className="w-3.5 h-3.5" />
                  <span>Active Bill</span>
                  {cartItemsCount > 0 && (
                    <span
                      className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full ${
                        mobilePosView === 'cart'
                          ? 'bg-slate-950 text-amber-400'
                          : 'bg-amber-500 text-slate-950'
                      }`}
                    >
                      {cartItemsCount}
                    </span>
                  )}
                  <span className="font-mono text-[10px] opacity-80">
                    • Rs. {cartGrandTotal.toLocaleString()}
                  </span>
                </button>
              </div>

              {/* Mobile Cart View (Active when mobilePosView === 'cart' on < lg) */}
              <div className={`lg:hidden flex-1 flex flex-col min-h-0 ${mobilePosView === 'cart' ? 'flex' : 'hidden'}`}>
                <ActiveCart
                  cart={cart}
                  customers={customers}
                  selectedCustomer={selectedCustomer}
                  onSelectCustomer={handleSelectCustomer}
                  onUpdateQty={handleUpdateQty}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                  onHoldBill={handleHoldBill}
                  onCheckout={triggerCheckout}
                  discount={discount}
                  setDiscount={setDiscount}
                  discountType={discountType}
                  setDiscountType={setDiscountType}
                  taxEnabled={taxEnabled}
                  setTaxEnabled={setTaxEnabled}
                  isMobileView={true}
                  onCloseMobile={() => setMobilePosView('catalog')}
                />
              </div>

              {/* Catalog View (Shown on desktop lg:flex, and on mobile when mobilePosView === 'catalog') */}
              <div className={`flex-1 flex flex-col min-h-0 ${mobilePosView === 'catalog' ? 'flex' : 'hidden lg:flex'}`}>
                {/* Top 4 KPI Banner Cards */}
                <KpiBanner
                  totalItemsCount={totalStockCount}
                  todaySales={todaySalesTotal}
                  totalBillsCount={totalBillsCount}
                  averageBillValue={averageBillValue}
                />

                {/* Product Grid Area with Category Filter Pills */}
                <ProductCatalog
                  products={products}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(catId) => setSelectedCategory(catId)}
                  searchQuery={searchQuery}
                  onAddToCart={handleAddToCart}
                />

                {/* Mobile Sticky Bottom Checkout Bar (when browsing products) */}
                <div className="lg:hidden p-2 bg-[#0B1120] border-t border-slate-800 flex items-center justify-between gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setMobilePosView('cart')}
                    className="flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 border border-slate-700/80 px-2.5 py-1.5 rounded-xl text-left flex-1 transition cursor-pointer min-w-0"
                  >
                    <div className="relative shrink-0">
                      <Icon name="cart" className="w-4 h-4 text-amber-400" />
                      {cartItemsCount > 0 && (
                        <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                          {cartItemsCount}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 leading-none truncate">
                        {cartItemsCount === 0 ? 'Bill is Empty' : `${cartItemsCount} Items in Bill`}
                      </div>
                      <div className="text-xs font-mono font-bold text-amber-400 leading-tight">
                        PKR {cartGrandTotal.toLocaleString()}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMobilePosView('cart')}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1 shrink-0 transition cursor-pointer"
                  >
                    <span>View Bill</span>
                    <Icon name="chevron-right" className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* C. All Products Catalog & Margins */}
          {activeTab === 'products' && (
            <AllProductsCatalog
              products={products}
              categories={categories}
              onAddToCart={handleAddToCart}
              onOpenAddProduct={() => setIsAddInventoryOpen(true)}
              onOpenAddInventory={() => setIsAddInventoryOpen(true)}
              onQuickStockAdjust={handleQuickStockAdjust}
            />
          )}

          {/* D. Inventory & Stock Manager */}
          {activeTab === 'inventory' && (
            <InventoryManager
              products={products}
              categories={categories}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onQuickStockAdjust={handleQuickStockAdjust}
            />
          )}

          {/* E. Photostat, Printing & Binding Counter */}
          {activeTab === 'services' && (
            <PhotostatServiceView
              onAddToCart={handleAddToCart}
              onNavigatePOS={() => setActiveTab('pos')}
            />
          )}

          {/* F. Customer Khata Ledger */}
          {activeTab === 'khata' && (
            <KhataLedger
              customers={customers}
              onAddCustomer={handleAddCustomer}
              onReceivePayment={({ customerName, amount }) => {
                showToast(`Collected Rs. ${amount.toLocaleString()} from ${customerName}`, 'success');
              }}
            />
          )}

          {/* G. Sales Invoices & Register */}
          {activeTab === 'sales' && (
            <SalesInvoicesView
              recentBills={recentBills}
              onReprintBill={handleReprintBill}
              onRefundBill={handleRefundBill}
              onNavigatePOS={() => setActiveTab('pos')}
            />
          )}

          {/* H. Store Settings */}
          {activeTab === 'settings' && <StoreSettings />}
        </div>

        {/* 3. Right Sidebar: Active Bill / Cart (Shown on Desktop >= lg) */}
        {activeTab === 'pos' && (
          <div className="hidden lg:flex h-full shrink-0">
            <ActiveCart
              cart={cart}
              customers={customers}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={handleSelectCustomer}
              onUpdateQty={handleUpdateQty}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onHoldBill={handleHoldBill}
              onCheckout={triggerCheckout}
              discount={discount}
              setDiscount={setDiscount}
              discountType={discountType}
              setDiscountType={setDiscountType}
              taxEnabled={taxEnabled}
              setTaxEnabled={setTaxEnabled}
            />
          </div>
        )}
      </div>

      {/* Global Modals & Dialogs */}
      <AddInventoryModal
        isOpen={isAddInventoryOpen}
        onClose={() => setIsAddInventoryOpen(false)}
        products={products}
        categories={categories}
        onAddStockToExisting={handleAddStockToExisting}
        onAddNewProduct={handleAddProduct}
      />

      {/* Global Modals & Dialogs */}
      <QuickServiceModal
        isOpen={isQuickServiceOpen}
        onClose={() => setIsQuickServiceOpen(false)}
        onAddServiceItem={handleAddServiceItem}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        billSummary={activeBillSummary}
        customer={selectedCustomer}
        onClose={() => setIsPaymentOpen(false)}
        onCompletePayment={handleCompletePayment}
      />

      <ThermalReceiptModal
        isOpen={isReceiptOpen}
        orderData={completedOrderData}
        onClose={() => setIsReceiptOpen(false)}
        onNewSale={() => {
          setIsReceiptOpen(false);
          setCompletedOrderData(null);
        }}
      />

      <RecentBillsModal
        isOpen={isRecentBillsOpen}
        bills={recentBills}
        onClose={() => setIsRecentBillsOpen(false)}
        onReprintBill={handleReprintBill}
        onRefundBill={handleRefundBill}
      />

      <HeldBillsModal
        isOpen={isHeldBillsOpen}
        heldBills={heldBills}
        onClose={() => setIsHeldBillsOpen(false)}
        onResumeBill={handleResumeBill}
        onDiscardBill={handleDiscardBill}
      />

      <ShiftCloseModal
        isOpen={isShiftCloseOpen}
        user={currentUser}
        openingCash={openingCash}
        cashSales={todaySalesTotal}
        cardSales={4200}
        totalInvoices={totalBillsCount}
        onClose={() => setIsShiftCloseOpen(false)}
        onEndShift={() => {
          setIsShiftCloseOpen(false);
          setCurrentUser(null);
        }}
      />

      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-2 duration-150 pointer-events-none">
          <div
            className={`px-4 py-2.5 rounded-xl border shadow-xl flex items-center gap-2 text-xs font-semibold ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-300'
                : 'bg-slate-900/90 border-slate-700 text-slate-200'
            }`}
          >
            <Icon
              name={toast.type === 'success' ? 'check' : toast.type === 'warning' ? 'alert' : 'sparkles'}
              className="w-4 h-4 shrink-0"
            />
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
