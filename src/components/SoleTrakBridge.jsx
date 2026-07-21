import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust path if needed

export default function SoleTrakBridge({ user }) {
  const [loading, setLoading] = useState(false);

  const handleActivation = async () => {
    setLoading(true);
    try {
      // 1. Mark exam as passed in Supabase (triggers the database creation above)
      const { error } = await supabase
        .from('profiles')
        .update({ exam_passed: true })
        .eq('id', user.id);

      if (error) throw error;

      // 2. Redirect candidate directly into their new SoleTrak app workspace
      window.location.href = "https://app.soletrak.com/welcome"; 
    } catch (err) {
      console.error("Activation failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-slate-900 border border-emerald-500/30 rounded-xl text-white shadow-2xl">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">🎉</span>
        <h2 className="text-xl font-bold text-emerald-400">Exam Simulation Complete!</h2>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        Congratulations on completing your prelicensing requirements! Your agency has unlocked your 
        <strong className="text-white"> SoleTrak 1099 Financial Ledger & Compliance Vault</strong> to manage your new commission splits, mileage, and tax write-offs on day one.
      </p>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-6 space-y-2 text-xs text-slate-400">
        <p className="text-slate-200 font-semibold mb-1">Your Activated Workspace Features:</p>
        <p>✓ Schedule C Tax Deductions & NAICS Audit Guard Setup</p>
        <p>✓ Smart Vault for E&O Policy & Licensing Certificate Uploads</p>
        <p>✓ Net Take-Home Pay & Commission Split Calculator</p>
      </div>

      <button
        onClick={handleActivation}
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-slate-950 font-bold py-3 px-4 rounded-lg transition duration-200"
      >
        {loading ? 'Provisioning Workspace...' : 'Activate My SoleTrak Business Stack'}
      </button>
    </div>
  );
}
