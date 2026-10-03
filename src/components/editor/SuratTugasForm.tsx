import React from 'react';
import { SuratTugasData, Personnel } from '../../types/letter';
import { UserCheck, Plus, Trash2, Sparkles, Hash, Calendar, MapPin, DollarSign, FileText } from 'lucide-react';
import { PangkatGolonganSelect } from '../common/PangkatGolonganSelect';
import { JabatanSelect } from '../common/JabatanSelect';
import { NomorSuratDropdown } from '../common/NomorSuratDropdown';

interface SuratTugasFormProps {
  data: SuratTugasData;
  onChange: (data: SuratTugasData) => void;
  onOpenCodePicker: () => void;
  onOpenAiHelper: (type: string, currentVal: string) => void;
}

export const SuratTugasForm: React.FC<SuratTugasFormProps> = ({
  data,
  onChange,
  onOpenCodePicker,
  onOpenAiHelper,
}) => {
  const updateField = (field: keyof SuratTugasData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddPersonnel = () => {
    const newPerson: Personnel = {
      id: 'p-' + Date.now(),
      nama: '',
      nip: '-',
      pangkatGol: 'Penata Muda (III/a)',
      jabatan: 'Guru Mata Pelajaran',
      keterangan: 'Anggota',
    };
    updateField('personelList', [...data.personelList, newPerson]);
  };

  const handleUpdatePersonnel = (id: string, field: keyof Personnel, value: string) => {
    const updated = data.personelList.map((p) => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    updateField('personelList', updated);
  };

  const handleDeletePersonnel = (id: string) => {
    if (data.personelList.length <= 1) return;
    updateField('personelList', data.personelList.filter((p) => p.id !== id));
  };

  const handleAddDasar = () => {
    updateField('dasarTugas', [...(data.dasarTugas || []), '']);
  };

  const handleUpdateDasar = (idx: number, val: string) => {
    const updated = [...data.dasarTugas];
    updated[idx] = val;
    updateField('dasarTugas', updated);
  };

  const handleDeleteDasar = (idx: number) => {
    updateField('dasarTugas', data.dasarTugas.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide">
              Surat Tugas (ST Dinas)
            </h3>
            <p className="text-[11px] text-slate-500">
              Formulir penugasan guru, proktor, pengawas ruang, atau panitia kegiatan
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenAiHelper('surat_tugas', data.maksudTugas)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Susun via AI
        </button>
      </div>

      {/* Section 1: Identitas Surat */}
      <div>
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">
          1. Identitas Surat Tugas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          <div className="sm:col-span-3">
            <NomorSuratDropdown
              value={data.nomorSurat}
              onChange={(val) => updateField('nomorSurat', val)}
              onOpenCodePicker={onOpenCodePicker}
              defaultKlasifikasi={data.kodeKlasifikasi || 'PP.00.6'}
              label="Nomor Surat Tugas"
            />
          </div>

          <div className="sm:col-span-3">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                Perihal / Agenda Tugas Singkat
              </label>
              {data.perihal && (
                <button
                  type="button"
                  onClick={() => {
                    const cleanPerihal = data.perihal.trim();
                    if (cleanPerihal) {
                      updateField(
                        'maksudTugas',
                        `Melaksanakan tugas ${
                          cleanPerihal.toLowerCase().startsWith('melaksanakan')
                            ? cleanPerihal
                            : cleanPerihal
                        }.`
                      );
                    }
                  }}
                  className="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  title="Sinkronkan perihal ini ke uraian maksud tugas pada butir nomor 1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Sinkronkan ke Uraian Tugas</span>
                </button>
              )}
            </div>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="Contoh: Penugasan Pengawas Ruang Asesmen Madrasah Berbasis Komputer"
              value={data.perihal}
              onChange={(e) => {
                const val = e.target.value;
                const isDefaultOrDerived =
                  !data.maksudTugas ||
                  data.maksudTugas ===
                    'Melaksanakan tugas sebagai Tim Pengawas dan Proktor Ruang Asesmen Madrasah Berbasis Komputer (AMBK) pada Satuan Kerja Wilayah Rayon 01 Kabupaten Jeneponto.' ||
                  data.maksudTugas.startsWith('Melaksanakan tugas sebagai Tim Pengawas') ||
                  (data.perihal && data.maksudTugas === `Melaksanakan tugas ${data.perihal}.`) ||
                  (data.perihal && data.maksudTugas.includes(data.perihal));

                if (isDefaultOrDerived && val.trim()) {
                  onChange({
                    ...data,
                    perihal: val,
                    maksudTugas: `Melaksanakan tugas ${
                      val.toLowerCase().startsWith('melaksanakan') ? val : val
                    }.`,
                  });
                } else {
                  updateField('perihal', val);
                }
              }}
            />
            <p className="text-[10px] text-slate-500 mt-1">
              *Perihal / agenda ini otomatis tampil di lembar pratinjau surat (di bawah nomor surat) dan menyelaraskan uraian tugas.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Dasar Penugasan */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-3">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            2. Dasar / Konsideran Tugas (Opsional)
          </h2>
          <button
            type="button"
            onClick={handleAddDasar}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 uppercase"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Dasar
          </button>
        </div>

        <div className="space-y-2">
          {data.dasarTugas && data.dasarTugas.map((dasar, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 w-5 text-right">{idx + 1}.</span>
              <input
                type="text"
                className="flex-1 px-3 py-2 text-xs bg-slate-50 rounded-md border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Contoh: Petunjuk Teknis Asesmen Madrasah Ditjen Pendis Tahun 2026"
                value={dasar}
                onChange={(e) => handleUpdateDasar(idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleDeleteDasar(idx)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Personel yang Ditugaskan */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-3">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            3. Detail Personel ({data.personelList.length} Orang)
          </h2>
          <button
            type="button"
            onClick={handleAddPersonnel}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors shadow-2xs"
          >
            <Plus className="w-3 h-3" /> Tambah Personel
          </button>
        </div>

        <div className="space-y-3">
          {data.personelList.map((p, idx) => (
            <div
              key={p.id}
              className="p-3.5 bg-emerald-50/50 border border-emerald-100/90 rounded-lg space-y-2.5 text-xs relative group"
            >
              <div className="flex items-center justify-between border-b border-emerald-200/50 pb-1.5">
                <span className="font-bold text-emerald-900 uppercase tracking-wider text-[11px]">
                  Personel #{idx + 1}
                </span>
                {data.personelList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeletePersonnel(p.id)}
                    className="text-slate-400 hover:text-red-600 inline-flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5 uppercase">
                    Nama Lengkap & Gelar
                  </label>
                  <input
                    type="text"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Drs. H. Muhammad Arifin, M.Pd."
                    value={p.nama}
                    onChange={(e) => handleUpdatePersonnel(p.id, 'nama', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5 uppercase">
                    NIP / PegID
                  </label>
                  <input
                    type="text"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md font-mono text-[11px] focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="197508142000031002"
                    value={p.nip}
                    onChange={(e) => handleUpdatePersonnel(p.id, 'nip', e.target.value)}
                  />
                </div>

                <div>
                  <PangkatGolonganSelect
                    label="Pangkat / Golongan"
                    value={p.pangkatGol}
                    onChange={(val) => handleUpdatePersonnel(p.id, 'pangkatGol', val)}
                    placeholder="Pilih Pangkat / Golongan..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <JabatanSelect
                    label="Jabatan Dinas"
                    value={p.jabatan}
                    onChange={(val) => handleUpdatePersonnel(p.id, 'jabatan', val)}
                    placeholder="Pilih Jabatan..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5 uppercase">
                    Keterangan / Posisi dalam Tim
                  </label>
                  <input
                    type="text"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Ketua Tim / Anggota / Proktor"
                    value={p.keterangan || ''}
                    onChange={(e) => handleUpdatePersonnel(p.id, 'keterangan', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Rincian Pelaksanaan Tugas */}
      <div>
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">
          4. Rincian Pelaksanaan Tugas
        </h2>

        <div className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" /> Maksud & Uraian Tugas
              </label>
              {data.perihal && (
                <button
                  type="button"
                  onClick={() => {
                    const clean = data.perihal.trim();
                    if (clean) {
                      updateField(
                        'maksudTugas',
                        `Melaksanakan tugas ${
                          clean.toLowerCase().startsWith('melaksanakan') ? clean : clean
                        }.`
                      );
                    }
                  }}
                  className="text-[10px] text-emerald-700 hover:text-emerald-800 font-semibold hover:underline cursor-pointer"
                >
                  Gunakan dari Perihal/Agenda
                </button>
              )}
            </div>
            <textarea
              rows={3}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="Melaksanakan tugas sebagai..."
              value={data.maksudTugas}
              onChange={(e) => updateField('maksudTugas', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Tempat Pelaksanaan
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="Kampus MAN 1 Jeneponto, Ruang Lab Komputer"
                value={data.tempatTugas}
                onChange={(e) => updateField('tempatTugas', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Waktu Pelaksanaan
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="Senin s.d. Kamis, 7 s.d. 10 September 2026"
                value={data.waktuTugas}
                onChange={(e) => updateField('waktuTugas', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Pembebanan Anggaran (DIPA)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="DIPA MAN 1 Jeneponto Tahun Anggaran 2026 / Biaya Mandiri"
              value={data.anggaranTugas}
              onChange={(e) => updateField('anggaranTugas', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Klausul Pelaporan & Penutup
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="Melaporkan hasil pelaksanaan tugas secara tertulis kepada Kepala Madrasah."
              value={data.klausulPenutup}
              onChange={(e) => updateField('klausulPenutup', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
