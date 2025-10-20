import React from 'react';
import { QrCodeIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Card from './Card';

const DigitalIDCard = ({ userData }) => {
  const generateQRCode = () => {
    // In a real app, this would generate a QR code
    // For now, we'll use a placeholder
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UniOne:${userData?.uid}`;
  };

  return (
    <Card className="max-w-md mx-auto animate-slide-up">
      <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">UniOne</h2>
              <p className="text-sm text-white/80">Digital Student ID</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/80">ID: {userData?.uid?.slice(0, 8).toUpperCase()}</p>
            <p className="text-xs text-white/80">Valid Until: 2026</p>
          </div>
        </div>

        {/* Student Photo Placeholder */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <UserCircleIcon className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{userData?.name || 'Student Name'}</h3>
            <p className="text-sm text-white/80">{userData?.university || 'University Name'}</p>
            <p className="text-sm text-white/80">{userData?.department || 'Department'}</p>
          </div>
        </div>

        {/* Student Details */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-sm text-white/80">Roll No:</span>
            <span className="text-sm font-medium">{userData?.rollNumber || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-white/80">Stream:</span>
            <span className="text-sm font-medium">{userData?.stream || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-white/80">Year:</span>
            <span className="text-sm font-medium">{userData?.year || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-white/80">College:</span>
            <span className="text-sm font-medium">{userData?.collegeName || 'N/A'}</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <img
              src={generateQRCode()}
              alt="QR Code"
              className="w-12 h-12"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ display: 'none' }} className="w-12 h-12 bg-primary-200 rounded flex items-center justify-center">
              <QrCodeIcon className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-white/80">
              Scan to verify student identity
            </p>
            <p className="text-xs text-white/60">
              Powered by UniOne
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <p className="text-xs text-white/60">
            This is an official digital student ID card
          </p>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => window.print()}
          className="btn-secondary text-sm px-4 py-2"
        >
          Print ID Card
        </button>
      </div>
    </Card>
  );
};

export default DigitalIDCard;
