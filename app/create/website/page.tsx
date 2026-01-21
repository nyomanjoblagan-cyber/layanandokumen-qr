'use client';

import { useState } from 'react';
import { 
  ChevronDown, ChevronUp, ArrowLeft, ArrowRight, Smartphone, Eye, QrCode, PenLine, Link as LinkIcon, HelpCircle, Check, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- KOMPONEN IKLAN COMPACT ---
const AdSlot = ({ label }: { label: string }) => (
  <div className="w-full h-[70px] bg-slate-100 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 my-4 flex-shrink-0">
     <span className="text-[9px] font-bold uppercase tracking-widest">Iklan {label}</span>
     <span className="text-[8px]">Slot Adsterra</span>
  </div>
);

export default function CreateWebsite() {
  const router = useRouter();
  
  // --- STATE ---
  const [url, setUrl] = useState('');
  const [qrName, setQrName] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('website'); 
  const [previewMode, setPreviewMode] = useState<'preview' | 'qrcode'>('preview');

  // --- HANDLER ---
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    // Layout Utama: Flex Column, Full Height, No Scroll pada Body utama
    <div className="h-screen bg-[#f8fafc] font-sans text-slate-900 flex flex-col overflow-hidden">
      
      {/* ================= HEADER (Compact h-14) ================= */}
      <header className="bg-white border-b border-slate-200 h-14 flex-none z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1 rounded-md text-white shadow-sm group-hover:scale-105 transition-transform">
                <Smartphone size={16} />
              </div>
              <span className="font-bold text-sm text-slate-800 tracking-tight">LayananQR</span>
           </Link>

           <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
             <span>Step 2 / 3</span>
             <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full w-2/3 bg-blue-600 rounded-full"></div>
             </div>
           </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT (Split Screen) ================= */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* ---------------- KOLOM KIRI: FORM + IKLAN (Scrollable) ---------------- */}
        <div className="flex-1 w-full lg:w-[60%] overflow-y-auto p-6 scrollbar-hide pb-24">
          <div className="max-w-xl mx-auto">
            
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-2 transition-colors">
                <ArrowLeft size={12} /> Kembali
              </Link>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 mb-1">Konten Website</h1>
              <p className="text-xs text-slate-500">Masukkan tautan URL tujuan QR Code Anda.</p>
            </div>

            {/* IKLAN ATAS */}
            <AdSlot label="Top" />

            <div className="space-y-4">
              
              {/* CARD 1: WEBSITE URL */}
              <div className={`bg-white rounded-xl border transition-all duration-200 ${activeSection === 'website' ? 'border-blue-500 ring-1 ring-blue-100 shadow-md' : 'border-slate-200 hover:border-blue-300'}`}>
                <button 
                  onClick={() => toggleSection('website')}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeSection === 'website' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                      <LinkIcon size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-slate-800">Alamat Website <span className="text-red-500">*</span></h3>
                      <p className="text-[10px] text-slate-500">Link tujuan (URL)</p>
                    </div>
                  </div>
                  {activeSection === 'website' ? <ChevronUp size={16} className="text-blue-500"/> : <ChevronDown size={16} className="text-slate-400"/>}
                </button>

                {activeSection === 'website' && (
                  <div className="px-4 pb-5 pt-0 animate-in slide-in-from-top-1">
                     <div className="h-px w-full bg-slate-50 mb-4"></div>
                     <div className="relative group">
                       <input 
                         type="text" 
                         placeholder="https://www.website-anda.com"
                         className="w-full py-2.5 px-3 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                         value={url}
                         onChange={(e) => setUrl(e.target.value)}
                         autoFocus
                       />
                       {url.length > 5 && <div className="absolute right-3 top-2.5 text-emerald-500"><Check size={14} /></div>}
                     </div>
                     <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400">
                       <AlertCircle size={10} />
                       <span>Gunakan <strong>https://</strong> agar lebih aman.</span>
                     </div>
                  </div>
                )}
              </div>

              {/* CARD 2: NAME */}
              <div className={`bg-white rounded-xl border transition-all duration-200 ${activeSection === 'name' ? 'border-blue-500 ring-1 ring-blue-100 shadow-md' : 'border-slate-200 hover:border-blue-300'}`}>
                <button 
                  onClick={() => toggleSection('name')}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeSection === 'name' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                      <PenLine size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-slate-800">Nama QR Code</h3>
                      <p className="text-[10px] text-slate-500">Label opsional</p>
                    </div>
                  </div>
                  {activeSection === 'name' ? <ChevronUp size={16} className="text-blue-500"/> : <ChevronDown size={16} className="text-slate-400"/>}
                </button>

                {activeSection === 'name' && (
                  <div className="px-4 pb-5 pt-0 animate-in slide-in-from-top-1">
                     <div className="h-px w-full bg-slate-50 mb-4"></div>
                     <input 
                       type="text" 
                       placeholder="Contoh: Promo Ramadhan"
                       className="w-full py-2.5 px-3 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs transition-all text-slate-800"
                       value={qrName}
                       onChange={(e) => setQrName(e.target.value)}
                     />
                  </div>
                )}
              </div>

            </div>

            {/* IKLAN BAWAH */}
            <AdSlot label="Bottom" />

          </div>
        </div>

        {/* ---------------- KOLOM KANAN: PREVIEW (FIXED & PAS 1 LAYAR) ---------------- */}
        <div className="hidden lg:flex w-[40%] bg-slate-50 border-l border-slate-200 items-center justify-center relative p-6 overflow-hidden">
             
             {/* Pattern */}
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

             <div className="relative z-10 flex flex-col items-center justify-center h-full">
                
                {/* Toggle Button */}
                <div className="flex bg-white rounded-full p-1 border border-slate-200 shadow-sm mb-4">
                   <button 
                     onClick={() => setPreviewMode('preview')}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${previewMode === 'preview' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}
                   >
                     <Eye size={12} /> Preview
                   </button>
                   <button 
                     onClick={() => setPreviewMode('qrcode')}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${previewMode === 'qrcode' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}
                   >
                     <QrCode size={12} /> QR Code
                   </button>
                </div>

                {/* HP MOCKUP (UKURAN DIPERKECIL AGAR TIDAK MELUBER) */}
                <div className="relative border-slate-800 bg-slate-800 border-[8px] rounded-[2rem] h-[460px] w-[230px] shadow-2xl ring-4 ring-slate-200/50">
                  <div className="h-[24px] w-[2px] bg-slate-700 absolute -start-[10px] top-[60px] rounded-s-lg"></div>
                  <div className="h-[32px] w-[2px] bg-slate-700 absolute -start-[10px] top-[100px] rounded-s-lg"></div>
                  
                  {/* Layar */}
                  <div className="rounded-[1.6rem] overflow-hidden w-full h-full bg-white relative flex flex-col">
                    
                    {/* Status Bar */}
                    <div className="h-6 bg-white flex justify-between items-center px-4 text-[8px] font-bold text-slate-800 border-b border-slate-50 shrink-0">
                       <span>09:41</span>
                       <div className="flex gap-0.5"><div className="w-1 h-1 bg-black rounded-full"></div></div>
                    </div>

                    {/* === CONTENT PREVIEW === */}
                    <div className="flex-1 bg-slate-50 overflow-hidden relative w-full">
                      {previewMode === 'preview' ? (
                        <div className="w-full h-full flex flex-col animate-in fade-in zoom-in duration-300">
                           {/* Browser Bar */}
                           <div className="bg-white px-3 py-2 border-b border-slate-200 shadow-sm z-10 shrink-0">
                              <div className="bg-slate-100 rounded-md py-1 px-2 flex items-center justify-center text-[8px] text-slate-500 truncate border border-slate-200 h-6">
                                 {url ? (url.startsWith('http') ? url : `https://${url}`) : 'www.website-anda.com'}
                              </div>
                           </div>
                           {/* Skeleton */}
                           <div className="flex-1 p-3 overflow-y-auto space-y-3">
                              <div className="w-full aspect-video bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center">
                                <div className="w-6 h-6 bg-slate-100 rounded-full animate-pulse"></div>
                              </div>
                              <div className="space-y-1.5">
                                 <div className="h-2.5 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                                 <div className="h-2 bg-slate-100 rounded w-full"></div>
                                 <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 pt-1">
                                 {[1,2,3,4].map(i => (
                                   <div key={i} className="aspect-square bg-white rounded-lg shadow-sm border border-slate-100 p-1.5 space-y-1.5">
                                      <div className="w-full h-1/2 bg-slate-100 rounded animate-pulse"></div>
                                      <div className="w-3/4 h-1.5 bg-slate-100 rounded"></div>
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-white animate-in fade-in zoom-in duration-300">
                           <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-center w-full aspect-square flex items-center justify-center mb-3">
                              <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${url || 'LayananQR'}`} 
                                alt="QR" 
                                className="w-full h-full object-contain opacity-90"
                              />
                           </div>
                           <p className="text-[9px] font-bold text-slate-800">Scan QR Code</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Home Indicator */}
                    <div className="h-4 w-full bg-white shrink-0 flex justify-center items-center">
                       <div className="w-16 h-1 bg-slate-900 rounded-full opacity-20"></div>
                    </div>
                  </div>
                </div>
             </div>
        </div>

      </div>

      {/* ================= COMPACT FOOTER (h-16) ================= */}
      <footer className="bg-white border-t border-slate-200 h-16 flex-none z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
         <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <Link href="/" className="text-slate-500 hover:text-slate-800 font-bold text-xs flex items-center gap-2">
               <ArrowLeft size={16} /> Batal
            </Link>

            {/* Stepper 1-2-3 */}
            <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
               <div className="flex flex-col items-center gap-0.5 group cursor-pointer opacity-100">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-600 text-blue-600 flex items-center justify-center text-[10px] font-bold">1</div>
                  <span className="text-[9px] font-bold text-blue-600 hidden sm:block">Tipe</span>
               </div>
               <div className="w-6 h-[1px] bg-blue-100 hidden sm:block"></div>
               <div className="flex flex-col items-center gap-0.5">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md shadow-blue-200">2</div>
                  <span className="text-[9px] font-bold text-slate-800 hidden sm:block">Konten</span>
               </div>
               <div className="w-6 h-[1px] bg-slate-200 hidden sm:block"></div>
               <div className="flex flex-col items-center gap-0.5 opacity-40">
                  <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400">3</div>
                  <span className="text-[9px] font-bold text-slate-400 hidden sm:block">Desain</span>
               </div>
            </div>

            {/* Tombol Next (Kecil & Rapi) */}
            <button 
              onClick={() => router.push('/create/website/design')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-xs transition-all shadow hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${url ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
              disabled={!url}
            >
               Lanjut <ArrowRight size={14} />
            </button>
         </div>
      </footer>

    </div>
  );
}