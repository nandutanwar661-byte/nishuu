import React, { useEffect, useState } from 'react';

const EstimateDetailsView = ({ onAddNewClick }) => {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Localhost ko hata kar Render ki link laga di hai
    fetch('https://extraeffort-9i4m.onrender.com/api/estimates/all')
      .then(res => res.json())
      .then(result => { if (result.success) setEstimates(result.data); })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-xs text-gray-700 font-sans">
      
      {/* Top Banner Row matching Item/Customer design specs structures */}
      <div className="flex justify-between items-center border-b pb-4 bg-white p-5 rounded-xl shadow-xs border border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">📄 Estimates Quotations Logbook</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Track commercial pricing quotes compiled for active business clients</p>
        </div>
        <button 
          onClick={onAddNewClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-sm text-xs cursor-pointer transition"
        >
          + New Estimate
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 bg-white border rounded-xl">Loading dynamic estimates indexes logs...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {estimates.map((est) => (
            <div key={est._id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs flex gap-5 items-start hover:shadow-xs transition">
              
              {/* Left Side Attached product preview design block handler element */}
              <div className="w-16 h-16 bg-slate-50 border rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {est.items[0]?.itemImageUrl ? (
                  <img src={est.items[0].itemImageUrl} alt="Product preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-300 text-lg font-black">📄</span>
                )}
              </div>

              {/* Central Information display block parameter row */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-black text-gray-900">{est.customerName}</h3>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">Ref: {est.estimateNumber} | Date Issued: {est.estimateDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-400 block uppercase">Estimated Volume</span>
                    <span className="text-sm font-black text-slate-900 block">₹ {est.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-2 bg-slate-50 border border-gray-100 rounded text-gray-500 text-[11px]">
                  <strong>Core Scope:</strong> {est.items.map(i => `${i.itemDetails} (x${i.quantity})`).join(', ')}
                </div>
              </div>

            </div>
          ))}

          {estimates.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-medium bg-white rounded-lg border">
              No estimates generated inside database yet. Click the "+ New Estimate" button at top right to formulations sheet.
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default EstimateDetailsView;