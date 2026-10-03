import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  FileCheck,
  Calendar,
  User,
  Building,
  Download,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { FullDocumentState, LetterType } from '../types/letter';
import { formatIndoDate } from '../utils/dateHelpers';

interface SaveCompletedLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  docState: FullDocumentState;
  onConfirmSave: (data: {
    customName: string;
    catatan?: string;
    downloadPdfNow: boolean;
  }) => void;
}

const LETTER_TYPE_NAMES: Record<LetterType, string> = {
  surat_tugas: 'Surat Tugas',
  sk: 'Surat Keputusan (SK)',
  undangan: 'Undangan Dinas',
  keterangan: 'Surat Keterangan',
  rekomendasi: 'Surat Rekomendasi',
  pengantar: 'Surat Pengantar',
  izin_dispensasi: 'Surat Izin / Cuti',
};

export const SaveCompletedLetterModal: React.FC<SaveCompletedLetterModalProps> = ({
  isOpen,
  onClose,
  docState,
  onConfirmSave,
}) => {
  const [archiveName, setArchiveName] = useState('');
  const [catatan, setCatatan] = useState('');
  const [downloadPdfNow, setDownloadPdfNow] = useState(true);

  // Extract letter details
  const getDetails = (state: FullDocumentState) => {
    switch (state.jenisSurat) {
      case 'surat_tugas':
        return {
          nomor: state.suratTugas.nomorSurat,
          perihal: state.suratTugas.perihal || state.suratTugas.maksudTugas,
        };
      case 'sk':
        return {
          nomor: state.sk.nomorSK,
          perihal: state.sk.tentangSK,
        };
      case 'undangan':
        return {
          nomor: state.undangan.nomorSurat,
          perihal: state.undangan.hal,
        };
      case 'keterangan':
        return {
          nomor: state.keterangan.nomorSurat,
          perihal:
            state.keterangan.tujuanKeterangan ||
            `Keterangan ${state.keterangan.namaSiswa || state.keterangan.namaPegawai || ''}`.trim(),
        };
      case 'rekomendasi':
        return {
          nomor: state.rekomendasi.nomorSurat,
          perihal: state.rekomendasi.tujuanRekomendasi,
        };
      case 'pengantar':
        return {
          nomor: state.pengantar.nomorSurat,
          perihal: `Pengantar ke ${state.pengantar.tujuanYth || 'Kankemenag'}`.trim(),
        };
      case 'izin_dispensasi':
        return {
          nomor: state.izinDispensasi.nomorSurat,
          perihal: state.izinDispensasi.perihal,
        };
      default:
        return { nomor: '', perihal: '' };
    }
  };

  const details = getDetails(docState);
  const typeLabel = LETTER_TYPE_NAMES[docState.jenisSurat] || 'Surat';

  useEffect(() => {
    if (isOpen) {
      const defaultName = `${typeLabel}: ${details.perihal || 'Naskah Dinas'} (${details.nomor || formatIndoDate(new Date().toISOString().slice(0, 10))})`;
      setArchiveName(defaultName);
      setCatatan('');
      setDownloadPdfNow(true);
    }
  }, [isOpen, docState]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmSave({
      customName: archiveName.trim() || `${typeLabel} - ${details.nomor || 'Selesai'}`,
      catatan: catatan.trim(),
      downloadPdfNow,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 shrink-0">
              <FileCheck className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold leading-tight">Simpan Surat Jadi</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  Final / Selesai
                </span>
              </div>
              <p className="text-xs text-emerald-100/85 mt-0.5">
                Arsipkan surat yang sudah siap dan final ke database arsip
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Summary Box */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-200">
              <span className="font-bold text-emerald-800 uppercase tracking-wide">
                Ringkasan Naskah Dinas
              </span>
              <span className="font-semibold text-slate-500">{typeLabel}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <div>
                <span className="block text-[10px] text-slate-400 font-medium">Nomor Surat:</span>
                <span className="font-mono font-bold text-slate-800">
                  {details.nomor || '(Belum diatur)'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-medium">Tanggal Penetapan:</span>
                <span className="font-semibold text-slate-800">
                  {formatIndoDate(docState.penandatangan.tanggalPenetapan)}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-[10px] text-slate-400 font-medium">Perihal / Tentang:</span>
                <span className="font-bold text-slate-900 leading-snug">
                  {details.perihal || '-'}
                </span>
              </div>
              <div className="sm:col-span-2 flex items-center gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-600">
                <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{docState.madrasah.unitKerja}</span>
                <span>•</span>
                <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{docState.penandatangan.nama}</span>
              </div>
            </div>
          </div>

          {/* Input Judul / Nama Arsip */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wide">
              Nama Dokumen Arsip Surat Jadi *
            </label>
            <input
              type="text"
              required
              value={archiveName}
              onChange={(e) => setArchiveName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Contoh: Surat Tugas Asesmen Madrasah 2026..."
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Nama ini akan memudahkan pencarian pada arsip surat keluar.
            </p>
          </div>

          {/* Catatan Tambahan (Optional) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wide">
              Catatan Arsip / Distribusi (Opsional)
            </label>
            <textarea
              rows={2}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Contoh: Sudah disetujui Kepala Madrasah, tembusan diserahkan ke Pengawas..."
            />
          </div>

          {/* Option: Download PDF Immediately */}
          <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={downloadPdfNow}
                onChange={(e) => setDownloadPdfNow(e.target.checked)}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              <div>
                <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                  Unduh Berkas PDF Resmi Langsung
                </span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Setelah tersimpan di arsip, unduh berkas PDF siap cetak / distribusi tanpa perlu klik tombol unduh lagi.
                </p>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan ke Arsip Surat Jadi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
