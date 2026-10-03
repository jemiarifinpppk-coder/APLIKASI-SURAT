import React from 'react';
import { SuratUndanganData } from '../../types/letter';
import { Mail, Plus, Trash2, Calendar, Clock, MapPin, Sparkles, Hash, AlertCircle } from 'lucide-react';
import { NomorSuratDropdown } from '../common/NomorSuratDropdown';

interface SuratUndanganFormProps {
  data: SuratUndanganData;
  onChange: (data: SuratUndanganData) => void;
  onOpenCodePicker: () => void;
  onOpenAiHelper: (type: string, currentVal: string) => void;
}

export const SuratUndanganForm: React.FC<SuratUndanganFormProps> = ({
  data,
  onChange,
  onOpenCodePicker,
  onOpenAiHelper,
}) => {
  const updateField = (field: keyof SuratUndanganData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddPenerima = () => {
    updateField('penerimaList', [...data.penerimaList, '']);
  };

  const handleUpdatePenerima = (idx: number, val: string) => {
    const updated = [...data.penerimaList];
    updated[idx] = val;
    updateField('penerimaList', updated);
  };

  const handleDeletePenerima = (idx: number) => {
    if (data.penerimaList.length <= 1) return;
    updateField('penerimaList', data.penerimaList.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide">
              Surat Undangan Dinas Madrasah
            </h3>
            <p className="text-[11px] text-slate-500">
              Format undangan rapat dewan guru, komite, atau wali murid
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenAiHelper('undangan', data.hal)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Susun via AI
        </button>
      </div>

      {/* Section 1: Identitas Surat Undangan */}
      <div>
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">
          1. Identitas Surat Undangan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="sm:col-span-3">
            <NomorSuratDropdown
              value={data.nomorSurat}
              onChange={(val) => updateField('nomorSurat', val)}
              onOpenCodePicker={onOpenCodePicker}
              defaultKlasifikasi="HM.01"
              label="Nomor Surat Undangan"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" /> Sifat Surat
            </label>
            <select
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              value={data.sifat}
              onChange={(e) => updateField('sifat', e.target.value as any)}
            >
              <option value="Biasa">Biasa</option>
              <option value="Penting">Penting</option>
              <option value="Segera">Segera</option>
              <option value="Sangat Segera">Sangat Segera</option>
              <option value="Rahasia">Rahasia</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Lampiran
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              placeholder="1 (satu) Berkas / -"
              value={data.lampiran}
              onChange={(e) => updateField('lampiran', e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Perihal / Hal Undangan
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              placeholder="Undangan Rapat Koordinasi Persiapan Asesmen Madrasah"
              value={data.hal}
              onChange={(e) => updateField('hal', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Penerima Undangan */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-3">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            2. Penerima Undangan (Kepada Yth.)
          </h2>
          <button
            type="button"
            onClick={handleAddPenerima}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 uppercase"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Penerima
          </button>
        </div>

        <div className="space-y-2">
          {data.penerimaList.map((penerima, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 w-5 text-right">{idx + 1}.</span>
              <input
                type="text"
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Yth. Bapak/Ibu Guru & Staf Tata Usaha"
                value={penerima}
                onChange={(e) => handleUpdatePenerima(idx, e.target.value)}
              />
              {data.penerimaList.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeletePenerima(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Jadwal & Tempat Kegiatan */}
      <div>
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">
          3. Jadwal & Tempat Kegiatan
        </h2>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Hari, Tanggal
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                placeholder="Kamis, 10 September 2026"
                value={data.hariTanggal}
                onChange={(e) => updateField('hariTanggal', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Waktu / Pukul
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                placeholder="Pukul 09.00 WITA s.d. Selesai"
                value={data.waktu}
                onChange={(e) => updateField('waktu', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Tempat Pelaksanaan
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              placeholder="Aula Serbaguna Lantai 2 MAN 1 Jeneponto"
              value={data.tempat}
              onChange={(e) => updateField('tempat', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Acara / Agenda Pembahasan
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              placeholder="1. Evaluasi KBM Semester Berjalan&#10;2. Persiapan Asesmen Madrasah&#10;3. Penguatan Disiplin Pegawai"
              value={data.acara}
              onChange={(e) => updateField('acara', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Catatan / Kelengkapan
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                placeholder="Dimohon hadir tepat waktu membawa berkas perangkat ajar."
                value={data.catatan || ''}
                onChange={(e) => updateField('catatan', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Pakaian (Dresscode)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                placeholder="Pakaian Dinas Harian (PDH) Kemenag"
                value={data.dresscode || ''}
                onChange={(e) => updateField('dresscode', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
