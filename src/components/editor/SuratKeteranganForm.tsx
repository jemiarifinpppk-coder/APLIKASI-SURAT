import React from 'react';
import { SuratKeteranganData, AnggotaKeluargaKP4, PejabatPenandatangan } from '../../types/letter';
import {
  FileBadge,
  Hash,
  User,
  School,
  FileText,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  Users,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  Award,
  Smartphone,
  Clock,
} from 'lucide-react';
import { PangkatGolonganSelect } from '../common/PangkatGolonganSelect';
import { JabatanSelect } from '../common/JabatanSelect';
import { NomorSuratDropdown } from '../common/NomorSuratDropdown';
import { formatIndoDate } from '../../utils/dateHelpers';
import {
  SUB_JENIS_CONFIGS,
  DEFAULT_SKHU_PERNYATAAN,
  DEFAULT_KP4_PERNYATAAN,
  getKeteranganSubtitle,
  updateNomorKlasifikasi,
} from '../../utils/keteranganHelpers';

interface SuratKeteranganFormProps {
  data: SuratKeteranganData;
  onChange: (data: SuratKeteranganData) => void;
  onOpenCodePicker: () => void;
  penandatangan?: PejabatPenandatangan;
  onPenandatanganChange?: (pen: PejabatPenandatangan) => void;
}

export const SuratKeteranganForm: React.FC<SuratKeteranganFormProps> = ({
  data,
  onChange,
  onOpenCodePicker,
  penandatangan,
  onPenandatanganChange,
}) => {
  const updateField = (field: keyof SuratKeteranganData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateFields = (updates: Partial<SuratKeteranganData>) => {
    onChange({ ...data, ...updates });
  };

  const handleSubJenisChange = (newSubJenis: SuratKeteranganData['subJenis']) => {
    const config = SUB_JENIS_CONFIGS[newSubJenis];
    const newNomor = updateNomorKlasifikasi(data.nomorSurat, config?.defaultKlasifikasi || 'PP.00.4');

    if (newSubJenis === 'tidak_terbit_skhu') {
      onChange({
        ...data,
        subJenis: 'tidak_terbit_skhu',
        nomorSurat: newNomor,
        tujuanKeterangan: config.defaultTujuan,
        isiKeteranganTambahan: config.defaultPernyataan,
        tahunLulus: data.tahunLulus || '2023/2024',
        jurusan: '',
        judulKeteranganCustom: config.subtitle,
      });
    } else if (newSubJenis === 'kp4') {
      onChange({
        ...data,
        subJenis: 'kp4',
        nomorSurat: newNomor,
        judulKeteranganCustom: config.subtitle,
        hideKopSuratKP4: data.hideKopSuratKP4 !== undefined ? data.hideKopSuratKP4 : true,
        penomoranBKN: data.penomoranBKN !== undefined ? data.penomoranBKN : true,
        namaPegawai: data.namaPegawai || 'Ahmad Faisal, S.Pd.I.',
        nipPegawai: data.nipPegawai || '198507152011011008',
        tempatTglLahir: data.tempatTglLahir || 'Jeneponto, 15 Juli 1985',
        jenisKelamin: data.jenisKelamin || 'Laki-laki',
        agamaPegawai: data.agamaPegawai || 'Islam',
        statusKepegawaian: data.statusKepegawaian || 'PNS',
        jabatanPegawai: data.jabatanPegawai || 'Guru Ahli Muda / Guru Mapel',
        pangkatGolPegawai: data.pangkatGolPegawai || 'Penata Tk. I (III/d)',
        instansiOrtu: data.instansiOrtu || 'MTsN 3 Jeneponto',
        masaKerjaGolongan: data.masaKerjaGolongan || '12 Tahun 04 Bulan',
        gajiPokok: data.gajiPokok || 'Rp 3.550.000,-',
        alamatSiswa: data.alamatSiswa || 'Lingkungan Kalukuang, Kel. Balang Toa, Kec. Binamu',
        pekerjaanSampingan: data.pekerjaanSampingan || '-',
        penghasilanSampingan: data.penghasilanSampingan || '-',
        pensiunJanda: data.pensiunJanda || '-',
        jumlahAnakTanggungan: data.jumlahAnakTanggungan || '2',
        susunanKeluarga:
          data.susunanKeluarga && data.susunanKeluarga.length > 0
            ? data.susunanKeluarga
            : [
                {
                  id: '1',
                  nama: 'Hj. Maryam, S.Pd.',
                  tanggalLahir: '14-04-1988',
                  tanggalPerkawinan: '10-08-2010',
                  pekerjaanSekolah: 'Guru Honorer',
                  keterangan: 'Istri',
                },
                {
                  id: '2',
                  nama: 'Muhammad Fadhil Ramadhan',
                  tanggalLahir: '15-10-2012',
                  tanggalPerkawinan: '-',
                  pekerjaanSekolah: 'Pelajar SMP',
                  keterangan: 'AK',
                },
                {
                  id: '3',
                  nama: 'Nurfadilah Ramadhani',
                  tanggalLahir: '12-05-2016',
                  tanggalPerkawinan: '-',
                  pekerjaanSekolah: 'Siswa SD',
                  keterangan: 'AK',
                },
              ],
        tujuanKeterangan: config.defaultTujuan,
        isiKeteranganTambahan: '',
      });
    } else if (newSubJenis === 'diri_siswa') {
      onChange({
        ...data,
        subJenis: 'diri_siswa',
        nomorSurat: newNomor,
        judulKeteranganCustom: config.subtitle,
        namaSiswa: data.namaSiswa || 'AIDUL AKBAR',
        nisLocal: data.nisLocal || data.nisn || '0077416278',
        nisn: data.nisn || '0077416278',
        tempatTglLahir: data.tempatTglLahir || 'Jeneponto, 18-12-2007',
        jenisKelamin: data.jenisKelamin || 'Laki-laki',
        agamaSiswa: data.agamaSiswa || 'Islam',
        statusDalamKeluarga: data.statusDalamKeluarga || 'Anak kandung',
        anakKe: data.anakKe || '2 (dua)',
        alamatSiswa: data.alamatSiswa || 'Bangkala, Desa Tugisi',
        teleponSiswa: data.teleponSiswa || '-',
        sekolahAsal: data.sekolahAsal || 'SD NO 212 Parasangang Beru',
        diterimaDiKelas: data.diterimaDiKelas || data.kelas || '7 (tujuh)',
        diterimaTanggal: data.diterimaTanggal || '2020-07-13',
        namaAyah: data.namaAyah || 'Arifuddin',
        namaIbu: data.namaIbu || 'Sayuti / ICCA KR. MANIRA',
        alamatOrtu: data.alamatOrtu || data.alamatSiswa || 'Bangkala, Desa Tugisi',
        teleponOrtu: data.teleponOrtu || '-',
        pekerjaanAyah: data.pekerjaanAyah || 'Petani',
        pekerjaanIbu: data.pekerjaanIbu || 'IRT',
        namaWali: data.namaWali || '-',
        teleponWali: data.teleponWali || '-',
        pekerjaanWali: data.pekerjaanWali || '-',
        tujuanKeterangan: config.defaultTujuan,
        isiKeteranganTambahan: '',
        hideKopDiriSiswa: true,
      });
    } else if (newSubJenis === 'penghasilan_guru') {
      onChange({
        ...data,
        subJenis: 'penghasilan_guru',
        nomorSurat: newNomor,
        judulKeteranganCustom: config.subtitle,
        tujuanKeterangan: config.defaultTujuan,
        isiKeteranganTambahan: config.defaultPernyataan,
        namaPegawai: data.namaPegawai || 'Dra. Hj. Maryam, M.Pd.',
        nipPegawai: data.nipPegawai || '197605122002122001',
        pangkatGolPegawai: data.pangkatGolPegawai || 'Pembina (IV/a)',
        jabatanPegawai: data.jabatanPegawai || 'Guru Ahli Madya / Guru Mapel',
        gajiPokok: data.gajiPokok || 'Rp 3.550.000,-',
      });
    } else if (newSubJenis === 'lulus') {
      onChange({
        ...data,
        subJenis: 'lulus',
        nomorSurat: newNomor,
        judulKeteranganCustom: config.subtitle,
        tujuanKeterangan: config.defaultTujuan,
        isiKeteranganTambahan: config.defaultPernyataan,
        tahunLulus: data.tahunLulus || '2025/2026',
        kelas: data.kelas || 'IX (Sembilan)',
      });
    } else if (newSubJenis === 'kelakuan_baik') {
      onChange({
        ...data,
        subJenis: 'kelakuan_baik',
        nomorSurat: newNomor,
        judulKeteranganCustom: config.subtitle,
        tujuanKeterangan: config.defaultTujuan,
        isiKeteranganTambahan: config.defaultPernyataan,
      });
    } else if (newSubJenis === 'pindah_sekolah') {
      onChange({
        ...data,
        subJenis: 'pindah_sekolah',
        nomorSurat: newNomor,
        judulKeteranganCustom: config.subtitle,
        tujuanKeterangan: config.defaultTujuan,
        isiKeteranganTambahan: config.defaultPernyataan,
      });
    } else if (newSubJenis === 'beasiswa') {
      onChange({
        ...data,
        subJenis: 'beasiswa',
        nomorSurat: newNomor,
        judulKeteranganCustom: config.subtitle,
        tujuanKeterangan: config.defaultTujuan,
        isiKeteranganTambahan: config.defaultPernyataan,
      });
    } else if (newSubJenis === 'aplikasi_pusaka') {
      onChange({
        ...data,
        subJenis: 'aplikasi_pusaka',
        nomorSurat: newNomor,
        judulKeteranganCustom: '',
        sifatSurat: data.sifatSurat || 'Biasa',
        lampiranSurat: data.lampiranSurat || '-',
        halSurat: data.halSurat || 'Pemberitahuan gangguan Aplikasi PUSAKA',
        tujuanYth: data.tujuanYth || 'Seluruh ASN ( PNS dan PPPK ) Dalam Lingkup MTs Negeri 3 Jeneponto',
        hariTanggalGangguan: data.hariTanggalGangguan || 'Kamis, 01 Oktober 2026',
        waktuGangguan: data.waktuGangguan || '06.30 - 08.00',
        zonaWaktu: data.zonaWaktu || 'WITA',
        isiKeteranganTambahan: config.defaultPernyataan,
        tujuanKeterangan: config.defaultTujuan,
      });
    } else {
      // Default: aktif_siswa
      onChange({
        ...data,
        subJenis: 'aktif_siswa',
        nomorSurat: newNomor,
        judulKeteranganCustom: '',
        tujuanKeterangan: config ? config.defaultTujuan : data.tujuanKeterangan,
        isiKeteranganTambahan: config ? config.defaultPernyataan : data.isiKeteranganTambahan,
      });
    }
  };

  const applyGoalPreset = (goal: string) => {
    updateField('tujuanKeterangan', goal);
  };

  const resetPernyataanStandar = () => {
    const config = SUB_JENIS_CONFIGS[data.subJenis];
    if (config) {
      updateField('isiKeteranganTambahan', config.defaultPernyataan);
    }
  };

  const isSkhu = data.subJenis === 'tidak_terbit_skhu';
  const isKp4 = data.subJenis === 'kp4';
  const isDiriSiswa = data.subJenis === 'diri_siswa';
  const isPusaka = data.subJenis === 'aplikasi_pusaka';

  const susunanKeluarga: AnggotaKeluargaKP4[] =
    data.susunanKeluarga && data.susunanKeluarga.length > 0
      ? data.susunanKeluarga
      : [
          {
            id: '1',
            nama: 'Hj. Maryam, S.Pd.',
            tanggalLahir: '14-04-1988',
            tanggalPerkawinan: '10-08-2010',
            pekerjaanSekolah: 'Guru Honorer',
            keterangan: 'Istri',
          },
          {
            id: '2',
            nama: 'Muhammad Fadhil Ramadhan',
            tanggalLahir: '15-10-2012',
            tanggalPerkawinan: '-',
            pekerjaanSekolah: 'Pelajar SMP',
            keterangan: 'AK',
          },
          {
            id: '3',
            nama: 'Nurfadilah Ramadhani',
            tanggalLahir: '12-05-2016',
            tanggalPerkawinan: '-',
            pekerjaanSekolah: 'Siswa SD',
            keterangan: 'AK',
          },
        ];

  const addFamilyMember = () => {
    const newMember: AnggotaKeluargaKP4 = {
      id: Date.now().toString(),
      nama: '',
      tanggalLahir: '',
      tanggalPerkawinan: '-',
      pekerjaanSekolah: '',
      keterangan: 'AK',
    };
    const updated = [...susunanKeluarga, newMember];
    const countAnak = updated.filter((m) => ['AK', 'AT', 'AA'].includes(m.keterangan)).length;
    updateFields({
      susunanKeluarga: updated,
      jumlahAnakTanggungan: countAnak.toString(),
    });
  };

  const updateFamilyMember = (index: number, field: keyof AnggotaKeluargaKP4, val: string) => {
    const updated = [...susunanKeluarga];
    updated[index] = { ...updated[index], [field]: val };
    const updates: Partial<SuratKeteranganData> = { susunanKeluarga: updated };
    if (field === 'keterangan') {
      const countAnak = updated.filter((m) => ['AK', 'AT', 'AA'].includes(m.keterangan)).length;
      updates.jumlahAnakTanggungan = countAnak.toString();
    }
    updateFields(updates);
  };

  const removeFamilyMember = (index: number) => {
    const updated = susunanKeluarga.filter((_, idx) => idx !== index);
    const countAnak = updated.filter((m) => ['AK', 'AT', 'AA'].includes(m.keterangan)).length;
    updateFields({
      susunanKeluarga: updated,
      jumlahAnakTanggungan: countAnak.toString(),
    });
  };

  const daftarPegawaiPusaka = data.daftarPegawaiPusaka || [];

  const addPegawaiPusaka = () => {
    const newItem = {
      id: Date.now().toString(),
      nama: '',
      nip: '',
      jabatan: 'Guru Ahli Muda / Guru Mapel',
    };
    updateField('daftarPegawaiPusaka', [...daftarPegawaiPusaka, newItem]);
  };

  const updatePegawaiPusaka = (index: number, field: string, val: string) => {
    const updated = [...daftarPegawaiPusaka];
    updated[index] = { ...updated[index], [field]: val };
    updateField('daftarPegawaiPusaka', updated);
  };

  const removePegawaiPusaka = (index: number) => {
    const updated = daftarPegawaiPusaka.filter((_, idx) => idx !== index);
    updateField('daftarPegawaiPusaka', updated);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <FileBadge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wide">
              Surat Keterangan Madrasah
            </h3>
            <p className="text-[11px] text-slate-500">
              Keterangan siswa aktif, tidak diterbitkan SKHU/SKHUN, mutasi, kelakuan baik, atau penghasilan guru
            </p>
          </div>
        </div>
      </div>

      {/* Preset Cepat Sub-Jenis Keterangan */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Pilihan Cepat Template Keterangan
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handleSubJenisChange('aktif_siswa')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors ${
              data.subJenis === 'aktif_siswa'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="font-medium truncate">Siswa Aktif Belajar</div>
            <div className="text-[10px] text-slate-500 truncate">PIP / Bank / Beasiswa</div>
          </button>

          <button
            type="button"
            onClick={() => handleSubJenisChange('diri_siswa')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors relative ${
              data.subJenis === 'diri_siswa'
                ? 'bg-purple-50 border-purple-500 text-purple-950 font-semibold shadow-xs ring-1 ring-purple-400'
                : 'bg-purple-50/40 border-purple-200 text-purple-900 hover:bg-purple-50'
            }`}
          >
            <div className="flex items-center gap-1 font-medium truncate">
              <User className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>Keterangan Diri Siswa</span>
            </div>
            <div className="text-[10px] text-purple-700 font-medium truncate">Buku Induk / Rapor Siswa</div>
          </button>

          <button
            type="button"
            onClick={() => handleSubJenisChange('kp4')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors relative ${
              data.subJenis === 'kp4'
                ? 'bg-blue-50 border-blue-500 text-blue-950 font-semibold shadow-xs ring-1 ring-blue-400'
                : 'bg-blue-50/40 border-blue-200 text-blue-900 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center gap-1 font-medium truncate">
              <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Tunjangan Anak (KP4)</span>
            </div>
            <div className="text-[10px] text-blue-700 font-medium truncate">PNS / PPPK / SKUMPTK</div>
          </button>

          <button
            type="button"
            onClick={() => handleSubJenisChange('tidak_terbit_skhu')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors relative ${
              data.subJenis === 'tidak_terbit_skhu'
                ? 'bg-amber-50 border-amber-500 text-amber-950 font-semibold shadow-xs ring-1 ring-amber-400'
                : 'bg-amber-50/40 border-amber-200 text-amber-900 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-1 font-medium truncate">
              <GraduationCap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Tidak Diterbitkan SKHU</span>
            </div>
            <div className="text-[10px] text-amber-700 font-medium truncate">TNI / POLRI / Kedinasan</div>
          </button>

          <button
            type="button"
            onClick={() => handleSubJenisChange('kelakuan_baik')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors ${
              data.subJenis === 'kelakuan_baik'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="font-medium truncate">Kelakuan Baik</div>
            <div className="text-[10px] text-slate-500 truncate">Tata Tertib / Beasiswa</div>
          </button>

          <button
            type="button"
            onClick={() => handleSubJenisChange('lulus')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors ${
              data.subJenis === 'lulus'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="font-medium truncate">Lulus Sementara (SKL)</div>
            <div className="text-[10px] text-slate-500 truncate">Sebelum Ijazah Terbit</div>
          </button>

          <button
            type="button"
            onClick={() => handleSubJenisChange('pindah_sekolah')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors ${
              data.subJenis === 'pindah_sekolah'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="font-medium truncate">Pindah / Mutasi Siswa</div>
            <div className="text-[10px] text-slate-500 truncate">Surat Keterangan Keluar</div>
          </button>

          <button
            type="button"
            onClick={() => handleSubJenisChange('penghasilan_guru')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors ${
              data.subJenis === 'penghasilan_guru'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="font-medium truncate">Penghasilan Guru / GTT</div>
            <div className="text-[10px] text-slate-500 truncate">Bank / Pengajuan Kredit</div>
          </button>

          <button
            type="button"
            onClick={() => handleSubJenisChange('beasiswa')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors ${
              data.subJenis === 'beasiswa'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-1 font-medium truncate">
              <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Prestasi / Beasiswa</span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">Pengajuan Bantuan</div>
          </button>

          <button
            type="button"
            onClick={() => handleSubJenisChange('aplikasi_pusaka')}
            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition-colors relative ${
              data.subJenis === 'aplikasi_pusaka'
                ? 'bg-amber-50 border-amber-500 text-amber-950 font-semibold shadow-xs ring-1 ring-amber-400'
                : 'bg-amber-50/40 border-amber-200 text-amber-900 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-1 font-medium truncate">
              <Smartphone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Gangguan Aplikasi PUSAKA</span>
            </div>
            <div className="text-[10px] text-amber-700 font-medium truncate">Presensi ASN / PNS / PPPK</div>
          </button>
        </div>
      </div>

      {/* Section 1: Jenis & Nomor Surat */}
      <div>
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">
          1. Jenis & Nomor Surat Keterangan
        </h2>
        <div className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Jenis Surat Keterangan
            </label>
            <select
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
              value={data.subJenis}
              onChange={(e) => handleSubJenisChange(e.target.value as any)}
            >
              <option value="aktif_siswa">Surat Keterangan Siswa Aktif (PIP / Beasiswa / Bank)</option>
              <option value="diri_siswa">Keterangan Tentang Diri Siswa (Buku Induk / Rapor)</option>
              <option value="kp4">Surat Keterangan Masih Sekolah / KP4 (Tunjangan Anak Pegawai)</option>
              <option value="tidak_terbit_skhu">
                Surat Keterangan Tidak Diterbitkan SKHU / SKHUN (TNI/POLRI/Kedinasan/CPNS)
              </option>
              <option value="kelakuan_baik">Surat Keterangan Berkelakuan Baik</option>
              <option value="lulus">Surat Keterangan Lulus Sementara (SKL)</option>
              <option value="pindah_sekolah">Surat Keterangan Pindah / Mutasi Belajar</option>
              <option value="penghasilan_guru">Surat Keterangan Penghasilan Guru / GTT</option>
              <option value="beasiswa">Surat Keterangan Prestasi / Pengajuan Beasiswa</option>
              <option value="aplikasi_pusaka">Surat Keterangan Gangguan Presensi Aplikasi PUSAKA (ASN / PNS / PPPK)</option>
            </select>
          </div>

          <div>
            <NomorSuratDropdown
              value={data.nomorSurat}
              onChange={(val) => updateField('nomorSurat', val)}
              onOpenCodePicker={onOpenCodePicker}
              defaultKlasifikasi={SUB_JENIS_CONFIGS[data.subJenis]?.defaultKlasifikasi || 'PP.00.4'}
              label="Nomor Surat Keterangan"
            />
          </div>

          {/* Sub-Judul / Keterangan Khusus (Dikecualikan pada Diri Siswa, KP4 & PUSAKA karena memiliki format baku) */}
          {!isDiriSiswa && !isKp4 && !isPusaka && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                  Sub-Judul Surat Keterangan (Tampil di Bawah SURAT KETERANGAN)
                </label>
                <button
                  type="button"
                  onClick={() => updateField('judulKeteranganCustom', SUB_JENIS_CONFIGS[data.subJenis]?.subtitle || '')}
                  className="text-[10px] text-emerald-700 hover:text-emerald-900 font-medium underline cursor-pointer"
                >
                  Reset Standar Sub-Judul
                </button>
              </div>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={
                  data.judulKeteranganCustom !== undefined
                    ? data.judulKeteranganCustom
                    : SUB_JENIS_CONFIGS[data.subJenis]?.subtitle || ''
                }
                onChange={(e) => updateField('judulKeteranganCustom', e.target.value)}
                placeholder="Contoh: BERKELAKUAN BAIK, LULUS SEMENTARA (SKL), atau kosongkan jika hanya judul SURAT KETERANGAN..."
              />
              <p className="text-[10.5px] text-slate-500 mt-1">
                Teks ini akan otomatis dicetak dengan huruf kapital di lembar surat tepat di bawah tulisan utama <strong>SURAT KETERANGAN</strong>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Khusus Aplikasi PUSAKA Info Card */}
      {isPusaka && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3 text-xs text-amber-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <Smartphone className="w-4 h-4 text-amber-700" />
            <span>Format Surat Keterangan Gangguan Presensi Aplikasi PUSAKA Kemenag</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-900">
            Surat keterangan resmi pembuktian kendala teknis / gangguan server Aplikasi PUSAKA Kementerian Agama sebagai bukti sah presensi kedatangan dan kepulangan pegawai ASN (PNS & PPPK) MTsN 3 Jeneponto.
          </p>
        </div>
      )}

      {/* Khusus Diri Siswa Info Card */}
      {isDiriSiswa && (
        <div className="bg-purple-50/80 border border-purple-200 rounded-lg p-3 text-xs text-purple-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-purple-950">
            <User className="w-4 h-4 text-purple-700" />
            <span>Format Resmi Keterangan Tentang Diri Siswa (Buku Induk / Rapor Siswa)</span>
          </div>
          <p className="text-[11px] leading-relaxed text-purple-900">
            Dokumen lembar keterangan tentang diri siswa dengan logo Kementerian Agama di tengah, 16 butir data pokok, kotak pas foto 3x4, dan tanda tangan <strong>Kepala Madrasah yang otomatis disinkronkan dari data Pejabat Penandatangan</strong> aplikasi.
          </p>
        </div>
      )}

      {/* Khusus KP4 Info Card */}
      {isKp4 && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-blue-950">
            <Users className="w-4 h-4 text-blue-700" />
            <span>Format Surat Keterangan Masih Sekolah / Kuliah (Lampiran Tunjangan Anak / Model KP4)</span>
          </div>
          <p className="text-[11px] leading-relaxed text-blue-800">
            Digunakan oleh orang tua siswa yang berstatus Pegawai Negeri Sipil (PNS), PPPK, TNI, POLRI, BUMN, atau Pensiunan sebagai kelengkapan berkas <strong>Tunjangan Anak / Tunjangan Keluarga</strong> pada formulir Model KP4 / SKUMPTK.
          </p>
        </div>
      )}

      {/* Khusus SKHU Info Card */}
      {isSkhu && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <GraduationCap className="w-4 h-4 text-amber-700" />
            <span>Format Resmi Surat Keterangan Tidak Diterbitkan SKHU / SKHUN</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-800">
            Digunakan bagi alumni/lulusan madrasah untuk keperluan verifikasi berkas penerimaan <strong>TNI, POLRI, Sekolah Kedinasan, CPNS, PTN</strong>, atau instansi lain seiring kebijakan peniadaan Ujian Nasional (UN).
          </p>
        </div>
      )}

      {/* Field Siswa vs Guru vs Pusaka */}
      {isPusaka ? (
        <div className="space-y-4">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1.5 flex items-center justify-between">
            <span>2. Data & Waktu Gangguan Presensi Aplikasi PUSAKA</span>
            <span className="text-[10px] text-amber-800 bg-amber-100 font-semibold px-2 py-0.5 rounded">
              Format Resmi Kemenag
            </span>
          </h2>

          {/* Kolom Meta: Sifat, Lampiran, Hal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Sifat Surat
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                value={data.sifatSurat || 'Biasa'}
                onChange={(e) => updateField('sifatSurat', e.target.value)}
                placeholder="Biasa"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Lampiran
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                value={data.lampiranSurat || '-'}
                onChange={(e) => updateField('lampiranSurat', e.target.value)}
                placeholder="-"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Hal / Perihal
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                value={data.halSurat || 'Pemberitahuan gangguan Aplikasi PUSAKA'}
                onChange={(e) => updateField('halSurat', e.target.value)}
                placeholder="Pemberitahuan gangguan Aplikasi PUSAKA"
              />
              <div className="flex flex-wrap gap-1 mt-1">
                {[
                  'Pemberitahuan gangguan Aplikasi PUSAKA',
                  'Keterangan Gangguan Presensi PUSAKA',
                  'Kendala Teknis Presensi Online PUSAKA',
                ].map((txt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => updateField('halSurat', txt)}
                    className="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    + {txt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tujuan Yth */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
              Tujuan Surat (Kepada Yth.)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-amber-500 outline-none"
              value={data.tujuanYth || 'Seluruh ASN ( PNS dan PPPK ) Dalam Lingkup MTs Negeri 3 Jeneponto'}
              onChange={(e) => updateField('tujuanYth', e.target.value)}
              placeholder="Seluruh ASN ( PNS dan PPPK ) Dalam Lingkup MTs Negeri 3 Jeneponto"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {[
                'Seluruh ASN ( PNS dan PPPK ) Dalam Lingkup MTs Negeri 3 Jeneponto',
                'Seluruh Guru dan Tenaga Kependidikan',
                'Kepala Kantor Kementerian Agama',
              ].map((txt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => updateField('tujuanYth', txt)}
                  className="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  + {txt}
                </button>
              ))}
            </div>
          </div>

          {/* Hari & Tanggal Gangguan & Waktu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  Hari & Tanggal Gangguan
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const todayStr = new Intl.DateTimeFormat('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date());
                    updateField('hariTanggalGangguan', todayStr);
                  }}
                  className="text-[10px] text-amber-700 hover:text-amber-900 underline font-medium cursor-pointer"
                >
                  Set Hari Ini
                </button>
              </div>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                value={data.hariTanggalGangguan || 'Kamis, 01 Oktober 2026'}
                onChange={(e) => updateField('hariTanggalGangguan', e.target.value)}
                placeholder="Contoh: Kamis, 01 Oktober 2026"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Waktu Gangguan Presensi
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                  value={data.waktuGangguan || '06.30 - 08.00'}
                  onChange={(e) => updateField('waktuGangguan', e.target.value)}
                  placeholder="06.30 - 08.00"
                />
                <select
                  className="w-24 px-2 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  value={data.zonaWaktu || 'WITA'}
                  onChange={(e) => updateField('zonaWaktu', e.target.value)}
                >
                  <option value="WITA">WITA</option>
                  <option value="WIB">WIB</option>
                  <option value="WIT">WIT</option>
                </select>
              </div>
              {/* Preset Jam Cepat */}
              <div className="flex flex-wrap gap-1 mt-1.5">
                {[
                  { label: 'Pagi (06.30 - 08.00)', val: '06.30 - 08.00' },
                  { label: 'Sore (15.30 - 17.00)', val: '15.30 - 17.00' },
                  { label: 'Pagi & Sore', val: '06.30 - 08.00 & 16.00 - 17.00' },
                  { label: 'Seharian Penuh', val: '06.00 - 18.00' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => updateField('waktuGangguan', item.val)}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 transition-colors cursor-pointer"
                  >
                    + {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Opsi Pegawai Khusus (Opsional) */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-950 text-xs">
                  Daftar Pegawai Khusus (Opsional)
                </span>
                <p className="text-[10.5px] text-slate-500">
                  Secara baku surat ditujukan kepada <strong>Seluruh ASN (PNS dan PPPK)</strong>. Tambahkan baris pegawai jika ingin mencantumkan nama secara spesifik.
                </p>
              </div>
              <button
                type="button"
                onClick={addPegawaiPusaka}
                className="px-2.5 py-1 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-md flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Pegawai
              </button>
            </div>

            {daftarPegawaiPusaka.length > 0 && (
              <div className="space-y-2 pt-1">
                {daftarPegawaiPusaka.map((peg, idx) => (
                  <div
                    key={peg.id || idx}
                    className="p-2.5 bg-white border border-amber-200 rounded-md grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                  >
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-amber-500 outline-none"
                        value={peg.nama}
                        onChange={(e) => updatePegawaiPusaka(idx, 'nama', e.target.value)}
                        placeholder="Nama Pegawai..."
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-amber-500 outline-none font-mono"
                        value={peg.nip}
                        onChange={(e) => updatePegawaiPusaka(idx, 'nip', e.target.value)}
                        placeholder="NIP..."
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-amber-500 outline-none"
                        value={peg.jabatan}
                        onChange={(e) => updatePegawaiPusaka(idx, 'jabatan', e.target.value)}
                        placeholder="Jabatan..."
                      />
                    </div>
                    <div className="sm:col-span-1 text-right">
                      <button
                        type="button"
                        onClick={() => removePegawaiPusaka(idx)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer"
                        title="Hapus Pegawai"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : data.subJenis === 'penghasilan_guru' ? (
        <div>
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">
            2. Data Guru / Pegawai
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Nama Lengkap & Gelar</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.namaPegawai || ''}
                onChange={(e) => updateField('namaPegawai', e.target.value)}
                placeholder="Dra. Hj. Maryam, M.Pd."
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">NIP / NUPTK</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.nipPegawai || ''}
                onChange={(e) => updateField('nipPegawai', e.target.value)}
                placeholder="197605122002122001"
              />
            </div>
            <div>
              <PangkatGolonganSelect
                label="Pangkat / Golongan"
                value={data.pangkatGolPegawai || ''}
                onChange={(val) => updateField('pangkatGolPegawai', val)}
                placeholder="Pilih Pangkat / Golongan..."
              />
            </div>
            <div>
              <JabatanSelect
                label="Jabatan"
                value={data.jabatanPegawai || ''}
                onChange={(val) => updateField('jabatanPegawai', val)}
                placeholder="Pilih Jabatan Pegawai..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                Penghasilan / Gaji Pokok (Bulan Berjalan)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-bold text-emerald-950 focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.gajiPokok || ''}
                onChange={(e) => updateField('gajiPokok', e.target.value)}
                placeholder="Rp 3.550.000,-"
              />
            </div>
          </div>
        </div>
      ) : isKp4 ? (
        <div className="space-y-5">
          {/* Format Blanko KP4 Settings */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-3 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-950 uppercase tracking-wide flex items-center gap-1.5">
                <FileBadge className="w-4 h-4 text-blue-700" />
                Opsi Format Blanko KP4
              </span>
              <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-semibold">
                Model KP. 4 / SKUMPTK
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <label className="flex items-center gap-2 p-2 bg-white rounded border border-blue-200 cursor-pointer hover:bg-blue-50/50">
                <input
                  type="checkbox"
                  checked={data.hideKopSuratKP4 !== false}
                  onChange={(e) => updateField('hideKopSuratKP4', e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div>
                  <div className="font-medium text-slate-800 text-[11px]">Sembunyikan Kop Surat</div>
                  <div className="text-[10px] text-slate-500">Sesuai format blanko baku BKN / Kemenkeu</div>
                </div>
              </label>

              <label className="flex items-center gap-2 p-2 bg-white rounded border border-blue-200 cursor-pointer hover:bg-blue-50/50">
                <input
                  type="checkbox"
                  checked={data.penomoranBKN !== false}
                  onChange={(e) => updateField('penomoranBKN', e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div>
                  <div className="font-medium text-slate-800 text-[11px]">Gunakan Penomoran BKN (34-44 & m-o)</div>
                  <div className="text-[10px] text-slate-500">Nomor 34-44 & poin m-o formulir resmi</div>
                </div>
              </label>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-blue-900 mb-1">Judul Formulir Surat Keterangan</label>
              <input
                type="text"
                className="w-full px-3 py-1.5 text-xs bg-white border border-blue-200 rounded font-semibold text-blue-950 focus:ring-2 focus:ring-blue-500 outline-none"
                value={data.judulKeteranganCustom || 'UNTUK MENDAPATKAN PEMBAYARAN TUNJANGAN KELUARGA'}
                onChange={(e) => updateField('judulKeteranganCustom', e.target.value)}
              />
            </div>
          </div>

          {/* Section 2: Data Pegawai Pemohon Tunjangan (Poin 34-44) */}
          <div className="space-y-3">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center justify-between">
              <span>2. Data Pegawai Pemohon Tunjangan ({data.penomoranBKN !== false ? 'Poin 34-44' : 'Poin 1-11'})</span>
              <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-semibold uppercase">
                Pegawai / Guru
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Nama Lengkap Pegawai & Gelar
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-semibold focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.namaPegawai || ''}
                  onChange={(e) => updateField('namaPegawai', e.target.value)}
                  placeholder="Ahmad Faisal, S.Pd.I."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  NIP / NIK Pegawai
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.nipPegawai || ''}
                  onChange={(e) => updateField('nipPegawai', e.target.value)}
                  placeholder="198507152011011008"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Tempat, Tanggal Lahir
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.tempatTglLahir || ''}
                  onChange={(e) => updateField('tempatTglLahir', e.target.value)}
                  placeholder="Jeneponto, 15 Juli 1985"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Jenis Kelamin
                </label>
                <select
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.jenisKelamin || 'Laki-laki'}
                  onChange={(e) => updateField('jenisKelamin', e.target.value as any)}
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Agama
                </label>
                <select
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.agamaPegawai || 'Islam'}
                  onChange={(e) => updateField('agamaPegawai', e.target.value)}
                >
                  <option value="Islam">Islam</option>
                  <option value="Kristen Protestan">Kristen Protestan</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Khonghucu">Khonghucu</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Status Kepegawaian
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.statusKepegawaian || 'PNS'}
                  onChange={(e) => updateField('statusKepegawaian', e.target.value)}
                  placeholder="PNS / PPPK / CPNS"
                />
              </div>

              <div>
                <JabatanSelect
                  label="Jabatan Struktural / Fungsional"
                  value={data.jabatanPegawai || ''}
                  onChange={(val) => updateField('jabatanPegawai', val)}
                  placeholder="Pilih atau ketik jabatan..."
                />
              </div>

              <div>
                <PangkatGolonganSelect
                  label="Pangkat / Golongan Ruang"
                  value={data.pangkatGolPegawai || ''}
                  onChange={(val) => updateField('pangkatGolPegawai', val)}
                  placeholder="Pilih pangkat / golongan..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Pada Instansi / Satuan Kerja
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.instansiOrtu || ''}
                  onChange={(e) => updateField('instansiOrtu', e.target.value)}
                  placeholder="MTsN 3 Jeneponto"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Masa Kerja Golongan
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.masaKerjaGolongan || '12 Tahun 04 Bulan'}
                  onChange={(e) => updateField('masaKerjaGolongan', e.target.value)}
                  placeholder="12 Tahun 04 Bulan"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Gaji Pokok
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.gajiPokok || 'Rp. 3.550.000,-'}
                  onChange={(e) => updateField('gajiPokok', e.target.value)}
                  placeholder="Rp. 3.550.000,-"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Alamat / Tempat Tinggal
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.alamatSiswa || ''}
                  onChange={(e) => updateField('alamatSiswa', e.target.value)}
                  placeholder="Lingkungan Kalukuang, Kel. Balang Toa, Kec. Binamu"
                />
              </div>
            </div>
          </div>

          {/* Section 2b: Keterangan Sampingan & Pensiun (Poin m & n) */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-3 space-y-3">
            <h2 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center justify-between">
              <span>Keterangan Pekerjaan Sampingan & Pensiun (Poin m & n)</span>
              <span className="text-[10px] text-slate-500 font-normal">Isi &apos;-&apos; jika tidak ada</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  m. Pekerjaan Sampingan
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.pekerjaanSampingan || '-'}
                  onChange={(e) => updateField('pekerjaanSampingan', e.target.value)}
                  placeholder="-"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Penghasilan Sampingan / Bulan
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.penghasilanSampingan || '-'}
                  onChange={(e) => updateField('penghasilanSampingan', e.target.value)}
                  placeholder="-"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  n. Pensiun / Pensiun Janda
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.pensiunJanda || '-'}
                  onChange={(e) => updateField('pensiunJanda', e.target.value)}
                  placeholder="-"
                />
              </div>
            </div>
          </div>

          {/* Section 2c: Susunan Keluarga (Poin o - Tabel Isteri/Suami/Anak Tanggungan) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Susunan Keluarga Tanggungan (Poin o)</span>
                <span className="text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-semibold ml-1">
                  {susunanKeluarga.length} Jiwa
                </span>
              </h2>
              <button
                type="button"
                onClick={addFamilyMember}
                className="text-xs px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium flex items-center gap-1 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Anggota Keluarga
              </button>
            </div>

            {/* List Anggota Keluarga */}
            <div className="space-y-2.5">
              {susunanKeluarga.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-2 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{item.nama || `Anggota Keluarga #${idx + 1}`}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFamilyMember(idx)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Hapus baris"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                    <div className="lg:col-span-2">
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5 uppercase">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-medium focus:ring-1 focus:ring-blue-500 outline-none"
                        value={item.nama}
                        onChange={(e) => updateFamilyMember(idx, 'nama', e.target.value)}
                        placeholder="Nama isteri / suami / anak"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5 uppercase">
                        Tgl Kelahiran
                      </label>
                      <input
                        type="text"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-mono focus:ring-1 focus:ring-blue-500 outline-none"
                        value={item.tanggalLahir}
                        onChange={(e) => updateFamilyMember(idx, 'tanggalLahir', e.target.value)}
                        placeholder="14-04-1988"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5 uppercase">
                        Tgl Perkawinan
                      </label>
                      <input
                        type="text"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-mono focus:ring-1 focus:ring-blue-500 outline-none"
                        value={item.tanggalPerkawinan}
                        onChange={(e) => updateFamilyMember(idx, 'tanggalPerkawinan', e.target.value)}
                        placeholder="10-08-2010 atau -"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5 uppercase">
                        Status / Keterangan
                      </label>
                      <select
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded font-semibold text-blue-900 focus:ring-1 focus:ring-blue-500 outline-none"
                        value={item.keterangan}
                        onChange={(e) => updateFamilyMember(idx, 'keterangan', e.target.value)}
                      >
                        <option value="Istri">Istri</option>
                        <option value="Suami">Suami</option>
                        <option value="AK">AK (Anak Kandung)</option>
                        <option value="AT">AT (Anak Tiri)</option>
                        <option value="AA">AA (Anak Angkat)</option>
                      </select>
                    </div>

                    <div className="lg:col-span-5">
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5 uppercase">
                        Pekerjaan / Sekolah
                      </label>
                      <input
                        type="text"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                        value={item.pekerjaanSekolah}
                        onChange={(e) => updateFamilyMember(idx, 'pekerjaanSekolah', e.target.value)}
                        placeholder="Guru Honorer / Pelajar SMP / Siswa SD / Belum Bekerja"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Anak Tanggungan Field */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-950 font-medium">
                Jumlah anak seluruhnya yang menjadi tanggungan:
                <span className="text-[11px] text-slate-500 block font-normal">
                  Termasuk anak yang tidak masuk dalam daftar gaji
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="w-16 px-2.5 py-1.5 text-xs bg-white border border-blue-300 rounded font-bold text-center text-blue-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={
                    data.jumlahAnakTanggungan ||
                    susunanKeluarga.filter((m) => ['AK', 'AT', 'AA'].includes(m.keterangan)).length.toString()
                  }
                  onChange={(e) => updateField('jumlahAnakTanggungan', e.target.value)}
                />
                <span className="text-xs text-slate-700 font-medium">Orang</span>
              </div>
            </div>
          </div>
        </div>
      ) : isDiriSiswa ? (
        <div className="space-y-5">
          {/* Pejabat Penandatangan Sync Info Banner & Titimangsa */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-950 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-bold text-emerald-900">Kepala Madrasah & Titimangsa Surat:</span>
                  <p className="text-[11px] text-emerald-800">
                    Pejabat: <strong>{penandatangan?.nama || 'Kepala Madrasah'}</strong> ({penandatangan?.nip ? `NIP. ${penandatangan.nip}` : 'Pejabat Penandatangan'})
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded self-start sm:self-auto">
                  Tersinkronisasi 100%
                </span>
              </div>

              {penandatangan && onPenandatanganChange && (
                <div className="pt-2 border-t border-emerald-200/70 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" /> Tempat Penetapan
                    </label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-emerald-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-medium"
                      value={penandatangan.tempatPenetapan ?? ''}
                      onChange={(e) => onPenandatanganChange({ ...penandatangan, tempatPenetapan: e.target.value })}
                      placeholder="Jeneponto"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-600" /> Tanggal Penetapan
                      </label>
                      <button
                        type="button"
                        onClick={() => onPenandatanganChange({ ...penandatangan, tanggalPenetapan: new Date().toISOString().split('T')[0] })}
                        className="text-[10px] text-emerald-700 hover:text-emerald-900 underline font-semibold cursor-pointer"
                      >
                        Set Hari Ini
                      </button>
                    </div>
                    <input
                      type="date"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-emerald-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-medium"
                      value={penandatangan.tanggalPenetapan ?? ''}
                      onChange={(e) => onPenandatanganChange({ ...penandatangan, tanggalPenetapan: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-wide mb-1 flex items-center gap-1">
                      Jabatan di Penetapan
                    </label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-emerald-300 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-medium"
                      value={penandatangan.jabatan && penandatangan.jabatan !== 'Kepala Madrasah' ? penandatangan.jabatan : 'Kepala MTsN 3 Jeneponto'}
                      onChange={(e) => onPenandatanganChange({ ...penandatangan, jabatan: e.target.value })}
                      placeholder="Kepala MTsN 3 Jeneponto"
                    />
                  </div>

                  <div className="sm:col-span-3 text-[10.5px] text-emerald-800 bg-white/60 px-2 py-1 rounded border border-emerald-100 flex flex-wrap items-center justify-between gap-1">
                    <span>Tertera pada naskah tanda tangan:</span>
                    <strong className="text-emerald-950 font-bold">
                      {penandatangan.tempatPenetapan || 'Jeneponto'}, {formatIndoDate(penandatangan.tanggalPenetapan)} • {penandatangan.jabatan && penandatangan.jabatan !== 'Kepala Madrasah' ? penandatangan.jabatan : 'Kepala MTsN 3 Jeneponto'}
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Identitas Diri Siswa (Poin 1 - 9) */}
          <div className="space-y-3">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center justify-between">
              <span>2. Identitas Diri Siswa (Poin 1 - 9)</span>
              <span className="text-[10px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded font-semibold uppercase">
                Buku Induk / Rapor
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  1. Nama Siswa (Lengkap)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.namaSiswa || ''}
                  onChange={(e) => updateField('namaSiswa', e.target.value)}
                  placeholder="AIDUL AKBAR"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  2. Nomor Induk Siswa Nasional (NISN)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.nisn ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!data.nisLocal || data.nisLocal === data.nisn) {
                      updateFields({
                        nisn: val,
                        nisLocal: val,
                      });
                    } else {
                      updateField('nisn', val);
                    }
                  }}
                  placeholder="Contoh: 0077416278"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">10 digit nomor NISN resmi siswa</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Nomor Induk Siswa Lokal (NIS Madrasah)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.nisLocal ?? ''}
                  onChange={(e) => updateField('nisLocal', e.target.value)}
                  placeholder="Contoh: 1234 (opsional jika sama dengan NISN)"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Nomor buku induk lokal (jika berbeda dari NISN)</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  3. Tempat, Tanggal Lahir
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.tempatTglLahir || ''}
                  onChange={(e) => updateField('tempatTglLahir', e.target.value)}
                  placeholder="Jeneponto, 18-12-2007"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  4. Jenis Kelamin
                </label>
                <select
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.jenisKelamin || 'Laki-laki'}
                  onChange={(e) => updateField('jenisKelamin', e.target.value as any)}
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  5. Agama
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.agamaSiswa ?? ''}
                  onChange={(e) => updateField('agamaSiswa', e.target.value)}
                  placeholder="Islam"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  6. Status dalam Keluarga
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.statusDalamKeluarga !== undefined ? data.statusDalamKeluarga : (data.statusAnak ?? '')}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      ...data,
                      statusDalamKeluarga: val,
                      statusAnak: val,
                    });
                  }}
                  placeholder="Anak kandung / Anak tiri"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  7. Anak ke
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.anakKe ?? ''}
                  onChange={(e) => updateField('anakKe', e.target.value)}
                  placeholder="2 (dua)"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  8. Alamat Siswa
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.alamatSiswa || ''}
                  onChange={(e) => updateField('alamatSiswa', e.target.value)}
                  placeholder="Bangkala, Desa Tugisi"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  9. Nomor Telepon Rumah
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.teleponSiswa ?? ''}
                  onChange={(e) => updateField('teleponSiswa', e.target.value)}
                  placeholder="-"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Riwayat Penerimaan (Poin 10 - 11) */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-3 space-y-3">
            <h2 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              Riwayat Pendidikan & Penerimaan di Madrasah (Poin 10 - 11)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  10. Sekolah Asal (SD / MI)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.sekolahAsal || ''}
                  onChange={(e) => updateField('sekolahAsal', e.target.value)}
                  placeholder="SD NO 212 Parasangang Beru"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  11. Diterima di Kelas
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.diterimaDiKelas !== undefined ? data.diterimaDiKelas : (data.kelas ?? '')}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateFields({
                      diterimaDiKelas: val,
                      kelas: val,
                    });
                  }}
                  placeholder="Contoh: 7 (tujuh)"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Pada Tanggal
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.diterimaTanggal ?? ''}
                  onChange={(e) => updateField('diterimaTanggal', e.target.value)}
                  placeholder="Contoh: 13 Juli 2020 atau 2020-07-13"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Data Orang Tua & Wali (Poin 12 - 16) */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-3 space-y-3">
            <h2 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              Data Orang Tua & Wali Siswa (Poin 12 - 16)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  12a. Nama Ayah
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.namaAyah ?? ''}
                  onChange={(e) => updateField('namaAyah', e.target.value)}
                  placeholder="Arifuddin"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  12b. Nama Ibu
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.namaIbu ?? ''}
                  onChange={(e) => updateField('namaIbu', e.target.value)}
                  placeholder="Sayuti / ICCA KR. MANIRA"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  13. Alamat Orang Tua
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.alamatOrtu !== undefined ? data.alamatOrtu : (data.alamatSiswa ?? '')}
                  onChange={(e) => updateField('alamatOrtu', e.target.value)}
                  placeholder="Bangkala, Desa Tugisi"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  Nomor Telepon Rumah Ortu
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.teleponOrtu ?? ''}
                  onChange={(e) => updateField('teleponOrtu', e.target.value)}
                  placeholder="-"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  14a. Pekerjaan Ayah
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.pekerjaanAyah ?? ''}
                  onChange={(e) => updateField('pekerjaanAyah', e.target.value)}
                  placeholder="Petani"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  14b. Pekerjaan Ibu
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.pekerjaanIbu ?? ''}
                  onChange={(e) => updateField('pekerjaanIbu', e.target.value)}
                  placeholder="IRT"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  15. Nama Wali Siswa (Jika Ada)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.namaWali ?? ''}
                  onChange={(e) => updateField('namaWali', e.target.value)}
                  placeholder="-"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                  16. Pekerjaan Wali Siswa
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.pekerjaanWali ?? ''}
                  onChange={(e) => updateField('pekerjaanWali', e.target.value)}
                  placeholder="-"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Pas Foto Siswa (3x4) */}
          <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-3 space-y-2">
            <h2 className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center justify-between">
              <span>Pas Foto Siswa (3 x 4)</span>
              <span className="text-[10px] text-purple-700 font-normal">Opsional (bisa diisi URL foto atau biarkan kosong)</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-[28mm] h-[36mm] border border-slate-300 rounded bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                {data.pasFotoUrl ? (
                  <img src={data.pasFotoUrl} alt="Preview Foto" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[9px] text-slate-400 font-medium text-center">Kotak Foto 3x4</span>
                )}
              </div>
              <div className="flex-1 w-full space-y-1.5">
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                  value={data.pasFotoUrl || ''}
                  onChange={(e) => updateField('pasFotoUrl', e.target.value)}
                  placeholder="Tempel tautan URL gambar foto siswa (jika ingin ditampilkan otomatis)..."
                />
                <p className="text-[10.5px] text-slate-500">
                  Bila dikosongkan, dokumen akan mencetak kotak pembatas resmi bertuliskan <em>&apos;Pas Foto 3 x 4&apos;</em> untuk ditempel pas foto fisik secara manual.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5 flex items-center justify-between">
            <span>2. Data {isSkhu ? 'Alumni / Pemohon' : 'Siswa / Peserta Didik'}</span>
            {isSkhu && (
              <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-semibold uppercase">
                Alumni Madrasah
              </span>
            )}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                Nama Lengkap Siswa / Alumni
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.namaSiswa}
                onChange={(e) => updateField('namaSiswa', e.target.value)}
                placeholder="Muhammad Fadhil Ramadhan"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                NISN (Nasional)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.nisn || ''}
                onChange={(e) => updateField('nisn', e.target.value)}
                placeholder="Input manual NISN..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                NIS (Lokal Madrasah)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.nisLocal || ''}
                onChange={(e) => updateField('nisLocal', e.target.value)}
                placeholder="Input manual NIS..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Tempat, Tanggal Lahir</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.tempatTglLahir}
                onChange={(e) => updateField('tempatTglLahir', e.target.value)}
                placeholder="Jeneponto, 15 Oktober 2008"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Jenis Kelamin</label>
              <select
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.jenisKelamin}
                onChange={(e) => updateField('jenisKelamin', e.target.value as any)}
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {isSkhu ? (
              <>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-amber-900 mb-1 uppercase tracking-wide flex items-center justify-between">
                    <span>Tahun Kelulusan</span>
                    <span className="text-[10px] text-amber-700 font-normal">Contoh: 2023/2024</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-amber-50/50 border border-amber-300 rounded-md font-medium text-amber-950 focus:ring-2 focus:ring-amber-500 outline-none transition-colors"
                    value={data.tahunLulus || '2023/2024'}
                    onChange={(e) => updateField('tahunLulus', e.target.value)}
                    placeholder="2023/2024"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    Nomor Seri Ijazah (Opsional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                    value={data.nomorIjazah || ''}
                    onChange={(e) => updateField('nomorIjazah', e.target.value)}
                    placeholder="MA-21/14/0018924 (Jika ada)"
                  />
                </div>
              </>
            ) : data.subJenis === 'lulus' ? (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    Kelas Terakhir
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                    value={data.kelas}
                    onChange={(e) => updateField('kelas', e.target.value)}
                    placeholder="IX (Sembilan)"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">
                    Tahun Kelulusan
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                    value={data.tahunLulus || '2025/2026'}
                    onChange={(e) => updateField('tahunLulus', e.target.value)}
                    placeholder="2025/2026"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Kelas & Jurusan</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                  value={data.kelas}
                  onChange={(e) => updateField('kelas', e.target.value)}
                  placeholder="XI MIPA 1"
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Nama Orang Tua / Wali</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.namaOrtu}
                onChange={(e) => updateField('namaOrtu', e.target.value)}
                placeholder="H. Bachtiar Rauf"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide">Alamat Tempat Tinggal</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.alamatSiswa}
                onChange={(e) => updateField('alamatSiswa', e.target.value)}
                placeholder="Lingkungan Kalukuang, Kel. Balang Toa, Kec. Binamu"
              />
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Maksud Keterangan (Dikecualikan untuk Diri Siswa karena berformat formulir data pokok 16 poin) */}
      {!isDiriSiswa && (
        <div>
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5 flex items-center justify-between">
            <span>
              {isPusaka
                ? '3. Redaksi Pernyataan & Kalimat Penutup Surat'
                : '3. Maksud & Pernyataan Keterangan'}
            </span>
            {isPusaka && (
              <span className="text-[10px] text-amber-800 bg-amber-100 font-semibold px-2 py-0.5 rounded">
                Format Aplikasi PUSAKA
              </span>
            )}
          </h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wide flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  {isPusaka
                    ? 'Kalimat Penutup Dokumen Keterangan'
                    : 'Keperluan / Tujuan Surat Keterangan'}
                </span>
                {(isSkhu || isKp4 || isPusaka) && (
                  <span className="text-[10px] text-slate-400 font-normal">
                    Klik pilihan cepat di bawah untuk mengisi
                  </span>
                )}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.tujuanKeterangan}
                onChange={(e) => updateField('tujuanKeterangan', e.target.value)}
                placeholder={
                  SUB_JENIS_CONFIGS[data.subJenis]?.defaultTujuan ||
                  (isPusaka
                    ? 'Demikian surat pemberitahuan ini kami sampaikan untuk digunakan sebagai keterangan gangguan absensi...'
                    : 'Keperluan pemberian surat keterangan...')
                }
              />

              {/* Dynamic Quick Chips for Tujuan Keterangan based on active subJenis */}
              {SUB_JENIS_CONFIGS[data.subJenis]?.tujuanSuggestions &&
                SUB_JENIS_CONFIGS[data.subJenis].tujuanSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {SUB_JENIS_CONFIGS[data.subJenis].tujuanSuggestions.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => applyGoalPreset(preset)}
                        className={`text-[10px] px-2 py-0.5 rounded transition-colors text-left cursor-pointer font-medium border ${
                          isPusaka
                            ? 'bg-amber-50/70 text-amber-900 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
                            : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border-slate-200'
                        }`}
                      >
                        + {preset.length > 60 ? preset.slice(0, 58) + '...' : preset}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                  {isPusaka
                    ? 'Kalimat Pembuka / Alasan Gangguan Server PUSAKA'
                    : 'Isi Pernyataan Keterangan'}
                </label>
                <button
                  type="button"
                  onClick={resetPernyataanStandar}
                  className="text-[10px] text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-semibold cursor-pointer underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Redaksi Standar ({SUB_JENIS_CONFIGS[data.subJenis]?.label || 'Keterangan'})
                </button>
              </div>
              <textarea
                rows={isSkhu || isKp4 || isPusaka ? 4 : 3}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                value={data.isiKeteranganTambahan}
                onChange={(e) => updateField('isiKeteranganTambahan', e.target.value)}
                placeholder={
                  SUB_JENIS_CONFIGS[data.subJenis]?.defaultPernyataan ||
                  'Tuliskan isi pernyataan surat keterangan...'
                }
              />
              {isPusaka && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {[
                    {
                      label: 'Gangguan Presensi Umum',
                      text: 'Sehubungan adanya gangguan pada Aplikasi PUSAKA Kemenag maka beberapa pegawai tidak bisa melakukan presensi kedatangan/kepulangan sebagaimana seharusnya. Gangguan yang dimaksud terjadi pada :',
                    },
                    {
                      label: 'Maintenance Server Pusat',
                      text: 'Sehubungan dengan adanya pemeliharaan sistem (maintenance) server pusat SuperApps PUSAKA Kementerian Agama RI pada waktu jam presensi, maka pegawai tidak dapat melakukan rekam kehadiran secara digital pada :',
                    },
                    {
                      label: 'Kendala Jaringan / GPS',
                      text: 'Sehubungan dengan kendala teknis jaringan internet dan error pada radius titik koordinat lokasi di aplikasi PUSAKA, pegawai bersangkutan tidak dapat melakukan presensi kedatangan pada :',
                    },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => updateField('isiKeteranganTambahan', preset.text)}
                      className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>
              )}
              <p className="text-[10.5px] text-slate-500 mt-1">
                Tip: Pisahkan paragraf dengan menekan <em>Enter</em> dua kali agar format naskah rapi secara otomatis.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
