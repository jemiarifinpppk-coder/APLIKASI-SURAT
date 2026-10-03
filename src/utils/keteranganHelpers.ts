import { SuratKeteranganData } from '../types/letter';

export const DEFAULT_SKHU_PERNYATAAN =
  'Nama tersebut di atas adalah benar-benar alumni / lulusan dari madrasah kami pada Tahun Pelajaran 2023/2024.\n\nSehubungan dengan ditiadakannya Ujian Nasional (UN) berdasarkan kebijakan Pemerintah melalui Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi serta Kementerian Agama Republik Indonesia, maka pihak madrasah TIDAK MENERBITKAN Surat Keterangan Hasil Ujian Nasional (SKHUN) / Surat Keterangan Hasil Ujian (SKHU).\n\nSebagai bukti kelulusan yang sah dan resmi adalah Ijazah dan Transkrip Nilai yang telah diterbitkan oleh madrasah.';

export const DEFAULT_KP4_PERNYATAAN =
  'Bahwa nama pegawai tersebut di atas adalah benar ASN/Pegawai pada madrasah kami dan susunan keluarga yang dicantumkan adalah benar-benar menjadi tanggungannya untuk keperluan tunjangan keluarga (Model KP4).';

export interface SubJenisConfig {
  key: SuratKeteranganData['subJenis'];
  label: string;
  badge: string;
  subtitle: string;
  defaultTujuan: string;
  defaultPernyataan: string;
  defaultKlasifikasi: string;
  tujuanSuggestions: string[];
}

export const SUB_JENIS_CONFIGS: Record<SuratKeteranganData['subJenis'], SubJenisConfig> = {
  aktif_siswa: {
    key: 'aktif_siswa',
    label: 'Surat Keterangan Siswa Aktif',
    badge: 'PIP / Bank / Beasiswa',
    subtitle: '',
    defaultTujuan: 'Kelengkapan Berkas Pencairan Bantuan Program Indonesia Pintar (PIP) / KIP Madrasah Tahap II Tahun 2026',
    defaultPernyataan:
      'Adalah benar-benar siswa/i aktif yang terdaftar pada madrasah kami pada Tahun Ajaran 2026/2027 dan memiliki catatan perilaku yang baik.',
    defaultKlasifikasi: 'PP.00.4',
    tujuanSuggestions: [
      'Kelengkapan Berkas Pencairan Bantuan Program Indonesia Pintar (PIP) Madrasah',
      'Pembukaan Rekening SimPel / Buku Tabungan Bank Siswa',
      'Persyaratan Permohonan Beasiswa Kemenag / BAZNAS / Pemerintah Daerah',
      'Kelengkapan Berkas Administrasi Peserta Didik Aktif',
    ],
  },
  diri_siswa: {
    key: 'diri_siswa',
    label: 'Keterangan Tentang Diri Siswa',
    badge: 'Buku Induk / Rapor',
    subtitle: 'KETERANGAN TENTANG DIRI SISWA',
    defaultTujuan: 'Kelengkapan Buku Induk / Buku Laporan Hasil Belajar (Rapor Siswa)',
    defaultPernyataan: '',
    defaultKlasifikasi: 'PP.00.4',
    tujuanSuggestions: [
      'Kelengkapan Buku Induk / Buku Laporan Hasil Belajar (Rapor Siswa)',
      'Arsip Dokumen Resmi Profil Peserta Didik Baru',
    ],
  },
  kp4: {
    key: 'kp4',
    label: 'Tunjangan Anak (Model KP4)',
    badge: 'PNS / PPPK / SKUMPTK',
    subtitle: 'UNTUK MENDAPATKAN PEMBAYARAN TUNJANGAN KELUARGA',
    defaultTujuan: 'Kelengkapan Berkas Pembayaran Tunjangan Anak Pegawai (Formulir Model KP4 / SKUMPTK)',
    defaultPernyataan: DEFAULT_KP4_PERNYATAAN,
    defaultKlasifikasi: 'PP.00.4',
    tujuanSuggestions: [
      'Kelengkapan Berkas Pembayaran Tunjangan Anak Pegawai (Formulir Model KP4 / SKUMPTK)',
      'Persyaratan Tunjangan Keluarga Pegawai Negeri Sipil (PNS / PPPK)',
      'Pengurusan Tunjangan Anak PT Taspen / Pensiunan Pegawai',
      'Pengurusan Tunjangan Anak Anggota TNI / POLRI',
    ],
  },
  tidak_terbit_skhu: {
    key: 'tidak_terbit_skhu',
    label: 'Tidak Diterbitkan SKHU / SKHUN',
    badge: 'TNI / POLRI / Kedinasan',
    subtitle: 'TIDAK DITERBITKAN SURAT KETERANGAN HASIL UJIAN (SKHU)',
    defaultTujuan: 'Persyaratan Pendaftaran Penerimaan Calon Anggota POLRI / Calon Prajurit TNI / Kedinasan',
    defaultPernyataan: DEFAULT_SKHU_PERNYATAAN,
    defaultKlasifikasi: 'PP.00.4',
    tujuanSuggestions: [
      'Persyaratan Pendaftaran Calon Anggota Kepolisian Negara Republik Indonesia (POLRI)',
      'Persyaratan Pendaftaran Calon Prajurit Tentara Nasional Indonesia (TNI AD/AL/AU)',
      'Persyaratan Seleksi Masuk Perguruan Tinggi Kedinasan / CPNS',
      'Persyaratan Pendaftaran Mahasiswa Baru Perguruan Tinggi (SNBP / SNBT / Mandiri)',
      'Persyaratan Melamar Pekerjaan dan Kelengkapan Berkas Administrasi',
    ],
  },
  kelakuan_baik: {
    key: 'kelakuan_baik',
    label: 'Surat Keterangan Berkelakuan Baik',
    badge: 'Tata Tertib / Beasiswa',
    subtitle: 'BERKELAKUAN BAIK',
    defaultTujuan: 'Kelengkapan Berkas Persyaratan Pendaftaran / Melanjutkan Pendidikan / Pengurusan Beasiswa',
    defaultPernyataan:
      'Adalah benar-benar peserta didik yang terdaftar aktif pada madrasah kami pada Tahun Ajaran 2026/2027.\n\nSepanjang pengetahuan kami, yang bersangkutan selama belajar di madrasah ini senantiasa berkelakuan baik, mematuhi seluruh tata tertib madrasah, rajin, disiplin, dan tidak pernah terlibat dalam tindakan kriminalitas, narkoba, perkelahian, ataupun pelanggaran hukum lainnya.',
    defaultKlasifikasi: 'PP.00.4',
    tujuanSuggestions: [
      'Persyaratan Melanjutkan Pendidikan ke Jenjang Lebih Tinggi (SMA/MA/SMK)',
      'Persyaratan Pengajuan Beasiswa Berprestasi / Bantuan Pendidikan',
      'Persyaratan Pendaftaran Masuk Pondok Pesantren / Asrama',
      'Kelengkapan Berkas Administrasi dan Keperluan Legal Formal',
    ],
  },
  lulus: {
    key: 'lulus',
    label: 'Surat Keterangan Lulus Sementara (SKL)',
    badge: 'Sebelum Ijazah Terbit',
    subtitle: 'LULUS SEMENTARA (SKL)',
    defaultTujuan: 'Persyaratan Pendaftaran Masuk Jenjang Pendidikan Lanjutan Sebelum Blangko Ijazah Asli Diterbitkan',
    defaultPernyataan:
      'Adalah benar-benar peserta didik madrasah kami yang telah mengikuti Asesmen Madrasah dan menyelesaikan seluruh proses pembelajaran, serta dinyatakan LULUS dari satuan pendidikan pada Tahun Pelajaran 2025/2026.\n\nSurat Keterangan Lulus ini diterbitkan sebagai bukti kelulusan yang sah dan dapat dipergunakan sementara waktu menunggu blangko ijazah asli diterbitkan secara resmi.',
    defaultKlasifikasi: 'PP.00.4',
    tujuanSuggestions: [
      'Persyaratan Pendaftaran Masuk Jenjang SMA / MA / SMK Tahun Ajaran Baru',
      'Persyaratan Seleksi Masuk Perguruan Tinggi (SNBP / SNBT / Mandiri)',
      'Persyaratan Melamar Pekerjaan Sementara Menunggu Ijazah Diterbitkan',
      'Kelengkapan Administrasi Bukti Kelulusan Satuan Pendidikan',
    ],
  },
  pindah_sekolah: {
    key: 'pindah_sekolah',
    label: 'Surat Keterangan Pindah / Mutasi Belajar',
    badge: 'Surat Keterangan Keluar',
    subtitle: 'PINDAH / MUTASI SISWA',
    defaultTujuan: 'Pindah / Mutasi Belajar ke madrasah/sekolah tujuan atas permohonan tertulis dari Orang Tua/Wali siswa karena kepindahan domisili keluarga',
    defaultPernyataan:
      'Peserta didik tersebut di atas selama belajar di madrasah kami berkelakuan baik dan tidak pernah tersangkut tindak pidana atau pelanggaran tata tertib berat.\n\nPihak madrasah telah menyetujui permohonan kepindahan yang bersangkutan, dan apabila telah diterima di madrasah/sekolah tujuan, dimohon untuk mengirimkan Surat Keterangan Telah Menerima (Form Mutasi Masuk).',
    defaultKlasifikasi: 'PP.00.2',
    tujuanSuggestions: [
      'Pindah / Mutasi Belajar Mengikuti Kepindahan Domisili Orang Tua / Wali',
      'Pindah Belajar ke Pondok Pesantren / Madrasah Luar Daerah',
      'Kelengkapan Berkas Permohonan Mutasi Masuk ke Sekolah Tujuan',
    ],
  },
  penghasilan_guru: {
    key: 'penghasilan_guru',
    label: 'Surat Keterangan Penghasilan Guru / GTT',
    badge: 'Bank / Pengajuan Kredit',
    subtitle: 'PENGHASILAN GURU / PEGAWAI',
    defaultTujuan: 'Kelengkapan Berkas Pengajuan Kredit / Administrasi Finansial / Perbankan',
    defaultPernyataan:
      'Adalah benar Pegawai / Tenaga Pendidik (Guru) yang bertugas aktif pada madrasah kami dengan rincian penghasilan/gaji pokok sebagaimana tercatat pada administrasi kepegawaian madrasah.',
    defaultKlasifikasi: 'KP.01.2',
    tujuanSuggestions: [
      'Pengajuan Pembiayaan Kredit Pemilikan Rumah (KPR) / Perbankan',
      'Pembukaan Rekening Bank / Administrasi Finansial',
      'Persyaratan Administrasi Kepegawaian dan Bukti Penghasilan',
      'Pengurusan Kelengkapan Beasiswa Studi Lanjut Guru / Pegawai',
    ],
  },
  beasiswa: {
    key: 'beasiswa',
    label: 'Surat Keterangan Beasiswa',
    badge: 'Pengajuan Bantuan',
    subtitle: 'BEASISWA',
    defaultTujuan: 'Kelengkapan Berkas Pengajuan Beasiswa Pendidikan',
    defaultPernyataan:
      'Adalah benar-benar peserta didik madrasah kami yang terdaftar aktif dan memiliki prestasi belajar yang baik pada Tahun Ajaran 2026/2027.',
    defaultKlasifikasi: 'PP.00.4',
    tujuanSuggestions: [
      'Kelengkapan Berkas Pengajuan Beasiswa Pendidikan',
      'Pengajuan Bantuan Khusus Murid Berprestasi',
    ],
  },
  aplikasi_pusaka: {
    key: 'aplikasi_pusaka',
    label: 'Surat Keterangan Gangguan Presensi Aplikasi PUSAKA',
    badge: 'Presensi Online Kemenag',
    subtitle: '',
    defaultTujuan:
      'Demikian surat pemberitahuan ini kami sampaikan untuk digunakan sebagai keterangan gangguan absensi pada waktu yang dimaksud.',
    defaultPernyataan:
      'Sehubungan adanya gangguan pada Aplikasi PUSAKA Kemenag maka beberapa pegawai tidak bisa melakukan presensi kedatangan/kepulangan sebagaimana seharusnya. Gangguan yang dimaksud terjadi pada :',
    defaultKlasifikasi: 'KP.01.2',
    tujuanSuggestions: [
      'Demikian surat pemberitahuan ini kami sampaikan untuk digunakan sebagai keterangan gangguan absensi pada waktu yang dimaksud.',
      'Demikian surat keterangan ini dibuat untuk dipergunakan sebagai bukti sah kendala teknis presensi online SuperApps PUSAKA.',
      'Demikian surat pemberitahuan ini kami sampaikan, atas perhatian dan kerjasamanya diucapkan terima kasih.',
    ],
  },
};

export const updateNomorKlasifikasi = (
  currentNomor: string | undefined,
  newKlasifikasi: string
): string => {
  if (!currentNomor || currentNomor.trim() === '') {
    return `B-012/MTs.21.07.03/${newKlasifikasi}/10/2026`;
  }
  const parts = currentNomor.split('/');
  if (parts.length >= 4) {
    const klasIdx = parts.findIndex(
      (p, idx) => idx > 0 && idx < parts.length - 2 && /^[A-Z]{2}\.\d{2}/.test(p)
    );
    if (klasIdx !== -1) {
      parts[klasIdx] = newKlasifikasi;
      return parts.join('/');
    } else if (parts.length >= 5) {
      parts[2] = newKlasifikasi;
      return parts.join('/');
    }
  }
  if (/[A-Z]{2}\.\d{2}(\.\d+)?/.test(currentNomor)) {
    return currentNomor.replace(/[A-Z]{2}\.\d{2}(\.\d+)?/, newKlasifikasi);
  }
  return currentNomor;
};

export const getKeteranganSubtitle = (
  subJenis: SuratKeteranganData['subJenis'],
  custom?: string
): string => {
  if (custom !== undefined && custom !== null && custom.trim() !== '') {
    return custom.trim();
  }
  return SUB_JENIS_CONFIGS[subJenis]?.subtitle || '';
};

export const getKeteranganDefaultPernyataan = (
  subJenis: SuratKeteranganData['subJenis']
): string => {
  return SUB_JENIS_CONFIGS[subJenis]?.defaultPernyataan || SUB_JENIS_CONFIGS.aktif_siswa.defaultPernyataan;
};

export const getKeteranganDefaultTujuan = (
  subJenis: SuratKeteranganData['subJenis']
): string => {
  return SUB_JENIS_CONFIGS[subJenis]?.defaultTujuan || SUB_JENIS_CONFIGS.aktif_siswa.defaultTujuan;
};
