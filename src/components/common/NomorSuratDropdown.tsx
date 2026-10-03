import React, { useState, useEffect } from 'react';
import {
  NOMOR_SURAT_LIST,
  TAHUN_SURAT_LIST,
  BULAN_SURAT_LIST,
  KODE_MADRASAH_PRESETS,
  buildNomorSurat,
  parseNomorSurat,
} from '../../data/nomorSuratData';
import { Hash, Calendar, Edit3, ListFilter, BookOpen, Check, ArrowRight } from 'lucide-react';

interface NomorSuratDropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  onOpenCodePicker?: () => void;
  className?: string;
  defaultKlasifikasi?: string;
}

export const NomorSuratDropdown: React.FC<NomorSuratDropdownProps> = ({
  value,
  onChange,
  label = 'Nomor Surat Dinas',
  onOpenCodePicker,
  className = '',
  defaultKlasifikasi = 'PP.00.6',
}) => {
  const [isManualInput, setIsManualInput] = useState<boolean>(false);
  
  // Parse existing value
  const parsed = parseNomorSurat(value);
  const [noUrut, setNoUrut] = useState<string>(parsed.nomorUrut || 'B.001');
  const [kodeMadrasah, setKodeMadrasah] = useState<string>(parsed.kodeMadrasah || 'MTs.21.07.03');
  const [klasifikasi, setKlasifikasi] = useState<string>(parsed.klasifikasi || defaultKlasifikasi);
  const [bulan, setBulan] = useState<string>(parsed.bulan || '09');
  const [tahun, setTahun] = useState<string>(parsed.tahun || '2026');

  // Keep internal state synchronized when external value changes
  useEffect(() => {
    if (value) {
      const p = parseNomorSurat(value);
      setNoUrut(p.nomorUrut);
      setKodeMadrasah(p.kodeMadrasah);
      setKlasifikasi(p.klasifikasi);
      setBulan(p.bulan);
      setTahun(p.tahun);
    }
  }, [value]);

  const handleSegmentChange = (
    newNoUrut = noUrut,
    newMadrasah = kodeMadrasah,
    newKlas = klasifikasi,
    newBulan = bulan,
    newTahun = tahun
  ) => {
    setNoUrut(newNoUrut);
    setKodeMadrasah(newMadrasah);
    setKlasifikasi(newKlas);
    setBulan(newBulan);
    setTahun(newTahun);
    const full = buildNomorSurat(newNoUrut, newMadrasah, newKlas, newBulan, newTahun);
    onChange(full);
  };

  const handleNextNumber = () => {
    const match = noUrut.match(/\d+/);
    if (match) {
      const currentNum = parseInt(match[0], 10);
      if (currentNum < 300) {
        const nextStr = `B.${String(currentNum + 1).padStart(3, '0')}`;
        handleSegmentChange(nextStr, kodeMadrasah, klasifikasi, bulan, tahun);
      }
    }
  };

  const handlePrevNumber = () => {
    const match = noUrut.match(/\d+/);
    if (match) {
      const currentNum = parseInt(match[0], 10);
      if (currentNum > 1) {
        const prevStr = `B.${String(currentNum - 1).padStart(3, '0')}`;
        handleSegmentChange(prevStr, kodeMadrasah, klasifikasi, bulan, tahun);
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-emerald-600" />
          <span>{label}</span>
        </label>
        <div className="flex items-center gap-3">
          {onOpenCodePicker && (
            <button
              type="button"
              onClick={onOpenCodePicker}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <BookOpen className="w-3 h-3" />
              <span>Buku Kode</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsManualInput(!isManualInput)}
            className="text-[10px] text-slate-500 hover:text-emerald-700 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
          >
            {isManualInput ? (
              <>
                <ListFilter className="w-3 h-3 text-emerald-600" />
                <span>Mode Dropdown</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3 h-3 text-slate-500" />
                <span>Ketik Manual</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isManualInput ? (
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
            placeholder="B.001/MTs.21.07.03/PP.00.6/09/2026"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ) : (
        <div className="space-y-2 bg-slate-50/80 p-2.5 rounded-lg border border-slate-200">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {/* 1. Dropdown Nomor Urut: B.001 s.d B.300 */}
            <div className="col-span-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                No. Urut (B.001-300)
              </span>
              <select
                value={noUrut}
                onChange={(e) => handleSegmentChange(e.target.value, kodeMadrasah, klasifikasi, bulan, tahun)}
                className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
              >
                {!NOMOR_SURAT_LIST.includes(noUrut) && (
                  <option value={noUrut}>{noUrut}</option>
                )}
                {NOMOR_SURAT_LIST.map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Kode Madrasah (MTs.21.07.03) */}
            <div className="col-span-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                Kode Madrasah
              </span>
              <select
                value={kodeMadrasah}
                onChange={(e) => handleSegmentChange(noUrut, e.target.value, klasifikasi, bulan, tahun)}
                className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
              >
                {!KODE_MADRASAH_PRESETS.some((k) => k.value === kodeMadrasah) && (
                  <option value={kodeMadrasah}>{kodeMadrasah}</option>
                )}
                {KODE_MADRASAH_PRESETS.map((k) => (
                  <option key={k.value} value={k.value}>
                    {k.value} ({k.nama})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Kode Klasifikasi */}
            <div className="col-span-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                Klasifikasi
              </span>
              <input
                type="text"
                value={klasifikasi}
                onChange={(e) => handleSegmentChange(noUrut, kodeMadrasah, e.target.value, bulan, tahun)}
                className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="PP.00.6"
              />
            </div>

            {/* 4. Bulan */}
            <div className="col-span-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                Bulan
              </span>
              <select
                value={bulan}
                onChange={(e) => handleSegmentChange(noUrut, kodeMadrasah, klasifikasi, e.target.value, tahun)}
                className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
              >
                {BULAN_SURAT_LIST.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.value} ({b.label.split(' ')[1].replace(/[()]/g, '')})
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Dropdown Tahun: 2026 s.d 2030 */}
            <div className="col-span-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                Tahun (2026-2030)
              </span>
              <select
                value={tahun}
                onChange={(e) => handleSegmentChange(noUrut, kodeMadrasah, klasifikasi, bulan, e.target.value)}
                className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-md font-mono font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
              >
                {!TAHUN_SURAT_LIST.includes(tahun) && (
                  <option value={tahun}>{tahun}</option>
                )}
                {TAHUN_SURAT_LIST.map((th) => (
                  <option key={th} value={th}>
                    {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stepper Buttons & Full Preview Bar */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevNumber}
                className="px-2 py-0.5 text-[10px] font-semibold bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-200 transition-colors shadow-2xs"
                title="Nomor Urut Sebelumnya"
              >
                ◀ -1
              </button>
              <button
                type="button"
                onClick={handleNextNumber}
                className="px-2 py-0.5 text-[10px] font-semibold bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-200 transition-colors shadow-2xs"
                title="Nomor Urut Berikutnya"
              >
                +1 ▶
              </button>
              <span className="text-[10px] text-slate-400 font-medium">Auto Step</span>
            </div>

            <div className="font-mono text-[11px] font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
              <span className="text-emerald-700">{noUrut}</span>
              <span className="text-slate-400">/</span>
              <span>{kodeMadrasah}</span>
              <span className="text-slate-400">/</span>
              <span className="text-blue-700">{klasifikasi}</span>
              <span className="text-slate-400">/</span>
              <span>{bulan}</span>
              <span className="text-slate-400">/</span>
              <span className="text-amber-700">{tahun}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
