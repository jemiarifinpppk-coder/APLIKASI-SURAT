import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FullDocumentState,
  LetterType,
  SavedDraft,
} from './types/letter';
import { DEFAULT_DOCUMENT_STATE } from './data/defaultTemplates';
import { MadrasahConfigForm } from './components/editor/MadrasahConfigForm';
import { SuratTugasForm } from './components/editor/SuratTugasForm';
import { SuratKeputusanForm } from './components/editor/SuratKeputusanForm';
import { SuratUndanganForm } from './components/editor/SuratUndanganForm';
import { SuratKeteranganForm } from './components/editor/SuratKeteranganForm';
import { OtherLettersForm } from './components/editor/OtherLettersForm';
import { PenandatanganForm } from './components/editor/PenandatanganForm';
import { DocumentRenderer } from './components/DocumentRenderer';
import { KlasifikasiCodeModal } from './components/KlasifikasiCodeModal';
import { AiDraftingModal } from './components/AiDraftingModal';
import { DraftsModal } from './components/DraftsModal';
import { SaveCompletedLetterModal } from './components/SaveCompletedLetterModal';
import { LoginPage } from './components/LoginPage';
import { exportLetterToWord } from './utils/docxExport';
import { exportLetterToPdf } from './utils/pdfExport';
import { formatIndoDate } from './utils/dateHelpers';
import { SUB_JENIS_CONFIGS } from './utils/keteranganHelpers';
import { safeConfirm, safePrint, safeStorage } from './utils/safeBrowser';
import {
  Printer,
  FileDown,
  Download,
  Loader2,
  Sparkles,
  BookOpen,
  RotateCcw,
  Save,
  FileText,
  UserCheck,
  Gavel,
  Mail,
  FileBadge,
  Award,
  Send,
  FileCheck,
  Eye,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  CheckCircle2,
  Copy,
  Building,
  FolderArchive,
  Maximize2,
  Sliders,
  LogOut,
} from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return safeStorage.getItem('madrasah_auth_logged_in') === 'true';
  });
  const [docState, setDocState] = useState<FullDocumentState>(() => {
    const saved = safeStorage.getItem('madrasah_letter_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure penandatangan defaults if missing
        if (parsed.penandatangan && parsed.penandatangan.showQrcode === undefined) {
          parsed.penandatangan.showQrcode = true;
        }
        // Cleanse legacy hardcoded NIS/NISN from older saved sessions
        if (parsed.keterangan) {
          if (parsed.keterangan.nisLocal === '2415082') {
            parsed.keterangan.nisLocal = '';
          }
          if (parsed.keterangan.nisn === '0089123456') {
            parsed.keterangan.nisn = '';
          }
        }
        return parsed;
      } catch (e) {
        return DEFAULT_DOCUMENT_STATE;
      }
    }
    return DEFAULT_DOCUMENT_STATE;
  });

  const [drafts, setDrafts] = useState<SavedDraft[]>(() => {
    const saved = safeStorage.getItem('madrasah_saved_drafts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [previewZoom, setPreviewZoom] = useState<number>(85);
  const [showWatermark, setShowWatermark] = useState<boolean>(false);
  const [showKopConfig, setShowKopConfig] = useState<boolean>(false);
  const [showSignConfig, setShowSignConfig] = useState<boolean>(true);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [isDraftsModalOpen, setIsDraftsModalOpen] = useState<boolean>(false);
  const [isSaveCompletedModalOpen, setIsSaveCompletedModalOpen] = useState<boolean>(false);
  const [aiHelperContext, setAiHelperContext] = useState<{ type: string; val: string }>({
    type: 'surat_tugas',
    val: '',
  });
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Autosave to safeStorage
  useEffect(() => {
    safeStorage.setItem('madrasah_letter_state', JSON.stringify(docState));
  }, [docState]);

  const showNotification = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Dynamic Fit to Paper Width
  const handleFitPaperWidth = useCallback(() => {
    if (previewContainerRef.current) {
      const containerWidth = previewContainerRef.current.clientWidth;
      const paperSize = docState.madrasah.paperSize || 'a4';
      // mm to px at 96 DPI: 1mm = 3.779528 px
      const paperWidthMm = paperSize === 'f4' ? 215 : paperSize === 'letter' ? 215.9 : 210;
      const paperWidthPx = paperWidthMm * 3.77953;
      // padding in container
      const availableWidth = Math.max(containerWidth - 32, 200);
      const calculatedZoom = Math.min(125, Math.max(45, Math.floor((availableWidth / paperWidthPx) * 100)));
      setPreviewZoom(calculatedZoom);
      showNotification(`Ukuran naskah dipaskan (${calculatedZoom}%)`);
    }
  }, [docState.madrasah.paperSize]);

  // Run auto fit once on mount & paper size change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFitPaperWidth();
    }, 120);
    return () => clearTimeout(timer);
  }, [handleFitPaperWidth]);

  const getLetterDetails = (state: FullDocumentState) => {
    switch (state.jenisSurat) {
      case 'surat_tugas':
        return { nomor: state.suratTugas.nomorSurat, perihal: state.suratTugas.perihal };
      case 'sk':
        return { nomor: state.sk.nomorSK, perihal: state.sk.tentangSK };
      case 'undangan':
        return { nomor: state.undangan.nomorSurat, perihal: state.undangan.hal };
      case 'keterangan':
        return {
          nomor: state.keterangan.nomorSurat,
          perihal:
            state.keterangan.subJenis === 'aplikasi_pusaka'
              ? state.keterangan.halSurat || 'Pemberitahuan gangguan Aplikasi PUSAKA'
              : state.keterangan.tujuanKeterangan ||
                `Keterangan ${state.keterangan.namaSiswa || state.keterangan.namaPegawai || ''}`.trim(),
        };
      case 'rekomendasi':
        return { nomor: state.rekomendasi.nomorSurat, perihal: state.rekomendasi.tujuanRekomendasi };
      case 'pengantar':
        return {
          nomor: state.pengantar.nomorSurat,
          perihal: `Pengantar ke ${state.pengantar.tujuanYth || 'Kankemenag'}`.trim(),
        };
      case 'izin_dispensasi':
        return { nomor: state.izinDispensasi.nomorSurat, perihal: state.izinDispensasi.perihal };
      default:
        return { nomor: '', perihal: '' };
    }
  };

  const handleSaveCurrentDraft = (customName?: string) => {
    const details = getLetterDetails(docState);
    const tabItem = LETTER_TABS.find((t) => t.type === docState.jenisSurat);
    const typeLabel = tabItem?.label || 'Surat';
    const draftName =
      customName ||
      details.perihal ||
      `${typeLabel} - ${details.nomor || formatIndoDate(new Date().toISOString().slice(0, 10))}`;

    const newDraft: SavedDraft = {
      id: `draft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: draftName,
      savedAt: new Date().toISOString(),
      letterType: docState.jenisSurat,
      nomorSurat: details.nomor || '-',
      perihal: details.perihal || '-',
      status: 'draft',
      state: JSON.parse(JSON.stringify(docState)),
    };

    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    safeStorage.setItem('madrasah_saved_drafts', JSON.stringify(updated));
    showNotification(`Draf "${draftName}" berhasil disimpan.`);
  };

  const handleSaveCompletedLetter = (data: {
    customName: string;
    catatan?: string;
    downloadPdfNow: boolean;
  }) => {
    const details = getLetterDetails(docState);
    const newSaved: SavedDraft = {
      id: `surat_jadi_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: data.customName,
      savedAt: new Date().toISOString(),
      letterType: docState.jenisSurat,
      nomorSurat: details.nomor || '-',
      perihal: details.perihal || '-',
      status: 'selesai',
      catatan: data.catatan,
      state: JSON.parse(JSON.stringify(docState)),
    };

    const updated = [newSaved, ...drafts];
    setDrafts(updated);
    safeStorage.setItem('madrasah_saved_drafts', JSON.stringify(updated));
    setIsSaveCompletedModalOpen(false);
    showNotification(`Surat jadi "${data.customName}" berhasil disimpan ke arsip.`);

    if (data.downloadPdfNow) {
      setTimeout(() => {
        handleExportPdf();
      }, 350);
    }
  };

  const handleToggleDraftStatus = (id: string) => {
    const updated = drafts.map((d) => {
      if (d.id === id) {
        const nextStatus: 'selesai' | 'draft' = d.status === 'selesai' ? 'draft' : 'selesai';
        return { ...d, status: nextStatus };
      }
      return d;
    });
    setDrafts(updated);
    safeStorage.setItem('madrasah_saved_drafts', JSON.stringify(updated));
    showNotification('Status naskah berhasil diperbarui.');
  };

  const handleLoadDraft = (draft: SavedDraft) => {
    setDocState(draft.state);
    showNotification(`Draf "${draft.name}" berhasil dimuat ke lembar kerja.`);
  };

  const handleDeleteDraft = (id: string) => {
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);
    safeStorage.setItem('madrasah_saved_drafts', JSON.stringify(updated));
    showNotification('Draf berhasil dihapus.');
  };

  const handleImportDrafts = (imported: SavedDraft[]) => {
    const updated = [...imported, ...drafts];
    setDrafts(updated);
    safeStorage.setItem('madrasah_saved_drafts', JSON.stringify(updated));
    showNotification(`${imported.length} draf berhasil dipulihkan.`);
  };

  const handleClearAllDrafts = () => {
    if (safeConfirm('Apakah Anda yakin ingin menghapus SEMUA draf yang tersimpan?')) {
      setDrafts([]);
      safeStorage.removeItem('madrasah_saved_drafts');
      showNotification('Semua draf berhasil dihapus.');
    }
  };

  const handleResetToDefault = () => {
    if (safeConfirm('Kembalikan seluruh formulir ke draf default standar Kemenag?')) {
      setDocState(DEFAULT_DOCUMENT_STATE);
      showNotification('Berhasil mereset formulir ke default.');
    }
  };

  const handlePrint = () => {
    safePrint();
  };

  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    showNotification('Sedang memproses dokumen PDF berkualitas tinggi...');
    try {
      const typeNames: Record<LetterType, string> = {
        surat_tugas: 'Surat-Tugas',
        sk: 'SK-Kepala-Madrasah',
        undangan: 'Surat-Undangan',
        keterangan: 'Surat-Keterangan',
        rekomendasi: 'Surat-Rekomendasi',
        pengantar: 'Surat-Pengantar',
        izin_dispensasi: 'Surat-Dispensasi',
      };
      const cleanUnit = (docState.madrasah.unitKerja || 'Madrasah').replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${typeNames[docState.jenisSurat]}_${cleanUnit}`;

      await exportLetterToPdf({
        elementId: 'document-printable',
        fileName,
        paperSize: docState.madrasah.paperSize || 'a4',
      });
      showNotification('Berkas PDF resmi berhasil diunduh.');
    } catch (error) {
      console.error('Gagal membuat PDF langsung:', error);
      showNotification('Gagal membuat PDF otomatis. Mengalihkan ke menu cetak browser...');
      safePrint();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportWord = () => {
    const typeNames: Record<LetterType, string> = {
      surat_tugas: 'Surat-Tugas',
      sk: 'SK-Kepala-Madrasah',
      undangan: 'Surat-Undangan',
      keterangan: 'Surat-Keterangan',
      rekomendasi: 'Surat-Rekomendasi',
      pengantar: 'Surat-Pengantar',
      izin_dispensasi: 'Surat-Dispensasi',
    };
    const fileName = `${typeNames[docState.jenisSurat]}_${docState.madrasah.unitKerja.replace(/\s+/g, '_')}`;
    exportLetterToWord('document-printable', fileName, {
      paperSize: docState.madrasah.paperSize || 'a4',
      marginPreset: docState.madrasah.marginPreset || 'standar',
    });
    showNotification('Dokumen Microsoft Word berhasil diunduh.');
  };

  const handleApplyAi = (aiData: any) => {
    if (docState.jenisSurat === 'surat_tugas') {
      setDocState((prev) => {
        const perihalVal = aiData.perihal || aiData.topik || prev.suratTugas.perihal;
        const maksudVal =
          aiData.maksudTugas ||
          (perihalVal
            ? `Melaksanakan tugas ${
                perihalVal.toLowerCase().startsWith('melaksanakan') ? perihalVal : perihalVal
              }.`
            : prev.suratTugas.maksudTugas);
        return {
          ...prev,
          suratTugas: {
            ...prev.suratTugas,
            perihal: perihalVal,
            maksudTugas: maksudVal,
            tempatTugas: aiData.tempatTugas || prev.suratTugas.tempatTugas,
            waktuTugas: aiData.waktuTugas || prev.suratTugas.waktuTugas,
            anggaranTugas: aiData.anggaranTugas || aiData.bebanAnggaran || prev.suratTugas.anggaranTugas,
            klausulPenutup:
              aiData.klausulPenutup || aiData.klausulTambahan || prev.suratTugas.klausulPenutup,
            dasarTugas: aiData.dasarTugas || prev.suratTugas.dasarTugas,
            personelList: aiData.personelList || prev.suratTugas.personelList,
          },
        };
      });
    } else if (docState.jenisSurat === 'sk') {
      setDocState((prev) => ({
        ...prev,
        sk: {
          ...prev.sk,
          tentangSK: aiData.tentangSK || prev.sk.tentangSK,
          menimbang: aiData.menimbang || prev.sk.menimbang,
          mengingat: aiData.mengingat || prev.sk.mengingat,
          memperhatikan: aiData.memperhatikan || prev.sk.memperhatikan,
          diktumList: aiData.diktumList || prev.sk.diktumList,
        },
      }));
    } else if (docState.jenisSurat === 'undangan') {
      setDocState((prev) => ({
        ...prev,
        undangan: {
          ...prev.undangan,
          hal: aiData.hal || prev.undangan.hal,
          hariTanggal: aiData.hariTanggal || prev.undangan.hariTanggal,
          waktu: aiData.waktu || prev.undangan.waktu,
          tempat: aiData.tempat || prev.undangan.tempat,
          acara: aiData.acara || prev.undangan.acara,
          penerimaList: aiData.penerimaList || prev.undangan.penerimaList,
        },
      }));
    } else if (docState.jenisSurat === 'izin_dispensasi') {
      setDocState((prev) => ({
        ...prev,
        izinDispensasi: {
          ...prev.izinDispensasi,
          subJenis: aiData.subJenis || prev.izinDispensasi.subJenis,
          jenisCuti: aiData.jenisCuti || prev.izinDispensasi.jenisCuti,
          perihal: aiData.perihal || prev.izinDispensasi.perihal,
          alasanCuti: aiData.alasanCuti || prev.izinDispensasi.alasanCuti,
          lamanyaCuti: aiData.lamanyaCuti || prev.izinDispensasi.lamanyaCuti,
          catatanCuti: aiData.catatanCuti || prev.izinDispensasi.catatanCuti,
        },
      }));
    }
    showNotification('Draf AI berhasil diterapkan ke formulir surat.');
  };

  const handleSelectCode = (code: string) => {
    // Insert or update code in active letter number
    if (docState.jenisSurat === 'surat_tugas') {
      const parts = docState.suratTugas.nomorSurat.split('/');
      if (parts.length >= 3) {
        parts[2] = code;
        setDocState((prev) => ({
          ...prev,
          suratTugas: {
            ...prev.suratTugas,
            nomorSurat: parts.join('/'),
            kodeKlasifikasi: code,
          },
        }));
      } else {
        const noUrut = docState.madrasah.nomorUrutSurat || 'B.001';
        const kodeMadrasah = docState.madrasah.kodeSatkerNomor || 'MTs.21.07.03';
        const bulan = docState.madrasah.bulanSurat || '09';
        const tahun = docState.madrasah.tahunSurat || '2026';
        setDocState((prev) => ({
          ...prev,
          suratTugas: {
            ...prev.suratTugas,
            nomorSurat: `${noUrut}/${kodeMadrasah}/${code}/${bulan}/${tahun}`,
            kodeKlasifikasi: code,
          },
        }));
      }
    } else if (docState.jenisSurat === 'undangan') {
      const noUrut = docState.madrasah.nomorUrutSurat || 'B.002';
      const kodeMadrasah = docState.madrasah.kodeSatkerNomor || 'MTs.21.07.03';
      const bulan = docState.madrasah.bulanSurat || '09';
      const tahun = docState.madrasah.tahunSurat || '2026';
      setDocState((prev) => ({
        ...prev,
        undangan: {
          ...prev.undangan,
          nomorSurat: `${noUrut}/${kodeMadrasah}/${code}/${bulan}/${tahun}`,
        },
      }));
    }
    showNotification(`Kode klasifikasi ${code} berhasil disematkan ke nomor surat.`);
  };

  const handleApplyNomorFromKop = () => {
    const noUrut = docState.madrasah.nomorUrutSurat || 'B.001';
    const satker = docState.madrasah.kodeSatkerNomor || 'MTs.21.07.03';
    const bulan = docState.madrasah.bulanSurat || '09';
    const tahun = docState.madrasah.tahunSurat || '2026';

    setDocState((prev) => {
      const getNewNomor = (currentNomor: string, defaultKlas: string) => {
        const parts = (currentNomor || '').split('/');
        const klas = parts[2] || defaultKlas;
        return `${noUrut}/${satker}/${klas}/${bulan}/${tahun}`;
      };

      return {
        ...prev,
        suratTugas: {
          ...prev.suratTugas,
          nomorSurat: getNewNomor(prev.suratTugas.nomorSurat, prev.suratTugas.kodeKlasifikasi || 'PP.00.6'),
        },
        undangan: {
          ...prev.undangan,
          nomorSurat: getNewNomor(prev.undangan.nomorSurat, 'HM.01'),
        },
        keterangan: {
          ...prev.keterangan,
          nomorSurat: getNewNomor(prev.keterangan.nomorSurat, 'PP.00.4'),
        },
        rekomendasi: {
          ...prev.rekomendasi,
          nomorSurat: getNewNomor(prev.rekomendasi.nomorSurat, 'PP.00.2'),
        },
        pengantar: {
          ...prev.pengantar,
          nomorSurat: getNewNomor(prev.pengantar.nomorSurat, 'PP.00.8'),
        },
        izin: {
          ...prev.izin,
          nomorSurat: getNewNomor(prev.izin.nomorSurat, 'KP.08.1'),
        },
        sk: {
          ...prev.sk,
          tahunSK: tahun,
        },
      };
    });
    showNotification(`Format nomor (${noUrut} / Tahun ${tahun}) berhasil disinkronkan ke seluruh naskah.`);
  };

  const handleCopyText = () => {
    const el = document.getElementById('document-printable');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      showNotification('Teks surat berhasil disalin ke clipboard.');
    }
  };

  const LETTER_TABS: {
    type: LetterType;
    label: string;
    sublabel: string;
    icon: any;
    color: string;
  }[] = [
    {
      type: 'surat_tugas',
      label: 'Surat Tugas',
      sublabel: 'Penugasan Personel & SPD',
      icon: UserCheck,
      color: 'text-blue-600',
    },
    {
      type: 'sk',
      label: 'SK Madrasah',
      sublabel: 'Surat Keputusan Kepala',
      icon: Gavel,
      color: 'text-amber-600',
    },
    {
      type: 'undangan',
      label: 'Undangan Dinas',
      sublabel: 'Rapat, Pertemuan & Sosialisasi',
      icon: Mail,
      color: 'text-teal-600',
    },
    {
      type: 'keterangan',
      label: 'Surat Keterangan',
      sublabel: 'Siswa, Guru & Pegawai Aktif',
      icon: FileBadge,
      color: 'text-indigo-600',
    },
    {
      type: 'rekomendasi',
      label: 'Surat Rekomendasi',
      sublabel: 'Beasiswa, Lomba & Studi Lanjut',
      icon: Award,
      color: 'text-orange-600',
    },
    {
      type: 'pengantar',
      label: 'Surat Pengantar',
      sublabel: 'Penyampaian Berkas & Dokumen',
      icon: Send,
      color: 'text-cyan-600',
    },
    {
      type: 'izin_dispensasi',
      label: 'Surat Izin / Cuti',
      sublabel: 'Cuti Tahunan, Sakit & Dispensasi',
      icon: FileCheck,
      color: 'text-emerald-600',
    },
  ];

  const handleLogin = () => {
    safeStorage.setItem('madrasah_auth_logged_in', 'true');
    setIsAuthenticated(true);
    showNotification('Selamat datang di GEN-SURAT MADRASAH');
  };

  const handleLogout = () => {
    safeStorage.removeItem('madrasah_auth_logged_in');
    setIsAuthenticated(false);
    showNotification('Anda telah keluar dari aplikasi.');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          {saveToast}
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-emerald-700 text-white shadow-md sticky top-0 z-40 border-b border-emerald-800/40 no-print">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center border border-white/30 shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-none tracking-tight flex items-center gap-2">
                GEN-SURAT MADRASAH
                <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-800/60 text-emerald-100 border border-emerald-500/40 tracking-wider">
                  PMA KEMENAG
                </span>
              </h1>
              <p className="text-[10px] opacity-80 uppercase tracking-widest mt-1 line-clamp-1">
                Standar Tata Naskah Dinas • {docState.madrasah.unitKerja}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Tombol Simpan Surat Jadi (Selesai/Final) */}
            <button
              type="button"
              onClick={() => setIsSaveCompletedModalOpen(true)}
              className="px-3.5 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ring-1 ring-emerald-200 cursor-pointer"
              title="Simpan dokumen naskah dinas yang sudah jadi / selesai ke Arsip Surat"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-950" />
              <span>Simpan Surat Jadi</span>
            </button>

            {/* Tombol Simpan Draf */}
            <button
              type="button"
              onClick={() => handleSaveCurrentDraft()}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              title="Simpan dokumen saat ini ke daftar draf kerja"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simpan Draf</span>
            </button>

            {/* Tombol Arsip & Draf */}
            <button
              type="button"
              onClick={() => setIsDraftsModalOpen(true)}
              className="px-3 py-2 bg-emerald-800/80 hover:bg-emerald-800 rounded-lg text-xs font-medium transition-colors border border-emerald-600/40 flex items-center gap-1.5 shadow-xs relative cursor-pointer"
              title="Buka daftar dan kelola surat jadi serta draf tersimpan"
            >
              <FolderArchive className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Arsip & Draf</span>
              {drafts.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-400 text-slate-900 leading-tight">
                  {drafts.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setAiHelperContext({ type: docState.jenisSurat, val: '' });
                setIsAiModalOpen(true);
              }}
              className="px-3 py-2 bg-emerald-600/80 hover:bg-emerald-600 rounded-lg text-xs font-medium transition-colors border border-emerald-400/30 flex items-center gap-1.5 shadow-xs"
              title="Penyusunan naskah otomatis dengan Gemini AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Asisten AI</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCodeModalOpen(true)}
              className="px-3 py-2 bg-emerald-600/80 hover:bg-emerald-600 rounded-lg text-xs font-medium transition-colors border border-emerald-400/30 flex items-center gap-1.5 shadow-xs"
              title="Daftar kode klasifikasi arsip Kemenag"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-100" />
              <span className="hidden sm:inline">Kode Arsip</span>
            </button>

            <button
              type="button"
              onClick={handleExportWord}
              className="px-3 py-2 bg-emerald-800/80 hover:bg-emerald-800 rounded-lg text-xs font-medium transition-colors border border-emerald-600/40 flex items-center gap-1.5 shadow-xs"
              title="Unduh format Microsoft Word (.doc)"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Word</span>
            </button>

            <button
              type="button"
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-800 text-white rounded-lg text-xs font-semibold transition-all border border-amber-400/30 flex items-center gap-1.5 shadow-xs"
              title="Unduh dokumen PDF langsung tanpa header/footer browser"
            >
              {isExportingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isExportingPdf ? 'Membuat PDF...' : 'Unduh PDF'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-medium transition-colors border border-emerald-400/30 flex items-center gap-1.5 shadow-xs text-white"
              title="Cetak via Printer Fisik atau Dialog Cetak Browser"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            <div className="h-6 w-[1px] bg-emerald-800/80 hidden sm:block"></div>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="p-2 text-white/80 hover:text-white hover:bg-emerald-600/50 rounded-lg transition-colors"
              title="Reset ke Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="px-2.5 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs ml-1"
              title="Keluar / Kembali ke Halaman Login"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout (3 Columns: Left Sidebar Menu, Middle Form Editors, Right Live Paper Preview) */}
      <main className="max-w-[1600px] mx-auto px-3 sm:px-6 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vertical Letter Navigation Menu */}
        <aside className="lg:col-span-3 xl:col-span-3 space-y-4 no-print">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Header */}
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                    Pilih Jenis Naskah
                  </h3>
                  <p className="text-[10px] text-slate-500">Standar Tata Naskah Kemenag</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {LETTER_TABS.length} Format
              </span>
            </div>

            {/* Vertical Menu Items */}
            <div className="p-2 space-y-1.5">
              {LETTER_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = docState.jenisSurat === tab.type;
                return (
                  <button
                    key={tab.type}
                    type="button"
                    onClick={() => setDocState((prev) => ({ ...prev, jenisSurat: tab.type }))}
                    className={`w-full p-2.5 rounded-lg text-left transition-all flex items-start gap-3 border ${
                      isActive
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs ring-1 ring-emerald-500/20'
                        : 'bg-white border-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : `bg-slate-100 ${tab.color}`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-xs font-bold truncate ${
                            isActive ? 'text-emerald-950' : 'text-slate-800'
                          }`}
                        >
                          {tab.label}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
                        )}
                      </div>
                      <p
                        className={`text-[11px] leading-tight truncate mt-0.5 ${
                          isActive ? 'text-emerald-700 font-medium' : 'text-slate-500'
                        }`}
                      >
                        {tab.type === 'keterangan' && docState.keterangan?.subJenis
                          ? SUB_JENIS_CONFIGS[docState.keterangan.subJenis]?.label || tab.sublabel
                          : tab.sublabel}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sidebar Quick Shortcuts */}
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 space-y-1.5">
              <button
                type="button"
                onClick={() => setIsDraftsModalOpen(true)}
                className="w-full px-3 py-2 bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-all flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <FolderArchive className="w-3.5 h-3.5 text-amber-500" />
                  <span>Draf Tersimpan</span>
                </div>
                {drafts.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                    {drafts.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsCodeModalOpen(true)}
                className="w-full px-3 py-2 bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-all flex items-center gap-2 shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Buku Kode Klasifikasi</span>
              </button>
            </div>

            {/* Developer & School Attribution Card */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Pengembang :
              </div>
              <div className="text-xs font-black text-slate-800">
                JEMI ARIFIN, ST
              </div>
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                MTSN 3 JENEPONTO
              </div>
            </div>
          </div>
        </aside>

        {/* Middle Column: Form Editors (Kop, Content Form, Penandatangan) */}
        <section className="lg:col-span-4 xl:col-span-4 space-y-4 no-print">
          {/* Section 1: Collapsible Kop Surat / Madrasah Setup */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => setShowKopConfig(!showKopConfig)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wide">
                    1. Konfigurasi Kop Madrasah
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {docState.madrasah.unitKerja} • {docState.madrasah.kabupatenKota}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <span>{showKopConfig ? 'Sembunyikan' : 'Ubah Kop'}</span>
                {showKopConfig ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showKopConfig && (
              <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <MadrasahConfigForm
                  config={docState.madrasah}
                  onChange={(config) => setDocState((prev) => ({ ...prev, madrasah: config }))}
                  onApplyNomorToDoc={handleApplyNomorFromKop}
                />
              </div>
            )}
          </div>

          {/* Section 2: Active Letter Form Editor */}
          <div>
            {docState.jenisSurat === 'surat_tugas' && (
              <SuratTugasForm
                data={docState.suratTugas}
                onChange={(st) => setDocState((prev) => ({ ...prev, suratTugas: st }))}
                onOpenCodePicker={() => setIsCodeModalOpen(true)}
                onOpenAiHelper={(type, val) => {
                  setAiHelperContext({ type, val });
                  setIsAiModalOpen(true);
                }}
              />
            )}

            {docState.jenisSurat === 'sk' && (
              <SuratKeputusanForm
                data={docState.sk}
                onChange={(sk) => setDocState((prev) => ({ ...prev, sk }))}
                onOpenAiHelper={(type, val) => {
                  setAiHelperContext({ type, val });
                  setIsAiModalOpen(true);
                }}
              />
            )}

            {docState.jenisSurat === 'undangan' && (
              <SuratUndanganForm
                data={docState.undangan}
                onChange={(un) => setDocState((prev) => ({ ...prev, undangan: un }))}
                onOpenCodePicker={() => setIsCodeModalOpen(true)}
                onOpenAiHelper={(type, val) => {
                  setAiHelperContext({ type, val });
                  setIsAiModalOpen(true);
                }}
              />
            )}

            {docState.jenisSurat === 'keterangan' && (
              <SuratKeteranganForm
                data={docState.keterangan}
                onChange={(ket) => setDocState((prev) => ({ ...prev, keterangan: ket }))}
                onOpenCodePicker={() => setIsCodeModalOpen(true)}
                penandatangan={docState.penandatangan}
                onPenandatanganChange={(pen) => setDocState((prev) => ({ ...prev, penandatangan: pen }))}
              />
            )}

            {(docState.jenisSurat === 'rekomendasi' ||
              docState.jenisSurat === 'pengantar' ||
              docState.jenisSurat === 'izin_dispensasi') && (
              <OtherLettersForm
                type={docState.jenisSurat}
                madrasah={docState.madrasah}
                rekomendasiData={docState.rekomendasi}
                pengantarData={docState.pengantar}
                izinData={docState.izinDispensasi}
                onChangeRekomendasi={(data) => setDocState((prev) => ({ ...prev, rekomendasi: data }))}
                onChangePengantar={(data) => setDocState((prev) => ({ ...prev, pengantar: data }))}
                onChangeIzin={(data) => setDocState((prev) => ({ ...prev, izinDispensasi: data }))}
              />
            )}
          </div>

          {/* Section 3: Signatory & Titimangsa Form */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSignConfig(!showSignConfig)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wide">
                    Penandatangan, Titimangsa & TTE
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {docState.penandatangan.nama} • {docState.penandatangan.jabatan}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <span>{showSignConfig ? 'Sembunyikan' : 'Buka'}</span>
                {showSignConfig ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showSignConfig && (
              <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <PenandatanganForm
                  data={docState.penandatangan}
                  kabupatenDefault={docState.madrasah.kabupatenKota}
                  onChange={(pen) => setDocState((prev) => ({ ...prev, penandatangan: pen }))}
                />
              </div>
            )}
          </div>

          {/* Section 4: Final Letter Action Card */}
          <div className="bg-gradient-to-br from-emerald-850 via-emerald-800 to-teal-900 text-white rounded-xl p-4 shadow-sm space-y-2.5 border border-emerald-700/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <FileCheck className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide">
                  Naskah Selesai Disusun?
                </h4>
                <p className="text-[10px] text-emerald-200">
                  Simpan surat yang sudah jadi atau unduh berkas resmi
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsSaveCompletedModalOpen(true)}
                className="col-span-2 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ring-1 ring-emerald-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                <span>Simpan Surat Jadi (Final)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSaveCurrentDraft()}
                className="py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-white/20 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-amber-300" />
                <span>Simpan Draf</span>
              </button>

              <button
                type="button"
                onClick={handleExportPdf}
                disabled={isExportingPdf}
                className="py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              >
                {isExportingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-slate-950" />
                )}
                <span>Unduh PDF</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Live A4 Document Preview (5 cols) */}
        <section className="lg:col-span-5 space-y-3 sticky top-20">
          {/* Preview Controls */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs space-y-2.5 no-print text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
                  Pratinjau Lembar {docState.madrasah.paperSize ? docState.madrasah.paperSize.toUpperCase() : 'A4'}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {docState.madrasah.paperSize === 'f4'
                    ? '215 × 330 mm'
                    : docState.madrasah.paperSize === 'letter'
                    ? '215.9 × 279.4 mm'
                    : '210 × 297 mm'}
                </span>
              </div>

              {/* Watermark, Copy actions, & Save Completed Letter */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsSaveCompletedModalOpen(true)}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md text-[11px] transition-all flex items-center gap-1 shadow-2xs active:scale-95 cursor-pointer"
                  title="Simpan surat yang tampil ini ke Arsip Surat Jadi"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Simpan Surat Jadi</span>
                </button>

                <div className="h-4 w-[1px] bg-slate-200 hidden sm:block"></div>

                <label className="flex items-center gap-1 cursor-pointer text-slate-600 hover:text-slate-800 text-[11px]">
                  <input
                    type="checkbox"
                    checked={showWatermark}
                    onChange={(e) => setShowWatermark(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  <span>Watermark</span>
                </label>

                <button
                  type="button"
                  onClick={handleCopyText}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                  title="Salin Naskah Teks"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Paper Size & Fit/Zoom Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              {/* Paper Selector Chips */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setDocState((prev) => ({
                      ...prev,
                      madrasah: { ...prev.madrasah, paperSize: 'a4' },
                    }));
                  }}
                  className={`px-2 py-1 rounded text-[10.5px] font-semibold transition-all ${
                    (docState.madrasah.paperSize || 'a4') === 'a4'
                      ? 'bg-white text-emerald-800 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Ukuran A4 Standar Kemenag (210 × 297 mm)"
                >
                  A4
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDocState((prev) => ({
                      ...prev,
                      madrasah: { ...prev.madrasah, paperSize: 'f4' },
                    }));
                  }}
                  className={`px-2 py-1 rounded text-[10.5px] font-semibold transition-all ${
                    docState.madrasah.paperSize === 'f4'
                      ? 'bg-white text-emerald-800 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Ukuran F4 / Folio Naskah Panjang (215 × 330 mm)"
                >
                  F4 / Folio
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDocState((prev) => ({
                      ...prev,
                      madrasah: { ...prev.madrasah, paperSize: 'letter' },
                    }));
                  }}
                  className={`px-2 py-1 rounded text-[10.5px] font-semibold transition-all ${
                    docState.madrasah.paperSize === 'letter'
                      ? 'bg-white text-emerald-800 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Ukuran Letter / Kuarto (215.9 × 279.4 mm)"
                >
                  Letter
                </button>
              </div>

              {/* Fit & Zoom Controls */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={handleFitPaperWidth}
                  className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md font-semibold text-[11px] flex items-center gap-1 transition-all active:scale-95 shadow-2xs"
                  title="Paskan ukuran kertas ke lebar layar secara otomatis"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Paskan Kertas</span>
                </button>

                <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-md border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((z) => Math.max(45, z - 10))}
                    className="p-1 text-slate-600 hover:text-slate-900 rounded"
                    title="Perkecil (-10%)"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom(100)}
                    className="text-[11px] font-mono text-slate-700 px-1.5 py-0.5 rounded hover:bg-white transition-colors"
                    title="Kembalikan ke skala 100%"
                  >
                    {previewZoom}%
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((z) => Math.min(130, z + 10))}
                    className="p-1 text-slate-600 hover:text-slate-900 rounded"
                    title="Perbesar (+10%)"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Paper Container with Zoom scale */}
          <div
            ref={previewContainerRef}
            className="preview-container overflow-x-auto p-4 sm:p-5 bg-slate-200/90 rounded-xl border border-slate-300 flex justify-center shadow-inner max-h-[calc(100vh-140px)] overflow-y-auto print:bg-white print:border-none print:p-0 print:m-0 print:max-h-none print:shadow-none print:overflow-visible"
          >
            <div
              style={{
                transform: `scale(${previewZoom / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out',
              }}
              className="preview-zoom-wrapper origin-top shrink-0 print:transform-none print:m-0 print:p-0"
            >
              <DocumentRenderer state={docState} showWatermark={showWatermark} />
            </div>
          </div>
        </section>
      </main>

      {/* Code Classification Modal */}
      <KlasifikasiCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onSelectCode={handleSelectCode}
      />

      {/* AI Drafting Assistant Modal */}
      <AiDraftingModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        letterType={docState.jenisSurat}
        onApplyGenerated={handleApplyAi}
      />

      {/* Drafts Manager Modal */}
      <DraftsModal
        isOpen={isDraftsModalOpen}
        onClose={() => setIsDraftsModalOpen(false)}
        drafts={drafts}
        currentDocState={docState}
        onSaveCurrentDraft={handleSaveCurrentDraft}
        onOpenSaveCompleted={() => setIsSaveCompletedModalOpen(true)}
        onLoadDraft={handleLoadDraft}
        onDeleteDraft={handleDeleteDraft}
        onToggleDraftStatus={handleToggleDraftStatus}
        onImportDrafts={handleImportDrafts}
        onClearAllDrafts={handleClearAllDrafts}
      />

      {/* Save Completed Letter Modal */}
      <SaveCompletedLetterModal
        isOpen={isSaveCompletedModalOpen}
        onClose={() => setIsSaveCompletedModalOpen(false)}
        docState={docState}
        onConfirmSave={handleSaveCompletedLetter}
      />
    </div>
  );
}
