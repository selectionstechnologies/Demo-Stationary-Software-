import React, { useState } from 'react';
import { Icon } from '../Icons';

export const KhataLedger = ({ customers, onAddCustomer, onReceivePayment }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'due'
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [paymentCustomer, setPaymentCustomer] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [payNotes, setPayNotes] = useState('');

  // New Customer Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newType, setNewType] = useState('student');
  const [newDiscount, setNewDiscount] = useState('0');
  const [newCreditLimit, setNewCreditLimit] = useState('5000');

  // Customer List with sample balances
  const [customerList, setCustomerList] = useState([
    {
      id: 'cust-001',
      name: 'Sir Tariq (APS Senior Teacher)',
      phone: '0300-8451299',
      points: 140,
      discountPercent: 5,
      type: 'Teacher / Staff',
      balanceDue: 2450,
      creditLimit: 10000,
      lastPayment: 'Yesterday (Rs. 1,000)',
    },
    {
      id: 'cust-002',
      name: 'Hamza Farooq (FAST University Student)',
      phone: '0321-4478120',
      points: 65,
      discountPercent: 3,
      type: 'Student',
      balanceDue: 0,
      creditLimit: 2000,
      lastPayment: '3 days ago (Rs. 500)',
    },
    {
      id: 'cust-003',
      name: 'Zubair Associates (Corporate Office)',
      phone: '0333-9081244',
      points: 420,
      discountPercent: 8,
      type: 'Corporate Account',
      balanceDue: 8900,
      creditLimit: 30000,
      lastPayment: '02 Oct (Rs. 15,000)',
    },
    {
      id: 'cust-004',
      name: 'Madam Ayesha (Beaconhouse Coordinator)',
      phone: '0312-5559812',
      points: 210,
      discountPercent: 5,
      type: 'School Coordinator',
      balanceDue: 1800,
      creditLimit: 15000,
      lastPayment: 'Last week (Rs. 3,200)',
    },
  ]);

  const filtered = customerList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDue = filterType === 'all' || (filterType === 'due' && c.balanceDue > 0);
    return matchesSearch && matchesDue;
  });

  const totalOutstandingUdhaar = customerList.reduce((s, c) => s + c.balanceDue, 0);
  const totalCustomersWithDue = customerList.filter((c) => c.balanceDue > 0).length;

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newCust = {
      id: `cust-${Date.now()}`,
      name: newName,
      phone: newPhone,
      type: newType,
      discountPercent: Number(newDiscount) || 0,
      points: 0,
      balanceDue: 0,
      creditLimit: Number(newCreditLimit) || 5000,
      lastPayment: 'New Account',
    };

    setCustomerList((prev) => [newCust, ...prev]);
    if (onAddCustomer) onAddCustomer(newCust);
    setIsAddCustomerOpen(false);
    setNewName('');
    setNewPhone('');
  };

  const handleCollectPayment = (e) => {
    e.preventDefault();
    if (!payAmount || Number(payAmount) <= 0) return;

    const amt = Number(payAmount);
    setCustomerList((prev) =>
      prev.map((c) =>
        c.id === paymentCustomer.id
          ? {
              ...c,
              balanceDue: Math.max(0, c.balanceDue - amt),
              lastPayment: `Today (Rs. ${amt.toLocaleString()})`,
            }
          : c
      )
    );

    if (onReceivePayment) {
      onReceivePayment({
        customerId: paymentCustomer.id,
        customerName: paymentCustomer.name,
        amount: amt,
        notes: payNotes,
      });
    }

    alert(`Received Rs. ${amt.toLocaleString()} from ${paymentCustomer.name}. Balance updated!`);
    setPaymentCustomer(null);
    setPayAmount('');
    setPayNotes('');
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-950 p-4 lg:p-6 overflow-y-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight flex items-center gap-2.5">
            <Icon name="users" className="w-7 h-7 text-amber-400" />
            Customer Khata & Credit Ledger
          </h1>
          <p className="text-xs text-slate-400">
            Track regular client credit balances, schools, academy accounts & receive Udhaar payments
          </p>
        </div>

        <button
          onClick={() => setIsAddCustomerOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer self-start sm:self-auto"
        >
          <Icon name="plus" className="w-4 h-4" />
          <span>Register Regular Customer</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Khata Udhaar</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-red-400 tracking-tight">
            Rs. {totalOutstandingUdhaar.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Across {totalCustomersWithDue} pending accounts</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Accounts</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
            {customerList.length} Clients
          </div>
          <p className="text-[11px] text-slate-500">Teachers, Offices & Students</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recovered This Month</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
            Rs. 42,500
          </div>
          <p className="text-[11px] text-slate-500">Cash settled against balances</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-1 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Loyalty Points</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 tracking-tight">
            835 Pts
          </div>
          <p className="text-[11px] text-slate-500">Redeemable in store purchases</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon name="search" className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer by name or phone..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filterType === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Accounts
          </button>
          <button
            onClick={() => setFilterType('due')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filterType === 'due'
                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pending Udhaar Due ({totalCustomersWithDue})
          </button>
        </div>
      </div>

      {/* Customer Accounts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Client / Account Name</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Account Type</th>
                <th className="py-3 px-4">VIP Discount</th>
                <th className="py-3 px-4">Credit Limit</th>
                <th className="py-3 px-4">Balance Due (Udhaar)</th>
                <th className="py-3 px-4">Last Payment</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-100">{c.name}</div>
                    <div className="text-[10px] text-amber-400 font-mono">{c.points} Loyalty Pts</div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">{c.phone}</td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium">
                      {c.type}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {c.discountPercent > 0 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-bold">
                        {c.discountPercent}% VIP Off
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    Rs. {c.creditLimit.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    {c.balanceDue > 0 ? (
                      <span className="px-2.5 py-1 rounded-xl font-mono font-bold text-xs bg-red-950/40 text-red-300 border border-red-500/30">
                        Rs. {c.balanceDue.toLocaleString()}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400">
                        ✓ Balanced
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-slate-400">{c.lastPayment}</td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setPaymentCustomer(c);
                        setPayAmount(c.balanceDue > 0 ? c.balanceDue : '');
                      }}
                      className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Icon name="cash" className="w-3.5 h-3.5" />
                      <span>Receive Cash</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Payment Modal */}
      {paymentCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Collect Udhaar Cash</h3>
                <p className="text-xs text-slate-400">{paymentCustomer.name}</p>
              </div>
              <button
                onClick={() => setPaymentCustomer(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center">
              <span className="text-xs text-slate-400">Current Pending Due:</span>
              <span className="text-lg font-black font-mono text-red-400">
                Rs. {paymentCustomer.balanceDue.toLocaleString()}
              </span>
            </div>

            <form onSubmit={handleCollectPayment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Amount Received (PKR):</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder="Enter cash received"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-base font-mono font-bold text-emerald-400 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Notes / Slip # (Optional):</label>
                <input
                  type="text"
                  value={payNotes}
                  onChange={(e) => setPayNotes(e.target.value)}
                  placeholder="e.g. Paid in cash by school messenger"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none placeholder-slate-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentCustomer(null)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  Confirm & Update Khata
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Regular Customer Modal */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Register Regular Client</h3>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Client / Institution Name:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sir Qasim (Mathematics Academy)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Contact Number:</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Client Type:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none cursor-pointer"
                  >
                    <option value="Teacher / Academy">Teacher / Academy</option>
                    <option value="Student">Student</option>
                    <option value="Office / Corporate">Office / Corporate</option>
                    <option value="Colony Resident">Colony Resident</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">VIP Discount (%):</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Max Credit Limit (PKR):</label>
                <input
                  type="number"
                  min="0"
                  value={newCreditLimit}
                  onChange={(e) => setNewCreditLimit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-amber-500/20"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
