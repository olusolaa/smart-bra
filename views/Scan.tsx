import React, { useState, useEffect, useRef } from 'react';
import { ScanStatus } from '../types';
import { Button, Card } from '../components/Layout';
import { Thermometer, Activity, Play, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export const Scan: React.FC = () => {
  const [status, setStatus] = useState<ScanStatus>(ScanStatus.IDLE);
  const [progress, setProgress] = useState(0);
  const [tempData, setTempData] = useState<number>(36.5);
  const [impedance, setImpedance] = useState<number>(450);

  // Simulation Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === ScanStatus.SCANNING) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setStatus(ScanStatus.ANALYZING);
            return 100;
          }
          return prev + 1;
        });
        // Randomize sensor data slightly to look alive
        setTempData(36.4 + Math.random() * 0.4);
        setImpedance(Math.floor(440 + Math.random() * 20));
      }, 50);
    } else if (status === ScanStatus.ANALYZING) {
       setTimeout(() => {
         setStatus(ScanStatus.COMPLETE);
       }, 2000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const startScan = () => {
    setStatus(ScanStatus.CONNECTING);
    setTimeout(() => setStatus(ScanStatus.SCANNING), 1500);
    setProgress(0);
  };

  const resetScan = () => {
    setStatus(ScanStatus.IDLE);
    setProgress(0);
  };

  return (
    <div className="flex flex-col h-full pb-24 px-4 pt-4">
      {/* Top Indicators */}
      <div className="flex justify-between mb-6">
        <Card className="flex-1 mr-2 p-3 flex flex-col items-center bg-pink-50 border-pink-100">
          <div className="flex items-center gap-1 text-brand-pink mb-1">
            <Thermometer size={16} />
            <span className="text-xs font-bold">THERMAL</span>
          </div>
          <span className="font-mono text-xl font-bold">{tempData.toFixed(1)}°C</span>
        </Card>
        <Card className="flex-1 ml-2 p-3 flex flex-col items-center bg-teal-50 border-teal-100">
          <div className="flex items-center gap-1 text-brand-teal mb-1">
            <Activity size={16} />
            <span className="text-xs font-bold">IMPEDANCE</span>
          </div>
          <span className="font-mono text-xl font-bold">{impedance} Ω</span>
        </Card>
      </div>

      {/* Main Visualizer */}
      <div className="flex-grow relative flex items-center justify-center mb-6">
        <div className="relative w-72 h-72">
          {/* Base Body Silhouette (Simplified) */}
          <svg viewBox="0 0 200 200" className="w-full h-full text-gray-200 fill-current drop-shadow-inner">
            <path d="M40 60 C 40 140, 160 140, 160 60 C 160 20, 100 0, 100 0 C 100 0, 40 20, 40 60 Z" />
            <path d="M50 80 Q 75 120 100 80 T 150 80" fill="none" stroke="#E5E7EB" strokeWidth="2" />
          </svg>

          {/* Dynamic Heatmap Layer */}
          {status !== ScanStatus.IDLE && (
            <div className="absolute inset-0 flex items-center justify-center opacity-60 mix-blend-multiply">
               {/* Left Breast Heat */}
               <div className="absolute top-20 left-16 w-16 h-16 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
               {/* Right Breast Heat */}
               <div className="absolute top-20 right-16 w-16 h-16 bg-blue-400 rounded-full blur-xl animate-pulse delay-75"></div>
               
               {/* Simulated Hotspot (Only appears sometimes) */}
               <div className="absolute top-24 right-20 w-4 h-4 bg-red-400 rounded-full blur-md animate-ping duration-1000"></div>
            </div>
          )}

          {/* Scanning Grid Animation */}
          {status === ScanStatus.SCANNING && (
             <div className="absolute inset-0 z-10 overflow-hidden rounded-3xl">
               <div className="w-full h-2 bg-brand-teal/50 shadow-[0_0_15px_rgba(0,137,123,0.8)] absolute top-0 animate-[scan_2s_linear_infinite]"></div>
             </div>
          )}
          
          {/* Status Overlay */}
          <div className="absolute bottom-0 left-0 right-0 text-center">
            {status === ScanStatus.SCANNING && (
              <span className="inline-block px-3 py-1 bg-black/70 text-white rounded-full text-xs font-mono">
                SCANNING TISSUES {progress}%
              </span>
            )}
             {status === ScanStatus.ANALYZING && (
              <span className="inline-block px-3 py-1 bg-brand-pink text-white rounded-full text-xs font-bold animate-bounce">
                AI ANALYZING...
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 80%; opacity: 0; }
        }
      `}</style>

      {/* Control Area */}
      <div className="mt-auto">
        {status === ScanStatus.IDLE && (
          <Button onClick={startScan} className="w-full h-16 text-lg">
            <Play fill="currentColor" /> Start Sensor Scan
          </Button>
        )}
        
        {(status === ScanStatus.CONNECTING || status === ScanStatus.SCANNING || status === ScanStatus.ANALYZING) && (
          <div className="text-center">
             <p className="text-gray-500 mb-2 text-sm">Please remain still and breathe normally.</p>
             <Button onClick={resetScan} variant="outline" className="w-full">Cancel</Button>
          </div>
        )}

        {status === ScanStatus.COMPLETE && (
          <div className="animate-fade-in space-y-4">
             <Card className="bg-green-50 border-green-200">
               <div className="flex items-start gap-3">
                 <CheckCircle className="text-green-600 shrink-0" />
                 <div>
                   <h3 className="font-bold text-green-800">No Anomalies Detected</h3>
                   <p className="text-sm text-green-700 mt-1">
                     Thermal distribution is uniform. Bioimpedance values are within your personalized baseline range.
                   </p>
                 </div>
               </div>
             </Card>
             <div className="flex gap-3">
               <Button onClick={resetScan} variant="secondary" className="flex-1">Done</Button>
               <Button onClick={() => {}} variant="outline" className="flex-1">
                 <FileText size={18} /> Report
               </Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};