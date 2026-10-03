import React, { useState } from 'react';
import { KemenagLogo } from './KemenagLogo';
import {
  FileText,
  LogIn,
  ShieldCheck,
  Sparkles,
  Award,
  BookOpen,
  UserCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 350);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex flex-col justify-between items-center p-4 sm:p-6 text-slate-100 relative overflow-hidden">
      {/* Background Subtle Highlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Header */}
      <header className="w-full max-w-4xl flex items-center justify-between py-2 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-300 uppercase block">
              Aplikasi Tata Naskah Dinas
            </span>
            <span className="text-[10px] text-slate-400">PMA Kemenag No. 9 Tahun 2016</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sistem Resmi Madrasah</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md my-auto z-10">
        <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">
          {/* Card Top Decorative Bar */}
          <div className="h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-400" />

          <div className="p-6 sm:p-8 space-y-6">
            {/* Logo & Application Title */}
            <div className="text-center space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-inner">
                <KemenagLogo className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-sm" />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                  GEN-SURAT MADRASAH
                </h1>
                <p className="text-xs text-emerald-700 font-semibold mt-1">
                  Generator Naskah Dinas & Administrasi Madrasah
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Kementerian Agama Republik Indonesia
                </p>
              </div>
            </div>

            {/* Quick Feature Highlights */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Surat Tugas, SK, Undangan, Izin/Cuti & Keterangan</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Format Standar Kemenag & Ekspor PDF / Word Instan</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dilengkapi QR Code TTE & Asisten AI Gemini</span>
              </div>
            </div>

            {/* Form Login (No User & Password Required) */}
            <form onSubmit={handleEnter} className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-center text-xs text-emerald-900">
                <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-800 mb-0.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Akses Langsung Tanpa Akun</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Klik tombol <strong>MASUK</strong> di bawah untuk langsung membuka workspace generator surat.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                id="btn-login-masuk"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 text-white font-bold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memuat Workspace...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>MASUK</span>
                  </>
                )}
              </button>
            </form>

            {/* Mandatory Developer & School Information (Wajib di bawah formulir login) */}
            <div className="pt-4 border-t border-slate-200 text-center">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Pengembang :
                </div>
                <div className="text-sm font-black text-slate-900 tracking-wide">
                  JEMI ARIFIN, ST
                </div>
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  MTSN 3 JENEPONTO
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center py-2 text-[11px] text-slate-400 z-10">
        <p>© {new Date().getFullYear()} GEN-SURAT MADRASAH • Tata Naskah Dinas Elektronik Madrasah</p>
      </footer>
    </div>
  );
};
