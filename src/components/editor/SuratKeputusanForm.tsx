import React from 'react';
import { SuratKeputusanData, DiktumSK, SKPegawaiItem } from '../../types/letter';
import {
  Gavel,
  Plus,
  Trash2,
  Sparkles,
  FileSpreadsheet,
  Users,
  UserPlus,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  GraduationCap,
  ClipboardList,
  CheckCircle2,
} from 'lucide-react';
import { TAHUN_SURAT_LIST } from '../../data/nomorSuratData';

interface SuratKeputusanFormProps {
  data: SuratKeputusanData;
  onChange: (data: SuratKeputusanData) => void;
  onOpenAiHelper: (type: string, currentVal: string) => void;
}

const SAMPLE_GURU_PRESETS: SKPegawaiItem[] = [
  {
    id: 'skp-s1',
    nama: 'Drs. H. Muhammad Arifin, M.Pd.',
    nip: '197508142005011004',
    pangkatGol: 'Pembina Tk. I, IV/b',
    jabatan: 'Guru Madya',
    tugas: 'Guru Fikih (Kelas VII & VIII) & Koordinator Kurikulum',
    bebanJam: '24 JP',
    keterangan: 'Guru Induk',
  },
  {
    id: 'skp-s2',
    nama: 'Nurhaedah, S.Pd., M.Pd.',
    nip: '198203152009122003',
    pangkatGol: 'Penata Tk. I, III/d',
    jabatan: 'Guru Muda',
    tugas: 'Guru Bahasa Indonesia & Wali Kelas VII.A',
    bebanJam: '26 JP',
    keterangan: 'Guru Induk',
  },
  {
    id: 'skp-s3',
    nama: 'Ahmad Syahrir, S.Si.',
    nip: '198906212019031008',
    pangkatGol: 'Penata Muda Tk. I, III/b',
    jabatan: 'Guru Pertama',
    tugas: 'Guru IPA Terpadu & Pembina KSM Sains',
    bebanJam: '24 JP',
    keterangan: 'Guru Induk',
  },
  {
    id: 'skp-s4',
    nama: 'Siti Rahmawati, S.Pd.I.',
    nip: '199304122023212035',
    pangkatGol: 'Ahli Pertama / IX (PPPK)',
    jabatan: 'Guru Ahli Pertama',
    tugas: "Guru Al-Qur'an Hadis & Pembina OSIM",
    bebanJam: '24 JP',
    keterangan: 'Guru ASN PPPK',
  },
  {
    id: 'skp-s5',
    nama: 'Faisal Baharuddin, S.Kom.',
    nip: '199511022022031002',
    pangkatGol: 'Penata Muda, III/a',
    jabatan: 'Pengadministrasi IT',
    tugas: 'Kepala Lab Komputer & Proktor Asesmen',
    bebanJam: '12 JP',
    keterangan: 'Tenaga Teknis',
  },
];

const SAMPLE_PANITIA_PRESETS: SKPegawaiItem[] = [
  {
    id: 'skp-p1',
    nama: 'Drs. H. Sudirman, S.Ag., M.Pd.I.',
    nip: '197204151998031003',
    pangkatGol: 'Pembina Utama Muda, IV/c',
    jabatan: 'Kepala Madrasah',
    tugas: 'Penanggung Jawab Umum Asesmen',
    bebanJam: '-',
    keterangan: 'Pengarah',
  },
  {
    id: 'skp-p2',
    nama: 'Drs. H. Muhammad Arifin, M.Pd.',
    nip: '197508142005011004',
    pangkatGol: 'Pembina Tk. I, IV/b',
    jabatan: 'Wakamad Kurikulum',
    tugas: 'Ketua Panitia Pelaksana',
    bebanJam: '-',
    keterangan: 'Koordinator',
  },
  {
    id: 'skp-p3',
    nama: 'Nurhaedah, S.Pd., M.Pd.',
    nip: '198203152009122003',
    pangkatGol: 'Penata Tk. I, III/d',
    jabatan: 'Guru Muda',
    tugas: 'Sekretaris Panitia & Administrasi Naskah',
    bebanJam: '-',
    keterangan: 'Pelaksana',
  },
  {
    id: 'skp-p4',
    nama: 'Hj. Rosdiana, S.Ag.',
    nip: '197802102007012015',
    pangkatGol: 'Penata Tk. I, III/d',
    jabatan: 'Bendahara Madrasah',
    tugas: 'Bendahara Pelaksana & Pengelola Anggaran',
    bebanJam: '-',
    keterangan: 'Keuangan',
  },
  {
    id: 'skp-p5',
    nama: 'Faisal Baharuddin, S.Kom.',
    nip: '199511022022031002',
    pangkatGol: 'Penata Muda, III/a',
    jabatan: 'Staf IT',
    tugas: 'Proktor Utama & Teknisi Server Asesmen',
    bebanJam: '-',
    keterangan: 'Teknisi IT',
  },
];

export const SuratKeputusanForm: React.FC<SuratKeputusanFormProps> = ({
  data,
  onChange,
  onOpenAiHelper,
}) => {
  const updateField = (field: keyof SuratKeputusanData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const pegawaiList: SKPegawaiItem[] = data.lampiranPegawaiList || [];

  // Menimbang Handlers
  const handleAddMenimbang = () => {
    updateField('menimbang', [...data.menimbang, '']);
  };
  const handleUpdateMenimbang = (idx: number, val: string) => {
    const updated = [...data.menimbang];
    updated[idx] = val;
    updateField('menimbang', updated);
  };
  const handleDeleteMenimbang = (idx: number) => {
    if (data.menimbang.length <= 1) return;
    updateField('menimbang', data.menimbang.filter((_, i) => i !== idx));
  };

  // Mengingat Handlers
  const handleAddMengingat = () => {
    updateField('mengingat', [...data.mengingat, '']);
  };
  const handleUpdateMengingat = (idx: number, val: string) => {
    const updated = [...data.mengingat];
    updated[idx] = val;
    updateField('mengingat', updated);
  };
  const handleDeleteMengingat = (idx: number) => {
    if (data.mengingat.length <= 1) return;
    updateField('mengingat', data.mengingat.filter((_, i) => i !== idx));
  };

  // Memperhatikan Handlers
  const handleAddMemperhatikan = () => {
    updateField('memperhatikan', [...(data.memperhatikan || []), '']);
  };
  const handleUpdateMemperhatikan = (idx: number, val: string) => {
    const updated = [...data.memperhatikan];
    updated[idx] = val;
    updateField('memperhatikan', updated);
  };
  const handleDeleteMemperhatikan = (idx: number) => {
    updateField('memperhatikan', data.memperhatikan.filter((_, i) => i !== idx));
  };

  // Diktum Handlers
  const DIKTUM_KEYS = ['KESATU', 'KEDUA', 'KETIGA', 'KEEMPAT', 'KELIMA', 'KEENAM', 'KETUJUH', 'KEDELAPAN'];
  const handleAddDiktum = () => {
    const nextIdx = data.diktumList.length;
    const nextKey = DIKTUM_KEYS[nextIdx] || `KE-${nextIdx + 1}`;
    const newDiktum: DiktumSK = {
      id: 'd-' + Date.now(),
      key: nextKey,
      title: nextKey,
      content: '',
    };
    updateField('diktumList', [...data.diktumList, newDiktum]);
  };
  const handleUpdateDiktum = (id: string, content: string) => {
    const updated = data.diktumList.map((d) => {
      if (d.id === id) return { ...d, content };
      return d;
    });
    updateField('diktumList', updated);
  };
  const handleDeleteDiktum = (id: string) => {
    if (data.diktumList.length <= 1) return;
    updateField('diktumList', data.diktumList.filter((d) => d.id !== id));
  };

  // Lampiran Pegawai Handlers
  const handleAddPegawai = () => {
    const newPegawai: SKPegawaiItem = {
      id: 'skp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      nama: '',
      nip: '',
      pangkatGol: '',
      jabatan: '',
      tugas: '',
      bebanJam: '',
      keterangan: '',
    };
    updateField('lampiranPegawaiList', [...pegawaiList, newPegawai]);
  };

  const handleUpdatePegawai = (idx: number, field: keyof SKPegawaiItem, value: string) => {
    const updated = [...pegawaiList];
    updated[idx] = { ...updated[idx], [field]: value };
    updateField('lampiranPegawaiList', updated);
  };

  const handleDeletePegawai = (idx: number) => {
    const updated = pegawaiList.filter((_, i) => i !== idx);
    updateField('lampiranPegawaiList', updated);
  };

  const handleMovePegawai = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === pegawaiList.length - 1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const updated = [...pegawaiList];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    updateField('lampiranPegawaiList', updated);
  };

  const handleApplyPreset = (presetList: SKPegawaiItem[], judul: string, subJudul: string) => {
    updateField('hasLampiran', true);
    updateField('judulLampiran', judul);
    updateField('lampiranSubJudul', subJudul);
    updateField('lampiranPegawaiList', presetList);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <Gavel className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide">
              Surat Keputusan (SK Kepala Madrasah)
            </h3>
            <p className="text-[11px] text-slate-500">
              Standar konsideran Menimbang, Mengingat, Memperhatikan, Diktum Putusan, dan Lampiran Tabel
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenAiHelper('sk_konsideran', data.tentangSK)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Susun via AI
        </button>
      </div>

      {/* Section 1: Identitas SK */}
      <div>
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">
          1. Identitas & Judul Ketetapan SK
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Nomor & Tahun SK
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="Contoh: 142 TAHUN 2026"
                value={data.nomorSK}
                onChange={(e) => updateField('nomorSK', e.target.value)}
              />
              <select
                className="w-28 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors cursor-pointer"
                value={data.tahunSK}
                onChange={(e) => updateField('tahunSK', e.target.value)}
              >
                {!TAHUN_SURAT_LIST.includes(data.tahunSK) && (
                  <option value={data.tahunSK}>{data.tahunSK}</option>
                )}
                {TAHUN_SURAT_LIST.map((th) => (
                  <option key={th} value={th}>
                    {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Tentang Keputusan (Huruf Kapital)
            </label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md uppercase font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="PEMBAGIAN TUGAS GURU DALAM PROSES BELAJAR MENGAJAR TAHUN AJARAN 2026/2027"
              value={data.tentangSK}
              onChange={(e) => updateField('tentangSK', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Menimbang */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-3">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            2. Konsideran Menimbang (Poin a, b, c)
          </h2>
          <button
            type="button"
            onClick={handleAddMenimbang}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 uppercase cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Poin
          </button>
        </div>

        <div className="space-y-2">
          {data.menimbang.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-xs font-bold text-slate-400 w-5 pt-2 text-right">
                {String.fromCharCode(97 + idx)}.
              </span>
              <textarea
                rows={2}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="bahwa untuk memperlancar proses belajar mengajar..."
                value={item}
                onChange={(e) => handleUpdateMenimbang(idx, e.target.value)}
              />
              {data.menimbang.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteMenimbang(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded pt-2 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Mengingat */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-3">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            3. Konsideran Mengingat (Dasar Hukum)
          </h2>
          <button
            type="button"
            onClick={handleAddMengingat}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 uppercase cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Dasar Hukum
          </button>
        </div>

        <div className="space-y-2">
          {data.mengingat.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-xs font-bold text-slate-400 w-5 pt-2 text-right">
                {idx + 1}.
              </span>
              <textarea
                rows={2}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Undang-Undang Nomor 20 Tahun 2003 tentang Sisdiknas..."
                value={item}
                onChange={(e) => handleUpdateMengingat(idx, e.target.value)}
              />
              {data.mengingat.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteMengingat(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded pt-2 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Memperhatikan */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-3">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            4. Memperhatikan (Hasil Rapat / Musyawarah)
          </h2>
          <button
            type="button"
            onClick={handleAddMemperhatikan}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 uppercase cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Poin
          </button>
        </div>

        <div className="space-y-2">
          {data.memperhatikan &&
            data.memperhatikan.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-xs font-bold text-slate-400 w-5 pt-2 text-right">
                  {idx + 1}.
                </span>
                <textarea
                  rows={2}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Hasil Rapat Dewan Guru MTsN 3 Jeneponto..."
                  value={item}
                  onChange={(e) => handleUpdateMemperhatikan(idx, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteMemperhatikan(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded pt-2 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Section 5: Diktum MEMUTUSKAN */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-3">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            5. Diktum MEMUTUSKAN ({data.diktumList.length} Diktum)
          </h2>
          <button
            type="button"
            onClick={handleAddDiktum}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Tambah Diktum
          </button>
        </div>

        <div className="space-y-2.5">
          {data.diktumList.map((diktum) => (
            <div key={diktum.id} className="p-3 bg-emerald-50/40 border border-emerald-100/80 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-900 uppercase tracking-wide">
                  {diktum.key} :
                </span>
                {data.diktumList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteDiktum(diktum.id)}
                    className="text-slate-400 hover:text-red-600 text-xs inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                )}
              </div>
              <textarea
                rows={2}
                className="w-full px-3 py-1.5 text-xs bg-white rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder={`Isi ketetapan ${diktum.key}...`}
                value={diktum.content}
                onChange={(e) => handleUpdateDiktum(diktum.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section 6: Lampiran Tabel Nama Guru / Pegawai yang di-SK-kan */}
      <div className="pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between p-3.5 bg-linear-to-r from-emerald-50/90 to-teal-50/90 border border-emerald-200 rounded-xl mb-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wide">
                  6. Lampiran Tabel Nama Guru / Pegawai (Manual)
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    data.hasLampiran
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {data.hasLampiran ? 'AKTIF' : 'NON-AKTIF'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Membuat lembar lampiran resmi berformat tabel untuk nama guru/pegawai yang di-SK-kan
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.hasLampiran}
              onChange={(e) => updateField('hasLampiran', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {data.hasLampiran && (
          <div className="space-y-4 bg-slate-50/70 border border-slate-200/90 rounded-xl p-3.5 sm:p-4">
            {/* Header Lampiran Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 uppercase tracking-wide">
                  Judul Lampiran
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
                  placeholder="DAFTAR NAMA GURU DAN PEMBAGIAN TUGAS MENGAJAR"
                  value={data.judulLampiran || ''}
                  onChange={(e) => updateField('judulLampiran', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1 uppercase tracking-wide">
                  Sub-Judul / Keterangan Lembaga & Tahun
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
                  placeholder="MADRASAH TSANAWIYAH NEGERI 3 JENEPONTO TAHUN AJARAN 2026/2027"
                  value={data.lampiranSubJudul || ''}
                  onChange={(e) => updateField('lampiranSubJudul', e.target.value)}
                />
              </div>
            </div>

            {/* Presets & Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                  Preset Cepat:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset(
                      SAMPLE_GURU_PRESETS,
                      'DAFTAR NAMA GURU, PEMBAGIAN TUGAS MENGAJAR, DAN TUGAS TAMBAHAN',
                      'MADRASAH TSANAWIYAH NEGERI 3 JENEPONTO TAHUN AJARAN 2026/2027'
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md transition-colors cursor-pointer shadow-2xs"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  Guru & Wali Kelas
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleApplyPreset(
                      SAMPLE_PANITIA_PRESETS,
                      'SUSUNAN PANITIA PELAKSANA ASESMEN MADRASAH (AM)',
                      'MADRASAH TSANAWIYAH NEGERI 3 JENEPONTO TAHUN AJARAN 2026/2027'
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md transition-colors cursor-pointer shadow-2xs"
                >
                  <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />
                  Panitia Asesmen / Kegiatan
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddPegawai}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md shadow-2xs transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  + Tambah Baris Guru/Pegawai
                </button>
              </div>
            </div>

            {/* List / Table of Pegawai */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold px-1">
                <span>Daftar Guru / Pegawai yang di-SK-kan ({pegawaiList.length} Orang)</span>
                {pegawaiList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => updateField('lampiranPegawaiList', [])}
                    className="text-[11px] text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Kosongkan Tabel
                  </button>
                )}
              </div>

              {pegawaiList.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-white space-y-2">
                  <Users className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">
                    Belum ada data guru/pegawai pada lampiran SK ini.
                  </p>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleAddPegawai}
                      className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 cursor-pointer shadow-2xs"
                    >
                      + Tambah Baris Manual
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleApplyPreset(
                          SAMPLE_GURU_PRESETS,
                          'DAFTAR NAMA GURU, PEMBAGIAN TUGAS MENGAJAR, DAN TUGAS TAMBAHAN',
                          'MADRASAH TSANAWIYAH NEGERI 3 JENEPONTO TAHUN AJARAN 2026/2027'
                        )
                      }
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 border border-slate-200 cursor-pointer shadow-2xs"
                    >
                      Muat Contoh Data Guru
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {pegawaiList.map((pegawai, idx) => (
                    <div
                      key={pegawai.id || idx}
                      className="bg-white border border-slate-200 rounded-lg p-3 sm:p-3.5 shadow-2xs space-y-2.5 transition-all hover:border-emerald-300"
                    >
                      {/* Baris Atas: Nomor Urut & Tombol Aksi */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {pegawai.nama ? pegawai.nama : `Guru / Pegawai #${idx + 1}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMovePegawai(idx, 'up')}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                            title="Pindah ke Atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === pegawaiList.length - 1}
                            onClick={() => handleMovePegawai(idx, 'down')}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                            title="Pindah ke Bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePegawai(idx)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded ml-1"
                            title="Hapus Baris"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Baris Input Data */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-xs">
                        {/* Nama Lengkap */}
                        <div className="sm:col-span-5">
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                            Nama Lengkap & Gelar *
                          </label>
                          <input
                            type="text"
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded font-semibold text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                            placeholder="Contoh: Drs. H. Muhammad Arifin, M.Pd."
                            value={pegawai.nama}
                            onChange={(e) => handleUpdatePegawai(idx, 'nama', e.target.value)}
                          />
                        </div>

                        {/* NIP / NPK */}
                        <div className="sm:col-span-4">
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                            NIP / NPK / NUPTK
                          </label>
                          <input
                            type="text"
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded font-mono text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                            placeholder="197508142005011004 / -"
                            value={pegawai.nip || ''}
                            onChange={(e) => handleUpdatePegawai(idx, 'nip', e.target.value)}
                          />
                        </div>

                        {/* Pangkat / Golongan */}
                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                            Pangkat / Gol.
                          </label>
                          <input
                            type="text"
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                            placeholder="Pembina, IV/a"
                            value={pegawai.pangkatGol || ''}
                            onChange={(e) => handleUpdatePegawai(idx, 'pangkatGol', e.target.value)}
                          />
                        </div>

                        {/* Jabatan Utama */}
                        <div className="sm:col-span-5">
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                            Jabatan
                          </label>
                          <input
                            type="text"
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                            placeholder="Guru Madya / Guru Pertama"
                            value={pegawai.jabatan || ''}
                            onChange={(e) => handleUpdatePegawai(idx, 'jabatan', e.target.value)}
                          />
                        </div>

                        {/* Tugas yang di-SK-kan */}
                        <div className="sm:col-span-7">
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                            Tugas di SK / Mapel / Unit / Wali Kelas
                          </label>
                          <input
                            type="text"
                            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                            placeholder="Guru Fikih (VII, VIII) & Wali Kelas VII.1"
                            value={pegawai.tugas || ''}
                            onChange={(e) => handleUpdatePegawai(idx, 'tugas', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
