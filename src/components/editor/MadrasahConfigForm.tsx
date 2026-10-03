import React, { useRef } from 'react';
import { MadrasahConfig } from '../../types/letter';
import { School, MapPin, Phone, Mail, Globe, Type, Image as ImageIcon, Upload, Trash2, CheckCircle2, Hash, Calendar, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { KemenagLogo } from '../KemenagLogo';
import { NOMOR_SURAT_LIST, TAHUN_SURAT_LIST, BULAN_SURAT_LIST, KODE_MADRASAH_PRESETS, buildNomorSurat } from '../../data/nomorSuratData';

interface MadrasahConfigFormProps {
  config: MadrasahConfig;
  onChange: (config: MadrasahConfig) => void;
  onApplyNomorToDoc?: (nomorSurat: string, tahun: string) => void;
}

export const MadrasahConfigForm: React.FC<MadrasahConfigFormProps> = ({
  config,
  onChange,
  onApplyNomorToDoc,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const secondaryFileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof MadrasahConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isSecondary: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (isSecondary) {
          onChange({ ...config, secondaryLogoUrl: base64 });
        } else {
          onChange({ ...config, logoType: 'custom', customLogoUrl: base64 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Identitas & Satuan Kerja */}
      <div>
        <div className="border-b border-slate-100 pb-2 mb-3">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            1. Satuan Kerja & Alamat Kop Surat
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
          {/* Kementerian Utama */}
          <div className="sm:col-span-2">
            <label className="text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center justify-between">
              <span>Kementerian Utama (Baris 1)</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">11 pt</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              value={config.kementerian}
              onChange={(e) => updateField('kementerian', e.target.value)}
            />
          </div>

          {/* Satker Utama / Kanwil / Kankemenag */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center justify-between">
              <span>Satuan Kerja Utama (Baris 2)</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">11 pt</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="Contoh: KANTOR KEMENTERIAN AGAMA KABUPATEN JENEPONTO"
              value={config.satkerUtama}
              onChange={(e) => updateField('satkerUtama', e.target.value)}
            />
          </div>

          {/* Unit Kerja / Nama Madrasah */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center justify-between">
              <span>Nama Madrasah / Satker (Baris 3)</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">14 pt</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="Contoh: MADRASAH ALIYAH NEGERI (MAN) 1 JENEPONTO"
              value={config.unitKerja}
              onChange={(e) => updateField('unitKerja', e.target.value)}
            />
          </div>

          {/* Alamat & Kontak */}
          <div className="sm:col-span-2">
            <label className="text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center justify-between">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Alamat Lengkap Madrasah (Baris 4)</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">9 pt</span>
            </label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="Jl. Lanto Dg. Pasewang No. 45, Empoang, Kec. Binamu, Kab. Jeneponto"
              value={config.alamatKontak}
              onChange={(e) => updateField('alamatKontak', e.target.value)}
            />
          </div>

          {/* Telepon */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> Nomor Telepon / Fax
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="(0419) 21054"
              value={config.telepon}
              onChange={(e) => updateField('telepon', e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Pos-el (Email) Resmi
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="man1jeneponto@kemenag.go.id"
              value={config.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" /> Website / Laman
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              placeholder="www.man1jeneponto.sch.id"
              value={config.website}
              onChange={(e) => updateField('website', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Kode Pos & Kabupaten/Kota
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="92311"
                value={config.kodePos}
                onChange={(e) => updateField('kodePos', e.target.value)}
              />
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="Jeneponto"
                value={config.kabupatenKota}
                onChange={(e) => updateField('kabupatenKota', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Logo Kop Surat & Tipografi */}
      <div>
        <div className="border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" /> 2. Pengaturan Logo Kop Surat
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Logo Type Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Model Logo Kop
            </label>
            <select
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              value={config.logoType}
              onChange={(e) => updateField('logoType', e.target.value as any)}
            >
              <option value="kemenag_standard">Logo Kemenag RI (Ikhlas Beramal - Warna Standar)</option>
              <option value="kemenag_monochrome">Logo Kemenag RI (Monokrom / Hitam Putih)</option>
              <option value="custom">Logo Khusus Madrasah (Unggah File / URL)</option>
              <option value="dual">Dual Logo (Kemenag di Kiri + Logo Madrasah di Kanan)</option>
            </select>
          </div>

          {/* Logo Size Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Ukuran Logo Kop
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sm', label: 'Kecil (2.0 cm)' },
                { id: 'md', label: 'Standar (2.4 cm)' },
                { id: 'lg', label: 'Besar (2.8 cm)' },
              ].map((sz) => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => updateField('logoSize', sz.id as any)}
                  className={`py-2 px-2 text-center text-xs font-semibold rounded-md border transition-all ${
                    (config.logoSize || 'md') === sz.id
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Box & Upload Trigger */}
          <div className="sm:col-span-2 p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* Logo Preview */}
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1 shadow-2xs shrink-0">
                {config.logoType === 'custom' && config.customLogoUrl ? (
                  <img
                    src={config.customLogoUrl}
                    alt="Preview Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : config.logoType === 'kemenag_monochrome' ? (
                  <KemenagLogo className="w-12 h-12" variant="monochrome" />
                ) : (
                  <KemenagLogo className="w-12 h-12" variant="color" />
                )}
              </div>

              <div>
                <p className="font-bold text-slate-800 text-xs sm:text-sm">
                  {config.logoType === 'custom'
                    ? 'Logo Kustom Madrasah Aktif'
                    : config.logoType === 'dual'
                    ? 'Dual Logo (Kemenag + Madrasah) Aktif'
                    : config.logoType === 'kemenag_monochrome'
                    ? 'Logo Kemenag RI Monokrom'
                    : 'Logo Resmi Kemenag RI (Ikhlas Beramal)'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Vektor resolusi tinggi standar PMA Kemenag RI untuk cetak A4 & PDF
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="hidden"
                onChange={(e) => handleFileUpload(e, false)}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:border-emerald-600 hover:text-emerald-700 text-slate-700 rounded-md flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-600" /> Unggah File Logo
              </button>

              {config.logoType === 'custom' && (
                <button
                  type="button"
                  onClick={() => onChange({ ...config, logoType: 'kemenag_standard', customLogoUrl: '' })}
                  className="px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md border border-red-200 transition-colors flex items-center gap-1"
                  title="Kembalikan ke Logo Kemenag RI"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Reset
                </button>
              )}
            </div>
          </div>

          {/* If Custom Logo selected: Show URL input option */}
          {config.logoType === 'custom' && (
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                Atau Masukkan Tautan / URL Gambar Logo
              </label>
              <input
                type="text"
                placeholder="https://.../logo-madrasah.png atau data:image/..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                value={config.customLogoUrl || ''}
                onChange={(e) => updateField('customLogoUrl', e.target.value)}
              />
            </div>
          )}

          {/* If Dual Logo selected: Show Secondary Logo upload / url */}
          {config.logoType === 'dual' && (
            <div className="sm:col-span-2 p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-emerald-900">
                    Logo Sisi Kanan (Logo Madrasah / ISO / Akreditasi)
                  </label>
                  <p className="text-[11px] text-emerald-700">
                    Akan ditampilkan di sudut kanan atas kop surat berhadapan dengan logo Kemenag RI
                  </p>
                </div>
                <input
                  ref={secondaryFileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, true)}
                />
                <button
                  type="button"
                  onClick={() => secondaryFileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-semibold bg-white border border-emerald-300 text-emerald-800 rounded-md hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" /> Unggah Logo Kanan
                </button>
              </div>
              <input
                type="text"
                placeholder="https://.../logo-kanan.png atau unggah file di atas"
                className="w-full px-3 py-1.5 text-xs bg-white border border-emerald-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                value={config.secondaryLogoUrl || ''}
                onChange={(e) => updateField('secondaryLogoUrl', e.target.value)}
              />
            </div>
          )}

          {/* Font Selection */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-slate-400" /> Jenis Huruf Naskah (Font Keluarga)
            </label>
            <select
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
              value={config.fontFamily}
              onChange={(e) => updateField('fontFamily', e.target.value as any)}
            >
              <option value="bookman">Bookman Old Style (Standar Resmi PMA Tata Naskah Dinas)</option>
              <option value="times">Times New Roman (Standar Surat Kedinasan Tradisional)</option>
              <option value="arial">Arial (Modern Dinas & Surat Edaran)</option>
              <option value="lora">Lora Serif (Elegan & Formal)</option>
            </select>
          </div>

          {/* Paper Size & Margin */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Ukuran Kertas Naskah
            </label>
            <select
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              value={config.paperSize || 'a4'}
              onChange={(e) => updateField('paperSize', e.target.value as any)}
            >
              <option value="a4">A4 (210 × 297 mm) - Standar Kemenag RI</option>
              <option value="f4">F4 / Folio (215 × 330 mm) - Lampiran/SK Panjang</option>
              <option value="letter">Letter / Kuarto (215.9 × 279.4 mm)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Batas Tepi (Margin)
            </label>
            <select
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              value={config.marginPreset || 'standar'}
              onChange={(e) => updateField('marginPreset', e.target.value as any)}
            >
              <option value="standar">Standar Kemenag (Kiri 2.5cm, Kanan/Atas/Bawah 2cm)</option>
              <option value="kompak">Kompak / Hemat Tempat (Kiri 2cm, Lainnya 1.5cm)</option>
              <option value="lebar">Lebar / Penjilidan Tebal (Kiri 3cm, Lainnya 2.5cm)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Format & Nomor Surat Madrasah */}
      <div>
        <div className="border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-emerald-600" /> 3. Konfigurasi Nomor & Tahun Surat Dinas
          </h2>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            PMA No. 9/2016
          </span>
        </div>

        <div className="bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
            {/* Nomor Urut Dropdown (B.001 s.d B.300) */}
            <div className="sm:col-span-1">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 uppercase tracking-wide flex items-center justify-between">
                <span>No. Urut Surat</span>
                <span className="text-[10px] text-emerald-700 font-bold">B.001 - B.300</span>
              </label>
              <select
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md font-mono font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors cursor-pointer shadow-2xs"
                value={config.nomorUrutSurat || 'B.001'}
                onChange={(e) => updateField('nomorUrutSurat', e.target.value)}
              >
                {config.nomorUrutSurat && !NOMOR_SURAT_LIST.includes(config.nomorUrutSurat) && (
                  <option value={config.nomorUrutSurat}>{config.nomorUrutSurat}</option>
                )}
                {NOMOR_SURAT_LIST.map((no) => (
                  <option key={no} value={no}>
                    {no}
                  </option>
                ))}
              </select>
            </div>

            {/* Kode Madrasah / Unit Pengolah */}
            <div className="sm:col-span-1">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 uppercase tracking-wide flex items-center justify-between">
                <span>Kode Madrasah</span>
                <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1 rounded">MTs.21.07.03</span>
              </label>
              <select
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors cursor-pointer shadow-2xs"
                value={config.kodeSatkerNomor || 'MTs.21.07.03'}
                onChange={(e) => updateField('kodeSatkerNomor', e.target.value)}
              >
                {config.kodeSatkerNomor && !KODE_MADRASAH_PRESETS.some((k) => k.value === config.kodeSatkerNomor) && (
                  <option value={config.kodeSatkerNomor}>{config.kodeSatkerNomor}</option>
                )}
                {KODE_MADRASAH_PRESETS.map((k) => (
                  <option key={k.value} value={k.value}>
                    {k.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bulan Surat */}
            <div className="sm:col-span-1">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 uppercase tracking-wide">
                Bulan Surat
              </label>
              <select
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors cursor-pointer shadow-2xs"
                value={config.bulanSurat || '09'}
                onChange={(e) => updateField('bulanSurat', e.target.value)}
              >
                {BULAN_SURAT_LIST.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.value} ({b.label.split(' ')[1].replace(/[()]/g, '')})
                  </option>
                ))}
              </select>
            </div>

            {/* Tahun Surat Dropdown (2026 s.d 2030) */}
            <div className="sm:col-span-1">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 uppercase tracking-wide flex items-center justify-between">
                <span>Tahun Surat</span>
                <span className="text-[10px] text-emerald-700 font-bold">2026 - 2030</span>
              </label>
              <select
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md font-mono font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors cursor-pointer shadow-2xs"
                value={config.tahunSurat || '2026'}
                onChange={(e) => updateField('tahunSurat', e.target.value)}
              >
                {config.tahunSurat && !TAHUN_SURAT_LIST.includes(config.tahunSurat) && (
                  <option value={config.tahunSurat}>{config.tahunSurat}</option>
                )}
                {TAHUN_SURAT_LIST.map((th) => (
                  <option key={th} value={th}>
                    {th}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Penjelasan Struktur Kode Madrasah */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5 text-[11px] text-emerald-900">
            <div className="font-bold mb-1 flex items-center gap-1.5 text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Struktur Penomoran Kode Madrasah:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px] pt-1">
              <div className="bg-white/80 p-1.5 rounded border border-emerald-100">
                <span className="font-black text-emerald-700 block">MTs</span>
                <span className="text-slate-600 text-[9px] font-sans">Jenjang Madrasah</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-emerald-100">
                <span className="font-black text-emerald-700 block">21</span>
                <span className="text-slate-600 text-[9px] font-sans">Kanwil Sulsel</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-emerald-100">
                <span className="font-black text-emerald-700 block">07</span>
                <span className="text-slate-600 text-[9px] font-sans">Kab. Jeneponto</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-emerald-100">
                <span className="font-black text-emerald-700 block">03</span>
                <span className="text-slate-600 text-[9px] font-sans">MTsN 3 (No. Madrasah)</span>
              </div>
            </div>
          </div>

          {/* Nomor Surat Live Output Box & Actions */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <span>Contoh Format Nomor Surat Terbentuk:</span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1">
                <span className="text-emerald-700">{config.nomorUrutSurat || 'B.001'}</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-800">{config.kodeSatkerNomor || 'MTs.21.07.03'}</span>
                <span className="text-slate-400">/</span>
                <span className="text-blue-700 bg-blue-50 px-1 rounded border border-blue-100">KODE_KLASIFIKASI</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-800">{config.bulanSurat || '09'}</span>
                <span className="text-slate-400">/</span>
                <span className="text-amber-700 font-black">{config.tahunSurat || '2026'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {/* Stepper +1 / -1 */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const match = (config.nomorUrutSurat || 'B.001').match(/\d+/);
                    if (match) {
                      const num = parseInt(match[0], 10);
                      if (num > 1) {
                        updateField('nomorUrutSurat', `B.${String(num - 1).padStart(3, '0')}`);
                      }
                    }
                  }}
                  className="px-2 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 transition-colors shadow-2xs"
                  title="Turunkan nomor urut surat (-1)"
                >
                  ◀ -1
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const match = (config.nomorUrutSurat || 'B.001').match(/\d+/);
                    if (match) {
                      const num = parseInt(match[0], 10);
                      if (num < 300) {
                        updateField('nomorUrutSurat', `B.${String(num + 1).padStart(3, '0')}`);
                      }
                    }
                  }}
                  className="px-2 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 transition-colors shadow-2xs"
                  title="Naikkan nomor urut surat (+1)"
                >
                  +1 ▶
                </button>
              </div>

              {onApplyNomorToDoc && (
                <button
                  type="button"
                  onClick={() => {
                    const noUrut = config.nomorUrutSurat || 'B.001';
                    const kodeMadrasah = config.kodeSatkerNomor || 'MTs.21.07.03';
                    const bulan = config.bulanSurat || '09';
                    const tahun = config.tahunSurat || '2026';
                    const fullSample = buildNomorSurat(noUrut, kodeMadrasah, 'PP.00.6', bulan, tahun);
                    onApplyNomorToDoc(fullSample, tahun);
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-md transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" /> Terapkan ke Naskah Aktif
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
