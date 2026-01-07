import React, { useState } from 'react';
import { Card, Button } from '../components/Layout';
import { User, MessageCircle, Phone, MapPin, Users, Heart } from 'lucide-react';

export const Experts: React.FC = () => {
  const doctors = [
    { id: 1, name: "Dr. Amara Okonkwo", role: "Oncologist", hospital: "Lagos University Teaching Hospital", available: true },
    { id: 2, name: "Dr. Sarah Adebayo", role: "Breast Specialist", hospital: "Medicross Clinic, Abuja", available: false },
  ];

  return (
    <div className="pb-24 pt-4 px-4 space-y-4">
      <Card className="bg-brand-teal text-white border-none">
        <h2 className="text-xl font-bold mb-2">Expert Consultation</h2>
        <p className="text-teal-100 text-sm mb-4">
          Connect directly with certified specialists for interpretation of your scan results.
        </p>
        <Button variant="secondary" className="w-full bg-white text-brand-teal hover:bg-teal-50">
          Book Appointment
        </Button>
      </Card>

      <h3 className="font-bold text-gray-700 mt-4">Available Specialists</h3>
      {doctors.map(doc => (
        <Card key={doc.id} className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
             <User size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800">{doc.name}</h4>
            <p className="text-xs text-brand-pink font-medium">{doc.role}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={10} /> {doc.hospital}
            </p>
          </div>
          <button className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
            <MessageCircle size={20} />
          </button>
        </Card>
      ))}
    </div>
  );
};

export const Community: React.FC = () => {
  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 text-center">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-brand-pink mx-auto mb-3">
          <Users size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">The Care Circle</h2>
        <p className="text-gray-500 text-sm mt-2 mb-4">
          Share your journey or grant access to family guardians for peace of mind.
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" className="text-xs py-2 px-4">Add Guardian</Button>
          <Button variant="primary" className="text-xs py-2 px-4">Join Forum</Button>
        </div>
      </div>

      <h3 className="font-bold text-gray-700">Community Stories</h3>
      <Card>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs shrink-0">
            AL
          </div>
          <div>
            <div className="flex justify-between items-start">
               <h4 className="font-bold text-gray-800 text-sm">Ananda's Legacy</h4>
               <span className="text-[10px] text-gray-400">2h ago</span>
            </div>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed italic">
              "Early detection saved my sister. Don't skip your scans. It's 5 minutes that buys you a lifetime..."
            </p>
            <div className="flex gap-4 mt-3">
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-pink">
                <Heart size={12} /> 24
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-500">
                <MessageCircle size={12} /> Reply
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};