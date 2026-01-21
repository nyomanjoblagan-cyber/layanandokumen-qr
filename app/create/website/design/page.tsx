'use client';

import { useState, useRef } from 'react';
import { 
  ChevronDown, ChevronUp, ArrowLeft, Smartphone, Check, Upload, Image as ImageIcon, Frame, Grid, Square, Palette, Download
} from 'lucide-react';
import Link from 'next/link';

// --- KOMPONEN IKLAN ---
const AdSlot = ({ label }: { label: string }) => (
  <div className="w-full h-[70px] bg-slate-100 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 my-4 flex-shrink-0">
     <span className="text-[9px] font-bold uppercase tracking-widest">Iklan {label}</span>
     <span className="text-[8px]">Slot Adsterra</span>
  </div>
);

// --- DATA UTAMA ---

const frames = [
  { id: 'none', label: 'None', type: 'none' },
  { id: 'scanme-bottom', label: 'Bottom', type: 'bottom' },
  { id: 'scanme-top', label: 'Top', type: 'top' },
  { id: 'box', label: 'Box', type: 'box' },
  { id: 'bubble', label: 'Bubble', type: 'bubble' },
];

const patterns = [
  { id: 'square', label: 'Square' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'circle', label: 'Circle' },
];

const cornerFrames = [
  { id: 'square', label: 'Square', css: 'rounded-none' },
  { id: 'rounded', label: 'Rounded', css: 'rounded-xl' },
  { id: 'circle', label: 'Circle', css: 'rounded-2xl' },
  { id: 'leaf', label: 'Leaf', css: 'rounded-tr-xl rounded-bl-xl' },
];

const cornerDots = [
  { id: 'square', label: 'Square' },
  { id: 'circle', label: 'Circle' },
];

const socialLogos = [
  { id: 'twitter', icon: 'https://cdn-icons-png.flaticon.com/128/733/733579.png' },
  { id: 'facebook', icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968764.png' },
  { id: 'youtube', icon: 'https://cdn-icons-png.flaticon.com/128/1384/1384060.png' },
  { id: 'instagram', icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111463.png' },
  { id: 'tiktok', icon: 'https://cdn-icons-png.flaticon.com/128/3046/3046121.png' },
  { id: 'linkedin', icon: 'https://cdn-icons-png.flaticon.com/128/3536/3536505.png' },
  { id: 'pinterest', icon: 'https://cdn-icons-png.flaticon.com/128/3536/3536592.png' },
  { id: 'whatsapp', icon: 'https://cdn-icons-png.flaticon.com/128/733/733585.png' },
  { id: 'google', icon: 'https://cdn-icons-png.flaticon.com/128/300/300221.png' },
  { id: 'apple', icon: 'https://cdn-icons-png.flaticon.com/128/0/747.png' },
  { id: 'netflix', icon: 'https://cdn-icons-png.flaticon.com/128/732/732228.png' },
  { id: 'spotify', icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111624.png' },
  { id: 'telegram', icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111646.png' },
  { id: 'discord', icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968756.png' },
];

export default function DesignPage() {
  const [config, setConfig] = useState({
    frame: 'none',
    pattern: 'square',
    cornerFrame: 'square',
    cornerDot: 'square',
    colorDot: '#000000',
    colorBg: '#ffffff',
    logo: null as string | null,
    transparent: false
  });

  const [activeSection, setActiveSection] = useState<string | null>('frame'); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: string) => setActiveSection(activeSection === section ? null : section);
  
  const updateConfig = (key: string, value: any) => setConfig(prev => ({ ...prev, [key]: value }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateConfig('logo', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getCornerClass = () => {
    const selected = cornerFrames.find(c => c.id === config.cornerFrame);
    return selected ? selected.css : 'rounded-none';
  };

  return (
    <div className="h-screen bg-[#f8fafc] font-sans text-slate-900 flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 h-14 flex-none z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1 rounded-md text-white shadow-sm"><Smartphone size={16} /></div>
              <span className="font-bold text-sm text-slate-800">LayananQR</span>
           </Link>
           <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
             <span>Step 3 / 3</span>
             <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full w-full bg-blue-600 rounded-full"></div></div>
           </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* === KIRI: EDITOR + IKLAN === */}
        <div className="flex-1 w-full lg:w-[60%] overflow-y-auto p-6 scrollbar-hide pb-32">
          <div className="max-w-xl mx-auto">
            
            <div className="mb-6">
              <Link href="/create/website" className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-2 transition-colors">
                <ArrowLeft size={12} /> Back
              </Link>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 mb-1">Customize Design</h1>
              <p className="text-xs text-slate-500">Sesuaikan tampilan QR Code.</p>
            </div>

            {/* IKLAN ATAS */}
            <AdSlot label="Top Banner" />

            <div className="space-y-4">
              
              {/* 1. FRAME */}
              <div className={`bg-white rounded-xl border transition-all ${activeSection === 'frame' ? 'border-blue-500 ring-1 ring-blue-100 shadow-md' : 'border-slate-200'}`}>
                <button onClick={() => toggleSection('frame')} className="w-full flex items-center justify-between p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Frame size={16}/></div>
                    <div><h3 className="font-bold text-xs text-slate-800">QR Code Frame</h3></div>
                  </div>
                  {activeSection === 'frame' ? <ChevronUp size={16} className="text-blue-500"/> : <ChevronDown size={16} className="text-slate-400"/>}
                </button>
                {activeSection === 'frame' && (
                  <div className="px-4 pb-5 pt-0 animate-in slide-in-from-top-1">
                     <div className="h-px w-full bg-slate-50 mb-4"></div>
                     <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {frames.map((frame) => (
                          <div 
                            key={frame.id} 
                            onClick={() => updateConfig('frame', frame.id)}
                            className={`cursor-pointer rounded-lg border flex flex-col items-center justify-center p-2 h-16 relative ${config.frame === frame.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}
                          >
                             <div className="relative w-6 h-6 bg-slate-800 flex items-center justify-center">
                                <span className="text-[6px] text-white opacity-50">QR</span>
                                {frame.type === 'bottom' && <div className="absolute -bottom-1.5 w-8 h-1.5 bg-black rounded-full"></div>}
                                {frame.type === 'top' && <div className="absolute -top-1.5 w-8 h-1.5 bg-black rounded-full"></div>}
                                {frame.type === 'box' && <div className="absolute inset-0 border border-black -m-0.5"></div>}
                             </div>
                             <span className="text-[8px] font-medium text-slate-500 mt-1">{frame.label}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                )}
              </div>

              {/* 2. PATTERN & COLORS */}
              <div className={`bg-white rounded-xl border transition-all ${activeSection === 'pattern' ? 'border-blue-500 ring-1 ring-blue-100 shadow-md' : 'border-slate-200'}`}>
                <button onClick={() => toggleSection('pattern')} className="w-full flex items-center justify-between p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><Grid size={16}/></div>
                    <div><h3 className="font-bold text-xs text-slate-800">Pattern & Color</h3></div>
                  </div>
                  {activeSection === 'pattern' ? <ChevronUp size={16} className="text-blue-500"/> : <ChevronDown size={16} className="text-slate-400"/>}
                </button>
                {activeSection === 'pattern' && (
                  <div className="px-4 pb-5 pt-0 animate-in slide-in-from-top-1">
                     <div className="h-px w-full bg-slate-50 mb-4"></div>
                     <div className="grid grid-cols-4 gap-2 mb-4">
                        {patterns.map((p) => (
                           <div key={p.id} onClick={() => updateConfig('pattern', p.id)} className={`cursor-pointer h-10 border rounded flex items-center justify-center hover:bg-slate-50 ${config.pattern === p.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                              <div className={`w-3 h-3 bg-slate-800 ${p.id === 'circle' ? 'rounded-full' : p.id === 'rounded' ? 'rounded-sm' : ''}`}></div>
                           </div>
                        ))}
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="text-[10px] font-bold text-slate-700 mb-1 block">Dot Color</label>
                           <div className="flex items-center gap-2 border border-slate-200 rounded p-1.5 bg-white">
                              <div className="w-4 h-4 rounded border" style={{ backgroundColor: config.colorDot }}></div>
                              <input type="text" value={config.colorDot} className="w-full text-xs font-mono outline-none text-slate-600 uppercase" readOnly />
                              <input type="color" value={config.colorDot} onChange={(e) => updateConfig('colorDot', e.target.value)} className="w-6 h-6 p-0 border-0 rounded cursor-pointer" />
                           </div>
                        </div>
                        <div>
                           <label className="text-[10px] font-bold text-slate-700 mb-1 block">Background</label>
                           <div className={`flex items-center gap-2 border border-slate-200 rounded p-1.5 bg-white ${config.transparent ? 'opacity-50' : ''}`}>
                              <div className="w-4 h-4 rounded border" style={{ backgroundColor: config.colorBg }}></div>
                              <input type="color" value={config.colorBg} onChange={(e) => updateConfig('colorBg', e.target.value)} className="w-6 h-6 p-0 border-0 rounded cursor-pointer" />
                           </div>
                           <label className="flex items-center gap-2 mt-1 cursor-pointer"><input type="checkbox" checked={config.transparent} onChange={(e) => updateConfig('transparent', e.target.checked)} className="w-3 h-3"/><span className="text-[9px]">Transparent</span></label>
                        </div>
                     </div>
                  </div>
                )}
              </div>

              {/* 3. CORNERS */}
              <div className={`bg-white rounded-xl border transition-all ${activeSection === 'corners' ? 'border-blue-500 ring-1 ring-blue-100 shadow-md' : 'border-slate-200'}`}>
                <button onClick={() => toggleSection('corners')} className="w-full flex items-center justify-between p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><Square size={16}/></div>
                    <div><h3 className="font-bold text-xs text-slate-800">Corners</h3></div>
                  </div>
                  {activeSection === 'corners' ? <ChevronUp size={16} className="text-blue-500"/> : <ChevronDown size={16} className="text-slate-400"/>}
                </button>
                {activeSection === 'corners' && (
                  <div className="px-4 pb-5 pt-0 animate-in slide-in-from-top-1">
                     <div className="h-px w-full bg-slate-50 mb-4"></div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="text-[10px] font-bold text-slate-700 mb-2 block">Frame Shape</label>
                           <div className="grid grid-cols-4 gap-2">
                              {cornerFrames.map((cf) => (
                                 <div key={cf.id} onClick={() => updateConfig('cornerFrame', cf.id)} className={`cursor-pointer aspect-square rounded border flex items-center justify-center hover:bg-slate-50 ${config.cornerFrame === cf.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                                    <div className={`w-3 h-3 border-2 border-slate-800 ${cf.css}`}></div>
                                 </div>
                              ))}
                           </div>
                        </div>
                        <div>
                           <label className="text-[10px] font-bold text-slate-700 mb-2 block">Dot Shape</label>
                           <div className="grid grid-cols-3 gap-2">
                              {cornerDots.map((cd) => (
                                 <div key={cd.id} onClick={() => updateConfig('cornerDot', cd.id)} className={`cursor-pointer aspect-square rounded border flex items-center justify-center hover:bg-slate-50 ${config.cornerDot === cd.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                                    <div className={`w-2 h-2 bg-slate-800 ${cd.id === 'circle' ? 'rounded-full' : ''}`}></div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                )}
              </div>

              {/* 4. LOGO (REVISI: GRID 8, PADDING 2 = ICON KECIL) */}
              <div className={`bg-white rounded-xl border transition-all ${activeSection === 'logo' ? 'border-blue-500 ring-1 ring-blue-100 shadow-md' : 'border-slate-200'}`}>
                <button onClick={() => toggleSection('logo')} className="w-full flex items-center justify-between p-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center"><ImageIcon size={16}/></div>
                    <div><h3 className="font-bold text-xs text-slate-800">Add Logo</h3></div>
                  </div>
                  {activeSection === 'logo' ? <ChevronUp size={16} className="text-blue-500"/> : <ChevronDown size={16} className="text-slate-400"/>}
                </button>
                {activeSection === 'logo' && (
                  <div className="px-4 pb-5 pt-0 animate-in slide-in-from-top-1">
                     <div className="h-px w-full bg-slate-50 mb-4"></div>
                     <label className="text-[10px] font-bold text-slate-700 mb-2 block">Select Logo</label>
                     
                     {/* GRID DIBUAT 8 KOLOM AGAR LEBIH KECIL */}
                     <div className="grid grid-cols-8 gap-2 mb-4">
                        <button onClick={() => updateConfig('logo', null)} className={`aspect-square rounded border flex items-center justify-center text-[9px] text-slate-400 hover:bg-slate-50 ${config.logo === null ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>X</button>
                        {socialLogos.map((l) => (
                          <button 
                            key={l.id}
                            onClick={() => updateConfig('logo', l.icon)}
                            // padding dibuat p-2 agar icon mengecil
                            className={`aspect-square rounded border flex items-center justify-center p-2 hover:bg-slate-50 bg-white ${config.logo === l.icon ? 'border-blue-600 ring-1 ring-blue-100' : 'border-slate-200'}`}
                          >
                             <img src={l.icon} alt={l.id} className="w-full h-full object-contain" />
                          </button>
                        ))}
                     </div>
                     
                     <label className="text-[10px] font-bold text-slate-700 mb-2 block">Upload your own logo</label>
                     <div 
                       className="border border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-white hover:border-blue-400 transition-colors h-24"
                       onClick={() => fileInputRef.current?.click()}
                     >
                        <Upload size={20} className="text-slate-400 mb-2"/>
                        <p className="text-[10px] text-slate-500 font-medium">Upload image (jpg, png)</p>
                        <p className="text-[8px] text-slate-400">Max size: 5MB</p>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                     </div>
                  </div>
                )}
              </div>

            </div>

            {/* IKLAN BAWAH */}
            <AdSlot label="Bottom Banner" />

          </div>
        </div>

        {/* === KANAN: PREVIEW (FIXED) === */}
        <div className="hidden lg:flex w-[40%] bg-slate-50 border-l border-slate-200 items-center justify-center relative p-6">
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

             <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center relative w-[320px]">
                   
                   <h3 className="font-bold text-slate-800 text-sm mb-6">Live Preview</h3>
                   
                   <div className={`relative p-4 mx-auto transition-all ${config.frame === 'box' ? 'border-4 border-black rounded-xl pb-10 bg-white' : ''} ${config.frame === 'bubble' ? 'border-4 border-black rounded-t-2xl rounded-bl-2xl p-4 bg-white' : ''}`}>
                      {(config.frame === 'scanme-bottom' || config.frame === 'box') && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-3 py-0.5 rounded-full font-bold z-20">SCAN ME</div>
                      )}
                      {(config.frame === 'scanme-top') && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-3 py-0.5 rounded-full font-bold z-20">SCAN ME</div>
                      )}

                      <div className={`relative w-48 h-48 mx-auto overflow-hidden ${getCornerClass()}`} style={{ backgroundColor: config.transparent ? 'transparent' : config.colorBg }}>
                         <img 
                           src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://layanandokumen.com&color=${config.colorDot.replace('#', '')}&bgcolor=${config.transparent ? 'ffffff' : config.colorBg.replace('#', '')}&margin=2`}
                           alt="QR" 
                           className="w-full h-full object-contain mix-blend-multiply"
                         />
                         {config.logo && (
                           <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-11 h-11 bg-white rounded-lg p-1 shadow-md border border-slate-100 flex items-center justify-center">
                                 <img src={config.logo} alt="Logo" className="w-full h-full object-contain" />
                              </div>
                           </div>
                         )}
                      </div>
                   </div>
                   <p className="mt-6 text-[10px] text-slate-400">Preview diperbarui otomatis</p>
                </div>
             </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 h-20 flex-none z-50 shadow-inner">
         <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <Link href="/create/website" className="text-slate-500 hover:text-slate-800 font-bold text-xs flex items-center gap-2">
               <ArrowLeft size={16} /> Back
            </Link>
            
            {/* Stepper */}
            <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
               <div className="flex flex-col items-center gap-0.5 group opacity-100">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-600 text-blue-600 flex items-center justify-center text-[10px] font-bold"><Check size={12}/></div>
                  <span className="text-[9px] font-bold text-blue-600 hidden sm:block">Tipe</span>
               </div>
               <div className="w-6 h-[1px] bg-blue-200 hidden sm:block"></div>
               <div className="flex flex-col items-center gap-0.5 opacity-100">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-600 text-blue-600 flex items-center justify-center text-[10px] font-bold"><Check size={12}/></div>
                  <span className="text-[9px] font-bold text-blue-600 hidden sm:block">Konten</span>
               </div>
               <div className="w-6 h-[1px] bg-blue-200 hidden sm:block"></div>
               <div className="flex flex-col items-center gap-0.5">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md shadow-blue-200">3</div>
                  <span className="text-[9px] font-bold text-slate-800 hidden sm:block">Desain</span>
               </div>
            </div>

            <button onClick={() => alert("Download Success!")} className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-xs transition-all shadow-md bg-emerald-600 text-white hover:bg-emerald-700">
               <Download size={16} /> Download
            </button>
         </div>
      </footer>

    </div>
  );
}