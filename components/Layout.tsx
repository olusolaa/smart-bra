import React from 'react';
import { Home, Activity, Calendar, Users, Heart, ArrowLeft, Battery, Wifi } from 'lucide-react';
import { ViewState } from '../types';

// --- UI Atoms ---

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-brand-pink text-white shadow-lg shadow-brand-pink/30 hover:bg-pink-500",
    secondary: "bg-brand-teal text-white shadow-lg shadow-brand-teal/30 hover:bg-teal-700",
    outline: "border-2 border-brand-pink text-brand-pink hover:bg-brand-pinklight",
    danger: "bg-brand-alert text-white hover:bg-red-700"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-2xl shadow-sm border border-pink-50 p-5 ${className}`}>
    {children}
  </div>
);

// --- Layout Components ---

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  batteryLevel?: number;
}

export const TopBar: React.FC<TopBarProps> = ({ title, showBack, onBack, batteryLevel = 85 }) => (
  <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {showBack && (
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-brand-pink">
          <ArrowLeft size={24} />
        </button>
      )}
      <h1 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h1>
    </div>
    <div className="flex items-center gap-3 text-brand-teal">
      <div className="flex items-center gap-1">
        <Wifi size={16} />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs font-semibold">{batteryLevel}%</span>
        <Battery size={20} className="fill-current" />
      </div>
    </div>
  </div>
);

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Home', icon: Home },
    { id: ViewState.SCAN, label: 'Scan', icon: Activity },
    { id: ViewState.HISTORY, label: 'History', icon: Calendar },
    { id: ViewState.EXPERTS, label: 'Care', icon: Heart },
    { id: ViewState.COMMUNITY, label: 'Social', icon: Users },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-around items-end z-50">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors w-16 ${
              isActive ? 'text-brand-pink' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};