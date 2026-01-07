import React from 'react';
import { Bell, ChevronRight, Zap, Calendar, HeartHandshake } from 'lucide-react';
import { Card, Button } from '../components/Layout';
import { ViewState } from '../types';

interface HomeProps {
  onChangeView: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-brand-pink to-pink-400 text-white p-6 rounded-b-[2.5rem] shadow-lg pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="opacity-90">Good Morning,</p>
            <h1 className="text-3xl font-black">Jennifer</h1>
          </div>
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
            <Bell size={20} />
          </button>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-success shadow-lg">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <p className="text-sm font-medium opacity-90">Status</p>
            <p className="text-lg font-bold">All Vitals Normal</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card 
            className="flex flex-col items-center justify-center py-8 gap-3 shadow-md hover:shadow-lg transition-all active:scale-95"
            onClick={() => onChangeView(ViewState.SCAN)}
          >
            <div className="w-14 h-14 rounded-full bg-brand-pinklight flex items-center justify-center text-brand-pink">
              <Zap size={28} />
            </div>
            <span className="font-bold text-gray-700">New Scan</span>
          </Card>

          <Card 
            className="flex flex-col items-center justify-center py-8 gap-3 shadow-md hover:shadow-lg transition-all active:scale-95"
            onClick={() => onChangeView(ViewState.HISTORY)}
          >
            <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-brand-teal">
              <Calendar size={28} />
            </div>
            <span className="font-bold text-gray-700">View History</span>
          </Card>
        </div>

        {/* Daily Tip */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800 text-lg">Daily Insight</h3>
          </div>
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 relative overflow-hidden">
            <div className="flex gap-4 relative z-10">
              <div className="bg-white p-3 rounded-full h-fit shadow-sm">
                 <HeartHandshake className="text-indigo-500" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Self-Exams Matter</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  40% of diagnosed breast cancers are detected by women who feel a lump. Regular scanning complements your manual checks.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity Mini List */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800 text-lg">Recent Scans</h3>
            <button onClick={() => onChangeView(ViewState.HISTORY)} className="text-brand-pink text-sm font-bold flex items-center">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            <Card className="flex justify-between items-center p-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-10 bg-brand-success rounded-full"></div>
                <div>
                  <p className="font-bold text-gray-800">Routine Check</p>
                  <p className="text-xs text-gray-500">Today, 8:00 AM</p>
                </div>
              </div>
              <span className="text-brand-success font-bold text-sm">Normal</span>
            </Card>
             <Card className="flex justify-between items-center p-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-10 bg-brand-success rounded-full"></div>
                <div>
                  <p className="font-bold text-gray-800">Routine Check</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <span className="text-brand-success font-bold text-sm">Normal</span>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};