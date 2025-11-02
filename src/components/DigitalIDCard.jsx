import React from 'react';
import { QrCodeIcon, UserCircleIcon, PrinterIcon } from '@heroicons/react/24/outline';
import Card from './Card';

const DigitalIDCard = ({ userData }) => {
  const generateQRCode = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UniOne:${userData?.uid}`;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Digital ID Card - ${userData?.name || 'Student'}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: 'Inter', system-ui, sans-serif;
            }
            .id-card {
              max-width: 400px;
              margin: 0 auto;
              background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
              border-radius: 16px;
              padding: 24px;
              color: white;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 24px;
            }
            .logo {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .logo-icon {
              width: 48px;
              height: 48px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 20px;
            }
            .id-info {
              text-align: right;
              font-size: 12px;
              opacity: 0.8;
            }
            .student-info {
              display: flex;
              align-items: center;
              gap: 16px;
              margin-bottom: 24px;
            }
            .student-avatar {
              width: 64px;
              height: 64px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .student-details h3 {
              margin: 0 0 4px 0;
              font-size: 18px;
            }
            .student-details p {
              margin: 0;
              font-size: 14px;
              opacity: 0.8;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              font-size: 14px;
            }
            .info-row span:first-child {
              opacity: 0.8;
            }
            .qr-section {
              display: flex;
              align-items: center;
              gap: 16px;
              margin-top: 24px;
            }
            .qr-code {
              width: 64px;
              height: 64px;
              background: white;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            @media print {
              body { margin: 0; padding: 0; }
              .id-card { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="id-card">
            <div class="header">
              <div class="logo">
                <div class="logo-icon">U</div>
                <div>
                  <h2 style="margin: 0; font-size: 20px;">UniOne</h2>
                  <p style="margin: 0; font-size: 12px; opacity: 0.8;">Digital Student ID</p>
                </div>
              </div>
              <div class="id-info">
                <p style="margin: 0;">ID: ${userData?.uid?.slice(0, 8).toUpperCase() || 'N/A'}</p>
                <p style="margin: 0;">Valid Until: 2026</p>
              </div>
            </div>
            
            <div class="student-info">
              <div class="student-avatar">👤</div>
              <div class="student-details">
                <h3>${userData?.name || 'Student Name'}</h3>
                <p>${userData?.university || 'University Name'}</p>
                <p>${userData?.department || 'Department'}</p>
              </div>
            </div>
            
            <div>
              <div class="info-row">
                <span>University:</span>
                <span><strong>${userData?.university || '-'}</strong></span>
              </div>
              <div class="info-row">
                <span>College:</span>
                <span><strong>${userData?.collegeName || '-'}</strong></span>
              </div>
              <div class="info-row">
                <span>Department:</span>
                <span><strong>${userData?.department || '-'}</strong></span>
              </div>
              <div class="info-row">
                <span>Roll No:</span>
                <span><strong>${userData?.rollNumber || '-'}</strong></span>
              </div>
              <div class="info-row">
                <span>Stream:</span>
                <span><strong>${userData?.stream || '-'}</strong></span>
              </div>
              <div class="info-row">
                <span>Year:</span>
                <span><strong>${userData?.year || '-'}</strong></span>
              </div>
            </div>
            
            <div class="qr-section">
              <div class="qr-code">
                <img src="${generateQRCode()}" alt="QR Code" width="48" height="48" />
              </div>
              <div>
                <p style="margin: 0; font-size: 12px; opacity: 0.8;">Scan to verify student identity</p>
                <p style="margin: 0; font-size: 11px; opacity: 0.6;">Powered by UniOne</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="print-id-card">
      <Card className="max-w-md mx-auto animate-slide-up">
        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
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
              <span className="text-sm text-white/80">University:</span>
              <span className="text-sm font-medium">{userData?.university || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">College:</span>
              <span className="text-sm font-medium">{userData?.collegeName || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Department:</span>
              <span className="text-sm font-medium">{userData?.department || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Roll No:</span>
              <span className="text-sm font-medium">{userData?.rollNumber || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Stream:</span>
              <span className="text-sm font-medium">{userData?.stream || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Year:</span>
              <span className="text-sm font-medium">{userData?.year || '-'}</span>
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
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
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
            onClick={handlePrint}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <PrinterIcon className="w-4 h-4" />
            <span>Print ID</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default DigitalIDCard;
