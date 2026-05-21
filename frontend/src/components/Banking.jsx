
import React from 'react';
// Agar aapke project mein lucide-react install nahi hai toh pehle karein: npm install lucide-react
// Agar install nahi karna chahte, toh aap in icons ki jagah standard SVG use kar sakte hain.
import { 
  Briefcase, 
  Clock, 
  Building2, 
  CreditCard, 
  AlertTriangle, 
  ChevronDown, 
  Calendar,
  Upload,
  Plus,
  SlidersHorizontal,
  ArrowUpRight
} from 'lucide-react';

const Banking = () => {
  return (
    <div className="space-y-6 text-sm text-slate-600 font-sans bg-slate-50/50 p-6 rounded-xl min-h-screen">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 group cursor-pointer">
            Banking Overview 
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </h1>
          <p className="text-xs text-blue-600 cursor-pointer mt-1 hover:text-blue-700 hover:underline inline-flex items-center gap-1">
            Auto-upload bank statements from email
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-1.5 bg-white border border-slate-300 text-xs text-slate-700 font-medium px-3.5 py-2 rounded-lg hover:bg-slate-50 hover:border-slate-400 shadow-sm cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5" /> Import Statement
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-blue-700 shadow-sm cursor-pointer transition-all">
            <Plus className="w-3.5 h-3.5" /> Add Bank / Card
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-slate-300 text-xs text-slate-700 font-medium px-3.5 py-2 rounded-lg hover:bg-slate-50 hover:border-slate-400 shadow-sm cursor-pointer transition-all">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Manage Rules
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-between items-center text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200 shadow-3xs">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-pointer hover:text-blue-600 transition-colors">
          <span>All Accounts</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex items-center gap-1.5 cursor-pointer text-slate-500 hover:text-slate-800 transition-colors font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Last 30 days</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* 4 Financial Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Cash in Hand */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-slate-50 border border-slate-100 text-slate-600 rounded-xl">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cash In Hand</p>
            <h3 className="text-base font-black text-slate-900 mt-0.5">₹ -2,83,570.93</h3>
          </div>
        </div>

        {/* Card 2: Payment Clearing */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50/50 border border-blue-100/50 text-blue-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Payment Clearing</p>
            <h3 className="text-base font-black text-slate-900 mt-0.5">₹ 3,32,356.28</h3>
          </div>
        </div>

        {/* Card 3: Bank Balance (Active Status Focus) */}
        <div className="bg-white border-2 border-blue-600 rounded-xl p-4 flex items-center gap-4 shadow-md relative ring-4 ring-blue-50/50">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Bank Balance</p>
            <h3 className="text-base font-black text-slate-900 mt-0.5">₹ 1,07,69,956.25</h3>
          </div>
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>

        {/* Card 4: Card Balance */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Card Balance</p>
            <h3 className="text-base font-black text-slate-900 mt-0.5">₹ -43,497.20</h3>
          </div>
        </div>

      </div>

      {/* Uncategorized Warning Message Bar */}
      <div className="bg-amber-50/60 border border-amber-200/80 text-amber-900 text-xs rounded-xl p-3 flex justify-between items-center shadow-3xs backdrop-blur-xs">
        <span className="font-medium flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>You have <strong className="text-amber-900 font-bold bg-amber-200/60 px-1.5 py-0.5 rounded">592</strong> Uncategorized Transactions.</span>
        </span>
        <span className="text-blue-600 font-bold cursor-pointer hover:text-blue-700 hover:underline flex items-center gap-0.5">
          Categorize now <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Active Accounts Datatable View */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center justify-between">
          <span>Active Accounts</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 tracking-wider">
                <th className="p-4">Account Details</th>
                <th className="p-4">Uncategorized Transactions</th>
                <th className="p-4">Pending Checks</th>
                <th className="p-4 text-right">Amount in Bank</th>
                <th className="p-4 text-right">Amount in Zoho Books</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600 font-medium">
              
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4 font-semibold text-slate-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-400" /> Corporate Credit Card
                </td>
                <td className="p-4">
                  <span className="text-red-600 bg-red-50 font-semibold px-2 py-1 rounded-md border border-red-100 hover:bg-red-100/50 cursor-pointer transition-colors">
                    4 to be categorized
                  </span>
                </td>
                <td className="p-4 text-slate-400">—</td>
                <td className="p-4 text-right font-semibold text-slate-900">₹0.00</td>
                <td className="p-4 text-right font-bold text-red-600">₹ -31,606.29</td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> IndusInd Bank
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 ml-6">xxxx1993 • Updated: 03/04/2026</div>
                </td>
                <td className="p-4">
                  <span className="text-red-600 bg-red-50 font-semibold px-2 py-1 rounded-md border border-red-100 hover:bg-red-100/50 cursor-pointer transition-colors">
                    33 to be categorized
                  </span>
                </td>
                <td className="p-4 text-slate-400">—</td>
                <td className="p-4 text-right font-semibold text-slate-900">₹0.87</td>
                <td className="p-4 text-right font-bold text-slate-900">₹ 1,67,976.00</td>
              </tr>
              
              {/* Row 3 */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4 font-semibold text-slate-800 flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-500">QR</div> 
                  PAYTM QR CODE UPI
                </td>
                <td className="p-4 text-slate-400">—</td>
                <td className="p-4 text-slate-400">—</td>
                <td className="p-4 text-right font-semibold text-slate-900">₹0.00</td>
                <td className="p-4 text-right font-bold text-slate-500">₹ 0.00</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Banking;