export type LetterType = 
  | 'surat_tugas'
  | 'sk'
  | 'undangan'
  | 'keterangan'
  | 'rekomendasi'
  | 'pengantar'
  | 'izin_dispensasi';

export type PaperSize = 'a4' | 'f4' | 'letter';

export interface MadrasahConfig {
  kementerian: string;
  satkerUtama: string; // e.g., Kantor Kementerian Agama Kabupaten Jeneponto
  unitKerja: string;   // e.g., Madrasah Aliyah Negeri (MAN) 1 Jeneponto
  nsm?: string;        // Nomor Statistik Madrasah
  npsn?: string;       // NPSN
  akreditasi?: string; // A / B / Unggul
  alamatKontak: string; // Jl. Lanto Dg. Pasewang No. 123 Jeneponto
  telepon: string;
  email: string;
  website: string;
  kodePos: string;
  kabupatenKota: string; // Jeneponto
  provinsi: string;      // Sulawesi Selatan
  logoType: 'kemenag_standard' | 'kemenag_monochrome' | 'custom' | 'dual';
  customLogoUrl?: string;
  secondaryLogoUrl?: string;
  logoSize?: 'sm' | 'md' | 'lg';
  fontFamily: 'bookman' | 'times' | 'arial' | 'lora';
  paperSize?: PaperSize;
  marginPreset?: 'standar' | 'kompak' | 'lebar';
  contentDensity?: 'standar' | 'rapat';
  nomorUrutSurat?: string; // e.g., 'B.001'
  tahunSurat?: string;     // e.g., '2026'
  kodeSatkerNomor?: string;// e.g., 'Ma.21.14'
  bulanSurat?: string;     // e.g., '09'
}

export interface Personnel {
  id: string;
  nama: string;
  nip: string;
  pangkatGol: string;
  jabatan: string;
  keterangan?: string;
}

export interface SuratTugasData {
  nomorSurat: string;
  kodeKlasifikasi: string;
  perihal: string;
  dasarTugas: string[];
  personelList: Personnel[];
  maksudTugas: string;
  tempatTugas: string;
  waktuTugas: string;
  tanggalMulai?: string;
  tanggalSelesai?: string;
  anggaranTugas: string;
  klausulPenutup: string;
}

export interface DiktumSK {
  id: string;
  key: string; // KESATU, KEDUA, KETIGA, etc.
  title: string;
  content: string;
}

export interface SKPegawaiItem {
  id: string;
  nama: string;
  nip?: string;
  pangkatGol?: string;
  jabatan?: string;
  tugas?: string;
  bebanJam?: string;
  keterangan?: string;
}

export interface SuratKeputusanData {
  nomorSK: string;
  tahunSK: string;
  tentangSK: string;
  menimbang: string[];
  mengingat: string[];
  memperhatikan: string[];
  diktumList: DiktumSK[];
  hasLampiran: boolean;
  judulLampiran?: string;
  lampiranSubJudul?: string;
  lampiranColumns?: string[];
  lampiranData?: Array<{ [key: string]: string }>;
  lampiranPegawaiList?: SKPegawaiItem[];
}

export interface SuratUndanganData {
  nomorSurat: string;
  sifat: 'Biasa' | 'Penting' | 'Segera' | 'Sangat Segera' | 'Rahasia';
  lampiran: string;
  hal: string;
  penerimaList: string[];
  hariTanggal: string;
  waktu: string;
  tempat: string;
  acara: string;
  catatan?: string;
  dresscode?: string;
  narahubung?: string;
}

export interface AnggotaKeluargaKP4 {
  id: string;
  nama: string;
  tanggalLahir: string;
  tanggalPerkawinan: string;
  pekerjaanSekolah: string;
  keterangan: string; // 'AK' | 'AT' | 'AA' | 'Suami' | 'Istri' | string
}

export interface SuratKeteranganData {
  nomorSurat: string;
  subJenis:
    | 'aktif_siswa'
    | 'kelakuan_baik'
    | 'pindah_sekolah'
    | 'penghasilan_guru'
    | 'lulus'
    | 'beasiswa'
    | 'tidak_terbit_skhu'
    | 'kp4'
    | 'diri_siswa'
    | 'aplikasi_pusaka';
  // Data Siswa / Alumni
  namaSiswa: string;
  nisn: string;
  nisLocal: string;
  tempatTglLahir: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  kelas: string;
  jurusan: string;
  namaOrtu: string;
  alamatSiswa: string;
  tahunLulus?: string;
  nomorIjazah?: string;
  judulKeteranganCustom?: string;
  // Data Tambahan untuk Keterangan Tentang Diri Siswa (Buku Induk / Rapor Madrasah)
  agamaSiswa?: string;
  statusDalamKeluarga?: string; // e.g. Anak kandung / Anak tiri / Anak angkat
  anakKe?: string; // e.g. 2 (dua)
  teleponSiswa?: string;
  sekolahAsal?: string; // e.g. SD NO 212 Parasangang Beru
  diterimaDiKelas?: string; // e.g. 7 (tujuh)
  diterimaTanggal?: string; // e.g. 13 Juli 2020
  namaAyah?: string; // e.g. Arifuddin
  namaIbu?: string; // e.g. Sayuti / ICCA KR. MANIRA
  alamatOrtu?: string; // e.g. Bangkala, Desa Tugisi
  teleponOrtu?: string;
  pekerjaanAyah?: string; // e.g. Petani
  pekerjaanIbu?: string; // e.g. IRT
  namaWali?: string;
  teleponWali?: string;
  pekerjaanWali?: string;
  pasFotoUrl?: string; // URL Pas Foto 3x4 jika diunggah
  hideKopDiriSiswa?: boolean; // Tampilkan logo Kemenag di tengah tanpa kop garis (sesuai contoh asli)
  // Data Tambahan untuk KP4 (Tunjangan Keluarga Pegawai)
  statusAnak?: string; // e.g. Anak Kandung / Anak Tiri / Anak Angkat
  instansiOrtu?: string; // e.g. MTsN 3 Jeneponto
  tahunAjaran?: string; // e.g. 2026/2027
  agamaPegawai?: string; // e.g. Islam
  statusKepegawaian?: string; // e.g. PNS / PPPK / CPNS
  masaKerjaGolongan?: string; // e.g. 14 Tahun 06 Bulan
  pekerjaanSampingan?: string;
  penghasilanSampingan?: string;
  pensiunJanda?: string;
  susunanKeluarga?: AnggotaKeluargaKP4[];
  jumlahAnakTanggungan?: string;
  penomoranBKN?: boolean; // Tampilkan penomoran 34-44 dan m-o sesuai formulir baku
  hideKopSuratKP4?: boolean; // Tampilkan tanpa kop surat seperti formulir asli
  // Data Pegawai (jika subJenis penghasilan/pegawai atau pemohon KP4)
  namaPegawai: string;
  nipPegawai: string;
  pangkatGolPegawai: string;
  jabatanPegawai: string;
  gajiPokok?: string;
  penghasilanLain?: string;
  // Keterangan teks
  tujuanKeterangan: string;
  isiKeteranganTambahan: string;
  // Data Khusus Surat Keterangan Gangguan Presensi Aplikasi PUSAKA
  sifatSurat?: string; // e.g. 'Biasa'
  lampiranSurat?: string; // e.g. '-'
  halSurat?: string; // e.g. 'Pemberitahuan gangguan Aplikasi PUSAKA'
  tujuanYth?: string; // e.g. 'Seluruh ASN (PNS dan PPPK) Dalam Lingkup MTs Negeri 3 Jeneponto'
  hariTanggalGangguan?: string; // e.g. 'Kamis, 01 Oktober 2026'
  waktuGangguan?: string; // e.g. '06.30 - 08.00'
  zonaWaktu?: string; // e.g. 'WITA'
  daftarPegawaiPusaka?: Array<{
    id: string;
    nama: string;
    nip: string;
    jabatan: string;
  }>;
}

export interface SuratRekomendasiData {
  nomorSurat: string;
  tujuanRekomendasi: string; // e.g., Pendaftaran Beasiswa Indonesia Bangkit / KSM Nasional
  personelList: Personnel[];
  alasanRekomendasi: string;
  keteranganPrestasi?: string;
  klausulPenutup: string;
}

export interface SuratPengantarData {
  nomorSurat: string;
  tujuanYth: string;
  alamatTujuan: string;
  daftarBerkas: Array<{
    id: string;
    no: number;
    naskah: string;
    banyaknya: string;
    keterangan: string;
  }>;
}

export type JenisIzinCuti =
  | 'cuti_tahunan'
  | 'cuti_sakit'
  | 'cuti_alasan_penting'
  | 'cuti_melahirkan'
  | 'cuti_besar'
  | 'izin_tidak_masuk'
  | 'dispensasi_kegiatan';

export interface SuratIzinDispensasiData {
  nomorSurat: string;
  subJenis?: JenisIzinCuti;
  perihal: string;
  // Data Pegawai / Guru yang Mengajukan Cuti atau Izin
  namaPegawai?: string;
  nipPegawai?: string;
  pangkatGolPegawai?: string;
  jabatanPegawai?: string;
  unitKerjaPegawai?: string;
  masaKerja?: string;
  // Detail Cuti & Izin
  jenisCuti?: string;
  alasanCuti?: string;
  lamanyaCuti?: string; // e.g. 3 (tiga) hari kerja
  tanggalMulai?: string;
  tanggalSelesai?: string;
  alamatSelamaCuti?: string;
  teleponSelamaCuti?: string;
  catatanCuti?: string;
  // Sisa Hak Cuti (opsional)
  sisaCutiN2?: string;
  sisaCutiN1?: string;
  sisaCutiN?: string;
  // Data Personel untuk Dispensasi Kegiatan
  personelList: Personnel[];
  alasanDispensasi: string;
  namaKegiatan: string;
  tempatKegiatan: string;
  waktuKegiatan: string;
  penyelenggara: string;
}

export interface PejabatPenandatangan {
  nama: string;
  nip: string;
  pangkatGol: string;
  jabatan: string; // Kepala Madrasah / Plt. Kepala Madrasah / Kepala Urusan Tata Usaha
  isPltPlh: boolean;
  statusJabatan?: 'Definitif' | 'Plt.' | 'Plh.' | 'a.n. Kepala';
  tempatPenetapan: string;
  tanggalPenetapan: string;
  showQrcode: boolean;
  signatureType?: 'kemenag_tte' | 'manual' | 'custom_image';
  customSignatureUrl?: string;
  qrcodeText?: string;
  showStempel: boolean;
  tembusanList: string[];
}

export interface SavedDraft {
  id: string;
  name: string;
  savedAt: string;
  letterType: LetterType;
  nomorSurat: string;
  perihal: string;
  status?: 'selesai' | 'draft';
  catatan?: string;
  state: FullDocumentState;
}

export interface FullDocumentState {
  id?: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  madrasah: MadrasahConfig;
  jenisSurat: LetterType;
  suratTugas: SuratTugasData;
  sk: SuratKeputusanData;
  undangan: SuratUndanganData;
  keterangan: SuratKeteranganData;
  rekomendasi: SuratRekomendasiData;
  pengantar: SuratPengantarData;
  izinDispensasi: SuratIzinDispensasiData;
  penandatangan: PejabatPenandatangan;
}
