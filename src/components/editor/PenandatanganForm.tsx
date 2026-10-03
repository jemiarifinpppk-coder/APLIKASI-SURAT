import React, { useRef } from 'react';
import { PejabatPenandatangan } from '../../types/letter';
import { UserCheck, QrCode, Stamp, Calendar, MapPin, Plus, Trash2, ShieldCheck, Upload, Image as ImageIcon } from 'lucide-react';
import { KemenagTteQr } from '../KemenagTteQr';
import { PangkatGolonganSelect } from '../common/PangkatGolonganSelect';
import { JabatanSelect } from '../common/JabatanSelect';
import { formatIndoDate } from '../../utils/dateHelpers';

interface PenandatanganFormProps {
  data: PejabatPenandatangan;
  kabupatenDefault: string;
  onChange: (data: PejabatPenandatangan) => void;
}

export const PenandatanganForm: React.FC<PenandatanganFormProps> = ({
  data,
  kabupatenDefault,
  onChange,
}) => {
  const sigFileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof PejabatPenandatangan, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file tanda tangan maksimal 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onChange({ ...data, showQrcode: false, customSignatureUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTembusan = () => {
    updateField('tembusanList', [...(data.tembusanList || []), '']);
  };

  const handleUpdateTembusan = (idx: number, val: string) => {
    const updated = [...(data.tembusanList || [])];
    updated[idx] = val;
    updateField('tembusanList', updated);
  };

  const handleDeleteTembusan = (idx: number) => {
    updateField('tembusanList', (data.tembusanList || []).filter((_, i) => i !== idx));
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
              Pejabat Penandatangan & TTE
            </h3>
            <p className="text-[11px] text-slate-500">
              Konfigurasi Kepala Madrasah, Titimangsa, TTE QR Code Resmi Kemenag, dan Stempel
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Identitas Pejabat */}
      <div>
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">
          1. Data Pejabat Penandatangan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
          {/* Nama Pejabat */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Nama Lengkap & Gelar Pejabat
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="Dr. H. Sudirman, S.Ag., M.Pd.I."
              value={data.nama}
              onChange={(e) => updateField('nama', e.target.value)}
            />
          </div>

          {/* NIP */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              NIP Pejabat
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              placeholder="197204151998031003"
              value={data.nip}
              onChange={(e) => updateField('nip', e.target.value)}
            />
          </div>

          {/* Pangkat & Golongan */}
          <PangkatGolonganSelect
            label="Pangkat / Golongan Ruang"
            value={data.pangkatGol}
            onChange={(val) => updateField('pangkatGol', val)}
            placeholder="Pilih Pangkat / Golongan Pejabat..."
          />

          {/* Jabatan */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                Status & Jabatan Dinas
              </label>
            </div>
            <div className="flex gap-2 items-start">
              <select
                className="w-28 px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors font-medium shrink-0"
                value={data.statusJabatan || 'Definitif'}
                onChange={(e) => updateField('statusJabatan', e.target.value as any)}
              >
                <option value="Definitif">Definitif</option>
                <option value="Plt.">Plt.</option>
                <option value="Plh.">Plh.</option>
                <option value="a.n. Kepala">a.n. Kepala</option>
              </select>
              <div className="flex-1">
                <JabatanSelect
                  value={data.jabatan}
                  onChange={(val) => updateField('jabatan', val)}
                  placeholder="Pilih Jabatan..."
                />
              </div>
            </div>
          </div>

          {/* Titimangsa Tempat & Tanggal */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Tempat & Tanggal Penetapan
              </label>
              <button
                type="button"
                onClick={() => updateField('tanggalPenetapan', new Date().toISOString().split('T')[0])}
                className="text-[10.5px] text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Calendar className="w-3 h-3" /> Set Hari Ini
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                placeholder={kabupatenDefault || 'Jeneponto'}
                value={data.tempatPenetapan ?? ''}
                onChange={(e) => updateField('tempatPenetapan', e.target.value)}
              />
              <input
                type="date"
                className="w-full px-2.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors font-medium text-slate-700"
                value={data.tanggalPenetapan ?? ''}
                onChange={(e) => updateField('tanggalPenetapan', e.target.value)}
              />
            </div>
            <p className="text-[10.5px] text-slate-500 mt-1">
              Tertera di naskah:{' '}
              <strong className="text-slate-800 font-semibold">
                {data.tempatPenetapan || kabupatenDefault || 'Jeneponto'}, {formatIndoDate(data.tanggalPenetapan)}
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Tanda Tangan Elektronik (TTE) & Stempel */}
      <div>
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">
          2. Otentikasi TTE (QR Code Kemenag RI) & Stempel
        </h2>

        {/* TTE Card with Visual QR Preview */}
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* QR Code Live Preview */}
              <div className="w-14 h-14 bg-white p-0.5 border border-emerald-300 rounded shadow-2xs shrink-0 flex items-center justify-center">
                <KemenagTteQr className="w-full h-full" customImageUrl={data.showQrcode ? undefined : data.customSignatureUrl} />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-emerald-950 text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    checked={data.showQrcode}
                    onChange={(e) => updateField('showQrcode', e.target.checked)}
                  />
                  <span>Gunakan Tanda Tangan Elektronik (TTE / QR Code Kemenag)</span>
                </label>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Default resmi: QR Code dengan logo Kementerian Agama RI (Ikhlas Beramal) di tengah bersertifikat BSrE
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <input
                ref={sigFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => sigFileInputRef.current?.click()}
                className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-900 rounded-md transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5" /> Scan TTD / File Lain
              </button>

              {data.customSignatureUrl && (
                <button
                  type="button"
                  onClick={() => onChange({ ...data, customSignatureUrl: '', showQrcode: true })}
                  className="px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md border border-red-200 transition-colors"
                  title="Kembalikan ke QR Code Kemenag RI Default"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Reset Default
                </button>
              )}
            </div>
          </div>

          {/* Stempel Checkbox */}
          <div className="pt-2.5 border-t border-emerald-200/60 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                checked={data.showStempel}
                onChange={(e) => updateField('showStempel', e.target.checked)}
              />
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Stamp className="w-3.5 h-3.5 text-slate-600" /> Tampilkan Simulasi Stempel Cap Basah Ungu Kemenag
              </span>
            </label>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              (Dapat dinonaktifkan jika surat menggunakan TTE murni)
            </span>
          </div>
        </div>
      </div>

      {/* Section 3: Tembusan */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-3">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            3. Tembusan Surat (Carbon Copy / Arsip)
          </h2>
          <button
            type="button"
            onClick={handleAddTembusan}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 uppercase"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Tembusan
          </button>
        </div>

        <div className="space-y-2">
          {(data.tembusanList || []).map((tembusan, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 w-5 text-right">{idx + 1}.</span>
              <input
                type="text"
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Kepala Kantor Kementerian Agama Kabupaten..."
                value={tembusan}
                onChange={(e) => handleUpdateTembusan(idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleDeleteTembusan(idx)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

