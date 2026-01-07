import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card } from '../components/Layout';
import { MOCK_HISTORY } from '../types';
import { Download, Filter } from 'lucide-react';

export const History: React.FC = () => {
  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-xl font-bold text-gray-800">Health Trends</h2>
         <div className="flex gap-2">
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500">
              <Filter size={20} />
            </button>
            <button className="p-2 bg-brand-pink text-white rounded-lg shadow-md">
              <Download size={20} />
            </button>
         </div>
      </div>

      {/* Temperature Chart */}
      <Card>
        <div className="mb-4">
          <h3 className="font-bold text-gray-700">Thermal Consistency</h3>
          <p className="text-xs text-gray-500">Average breast tissue temperature (°C)</p>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_HISTORY}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F48FB1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F48FB1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{fontSize: 10}} tickLine={false} axisLine={false} tickFormatter={(value) => value.split('-')[2]} />
              <YAxis domain={[35, 38]} hide />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}
                itemStyle={{color: '#E91E63'}}
              />
              <Area type="monotone" dataKey="temperatureAvg" stroke="#EC407A" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Impedance Chart */}
      <Card>
        <div className="mb-4">
          <h3 className="font-bold text-gray-700">Tissue Bioimpedance</h3>
          <p className="text-xs text-gray-500">Electrical conductivity (Ohms). Lower dips may indicate fluid changes.</p>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{fontSize: 10}} tickLine={false} axisLine={false} tickFormatter={(value) => value.split('-')[2]} />
              <YAxis domain={[400, 500]} hide />
              <Tooltip />
              <Line type="monotone" dataKey="impedance" stroke="#00897B" strokeWidth={3} dot={{r: 4, fill: '#00897B'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Cycle Tracking Overlay Info */}
      <Card className="bg-purple-50 border-purple-100">
        <h3 className="font-bold text-purple-800 text-sm mb-2">Cycle Correlation</h3>
        <p className="text-xs text-purple-700 leading-relaxed">
          Your density naturally increases during the Luteal phase (Days 15-28). The app adjusts anomaly detection sensitivity during this window to reduce false alerts.
        </p>
      </Card>
    </div>
  );
};