'use client';

// --- BARIS AJAIB PENYELAMAT ERROR ---
// Ini memaksa Next.js untuk tidak render halaman ini saat build,
// tapi rendernya nanti saat user benar-benar membukanya.
export const dynamic = 'force-dynamic'; 

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, Download, Home, ArrowRight, Share2, Copy 
} from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code'); // Ambil kode unik dari URL
  const [copied, setCopied] = useState(false);

  // Jika tidak ada code, redirect atau tampilkan pesan (opsional)
  if (!code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
        Memuat data...
      </div>
    );
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=https://layanandokumen.com/q/${code}`;
  const shortLink = `https://layanandokumen.com/q/${code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode-${code}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert('Gagal download. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
        
        {/* Confetti Decoration (CSS Only) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="p-8 text-center">
          
          {/* Icon Sukses */}
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 size={32} />
          </div>

          <h1 className="text-2xl font-black text-slate-900 mb-2">Berhasil Dibuat!</h1>
          <p className="text-xs text-slate-500 mb-8">QR Code Anda sudah aktif dan siap digunakan.</p>

          {/* QR Code Preview */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6 inline-block">
             <img src={qrUrl} alt="QR Code" className="w-40 h-40 mix-blend-multiply" />
          </div>

          {/* Short Link Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between mb-6 gap-3">
             <div className="text-xs text-slate-600 truncate font-medium flex-1 text-left pl-1">
               {shortLink}
             </div>
             <button 
               onClick={handleCopy}
               className="bg-white border border-slate-200 p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95"
             >
               {copied ? <CheckCircle2 size={16} className="text-green-500"/> : <Copy size={16}/>}
             </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
             <button 
               onClick={handleDownload}
               className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95"
             >
                <Download size={18} /> Download PNG
             </button>

             <div className="grid grid-cols-2 gap-3">
               <Link href="/" className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl font-bold text-xs transition-all">
                  <Home size={16} /> Beranda
               </Link>
               <Link href="/create/website" className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl font-bold text-xs transition-all">
                  Buat Baru <ArrowRight size={16} />
               </Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}