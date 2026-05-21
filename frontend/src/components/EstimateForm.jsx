import React, { useState, useEffect } from 'react';

const EstimateForm = ({ onEstimateSaved, onCancel }) => {
  const [customers, setCustomers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const [meta, setMeta] = useState({
    customerName: '',
    location: 'Corporate',
    estimateNumber: 'RAJ/EST-000299',
    estimateDate: '15/04/2026',
    expiryDate: '',
    subject: '',
    customerNotes: 'Our Facilities Include:',
    termsConditions: 'This is a customised estimate provided according to demands...',
    shippingCharges: 0,
    adjustment: 0
  });

  const [tableItems, setTableItems] = useState([
    { itemDetails: '', quantity: 1, rate: 0, discount: 0, tax: 'Select Tax', amount: 0 }
  ]);

  // Dropdown list customers data loading
  useEffect(() => {
    // Localhost ko hata kar Render ki link laga di hai
    fetch('https://extraeffort-9i4m.onrender.com/api/customers/all')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error(err));
  }, []);

  // Calculation parameters tracker
  const calculateRowAmount = (qty, rate, disc) => {
    const gross = (Number(qty) || 0) * (Number(rate) || 0);
    const reduction = gross * ((Number(disc) || 0) / 100);
    return Math.max(0, gross - reduction);
  };

  const handleTableChange = (index, field, value) => {
    const updated = [...tableItems];
    updated[index][field] = value;

    if (field === 'quantity' || field === 'rate' || field === 'discount') {
      updated[index].amount = calculateRowAmount(
        field === 'quantity' ? value : updated[index].quantity,
        field === 'rate' ? value : updated[index].rate,
        field === 'discount' ? value : updated[index].discount
      );
    }
    setTableItems(updated);
  };

  const subTotal = tableItems.reduce((acc, current) => acc + (current.amount || 0), 0);
  const finalTotal = subTotal + (Number(meta.shippingCharges) || 0) + (Number(meta.adjustment) || 0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!meta.customerName) {
      alert("⚠️ Customer Name is a mandatory validation parameter!");
      return;
    }

    const payload = new FormData();
    payload.append('customerName', meta.customerName);
    payload.append('location', meta.location);
    payload.append('estimateNumber', meta.estimateNumber);
    payload.append('estimateDate', meta.estimateDate);
    payload.append('expiryDate', meta.expiryDate);
    payload.append('subject', meta.subject);
    payload.append('customerNotes', meta.customerNotes);
    payload.append('termsConditions', meta.termsConditions);
    payload.append('shippingCharges', meta.shippingCharges);
    payload.append('adjustment', meta.adjustment);
    payload.append('subTotal', subTotal);
    payload.append('total', finalTotal);
    payload.append('items', JSON.stringify(tableItems));

    if (imageFile) payload.append('itemImage', imageFile);

    try {
      // Localhost ko hata kar Render ki link laga di hai
      const response = await fetch('https://extraeffort-9i4m.onrender.com/api/estimates/add', {
        method: 'POST',
        body: payload
      });
      const result = await response.json();
      if (result.success) {
        alert('🎉 New Estimate Compiled & Registered Successfully!');
        if (onEstimateSaved) onEstimateSaved();
      }
    } catch (err) {
      alert('⚠️ Connection Error with Node ERP Server engine.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 max-w-6xl mx-auto text-xs text-gray-700 font-sans">
      <div className="border-b pb-3 mb-6 flex justify-between items-center bg-slate-50/50 p-3 rounded-lg">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">📄 New Estimate Formulation Sheet</h2>
        <span className="text-[10px] text-gray-400 font-black tracking-wide">Vite Dynamic Layout Layer</span>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        
        {/* Core Profile Parameters Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="space-y-3">
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-red-500">Customer Name*</label>
              <select value={meta.customerName} onChange={e => setMeta({...meta, customerName: e.target.value})} className="col-span-2 border border-gray-300 rounded px-2.5 py-1.5 bg-white focus:outline-none focus:border-blue-500" required>
                <option value="">Select or add a customer</option>
                {customers.map(c => <option key={c._id} value={c.displayName}>{c.displayName}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-gray-500">Location</label>
              <select value={meta.location} onChange={e => setMeta({...meta, location: e.target.value})} className="col-span-2 border border-gray-300 rounded px-2.5 py-1.5 bg-white"><option value="Corporate">Corporate Office</option><option value="Branch">Branch Location</option></select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-red-500">Estimate#*</label>
              <input type="text" value={meta.estimateNumber} onChange={e => setMeta({...meta, estimateNumber: e.target.value})} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 font-bold" required />
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-gray-500">Dates Config</label>
              <div className="col-span-2 grid grid-cols-2 gap-2">
                <input type="text" placeholder="Estimate Date" value={meta.estimateDate} onChange={e => setMeta({...meta, estimateDate: e.target.value})} className="border border-gray-300 rounded px-2 py-1 text-center" />
                <input type="text" placeholder="Expiry Expiration" value={meta.expiryDate} onChange={e => setMeta({...meta, expiryDate: e.target.value})} className="border border-gray-300 rounded px-2 py-1 text-center" />
              </div>
            </div>
          </div>
        </div>

        {/* Subject parameter box */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-2 items-center border-t pt-4">
          <label className="font-semibold text-gray-500 md:col-span-1">Subject</label>
          <input type="text" placeholder="Let your customer know what this estimate is for" value={meta.subject} onChange={e => setMeta({...meta, subject: e.target.value})} className="md:col-span-7 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500" />
        </div>

        {/* Image upload preview row selector inline inside card wrapper box element */}
        <div className="border-y py-4 my-4 bg-slate-50/50 rounded-lg p-4 flex gap-4 items-center max-w-md">
          <div className="w-16 h-16 border-2 border-dashed border-gray-300 hover:border-blue-500 bg-white rounded flex flex-col items-center justify-center p-1 cursor-pointer overflow-hidden text-center relative">
            {imagePreview ? (
              <img src={imagePreview} alt="Item" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-[10px] font-bold">Add Item Image</span>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          </div>
          <p className="text-[11px] text-gray-400">If client requires product blueprint verification proof details context, append image file profiles logs here.</p>
        </div>

        {/* Dynamic Item Interactive Metrics Sheet Table matrix structure elements */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
          <div className="p-2.5 bg-slate-50 font-bold border-b text-gray-600 uppercase tracking-wide text-[10px] flex justify-between">
            <span>Item Table Rows</span>
            <span className="text-blue-600 underline cursor-pointer text-[11px]">Bulk Actions</span>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/80 border-b text-gray-500 font-bold uppercase text-[10px]">
                <th className="p-3 w-1/3">Item Details</th>
                <th className="p-3 text-center">Quantity</th>
                <th className="p-3 text-center">Rate</th>
                <th className="p-3 text-center">Discount (%)</th>
                <th className="p-3 text-center">Tax Parameters</th>
                <th className="p-3 text-right pr-6">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium text-gray-700">
              {tableItems.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/40">
                  <td className="p-3">
                    <input type="text" placeholder="Select or type item product details..." value={item.itemDetails} onChange={e => handleTableChange(index, 'itemDetails', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 bg-white" required />
                  </td>
                  <td className="p-3 w-20 text-center">
                    <input type="number" value={item.quantity} onChange={e => handleTableChange(index, 'quantity', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-center" />
                  </td>
                  <td className="p-3 w-24 text-center">
                    <input type="number" value={item.rate} onChange={e => handleTableChange(index, 'rate', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-center font-bold" />
                  </td>
                  <td className="p-3 w-20 text-center">
                    <input type="number" value={item.discount} onChange={e => handleTableChange(index, 'discount', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-center text-orange-600 font-bold" />
                  </td>
                  <td className="p-3 w-32">
                    <select value={item.tax} onChange={e => handleTableChange(index, 'tax', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-[11px]"><option value="Select Tax">Select Tax</option><option value="GST18">GST [18%]</option><option value="GST5">GST [5%]</option><option value="Non-Taxable">Non-Taxable</option></select>
                  </td>
                  <td className="p-3 text-right pr-6 text-sm font-black text-slate-900">
                    {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Operational row buttons */}
        <button type="button" onClick={() => setTableItems([...tableItems, { itemDetails: '', quantity: 1, rate: 0, discount: 0, tax: 'Select Tax', amount: 0 }])} className="border border-gray-300 bg-gray-50 text-slate-700 px-3 py-1 rounded-md font-bold text-[11px] hover:bg-white shadow-3xs cursor-pointer transition">
          + Add New Row
        </button>

        {/* Lower Notes Sections & Final Metric summaries boxes splits context layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-gray-100">
          
          {/* Notes blocks text area values elements row links */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Customer Notes</label>
              <textarea rows="3" value={meta.customerNotes} onChange={e => setMeta({...meta, customerNotes: e.target.value})} className="w-full border border-gray-300 rounded p-2.5 focus:outline-none text-xs text-gray-600 bg-slate-50/40 resize-none font-medium"></textarea>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Terms & Conditions</label>
              <textarea rows="3" value={meta.termsConditions} onChange={e => setMeta({...meta, termsConditions: e.target.value})} className="w-full border border-gray-300 rounded p-2.5 focus:outline-none text-xs text-gray-600 bg-slate-50/40 resize-none font-medium"></textarea>
            </div>
          </div>

          {/* Right Calculations summary block cards parameters layout matching image 2 */}
          <div className="bg-slate-50/60 rounded-xl p-5 border border-gray-200/60 max-w-md ml-auto w-full space-y-4 shadow-3xs font-medium">
            <div className="flex justify-between items-center text-gray-500">
              <span>Sub Total</span>
              <span className="font-bold text-slate-800">₹ {subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center gap-4 text-gray-500">
              <span>Shipping Charges</span>
              <input type="number" value={meta.shippingCharges} onChange={e => setMeta({...meta, shippingCharges: Number(e.target.value)})} className="w-24 text-center border bg-white rounded px-2 py-0.5" />
            </div>

            <div className="flex justify-between items-center gap-4 text-gray-500 border-b pb-3">
              <span>Adjustment</span>
              <input type="number" value={meta.adjustment} onChange={e => setMeta({...meta, adjustment: Number(e.target.value)})} className="w-24 text-center border bg-white rounded px-2 py-0.5" />
            </div>

            <div className="flex justify-between items-center pt-2 text-slate-900">
              <span className="text-sm font-black uppercase">Total (₹)</span>
              <span className="text-base font-black text-slate-900 border-b-2 border-double border-slate-900 pb-0.5">₹ {finalTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Master action trigger parameters setup buttons rows panels */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2 rounded shadow cursor-pointer transition">
            Save 
          </button>
          <button type="button" onClick={onCancel} className="border border-gray-300 hover:bg-gray-50 text-gray-600 font-bold text-xs px-4 py-2 rounded cursor-pointer transition">
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default EstimateForm;