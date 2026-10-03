import React, { useState } from 'react';
import { KEMENAG_CLASSIFICATION_CODES, KemenagCode } from '../data/kemenagCodes';
import { Search, X, Check, BookOpen, Tag } from 'lucide-react';

interface KlasifikasiCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCode: (code: string) => void;
}

export const KlasifikasiCodeModal: React.FC<KlasifikasiCodeModalProps> = ({
  isOpen,
  onClose,
  onSelectCode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', ...Array.from(new Set(KEMENAG_CLASSIFICATION_CODES.map((c) => c.category)))];

  const filtered = KEMENAG_CLASSIFICATION_CODES.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base uppercase tracking-wide">
                Daftar Kode Klasifikasi Arsip Kemenag RI
              </h3>
              <p className="text-[11px] text-slate-500">
                PMA Tata Naskah Dinas & Pola Klasifikasi Surat Madrasah
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kode (misal: PP.00.6, KP, Kurikulum, Asesmen, BOS, Undangan)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              autoFocus
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md shrink-0 transition-colors text-[11px] uppercase tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Code List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
              Tidak ada kode klasifikasi yang cocok dengan pencarian "{searchTerm}"
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.code}
                className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all flex items-start justify-between gap-3 group cursor-pointer"
                onClick={() => {
                  onSelectCode(item.code);
                  onClose();
                }}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.code}
                    </span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                      {item.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-md bg-white border border-slate-200 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white text-slate-700 transition-colors flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Pilih
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-md transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
