import React, { useState } from 'react';
import {
  FolderArchive,
  X,
  Trash2,
  Download,
  Upload,
  Clock,
  FileText,
  Search,
  CheckCircle2,
  ExternalLink,
  Plus,
  Tag,
  FileCheck,
  Save,
  Check,
  RotateCcw,
} from 'lucide-react';
import { SavedDraft, LetterType, FullDocumentState } from '../types/letter';
import { safeConfirm } from '../utils/safeBrowser';

interface DraftsModalProps {
  isOpen: boolean;
  onClose: () => void;
  drafts: SavedDraft[];
  currentDocState: FullDocumentState;
  onSaveCurrentDraft: (customName?: string) => void;
  onOpenSaveCompleted?: () => void;
  onLoadDraft: (draft: SavedDraft) => void;
  onDeleteDraft: (id: string) => void;
  onToggleDraftStatus?: (id: string) => void;
  onImportDrafts: (drafts: SavedDraft[]) => void;
  onClearAllDrafts: () => void;
}

const LETTER_TYPE_LABELS: Record<LetterType, { label: string; badgeClass: string }> = {
  surat_tugas: { label: 'Surat Tugas', badgeClass: 'bg-blue-100 text-blue-800 border-blue-200' },
  sk: { label: 'SK Madrasah', badgeClass: 'bg-amber-100 text-amber-800 border-amber-200' },
  undangan: { label: 'Undangan Dinas', badgeClass: 'bg-teal-100 text-teal-800 border-teal-200' },
  keterangan: { label: 'Surat Keterangan', badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  rekomendasi: { label: 'Rekomendasi', badgeClass: 'bg-orange-100 text-orange-800 border-orange-200' },
  pengantar: { label: 'Surat Pengantar', badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  izin_dispensasi: { label: 'Surat Izin / Cuti', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
};

export const DraftsModal: React.FC<DraftsModalProps> = ({
  isOpen,
  onClose,
  drafts,
  onSaveCurrentDraft,
  onOpenSaveCompleted,
  onLoadDraft,
  onDeleteDraft,
  onToggleDraftStatus,
  onImportDrafts,
  onClearAllDrafts,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'selesai' | 'draft'>('all');
  const [newDraftName, setNewDraftName] = useState('');
  const [isSavingNew, setIsSavingNew] = useState(false);

  if (!isOpen) return null;

  const selesaiCount = drafts.filter((d) => d.status === 'selesai').length;
  const draftCount = drafts.filter((d) => d.status !== 'selesai').length;

  // Filter drafts
  const filteredDrafts = drafts.filter((draft) => {
    const matchesFilter = filterType === 'all' || draft.letterType === filterType;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'selesai' && draft.status === 'selesai') ||
      (filterStatus === 'draft' && draft.status !== 'selesai');
    const matchesSearch =
      searchTerm.trim() === '' ||
      draft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draft.nomorSurat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      draft.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (draft.catatan && draft.catatan.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesStatus && matchesSearch;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCurrentDraft(newDraftName.trim() ? newDraftName.trim() : undefined);
    setNewDraftName('');
    setIsSavingNew(false);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(drafts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `backup_arsip_surat_madrasah_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            onImportDrafts(parsed);
          } else {
            alert('Format file JSON cadangan tidak valid.');
          }
        } catch (err) {
          alert('Gagal membaca file JSON cadangan.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
              <FolderArchive className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                Penyimpanan Arsip & Draf Surat
                <span className="px-2 py-0.5 rounded-full bg-emerald-700/80 text-[11px] font-semibold text-emerald-100 border border-emerald-500/40">
                  {drafts.length} Tersimpan
                </span>
              </h3>
              <p className="text-xs text-emerald-100/80">
                Kelola surat yang sudah jadi (final) dan draf naskah dinas madrasah
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

        {/* Quick Save Bar */}
        <div className="p-3 sm:p-4 bg-emerald-50/90 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {onOpenSaveCompleted && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSaveCompleted();
                }}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                title="Simpan dokumen saat ini sebagai Surat Jadi / Selesai"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>Simpan Surat Jadi</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsSavingNew(!isSavingNew)}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Simpan dokumen saat ini sebagai draf kerja"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Sebagai Draf</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              disabled={drafts.length === 0}
              className="px-2.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              title="Cadangkan semua data ke file JSON"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Cadangkan</span>
            </button>

            <label
              className="px-2.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Pulihkan data dari file JSON cadangan"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Pulihkan</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>
          </div>

          {drafts.length > 0 && (
            <button
              type="button"
              onClick={onClearAllDrafts}
              className="text-[11px] text-red-600 hover:text-red-700 font-medium hover:underline cursor-pointer"
            >
              Hapus Semua
            </button>
          )}
        </div>

        {/* Form Save New Draft (Expandable) */}
        {isSavingNew && (
          <form onSubmit={handleSave} className="p-4 bg-white border-b border-slate-200 animate-in slide-in-from-top-2">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                value={newDraftName}
                onChange={(e) => setNewDraftName(e.target.value)}
                placeholder="Beri nama draf surat (contoh: Draf Surat Tugas Pengawas AMBK)..."
                className="flex-1 w-full px-3.5 py-2 text-xs bg-slate-50 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                autoFocus
              />
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Simpan Draf
                </button>
                <button
                  type="button"
                  onClick={() => setIsSavingNew(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Status Tabs & Filter & Search Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 space-y-2.5">
          {/* Status Tabs: Semua, Surat Jadi, Draf */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>Semua Naskah</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white/20">
                {drafts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterStatus('selesai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'selesai'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Surat Jadi (Final)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900">
                {selesaiCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterStatus('draft')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'draft'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Draf Proses</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                {draftCount}
              </span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari naskah berdasarkan judul, nomor surat, perihal, atau catatan..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="all">Semua Jenis Format</option>
                <option value="surat_tugas">Surat Tugas</option>
                <option value="sk">SK Madrasah</option>
                <option value="undangan">Undangan Dinas</option>
                <option value="keterangan">Surat Keterangan</option>
                <option value="rekomendasi">Rekomendasi</option>
                <option value="pengantar">Surat Pengantar</option>
                <option value="izin_dispensasi">Izin / Dispensasi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Draft List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredDrafts.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 mb-1">
                {drafts.length === 0
                  ? 'Belum Ada Surat yang Disimpan'
                  : 'Naskah Tidak Ditemukan'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                {drafts.length === 0
                  ? 'Gunakan tombol "Simpan Surat Jadi" atau "Simpan Draf" untuk menyimpan dokumen Anda.'
                  : 'Coba ubah kata kunci pencarian atau sesuaikan filter jenis dan status naskah.'}
              </p>
              {drafts.length === 0 && onOpenSaveCompleted && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSaveCompleted();
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Simpan Dokumen Saat Ini Sebagai Surat Jadi
                </button>
              )}
            </div>
          ) : (
            filteredDrafts.map((draft) => {
              const badgeInfo = LETTER_TYPE_LABELS[draft.letterType] || {
                label: draft.letterType,
                badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
              };
              const isSelesai = draft.status === 'selesai';

              return (
                <div
                  key={draft.id}
                  className={`p-4 rounded-xl bg-white border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group ${
                    isSelesai
                      ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-md'
                      : 'border-slate-200 hover:border-amber-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Status Badge */}
                      {isSelesai ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          SURAT JADI / SELESAI
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-600" />
                          DRAF PROSES
                        </span>
                      )}

                      {/* Format Badge */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeInfo.badgeClass}`}
                      >
                        {badgeInfo.label}
                      </span>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {draft.name}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] text-slate-600">
                      <p className="truncate">
                        <span className="text-slate-400 font-medium">Nomor:</span>{' '}
                        <span className="font-mono font-semibold text-slate-800">{draft.nomorSurat || '-'}</span>
                      </p>
                      <p className="truncate">
                        <span className="text-slate-400 font-medium">Perihal:</span>{' '}
                        <span>{draft.perihal || '-'}</span>
                      </p>
                    </div>

                    {draft.catatan && (
                      <p className="text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 italic line-clamp-2">
                        <span className="font-medium text-slate-500 not-italic">Catatan:</span> {draft.catatan}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Disimpan: {new Date(draft.savedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span>•</span>
                      <span>Unit: {draft.state?.madrasah?.unitKerja || 'Madrasah'}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-end md:self-center shrink-0">
                    {/* Toggle status button */}
                    {onToggleDraftStatus && (
                      <button
                        type="button"
                        onClick={() => onToggleDraftStatus(draft.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 cursor-pointer ${
                          isSelesai
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                        title={isSelesai ? 'Ubah status kembali ke Draf' : 'Tandai sebagai Surat Jadi / Selesai'}
                      >
                        {isSelesai ? (
                          <>
                            <RotateCcw className="w-3 h-3" />
                            <span className="hidden sm:inline">Ubah ke Draf</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3 h-3" />
                            <span className="hidden sm:inline">Tandai Selesai</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Open draft in editor */}
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          safeConfirm(
                            `Buka naskah "${draft.name}" ke lembar kerja? Dokumen yang belum disimpan di editor akan digantikan.`
                          )
                        ) {
                          onLoadDraft(draft);
                          onClose();
                        }
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Buka Naskah
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (safeConfirm(`Hapus arsip "${draft.name}"?`)) {
                          onDeleteDraft(draft.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                      title="Hapus Dokumen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>*Seluruh naskah tersimpan secara aman di penyimpanan browser lokal Anda.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
