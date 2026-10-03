import React from 'react';
import { SuratRekomendasiData, SuratPengantarData, SuratIzinDispensasiData, MadrasahConfig } from '../../types/letter';
import { Award, Send, FileCheck, Plus, Trash2 } from 'lucide-react';
import { PangkatGolonganSelect } from '../common/PangkatGolonganSelect';
import { JabatanSelect } from '../common/JabatanSelect';
import { NomorSuratDropdown } from '../common/NomorSuratDropdown';

interface OtherLettersFormProps {
  type: 'rekomendasi' | 'pengantar' | 'izin_dispensasi';
  rekomendasiData: SuratRekomendasiData;
  pengantarData: SuratPengantarData;
  izinData: SuratIzinDispensasiData;
  onChangeRekomendasi: (data: SuratRekomendasiData) => void;
  onChangePengantar: (data: SuratPengantarData) => void;
  onChangeIzin: (data: SuratIzinDispensasiData) => void;
  madrasah?: MadrasahConfig;
}

export const OtherLettersForm: React.FC<OtherLettersFormProps> = ({
  type,
  rekomendasiData,
  pengantarData,
  izinData,
  onChangeRekomendasi,
  onChangePengantar,
  onChangeIzin,
  madrasah,
}) => {
  if (type === 'rekomendasi') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide">
              Surat Rekomendasi Madrasah
            </h3>
            <p className="text-[11px] text-slate-500">
              Rekomendasi beasiswa, delegasi lomba KSM/Myres, atau studi lanjut
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div>
            <NomorSuratDropdown
              value={rekomendasiData.nomorSurat}
              onChange={(val) => onChangeRekomendasi({ ...rekomendasiData, nomorSurat: val })}
              defaultKlasifikasi="PP.00.2"
              label="Nomor Surat Rekomendasi"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Nama Siswa / Guru yang Direkomendasikan</label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              value={rekomendasiData.personelList[0]?.nama || ''}
              onChange={(e) => {
                const updated = [...rekomendasiData.personelList];
                if (updated[0]) updated[0].nama = e.target.value;
                onChangeRekomendasi({ ...rekomendasiData, personelList: updated });
              }}
              placeholder="Aisyah Putri Azzahra"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Keperluan Rekomendasi</label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              value={rekomendasiData.tujuanRekomendasi}
              onChange={(e) => onChangeRekomendasi({ ...rekomendasiData, tujuanRekomendasi: e.target.value })}
              placeholder="Mengikuti Kompetisi Sains Madrasah (KSM) Tingkat Provinsi"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Pertimbangan & Alasan Rekomendasi</label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              value={rekomendasiData.alasanRekomendasi}
              onChange={(e) => onChangeRekomendasi({ ...rekomendasiData, alasanRekomendasi: e.target.value })}
              placeholder="Berdasarkan hasil seleksi dan prestasi yang membanggakan..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'pengantar') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide">
              Surat Pengantar (SP Naskah Dinas)
            </h3>
            <p className="text-[11px] text-slate-500">
              Pengiriman berkas TPG, LPJ BOS, usulan akreditasi, atau naskah dinas ke Kankemenag/Kanwil
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div>
            <NomorSuratDropdown
              value={pengantarData.nomorSurat}
              onChange={(val) => onChangePengantar({ ...pengantarData, nomorSurat: val })}
              defaultKlasifikasi="PP.00.8"
              label="Nomor Surat Pengantar"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Tujuan Pengiriman (Yth.)</label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              value={pengantarData.tujuanYth}
              onChange={(e) => onChangePengantar({ ...pengantarData, tujuanYth: e.target.value })}
              placeholder="Kepala Seksi Pendidikan Madrasah Kankemenag"
            />
          </div>
        </div>

        {/* Tabel Berkas */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Daftar Berkas yang Dikirimkan</h4>
            <button
              type="button"
              onClick={() => {
                const newRow = {
                  id: 'sp-' + Date.now(),
                  no: pengantarData.daftarBerkas.length + 1,
                  naskah: '',
                  banyaknya: '1 (satu) Berkas',
                  keterangan: 'Disampaikan dengan hormat.',
                };
                onChangePengantar({ ...pengantarData, daftarBerkas: [...pengantarData.daftarBerkas, newRow] });
              }}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 uppercase"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Baris
            </button>
          </div>

          <div className="space-y-2">
            {pengantarData.daftarBerkas.map((item, idx) => (
              <div key={item.id || idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Item #{idx + 1}</span>
                  {pengantarData.daftarBerkas.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        onChangePengantar({
                          ...pengantarData,
                          daftarBerkas: pengantarData.daftarBerkas.filter((_, i) => i !== idx),
                        });
                      }}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Jenis naskah / berkas"
                  value={item.naskah}
                  onChange={(e) => {
                    const updated = [...pengantarData.daftarBerkas];
                    updated[idx].naskah = e.target.value;
                    onChangePengantar({ ...pengantarData, daftarBerkas: updated });
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Banyaknya (e.g. 1 Rangkap)"
                    value={item.banyaknya}
                    onChange={(e) => {
                      const updated = [...pengantarData.daftarBerkas];
                      updated[idx].banyaknya = e.target.value;
                      onChangePengantar({ ...pengantarData, daftarBerkas: updated });
                    }}
                  />
                  <input
                    type="text"
                    className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Keterangan"
                    value={item.keterangan}
                    onChange={(e) => {
                      const updated = [...pengantarData.daftarBerkas];
                      updated[idx].keterangan = e.target.value;
                      onChangePengantar({ ...pengantarData, daftarBerkas: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Izin / Cuti / Dispensasi
  const subJenis = izinData.subJenis || 'cuti_tahunan';
  const isCutiPegawai = [
    'cuti_tahunan',
    'cuti_sakit',
    'cuti_alasan_penting',
    'cuti_melahirkan',
    'cuti_besar',
    'izin_tidak_masuk',
  ].includes(subJenis);

  const applyCutiPreset = (presetKey: string) => {
    switch (presetKey) {
      case 'cuti_tahunan':
        onChangeIzin({
          ...izinData,
          subJenis: 'cuti_tahunan',
          nomorSurat: 'B-125/Ma.21.14/KP.08.1/09/2026',
          perihal: 'Pemberian Surat Izin Cuti Tahunan Pegawai / Guru',
          jenisCuti: 'Cuti Tahunan',
          alasanCuti: 'Menjalankan hak Cuti Tahunan Tahun 2026 untuk keperluan keluarga.',
          lamanyaCuti: '4 (empat) hari kerja',
          tanggalMulai: '2026-09-14',
          tanggalSelesai: '2026-09-17',
          alamatSelamaCuti: 'Jl. Perintis Kemerdekaan KM. 10 No. 45, Tamalanrea, Kota Makassar',
          teleponSelamaCuti: '0812-4123-4567',
          catatanCuti: 'Tugas pembelajaran selama masa cuti telah dialihkan dan dikoordinasikan dengan guru piket / pengganti.',
        });
        break;
      case 'cuti_umrah':
        onChangeIzin({
          ...izinData,
          subJenis: 'cuti_alasan_penting',
          nomorSurat: 'B-140/Ma.21.14/KP.08.3/09/2026',
          perihal: 'Surat Izin Cuti Karena Alasan Penting (Ibadah Umrah)',
          jenisCuti: 'Cuti Karena Alasan Penting',
          alasanCuti: 'Menunaikan Ibadah Umrah ke Tanah Suci Makkah dan Madinah bersama keluarga.',
          lamanyaCuti: '12 (dua belas) hari kerja',
          tanggalMulai: '2026-10-05',
          tanggalSelesai: '2026-10-18',
          alamatSelamaCuti: 'Makkah Al-Mukarramah & Madinah Al-Munawwarah, Arab Saudi',
          teleponSelamaCuti: '+966-501-234-567 / 0813-5566-7788',
          catatanCuti: 'Setelah selesai menjalankan ibadah umrah, yang bersangkutan wajib segera melapor dan aktif kembali bertugas di madrasah.',
        });
        break;
      case 'cuti_sakit':
        onChangeIzin({
          ...izinData,
          subJenis: 'cuti_sakit',
          nomorSurat: 'B-145/Ma.21.14/KP.08.2/09/2026',
          perihal: 'Pemberian Surat Izin Cuti Sakit',
          jenisCuti: 'Cuti Sakit',
          alasanCuti: 'Menjalani istirahat medis dan pemulihan kesehatan (terlampir Surat Keterangan Dokter).',
          lamanyaCuti: '5 (lima) hari kerja',
          tanggalMulai: '2026-09-07',
          tanggalSelesai: '2026-09-11',
          alamatSelamaCuti: 'Lingkungan Kalukuang, Kel. Balang Toa, Kec. Binamu, Kab. Jeneponto',
          teleponSelamaCuti: '0852-4455-6677',
          catatanCuti: 'Setelah masa istirahat sakit selesai, diharapkan dapat melampirkan surat keterangan sehat dan siap bertugas kembali.',
        });
        break;
      case 'cuti_melahirkan':
        onChangeIzin({
          ...izinData,
          subJenis: 'cuti_melahirkan',
          nomorSurat: 'B-150/Ma.21.14/KP.08.4/09/2026',
          perihal: 'Pemberian Surat Izin Cuti Melahirkan',
          jenisCuti: 'Cuti Melahirkan',
          alasanCuti: 'Menjalankan Cuti Melahirkan untuk kelahiran anak.',
          lamanyaCuti: '3 (tiga) bulan',
          tanggalMulai: '2026-09-15',
          tanggalSelesai: '2026-12-15',
          alamatSelamaCuti: 'Jl. Pahlawan No. 24, Kec. Binamu, Kab. Jeneponto',
          teleponSelamaCuti: '0821-9988-7766',
          catatanCuti: 'Selama menjalankan cuti melahirkan, hak penghasilan tetap diberikan sesuai dengan ketentuan perundang-undangan.',
        });
        break;
      case 'izin_tidak_masuk':
        onChangeIzin({
          ...izinData,
          subJenis: 'izin_tidak_masuk',
          nomorSurat: 'B-155/Ma.21.14/KP.08.5/09/2026',
          perihal: 'Pemberian Izin Tidak Masuk Bekerja Sementara',
          jenisCuti: 'Izin Tidak Masuk Kerja',
          alasanCuti: 'Menghadiri acara pernikahan saudara kandung dan mendampingi keluarga di luar kota.',
          lamanyaCuti: '2 (dua) hari kerja',
          tanggalMulai: '2026-09-18',
          tanggalSelesai: '2026-09-19',
          alamatSelamaCuti: 'Kel. Bontoala, Kota Makassar',
          teleponSelamaCuti: '0853-1122-3344',
          catatanCuti: 'Tugas harian selama izin diserahkan sementara kepada rekan kerja sejawat.',
        });
        break;
      case 'dispensasi_kegiatan':
        onChangeIzin({
          ...izinData,
          subJenis: 'dispensasi_kegiatan',
          nomorSurat: 'B-125/Ma.21.14/PP.00.2/09/2026',
          perihal: 'Dispensasi Meninggalkan Proses KBM untuk Mengikuti Lomba Porseni',
          namaKegiatan: 'Pekan Olahraga dan Seni Madrasah (PORSENI) 2026',
          waktuKegiatan: 'Rabu s.d. Jumat, 16 s.d. 18 September 2026',
          tempatKegiatan: 'Stadion Mini Turatea Jeneponto',
          penyelenggara: 'Kantor Kementerian Agama Kabupaten Jeneponto',
          alasanDispensasi: 'Diberikan izin dan dispensasi untuk tidak mengikuti Kegiatan Belajar Mengajar (KBM) di kelas dalam rangka mengikuti pertandingan olahraga.',
        });
        break;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide">
              Surat Izin / Cuti & Dispensasi
            </h3>
            <p className="text-[11px] text-slate-500">
              Cuti Tahunan, Sakit, Alasan Penting (Umrah), Melahirkan, Izin Kerja, atau Dispensasi Kegiatan
            </p>
          </div>
        </div>
      </div>

      {/* Sub Jenis Selector */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Pilih Format & Kategori Surat Izin / Cuti:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {[
            { key: 'cuti_tahunan', label: 'Cuti Tahunan ASN', sub: 'KP.08.1' },
            { key: 'cuti_alasan_penting', label: 'Cuti Alasan Penting / Umrah', sub: 'KP.08.3' },
            { key: 'cuti_sakit', label: 'Cuti Sakit Dokter', sub: 'KP.08.2' },
            { key: 'cuti_melahirkan', label: 'Cuti Melahirkan', sub: 'KP.08.4' },
            { key: 'izin_tidak_masuk', label: 'Izin Tidak Masuk Kerja', sub: 'KP.08.5' },
            { key: 'dispensasi_kegiatan', label: 'Dispensasi Siswa/Lomba', sub: 'PP.00.2' },
          ].map((item) => {
            const isSelected = subJenis === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onChangeIzin({ ...izinData, subJenis: item.key as any });
                }}
                className={`px-2.5 py-2 rounded-lg text-left text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="leading-tight">{item.label}</div>
                <div className="text-[10px] opacity-60 font-mono mt-0.5">{item.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Template Fill */}
      <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 text-xs flex flex-wrap items-center gap-1.5">
        <span className="font-bold text-emerald-800 text-[11px] uppercase tracking-wide mr-1">
          Draf Cepat:
        </span>
        <button
          type="button"
          onClick={() => applyCutiPreset('cuti_tahunan')}
          className="px-2 py-1 bg-white hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium"
        >
          Cuti Tahunan
        </button>
        <button
          type="button"
          onClick={() => applyCutiPreset('cuti_umrah')}
          className="px-2 py-1 bg-white hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium"
        >
          Cuti Umrah
        </button>
        <button
          type="button"
          onClick={() => applyCutiPreset('cuti_sakit')}
          className="px-2 py-1 bg-white hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium"
        >
          Cuti Sakit
        </button>
        <button
          type="button"
          onClick={() => applyCutiPreset('cuti_melahirkan')}
          className="px-2 py-1 bg-white hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium"
        >
          Cuti Melahirkan
        </button>
        <button
          type="button"
          onClick={() => applyCutiPreset('izin_tidak_masuk')}
          className="px-2 py-1 bg-white hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium"
        >
          Izin Tidak Masuk
        </button>
        <button
          type="button"
          onClick={() => applyCutiPreset('dispensasi_kegiatan')}
          className="px-2 py-1 bg-white hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium"
        >
          Dispensasi Lomba
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="space-y-3 text-xs sm:text-sm">
        <div>
          <NomorSuratDropdown
            value={izinData.nomorSurat}
            onChange={(val) => onChangeIzin({ ...izinData, nomorSurat: val })}
            defaultKlasifikasi="KP.08.1"
            label="Nomor Surat Izin / Cuti"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
            Perihal Surat
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
            value={izinData.perihal}
            onChange={(e) => onChangeIzin({ ...izinData, perihal: e.target.value })}
            placeholder="Pemberian Surat Izin Cuti Tahunan Pegawai / Guru"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">

        {isCutiPegawai ? (
          <>
            {/* Form Khusus Cuti Pegawai */}
            <div className="sm:col-span-2 pt-2 border-t border-slate-100">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Identitas Pegawai / Guru Pemohon
              </h4>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Nama Lengkap Pegawai & Gelar
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-semibold focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.namaPegawai || ''}
                onChange={(e) => onChangeIzin({ ...izinData, namaPegawai: e.target.value })}
                placeholder="Drs. H. Muhammad Arifin, M.Pd."
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                NIP Pegawai
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.nipPegawai || ''}
                onChange={(e) => onChangeIzin({ ...izinData, nipPegawai: e.target.value })}
                placeholder="197508142000031002"
              />
            </div>
            <div>
              <PangkatGolonganSelect
                label="Pangkat / Golongan Ruang"
                value={izinData.pangkatGolPegawai || ''}
                onChange={(val) => onChangeIzin({ ...izinData, pangkatGolPegawai: val })}
                placeholder="Pilih Pangkat / Golongan..."
              />
            </div>
            <div>
              <JabatanSelect
                label="Jabatan"
                value={izinData.jabatanPegawai || ''}
                onChange={(val) => onChangeIzin({ ...izinData, jabatanPegawai: val })}
                placeholder="Pilih Jabatan..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center justify-between">
                <span>Satuan Kerja</span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Mengikuti Kop Madrasah
                </span>
              </label>
              <input
                type="text"
                readOnly
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-100 text-slate-800 border border-slate-200 rounded-md font-semibold cursor-not-allowed select-none"
                value={madrasah?.unitKerja || izinData.unitKerjaPegawai || 'Madrasah'}
                title="Satuan kerja otomatis mengikuti nama Madrasah pada Kop Surat"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Otomatis diselaraskan dengan Nama Madrasah pada Kop Surat.
              </p>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Masa Kerja (Opsional)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.masaKerja || ''}
                onChange={(e) => onChangeIzin({ ...izinData, masaKerja: e.target.value })}
                placeholder="26 Tahun 06 Bulan"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Lamanya Cuti / Izin
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-semibold text-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.lamanyaCuti || ''}
                onChange={(e) => onChangeIzin({ ...izinData, lamanyaCuti: e.target.value })}
                placeholder="4 (empat) hari kerja"
              />
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-slate-100">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Periode & Alasan Cuti
              </h4>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Tanggal Mulai Cuti
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.tanggalMulai || ''}
                onChange={(e) => onChangeIzin({ ...izinData, tanggalMulai: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Tanggal Selesai Cuti
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.tanggalSelesai || ''}
                onChange={(e) => onChangeIzin({ ...izinData, tanggalSelesai: e.target.value })}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Alasan / Keperluan Cuti
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.alasanCuti || ''}
                onChange={(e) => onChangeIzin({ ...izinData, alasanCuti: e.target.value })}
                placeholder="Menjalankan hak Cuti Tahunan Tahun 2026 untuk keperluan keluarga..."
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Alamat Selama Menjalankan Cuti
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.alamatSelamaCuti || ''}
                onChange={(e) => onChangeIzin({ ...izinData, alamatSelamaCuti: e.target.value })}
                placeholder="Jl. Perintis Kemerdekaan KM. 10 No. 45 Makassar"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Nomor Kontak / Telepon / WA Selama Cuti
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.teleponSelamaCuti || ''}
                onChange={(e) => onChangeIzin({ ...izinData, teleponSelamaCuti: e.target.value })}
                placeholder="0812-4123-4567"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Catatan / Ketentuan Tambahan
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.catatanCuti || ''}
                onChange={(e) => onChangeIzin({ ...izinData, catatanCuti: e.target.value })}
                placeholder="Setelah masa cuti selesai, wajib segera melapor diri dan bertugas kembali sebagaimana mestinya."
              />
            </div>
          </>
        ) : (
          <>
            {/* Form Dispensasi Siswa / Kegiatan */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Nama Kegiatan / Lomba
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.namaKegiatan}
                onChange={(e) => onChangeIzin({ ...izinData, namaKegiatan: e.target.value })}
                placeholder="Pekan Olahraga dan Seni Madrasah (PORSENI)"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Waktu Pelaksanaan Kegiatan
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.waktuKegiatan}
                onChange={(e) => onChangeIzin({ ...izinData, waktuKegiatan: e.target.value })}
                placeholder="16 s.d. 18 September 2026"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Tempat Pelaksanaan
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.tempatKegiatan}
                onChange={(e) => onChangeIzin({ ...izinData, tempatKegiatan: e.target.value })}
                placeholder="Stadion Mini Turatea Jeneponto"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Penyelenggara Kegiatan
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.penyelenggara}
                onChange={(e) => onChangeIzin({ ...izinData, penyelenggara: e.target.value })}
                placeholder="Kantor Kementerian Agama Kabupaten Jeneponto"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Alasan / Penjelasan Dispensasi
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={izinData.alasanDispensasi}
                onChange={(e) => onChangeIzin({ ...izinData, alasanDispensasi: e.target.value })}
                placeholder="Diberikan izin dan dispensasi untuk tidak mengikuti Kegiatan Belajar Mengajar (KBM)..."
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
