import React, { useState } from 'react';
import { Sparkles, X, Loader2, CheckCircle2, ArrowRight, BookCheck, Wand2 } from 'lucide-react';
import { LetterType } from '../types/letter';

interface AiDraftingModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterType: LetterType;
  onApplyGenerated: (result: any) => void;
}

export const AiDraftingModal: React.FC<AiDraftingModalProps> = ({
  isOpen,
  onClose,
  letterType,
  onApplyGenerated,
}) => {
  const [promptTopic, setPromptTopic] = useState('');
  const [unitKerja, setUnitKerja] = useState('MAN 1 Jeneponto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<any>(null);

  if (!isOpen) return null;

  const quickPrompts: Record<LetterType, string[]> = {
    surat_tugas: [
      'Penugasan Proktor dan Pengawas Ruang Asesmen Madrasah (AM) Berbasis Komputer 2026',
      'Penugasan Pembina Olimpiade Sains Madrasah (KSM) Tingkat Provinsi',
      'Penugasan Panitia Penerimaan Peserta Didik Baru (PPDBM) Tahun Ajaran 2026/2027',
      'Penugasan Guru Mengikuti Bimbingan Teknis Implementasi Kurikulum Merdeka Kemenag',
    ],
    sk: [
      'SK Penetapan Pembagian Tugas Guru Dalam Proses Belajar Mengajar & Tugas Tambahan TA 2026/2027',
      'SK Panitia Asesmen Madrasah (AM) & Ujian Akhir Madrasah',
      'SK Pengangkatan Pembina Ekstrakurikuler Pramuka dan Rohis Madrasah',
      'SK Tim Pengembang Kurikulum Operasional Madrasah (KOM)',
    ],
    undangan: [
      'Undangan Rapat Koordinasi Persiapan Asesmen Madrasah dan Sosialisasi Juknis',
      'Undangan Rapat Pleno Kelulusan dan Kenaikan Kelas Dewan Guru',
      'Undangan Pertemuan Orang Tua/Wali Murid Penerima Bantuan PIP Madrasah',
      'Undangan Musyawarah Komite Madrasah Mengenai Program Peningkatan Mutu',
    ],
    keterangan: [
      'Keterangan Siswa Aktif untuk Pengajuan Beasiswa Bank Indonesia / BSI',
      'Keterangan Berkelakuan Baik untuk Melanjutkan Studi ke PTKIN',
      'Keterangan Pindah Sekolah / Mutasi Belajar ke MAN Kota Makassar',
      'Keterangan Penghasilan Guru Non-PNS / GTT untuk Keperluan Perbankan',
    ],
    rekomendasi: [
      'Rekomendasi Siswa Mengikuti Seleksi Nasional Berdasarkan Prestasi (SNBP) Kedokteran',
      'Rekomendasi Guru Mengikuti Seleksi Calon Kepala Madrasah Berprestasi Kemenag',
    ],
    pengantar: [
      'Pengantar Berkas Usulan Pencairan Tunjangan Profesi Guru (TPG) Triwulan III ke Kankemenag',
      'Pengantar Laporan Pertanggungjawaban (LPJ) Dana Bantuan Operasional Sekolah (BOS)',
    ],
    izin_dispensasi: [
      'Surat Izin Cuti Tahunan Guru / Pegawai ASN Kemenag Tahun 2026',
      'Surat Izin Cuti Karena Alasan Penting (CAP) Menunaikan Ibadah Umrah ke Tanah Suci',
      'Surat Izin Cuti Sakit Pegawai / Guru Madrasah berdasarkan Keterangan Dokter',
      'Surat Izin Cuti Melahirkan / Bersalin bagi Tenaga Pendidik Madrasah',
      'Surat Izin Tidak Masuk Kerja Sementara karena Keperluan Keluarga Mendesak',
      'Dispensasi Mengikuti Pertandingan PORSENI Madrasah Tingkat Kabupaten',
      'Dispensasi Mengikuti Kemah Pramuka Madrasah Nasional (KPMN)',
    ],
  };

  const handleGenerate = async (customPrompt?: string) => {
    const textToSubmit = customPrompt || promptTopic;
    if (!textToSubmit.trim()) {
      setError('Silakan masukkan topik atau pilih salah satu preset di bawah.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/draft-refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          letterType,
          topic: textToSubmit,
          context: `Unit Kerja: ${unitKerja}, Standar PMA Kemenag RI Tata Naskah Dinas`,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi asisten AI.');
      }

      const data = await response.json();
      if (data.data) {
        setGeneratedResult(data.data);
      } else {
        throw new Error('Format hasil AI tidak valid.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyusun naskah.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedResult) {
      onApplyGenerated(generatedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base uppercase tracking-wide">
                Asisten AI Tata Naskah Dinas Madrasah
              </h3>
              <p className="text-[11px] text-slate-500">
                Penyusunan naskah otomatis standar PMA Kemenag RI
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Topic Input */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              Topik atau Perihal Surat yang Ingin Dibuat
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promptTopic}
                onChange={(e) => setPromptTopic(e.target.value)}
                placeholder="Misal: Penugasan guru pengawas ruang Asesmen Madrasah 2026..."
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => handleGenerate()}
                disabled={loading}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors shrink-0 uppercase tracking-wider"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Menyusun...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" /> Buat Draf
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Atau pilih template cepat sesuai jenis surat aktif:
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {(quickPrompts[letterType] || []).map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptTopic(item);
                    handleGenerate(item);
                  }}
                  className="text-left px-3 py-2 text-xs rounded-md border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-700 transition-colors flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{item}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}

          {/* Generated Result Preview */}
          {generatedResult && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs sm:text-sm flex items-center gap-1.5 text-emerald-700 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4" /> Hasil Draf AI Berhasil Disusun
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">Format JSON Kemenag</span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md max-h-60 overflow-y-auto font-mono text-xs text-slate-800 space-y-2">
                <pre className="whitespace-pre-wrap font-sans text-xs">
                  {JSON.stringify(generatedResult, null, 2)}
                </pre>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-md border border-emerald-200 flex items-center justify-between gap-3">
                <div className="text-xs text-emerald-950">
                  <p className="font-semibold">Terapkan langsung ke formulir surat aktif?</p>
                  <p className="text-[11px] text-emerald-800">Data pada editor formulir akan diperbarui secara otomatis.</p>
                </div>
                <button
                  type="button"
                  onClick={handleApply}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-md flex items-center gap-1.5 transition-colors shrink-0 uppercase tracking-wider"
                >
                  <BookCheck className="w-3.5 h-3.5" /> Terapkan ke Surat
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="text-[11px]">AI terkalibrasi dengan PMA Kemenag RI & Juknis Madrasah</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 font-medium text-slate-600 hover:text-slate-800 rounded-md transition-colors text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
