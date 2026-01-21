'use client';

import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react'; // Kita install ini nanti
import Link from 'next/link';
import { ArrowLeft, Download, CheckCircle, ExternalLink } from 'lucide-react';
import { useRef } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  
  // URL akhir yang akan dibuka oleh pengunjung (ingat strategi Buffer Page kita)
  const finalUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/v/${code}`;

  // Referensi untuk download QR (Basic, bisa dikembangkan)
  const downloadQR = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if(canvas) {
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QR-Menu-${code}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
  };

  if (!code) return <p className="text-center p-10">Data tidak ditemukan.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Menu Siap Digunakan!</h1>
        <p className="text-gray-500 text-sm mb-8">
          Scan QR di bawah ini untuk melihat dokumen Anda.
        </p>

        {/* QR CODE DISPLAY */}
        <div className="bg-white border-2 border-gray-900 p-4 rounded-xl inline-block mb-6 shadow-sm">
           <QRCodeSVG 
            value={finalUrl} 
            size={200}
            level="H" // High Error Correction
           />
        </div>

        {/* Link Text */}
        <div className="bg-gray-100 p-3 rounded-lg mb-6 flex items-center justify-between text-xs text-gray-500">
          <span className="truncate flex-1 text-left mr-2">{finalUrl}</span>
          <Link href={`/v/${code}/loading`} target="_blank">
            <ExternalLink className="w-4 h-4 text-blue-600 hover:text-blue-800" />
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/" className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
            <ArrowLeft className="w-4 h-4" />
            Bikin Lagi
          </Link>
          <button 
            onClick={() => alert("Fitur download gambar sedang disiapkan (Gunakan screenshot dulu ya!)")} // Nanti kita fix canvas logic
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
          >
            <Download className="w-4 h-4" />
            Simpan QR
          </button>
        </div>
        
        <p className="mt-6 text-xs text-gray-400">
          Tips: Cetak QR ini dan tempel di meja pelanggan.
        </p>
      </div>
    </div>
  );
}