import React from 'react';
import { AlertTriangle, Server, ShieldAlert } from 'lucide-react';

const QuotaSentinel = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50 font-sans text-gray-800">
      <div className="max-w-md w-full p-8 rounded-xl bg-white border border-gray-200 shadow-xl relative overflow-hidden">
        {/* Subtle Background Badge */}
        <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none">
          <Server size={200} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="text-red-500 w-6 h-6" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-600/80 font-semibold">Infrastructure Alert</span>
          </div>

          <h1 className="text-2xl font-bold mb-4 text-gray-900 tracking-tight">
            Application Instance Suspended
          </h1>
          
          <div className="space-y-4 text-sm leading-relaxed text-gray-600">
            <p>
              Automated resource monitoring for <span className="text-blue-600 font-mono font-medium">gadgetsgrid-ng.cluster-01</span> has identified a quota violation.
            </p>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 font-mono text-[11px] space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Resource Tier:</span>
                <span className="text-gray-900 font-bold">Free Dev-Instance</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Usage Status:</span>
                <span className="text-red-600 font-bold underline">QUOTA_EXCEEDED</span>
              </div>
              <div className="flex justify-between italic text-gray-400">
                <span>System UUID:</span>
                <span>RL_402_PAYMENT_REQ</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 italic">
              Access to this application has been restricted. Migration to a production environment is required to bypass automated resource throttling. Please consult the technical documentation or contact your system administrator.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              <Server size={12} />
              <span>Status: Locked</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-blue-500 font-medium">
              <ShieldAlert size={12} />
              <span>Billing Audit Required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotaSentinel;
