import React from 'react';

const Dashboard = ({ summary }) => {
  // Indian currency (₹) format karne ke liye function
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-2">
      
      {/* 1. Top Bar / Header Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo Box */}
          <div className="w-12 h-12 bg-slate-200 text-slate-700 font-bold flex items-center justify-center rounded border tracking-wider text-xs shadow-inner">
            SUITS
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Hello, Naresh Tailor</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              Suits Workspaces Private Limited <span className="text-gray-400">• All Locations ▾</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Inner Nav Links */}
      <div className="flex gap-6 border-b text-sm font-medium text-gray-500 pb-1">
        <span className="text-blue-600 border-b-2 border-blue-600 pb-2 cursor-pointer font-semibold">Dashboard</span>
        <span className="hover:text-gray-800 cursor-pointer pb-2">Fiscal Year-End Tasks</span>
        <span className="hover:text-gray-800 cursor-pointer pb-2">Getting Started ▾</span>
      </div>

      {/* 3. Receivables & Payables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Total Receivables Box */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>Total Receivables</span>
              <span className="text-blue-600 cursor-pointer font-semibold hover:underline">+ New</span>
            </div>
            <p className="text-sm text-gray-600 mt-4 font-medium">
              Total Unpaid Invoices: {formatCurrency(summary.totalReceivables || 10111285.98)}
            </p>
            <h2 className="text-2xl font-black text-gray-900 mt-1">
              {formatCurrency(summary.totalReceivables || 10111285.98)}
            </h2>
          </div>
          
          {/* Progress Bar (Blue & Orange) */}
          <div className="mt-6">
            <div className="w-full bg-orange-500 h-3 rounded-full flex overflow-hidden">
              <div className="bg-blue-500 h-full shadow" style={{ width: '35%' }}></div>
            </div>
            <div className="flex gap-4 text-xs text-gray-500 mt-3 font-medium">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block"></span> Current: ₹28,23,213.40</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-orange-500 rounded-full inline-block"></span> Overdue: ₹72,88,072.58 ▾</span>
            </div>
          </div>
        </div>

        {/* Total Payables Box */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>Total Payables</span>
              <span className="text-blue-600 cursor-pointer font-semibold hover:underline">+ New</span>
            </div>
            <p className="text-sm text-gray-600 mt-4 font-medium">
              Total Unpaid Bills: {formatCurrency(summary.totalPayables || 7988831.60)}
            </p>
            <h2 className="text-2xl font-black text-gray-900 mt-1">
              {formatCurrency(summary.totalPayables || 7988831.60)}
            </h2>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-orange-500 h-3 rounded-full flex overflow-hidden">
              <div className="bg-blue-500 h-full shadow" style={{ width: '15%' }}></div>
            </div>
            <div className="flex gap-4 text-xs text-gray-500 mt-3 font-medium">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block"></span> Current: ₹9,00,956.60</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-orange-500 rounded-full inline-block"></span> Overdue: ₹70,87,875.00 ▾</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Cash Flow Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-3">
          <span>Cash Flow</span>
          <span className="text-gray-500 border rounded px-2 py-0.5 bg-gray-50 cursor-pointer text-[11px] font-medium">This Fiscal Year ▾</span>
        </div>
        
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between font-semibold text-gray-700">
            <span>Cash as on 01/04/2026</span>
            <span className="text-gray-900 font-bold">₹1,08,36,412.60</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="text-emerald-600 font-medium">Incoming</span>
            <span>₹0.00</span>
          </div>
          <div className="flex justify-between text-gray-600 border-b pb-3">
            <span className="text-pink-600 font-medium">Outgoing</span>
            <span>₹17,671.00</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;