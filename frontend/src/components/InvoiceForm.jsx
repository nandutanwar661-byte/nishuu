import React, { useState, useEffect } from 'react';

const InvoiceForm = ({ onInvoiceSaved, onCancel, editData }) => {
  const [customers, setCustomers] = useState([]);
  const [meta, setMeta] = useState({
    customerName: '',
    location: 'Corporate',
    invoiceNumber: 'RAJ/INV-000000',
    orderNumber: '',
    invoiceDate: '18/05/2026',
    terms: 'Net 7',
    dueDate: '25/05/2026',
    customerNotes: 'Thank you for the payment.',
    termsConditions: 'Terms and conditions go here...',
    shippingCharges: 0,
    tdsTcsOption: 'TDS',
    taxSelect: 'Select a Tax'
  });

  const [tableItems, setTableItems] = useState([
    { itemDetails: '', quantity: 1, rate: 0, discount: 0, tax: 'Select Tax', amount: 0 }
  ]);

  useEffect(() => {
    // Localhost ko hata kar Render ki URL link laga di hai
    fetch('https://extraeffort-9i4m.onrender.com/api/customers/all')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error(err));

    if (editData) {
      setMeta(editData);
      setTableItems(editData.items || []);
    }
  }, [editData]);

  const handleTableChange = (index, field, value) => {
    const updated = [...tableItems];
    updated[index][field] = value;

    if (field === 'quantity' || field === 'rate' || field === 'discount') {
      const qty = Number(updated[index].quantity) || 0;
      const price = Number(updated[index].rate) || 0;
      const disc = Number(updated[index].discount) || 0;
      const gross = qty * price;
      updated[index].amount = Math.max(0, gross - (gross * (disc / 100)));
    }
    setTableItems(updated);
  };

  const subTotal = tableItems.reduce((acc, row) => acc + (row.amount || 0), 0);
  const totalAmount = subTotal + (Number(meta.shippingCharges) || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meta.customerName) {
      alert("⚠️ Please pick or input a valid Customer Name!");
      return;
    }

    const payload = { ...meta, items: tableItems, subTotal, total: totalAmount };
    
    // Yahan conditional link mapping update kar di hai
    const url = editData 
      ? `https://extraeffort-9i4m.onrender.com/api/invoices/${editData._id}`
      : 'https://extraeffort-9i4m.onrender.com/api/invoices/add';
    const method = editData ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resData = await response.json();
      if (resData.success) {
        alert(editData ? '🎉 Invoice Updated Successfully!' : '🎉 Invoice Registered & Dispatched!');
        if (onInvoiceSaved) onInvoiceSaved();
      }
    } catch (err) {
      alert('⚠️ Database pipeline linkage error.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 max-w-6xl mx-auto text-xs text-gray-700 font-sans">
      <div className="border-b pb-3 mb-5 flex justify-between items-center">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">📄 {editData ? 'Edit Invoice Profile' : 'New Invoice Ledger'}</h2>
        <span className="text-[10px] text-gray-400 font-bold">Zoho Automation Protocol</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Core Block Metadata Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="space-y-3">
            {/* Combo-box Input field for customer select or type */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-red-500">Customer Name*</label>
              <div className="col-span-2 relative">
                <input 
                  type="text"
                  list="customer-list"
                  value={meta.customerName} 
                  onChange={e => setMeta({...meta, customerName: e.target.value})} 
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 bg-white text-xs" 
                  placeholder="Select or add a customer"
                  required 
                />
                <datalist id="customer-list">
                  {customers.map(c => (
                    <option key={c._id || c.displayName} value={c.displayName} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-gray-500">Location</label>
              <select value={meta.location} onChange={e => setMeta({...meta, location: e.target.value})} className="col-span-2 border border-gray-300 rounded px-2.5 py-1.5 bg-white">
                <option value="Corporate">Corporate</option>
                <option value="Branch">Branch</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-red-500">Invoice#*</label>
              <input type="text" value={meta.invoiceNumber} onChange={e => setMeta({...meta, invoiceNumber: e.target.value})} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 font-bold" required />
            </div>
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-gray-500">Order Number</label>
              <input type="text" value={meta.orderNumber} onChange={e => setMeta({...meta, orderNumber: e.target.value})} className="col-span-2 border border-gray-300 rounded px-3 py-1.5" />
            </div>
          </div>
        </div>

        {/* Dynamic Dates Setup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4 max-w-4xl">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-red-500">Invoice Date*</label>
            <input type="text" value={meta.invoiceDate} onChange={e => setMeta({...meta, invoiceDate: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-500">Terms</label>
            <select value={meta.terms} onChange={e => setMeta({...meta, terms: e.target.value})} className="border border-gray-300 rounded px-2.5 py-1.5 bg-white">
              <option value="Net 7">Net 7</option>
              <option value="Net 15">Net 15</option>
              <option value="Due on Receipt">Due on Receipt</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-500">Due Date</label>
            <input type="text" value={meta.dueDate} onChange={e => setMeta({...meta, dueDate: e.target.value})} className="border border-gray-300 rounded px-3 py-1.5" />
          </div>
        </div>

        {/* Dynamic Items Table Matrix Grid Sheets */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mt-6">
          <div className="p-2.5 bg-slate-50 border-b font-bold text-gray-500 uppercase tracking-wider text-[10px]">
            Scan Item Bulk Actions
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/80 border-b text-gray-400 font-bold text-[10px] uppercase">
                <th className="p-3 w-1/3">Item Details</th>
                <th className="p-3 text-center">Quantity</th>
                <th className="p-3 text-center">Rate</th>
                <th className="p-3 text-center">Discount (%)</th>
                <th className="p-3 text-center">Tax</th>
                <th className="p-3 text-right pr-6">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium text-gray-700">
              {tableItems.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="p-3">
                    <input type="text" placeholder="Type or click to select an item." value={row.itemDetails} onChange={e => handleTableChange(idx, 'itemDetails', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 bg-white" required />
                  </td>
                  <td className="p-3 text-center w-20">
                    <input type="number" value={row.quantity} onChange={e => handleTableChange(idx, 'quantity', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-center" />
                  </td>
                  <td className="p-3 text-center w-24">
                    <input type="number" value={row.rate} onChange={e => handleTableChange(idx, 'rate', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-center font-bold" />
                  </td>
                  <td className="p-3 text-center w-20">
                    <input type="number" value={row.discount} onChange={e => handleTableChange(idx, 'discount', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-center text-orange-600" />
                  </td>
                  <td className="p-3 w-32">
                    <select value={row.tax} onChange={e => handleTableChange(idx, 'tax', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-[11px]">
                      <option value="Select Tax">Select a Tax</option>
                      <option value="GST18">GST [18%]</option>
                      <option value="Exempt">Exempt</option>
                    </select>
                  </td>
                  <td className="p-3 text-right pr-6 text-slate-900 font-bold">
                    {row.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic row buttons */}
        <div className="flex gap-2">
          <button type="button" onClick={() => setTableItems([...tableItems, { itemDetails: '', quantity: 1, rate: 0, discount: 0, tax: 'Select Tax', amount: 0 }])} className="border bg-slate-50 hover:bg-white text-slate-700 font-bold px-3 py-1 rounded text-[10px] shadow-3xs cursor-pointer">+ Add New Row</button>
          <button type="button" className="border bg-slate-50 text-slate-400 font-bold px-3 py-1 rounded text-[10px] cursor-not-allowed">+ Add Items in Bulk</button>
        </div>

        {/* Lower layout summaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-gray-100">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-gray-500 uppercase text-[10px]">Customer Notes</label>
              <textarea rows="3" value={meta.customerNotes} onChange={e => setMeta({...meta, customerNotes: e.target.value})} className="w-full border rounded p-2 text-xs font-medium text-gray-600 bg-slate-50/50 resize-none"></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-gray-500 uppercase text-[10px]">Terms & Conditions</label>
              <textarea rows="3" value={meta.termsConditions} onChange={e => setMeta({...meta, termsConditions: e.target.value})} className="w-full border rounded p-2 text-xs font-medium text-gray-600 bg-slate-50/50 resize-none"></textarea>
            </div>
          </div>

          {/* Right Calculations block */}
          <div className="bg-[#fcfdfe] rounded-xl p-5 border border-gray-200 w-full max-w-sm ml-auto space-y-4 font-medium shadow-3xs text-gray-500">
            <div className="flex justify-between items-center">
              <span>Sub Total</span>
              <span className="font-bold text-slate-800">₹ {subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span>Shipping Charges</span>
              <input type="number" value={meta.shippingCharges} onChange={e => setMeta({...meta, shippingCharges: Number(e.target.value)})} className="w-24 text-center border bg-white rounded px-2 py-0.5 text-slate-800" />
            </div>

            {/* TDS / TCS Selector */}
            <div className="flex justify-between items-start border-y py-2 border-dashed">
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 cursor-pointer text-[11px]"><input type="radio" name="tdsTcsOption" value="TDS" checked={meta.tdsTcsOption === 'TDS'} onChange={e => setMeta({...meta, tdsTcsOption: e.target.value})} /> TDS</label>
                <label className="flex items-center gap-1.5 cursor-pointer text-[11px]"><input type="radio" name="tdsTcsOption" value="TCS" checked={meta.tdsTcsOption === 'TCS'} onChange={e => setMeta({...meta, tdsTcsOption: e.target.value})} /> TCS</label>
              </div>
              <select value={meta.taxSelect} onChange={e => setMeta({...meta, taxSelect: e.target.value})} className="border bg-white rounded px-2 py-1 text-[11px]"><option value="Select a Tax">Select a Tax</option><option value="No-Tax">No Tax</option></select>
            </div>

            <div className="flex justify-between items-center text-slate-900 pt-1">
              <span className="text-xs font-black uppercase">Total (₹)</span>
              <span className="text-base font-black border-b-2 border-double border-slate-900 pb-0.5">₹ {totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Master layout submission control bar */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded shadow transition cursor-pointer">
            Save and Send
          </button>
          <button type="button" onClick={onCancel} className="border border-gray-300 hover:bg-gray-50 text-gray-600 font-bold text-xs px-4 py-2 rounded cursor-pointer transition">
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default InvoiceForm;