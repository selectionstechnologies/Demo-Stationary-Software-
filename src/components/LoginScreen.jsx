import React, { useState } from 'react';
import { Icon } from './Icons';

export const LoginScreen = ({ onLogin, isBrightView, onToggleBrightView }) => {
  const [email, setEmail] = useState('manager@royalstationers.com');
  const [password, setPassword] = useState('royal1234');
  const [shift] = useState('General Shift');
  const [counter] = useState('Counter 01');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFillDemo = () => {
    setEmail('manager@royalstationers.com');
    setPassword('royal1234');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide terminal ID and cashier password.');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: 'Ali Raza',
        role: 'Counter Manager',
        email,
        counter,
        shift,
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-royal-950 to-slate-900 flex items-center justify-center p-4 relative">
      {/* Top Right Bright View Toggle on Login */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={onToggleBrightView}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer border shadow-lg ${
            isBrightView
              ? 'bg-amber-400 border-amber-500 text-slate-950'
              : 'bg-slate-900/90 border-slate-700 text-amber-400 hover:text-amber-300'
          }`}
          title={isBrightView ? 'Switch to Dark Night View' : 'Switch to Bright Daytime View'}
        >
          <Icon name={isBrightView ? 'moon' : 'sun'} className="w-4 h-4" />
          <span>{isBrightView ? 'Dark View' : 'Bright View'}</span>
        </button>
      </div>

      {/* Background ambient decorative glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 mb-2">
              <Icon name="crown" className="w-9 h-9" />
            </div>
            <h1 className="text-2xl font-bold font-display tracking-tight text-white">
              ROYAL STATIONERS
            </h1>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              B2C Counter Manager Terminal
            </p>
            <div className="inline-block bg-slate-800/80 border border-slate-700/60 rounded-full px-3 py-0.5 text-[11px] text-slate-400">
              Point of Sale • Retail Billing • Live Stock
            </div>
          </div>

          {/* Quick Demo Fill Button */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-400">Demo User: </span>
              <span className="text-slate-200 font-mono font-medium">Counter Manager</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 font-medium px-2.5 py-1 rounded-lg border border-amber-500/30 transition-colors inline-flex items-center gap-1"
            >
              <Icon name="sparkles" className="w-3.5 h-3.5" />
              Auto-Fill
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
                <Icon name="alert" className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email / Cashier ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Icon name="user" className="w-3.5 h-3.5 text-slate-400" />
                Cashier ID / Terminal Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cashier@royalstationers.com"
                className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Icon name="key" className="w-3.5 h-3.5 text-slate-400" />
                  Terminal Passcode
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition"
              />
            </div>



            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Terminal...</span>
                </>
              ) : (
                <>
                  <span>Launch Counter Manager</span>
                  <span className="text-xs bg-slate-950/20 px-1.5 py-0.5 rounded font-mono">↵</span>
                </>
              )}
            </button>
          </form>

          {/* Footer status */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Terminal Gateway Online
            </span>
            <span>Version 2.4 (SaaS B2C)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
