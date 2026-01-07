import React, { useState, useEffect } from 'react';
import { Bluetooth, Check, ChevronRight, Ruler, ShieldCheck } from 'lucide-react';
import { Button, Card } from '../components/Layout';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [scanning, setScanning] = useState(false);
  const [paired, setPaired] = useState(false);

  // Simulation of Bluetooth pairing
  useEffect(() => {
    if (step === 2 && !paired) {
      setScanning(true);
      const timer = setTimeout(() => {
        setScanning(false);
        setPaired(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, paired]);

  return (
    <div className="min-h-screen bg-brand-pinklight/30 flex flex-col justify-between p-6 pb-12">
      <div className="mt-8">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 rounded-full flex-1 transition-all ${i <= step ? 'bg-brand-pink' : 'bg-gray-200'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-black text-gray-900 mb-4">Welcome to <span className="text-brand-pink">Smart Bra</span></h1>
            <p className="text-gray-600 text-lg mb-8">
              Your personal companion for proactive breast health. Let's set up your profile for accurate bioimpedance baselines.
            </p>
            <Card className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Age</label>
              <input type="number" placeholder="e.g. 34" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-pink outline-none" />
            </Card>
            <Card>
              <label className="block text-sm font-bold text-gray-700 mb-2">Weight (kg)</label>
              <input type="number" placeholder="e.g. 65" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-pink outline-none" />
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in flex flex-col items-center text-center">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-xl mb-8 relative">
              {scanning && (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-brand-pink/20 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-brand-pink/40 animate-pulse"></div>
                </>
              )}
              {paired ? <Check size={60} className="text-brand-success" /> : <Bluetooth size={60} className="text-brand-pink" />}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {paired ? "Device Connected!" : "Searching for Smart Bra..."}
            </h2>
            <p className="text-gray-500">
              {paired ? "ESP32 Module ID: SB-90X Connected" : "Please ensure your Smart Bra is charged and nearby."}
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <ShieldCheck size={80} className="text-brand-teal" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Baseline Calibration</h2>
            <p className="text-gray-600 text-center mb-6">
              Wear the bra comfortably. Sit still for a moment while we establish your unique tissue density baseline.
            </p>
            <Card className="bg-blue-50 border-blue-100">
              <div className="flex gap-4 items-center">
                <Ruler className="text-blue-500" />
                <div>
                  <h4 className="font-bold text-blue-800">Tip</h4>
                  <p className="text-sm text-blue-600">Ensure all 4 sensors are touching your skin directly.</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Button 
        onClick={() => {
          if (step < 3) setStep(s => s + 1);
          else onComplete();
        }}
        disabled={step === 2 && !paired}
        className="w-full shadow-xl"
      >
        {step === 3 ? "Finish Setup" : "Continue"} <ChevronRight size={20} />
      </Button>
    </div>
  );
};