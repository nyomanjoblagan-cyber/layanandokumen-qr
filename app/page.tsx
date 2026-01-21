'use client';

import { useState } from 'react';
import { 
  Link as LinkIcon, FileText, Image as ImageIcon, Wifi, Share2, UserSquare, Video, Type, Briefcase, UtensilsCrossed, Smartphone, CheckCircle2, ChevronDown, ChevronUp, Zap, BarChart3, ArrowRight, Facebook, Download, PenTool, MousePointerClick, ShieldCheck, Printer, ScanLine, UploadCloud, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// --- DATA GAMBAR PREVIEW ---
const previewImages: Record<string, string> = {
  website: 'https://placehold.co/280x480/3b82f6/white?text=Preview+Website',
  vcard: 'https://placehold.co/280x480/4f46e5/white?text=Preview+VCard',
  pdf: 'https://placehold.co/280x480/ef4444/white?text=Preview+PDF+Menu',
  images: 'https://placehold.co/280x480/9333ea/white?text=Preview+Gallery',
  social: 'https://placehold.co/280x480/db2777/white?text=Preview+BioLink',
  video: 'https://placehold.co/280x480/ea580c/white?text=Preview+Video',
  text: 'https://placehold.co/280x480/4b5563/white?text=Preview+Text',
  business: 'https://placehold.co/280x480/0d9488/white?text=Preview+Business',
  facebook: 'https://placehold.co/280x480/1877f2/white?text=Preview+Facebook',
  wifi: 'https://placehold.co/280x480/06b6d4/white?text=Preview+WiFi',
  app: 'https://placehold.co/280x480/000000/white?text=Preview+AppStore',
  menu: 'https://placehold.co/280x480/ca8a04/white?text=Preview+Resto',
};

// --- DATA TOOLS ---
const qrOptions = [
  { id: 'website', label: 'Website', desc: 'Link URL / Web', icon: LinkIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'vcard', label: 'vCard', desc: 'Kartu Nama Digital', icon: UserSquare, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { id: 'pdf', label: 'PDF', desc: 'File Dokumen PDF', icon: FileText, color: 'text-red-600', bg: 'bg-red-100' },
  { id: 'images', label: 'Galeri', desc: 'Foto & Gambar', icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 'social', label: 'Sosmed', desc: 'Link Bio / Pohon', icon: Share2, color: 'text-pink-600', bg: 'bg-pink-100' },
  { id: 'video', label: 'Video', desc: 'YouTube / MP4', icon: Video, color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: 'text', label: 'Teks', desc: 'Pesan Tulisan', icon: Type, color: 'text-gray-600', bg: 'bg-gray-200' },
  { id: 'business', label: 'Bisnis', desc: 'Profil Usaha', icon: Briefcase, color: 'text-teal-600', bg: 'bg-teal-100' },
  { id: 'facebook', label: 'Facebook', desc: 'Halaman FB', icon: Facebook, color: 'text-blue-700', bg: 'bg-blue-100' },
  { id: 'wifi', label: 'Wi-Fi', desc: 'Sambungan WiFi', icon: Wifi, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  { id: 'app', label: 'App', desc: 'Play Store / iOS', icon: Smartphone, color: 'text-green-600', bg: 'bg-green-100' },
  { id: 'menu', label: 'Menu', desc: 'Daftar Menu', icon: UtensilsCrossed, color: 'text-yellow-600', bg: 'bg-yellow-100' },
];

// --- KOMPONEN IKLAN ---
const AdSlot = ({ label }: { label: string }) => (
  <div className="w-full max-w-5xl mx-auto px-6 my-8">
     <div className="w-full h-[90px] md:h-[100px] bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400">
        <span className="text-xs font-bold uppercase tracking-widest mb-1">Iklan {label}</span>
        <span className="text-[10px]">Tempatkan kode Adsterra/Adsense di sini</span>
     </div>
  </div>
);

export default function Home() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const activeType = hoveredType || selectedType;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') { setUploadError('Wajib file PDF ya.'); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError('Maksimal 5MB.'); return; }

    setIsUploading(true);
    setUploadError('');

    try {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let shortCode = '';
      for (let i = 0; i < 6; i++) shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
      const fileName = `${shortCode}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

      const { error: storageError } = await supabase.storage.from('pdfs').upload(fileName, file);
      if (storageError) throw storageError;
      const { data: urlData } = supabase.storage.from('pdfs').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from('documents').insert({
        short_code: shortCode, title: file.name.replace('.pdf', ''), file_url: urlData.publicUrl, file_path: fileName,
      });
      if (dbError) throw dbError;
      router.push(`/create/success?code=${shortCode}`);
    } catch (err: any) {
      setUploadError('Gagal: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 relative selection:bg-blue-100">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[300px] w-[300px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* --- NAVBAR --- */}
      <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 h-14 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-md">
              <Smartphone size={16} strokeWidth={2.5} />
            </div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 uppercase">LayananQR</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-[11px] font-bold text-slate-600 uppercase tracking-wide">
            <a href="#fitur" className="hover:text-blue-600 transition-colors">Fitur</a>
            <a href="#cara-pakai" className="hover:text-blue-600 transition-colors">Cara Pakai</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-[calc(100vh-3.5rem)] flex items-start justify-center pt-6 md:pt-10 pb-4">
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-8 items-start">
          
          {/* KIRI: Tools */}
          <div className="flex-1 w-full flex flex-col">
            
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight mb-1">
                Buat QR Code Resmi <span className="text-blue-600">Instan.</span>
              </h1>
              <p className="text-xs text-slate-500 max-w-lg font-medium">
                Platform all-in-one untuk membuat QR Code profesional. Mendukung PDF, Website, Kartu Nama, hingga Menu Restoran.
              </p>
            </div>

            {/* GRID TOOLS: COMPACT HEIGHT TAPI TEXT BESAR */}
            <div className="grid grid-cols-4 gap-1.5 mb-5">
              {qrOptions.map((item) => (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setHoveredType(item.id)}
                  onMouseLeave={() => setHoveredType(null)}
                  onClick={() => setSelectedType(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    cursor-pointer relative p-1.5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-center text-center gap-0.5 bg-white
                    aspect-[1/0.6] /* Tetap pendek/compact */
                    ${selectedType === item.id 
                      ? 'border-blue-600 ring-2 ring-blue-100 shadow-lg z-10' 
                      : 'border-slate-200 hover:border-blue-400 hover:shadow-md'}
                  `}
                >
                   {selectedType === item.id && (
                    <div className="absolute top-1 right-1 text-blue-600"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                   )}
                  <div className={`p-1.5 rounded-lg ${item.bg} ${item.color}`}>
                    <item.icon className="w-4 h-4" /> {/* Icon Sedang */}
                  </div>
                  <div className="w-full px-0.5">
                    {/* TEXT DIBESARKAN (text-[11px] / text-xs) */}
                    <h3 className="font-bold text-slate-800 text-[11px] sm:text-xs leading-none truncate">{item.label}</h3>
                    {/* DESKRIPSI DIBESARKAN (text-[9px]) */}
                    <p className="hidden sm:block text-[9px] text-slate-500 font-medium leading-none mt-0.5 truncate">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PETUNJUK 1-2-3 (Compact) */}
            <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl p-2.5 flex items-center justify-between gap-2 max-w-lg shadow-sm">
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">1</div>
                   <div className="text-[10px] font-bold text-slate-700">Pilih Tipe</div>
                </div>
                <div className="hidden sm:block text-slate-300"><ArrowRight className="w-3 h-3"/></div>
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center font-bold text-[9px]">2</div>
                   <div className="text-[10px] font-bold text-slate-700">Upload</div>
                </div>
                <div className="hidden sm:block text-slate-300"><ArrowRight className="w-3 h-3"/></div>
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center font-bold text-[9px]">3</div>
                   <div className="text-[10px] font-bold text-slate-700">Download</div>
                </div>
            </div>
          </div>

          {/* KANAN: HP Preview */}
          <div className="hidden md:flex w-[260px] shrink-0 h-full flex-col justify-start pt-2 sticky top-24">
             <div className="relative mx-auto border-slate-800 bg-slate-800 border-[10px] rounded-[2rem] h-[480px] w-[240px] shadow-2xl">
                <div className="h-[32px] w-[3px] bg-slate-700 absolute -start-[13px] top-[60px] rounded-s-lg"></div>
                <div className="h-[46px] w-[3px] bg-slate-700 absolute -start-[13px] top-[110px] rounded-s-lg"></div>
                
                <div className="rounded-[1.6rem] overflow-hidden w-full h-full bg-white relative flex flex-col">
                  {/* Status Bar */}
                  <div className="h-7 bg-white border-b border-slate-100 flex justify-between items-center px-4 text-[9px] font-bold text-slate-800 z-20">
                     <span>09.41</span>
                     <div className="flex gap-1"><div className="w-1.5 h-1.5 bg-black rounded-full"></div></div>
                  </div>
                  
                  {/* Screen Content */}
                  <div className="flex-1 bg-slate-50 relative overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {selectedType === 'pdf' && !hoveredType ? (
                         <motion.div 
                           key="upload" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                           className="w-full h-full p-5 flex flex-col items-center justify-center text-center"
                         >
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3 animate-bounce shadow-md">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h4 className="font-black text-slate-900 text-xs mb-1">Upload PDF</h4>
                            <p className="text-[9px] text-slate-500 mb-4 px-2 leading-relaxed">Menu Restoran, E-book, atau Dokumen Kantor.</p>
                            
                            <label className={`
                              group w-full py-2.5 px-3 rounded-lg bg-blue-600 text-white font-bold text-[10px] shadow-md cursor-pointer hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2
                              ${isUploading ? 'opacity-70 pointer-events-none' : ''}
                            `}>
                               {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <UploadCloud className="w-3.5 h-3.5"/>}
                               <span>{isUploading ? '...' : 'Pilih File'}</span>
                               <input type="file" className="hidden" accept="application/pdf" onChange={handlePdfUpload} />
                            </label>
                         </motion.div>
                      ) : activeType ? (
                        <motion.img 
                          key="preview" src={previewImages[activeType]} 
                          initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center opacity-40 grayscale p-6">
                           <Smartphone className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                           <p className="text-[9px] font-bold text-slate-400">Pilih Menu</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="h-1 w-16 bg-slate-900 rounded-full mx-auto mb-2 opacity-10 z-20 absolute bottom-2 left-1/2 -translate-x-1/2"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- IKLAN ATAS --- */}
      <AdSlot label="Banner Utama" />

      {/* --- SCROLL: CARA PAKAI --- */}
      <section id="cara-pakai" className="py-16 bg-white relative z-10 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
           <h2 className="text-2xl font-black text-slate-900 mb-3">Panduan Penggunaan</h2>
           <p className="text-sm text-slate-500 mb-10 max-w-2xl mx-auto">Proses pembuatan QR Code di LayananQR dirancang sesimpel mungkin tanpa mengurangi kualitas hasil.</p>
           
           <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: MousePointerClick, title: '1. Pilih Kategori', desc: 'Tentukan jenis konten. Apakah Anda ingin membagikan file PDF, Link Website, Video Youtube, atau Kontak WhatsApp.' },
                { icon: PenTool, title: '2. Input Data', desc: 'Isi formulir yang disediakan. Untuk PDF, cukup upload file maksimal 5MB. Untuk Link, cukup paste URL tujuan.' },
                { icon: Download, title: '3. Download & Cetak', desc: 'Sistem akan memproses dalam <1 detik. Download hasil QR Code dalam format PNG resolusi tinggi siap cetak.' }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-start bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600 mb-4">
                     <step.icon className="w-5 h-5" />
                   </div>
                   <h3 className="text-sm font-bold text-slate-900 mb-2">{step.title}</h3>
                   <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- IKLAN TENGAH --- */}
      <AdSlot label="Banner Tengah" />

      {/* --- SCROLL: FITUR --- */}
      <section id="fitur" className="py-16 bg-[#f8fafc] relative z-10 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
           <div className="text-center mb-10">
             <h2 className="text-2xl font-black text-slate-900 mb-3">Kenapa Memilih Kami?</h2>
             <p className="text-sm text-slate-500 max-w-2xl mx-auto">Standar baru pembuatan QR Code yang cepat, aman, dan dapat diandalkan.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: Zap, title: "Instan Tanpa Login", desc: "Tidak perlu registrasi email. Langsung pakai, langsung jadi." },
                { icon: CheckCircle2, title: "100% Gratis Selamanya", desc: "Tidak ada biaya langganan tersembunyi untuk fitur dasar." },
                { icon: ShieldCheck, title: "Privasi Terjaga", desc: "File Anda diproses dengan enkripsi dan aman di server kami." },
                { icon: Printer, title: "Kualitas Cetak HD", desc: "Hasil download beresolusi tinggi, tidak pecah saat dicetak besar." },
                { icon: ScanLine, title: "Scan Cepat", desc: "QR Code dioptimalkan agar mudah dibaca oleh semua kamera HP." },
                { icon: Smartphone, title: "Mobile Friendly", desc: "Tampilan website responsif, mudah digunakan di HP maupun Laptop." }
              ].map((f, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                   <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3"><f.icon className="w-4 h-4"/></div>
                   <h3 className="font-bold text-sm text-slate-900 mb-1">{f.title}</h3>
                   <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- SCROLL: FAQ --- */}
      <section id="faq" className="py-16 bg-white relative z-10 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
           <h2 className="text-2xl font-black text-center mb-8 text-slate-900">Pertanyaan Umum</h2>
           <div className="space-y-3">
             {[
               { q: "Apakah layanan ini benar-benar gratis?", a: "Ya, 100% gratis untuk semua tools yang tersedia di halaman ini tanpa batasan scan harian." },
               { q: "Berapa lama masa aktif QR Code?", a: "QR Code aktif selamanya selama file sumber tidak dihapus oleh sistem (untuk file sementara) atau URL tujuan masih aktif." },
               { q: "Apakah file PDF saya aman?", a: "Kami menggunakan penyimpanan cloud terenkripsi. File PDF Anda hanya bisa diakses oleh orang yang men-scan QR Code tersebut." },
               { q: "Bisa untuk menu restoran?", a: "Sangat bisa. Gunakan fitur 'PDF' untuk upload buku menu, atau 'Website' jika Anda sudah punya link menu online." },
               { q: "Apakah bisa diedit isinya?", a: "Untuk versi gratis (Tanpa Login), QR bersifat statis. Jika ingin mengubah isi, Anda perlu membuat QR Code baru." },
               { q: "Apa format file yang didukung?", a: "Saat ini kami mendukung PDF (maks 5MB), Gambar (JPG/PNG), dan berbagai format teks/link." }
             ].map((faq, idx) => (
               <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-blue-300 transition-colors">
                 <button onClick={() => toggleFaq(idx)} className="w-full flex justify-between items-center p-4 text-left">
                   <span className="text-xs font-bold text-slate-700">{faq.q}</span>
                   {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-400"/> : <ChevronDown className="w-4 h-4 text-slate-400"/>}
                 </button>
                 <AnimatePresence>
                   {openFaq === idx && <div className="px-4 pb-4 text-xs text-slate-500 border-t border-slate-100 pt-3 bg-slate-50 leading-relaxed">{faq.a}</div>}
                 </AnimatePresence>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* --- IKLAN BAWAH --- */}
      <AdSlot label="Banner Bawah" />

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 text-slate-600 py-10 text-xs border-t border-slate-200 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
           <div className="md:col-span-5 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Smartphone size={16} className="text-blue-600"/> LayananQR
              </div>
              <p className="leading-relaxed text-slate-500 pr-4">
                Platform QR Code all-in-one untuk kebutuhan bisnis Anda. Membantu UMKM Go Digital dengan mudah.
              </p>
           </div>
           <div className="md:col-span-7 grid grid-cols-2 gap-8">
             <div>
               <h4 className="font-bold text-slate-900 mb-3">Produk</h4>
               <ul className="space-y-2">
                 <li><a href="#" className="hover:text-blue-600 transition">PDF QR</a></li>
                 <li><a href="#" className="hover:text-blue-600 transition">Website QR</a></li>
                 <li><a href="#" className="hover:text-blue-600 transition">vCard Generator</a></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-slate-900 mb-3">Bantuan</h4>
               <ul className="space-y-2">
                 <li><a href="#" className="hover:text-blue-600 transition">Kontak Kami</a></li>
                 <li><a href="#" className="hover:text-blue-600 transition">Kebijakan Privasi</a></li>
                 <li><a href="#" className="hover:text-blue-600 transition">Syarat & Ketentuan</a></li>
               </ul>
             </div>
           </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-slate-200 text-center md:text-left text-slate-400">
           &copy; 2026 LayananQR. Dibuat di Indonesia 🇮🇩
        </div>
      </footer>

    </main>
  );
}