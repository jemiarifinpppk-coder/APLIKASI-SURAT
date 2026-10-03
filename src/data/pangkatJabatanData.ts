export interface GroupedOption {
  group: string;
  options: { value: string; label: string }[];
}

export const PANGKAT_GOLONGAN_OPTIONS: GroupedOption[] = [
  {
    group: 'PNS - Golongan IV (Pembina)',
    options: [
      { value: 'Pembina Utama (IV/e)', label: 'Pembina Utama (IV/e)' },
      { value: 'Pembina Utama Madya (IV/d)', label: 'Pembina Utama Madya (IV/d)' },
      { value: 'Pembina Utama Muda (IV/c)', label: 'Pembina Utama Muda (IV/c)' },
      { value: 'Pembina Tk. I (IV/b)', label: 'Pembina Tk. I (IV/b)' },
      { value: 'Pembina (IV/a)', label: 'Pembina (IV/a)' },
    ],
  },
  {
    group: 'PNS - Golongan III (Penata)',
    options: [
      { value: 'Penata Tk. I (III/d)', label: 'Penata Tk. I (III/d)' },
      { value: 'Penata (III/c)', label: 'Penata (III/c)' },
      { value: 'Penata Muda Tk. I (III/b)', label: 'Penata Muda Tk. I (III/b)' },
      { value: 'Penata Muda (III/a)', label: 'Penata Muda (III/a)' },
    ],
  },
  {
    group: 'PNS - Golongan II (Pengatur)',
    options: [
      { value: 'Pengatur Tk. I (II/d)', label: 'Pengatur Tk. I (II/d)' },
      { value: 'Pengatur (II/c)', label: 'Pengatur (II/c)' },
      { value: 'Pengatur Muda Tk. I (II/b)', label: 'Pengatur Muda Tk. I (II/b)' },
      { value: 'Pengatur Muda (II/a)', label: 'Pengatur Muda (II/a)' },
    ],
  },
  {
    group: 'PNS - Golongan I (Juru)',
    options: [
      { value: 'Juru Tk. I (I/d)', label: 'Juru Tk. I (I/d)' },
      { value: 'Juru (I/c)', label: 'Juru (I/c)' },
      { value: 'Juru Muda Tk. I (I/b)', label: 'Juru Muda Tk. I (I/b)' },
      { value: 'Juru Muda (I/a)', label: 'Juru Muda (I/a)' },
    ],
  },
  {
    group: 'Pegawai Pemerintah dengan Perjanjian Kerja (PPPK)',
    options: [
      { value: 'Ahli Utama (Golongan XVII)', label: 'Ahli Utama (Golongan XVII)' },
      { value: 'Ahli Utama (Golongan XVI)', label: 'Ahli Utama (Golongan XVI)' },
      { value: 'Ahli Madya (Golongan XI)', label: 'Ahli Madya (Golongan XI)' },
      { value: 'Ahli Muda (Golongan X)', label: 'Ahli Muda (Golongan X)' },
      { value: 'Ahli Pertama (Golongan IX)', label: 'Ahli Pertama (Golongan IX)' },
      { value: 'Mahir (Golongan VIII)', label: 'Mahir (Golongan VIII)' },
      { value: 'Terampil (Golongan VII)', label: 'Terampil (Golongan VII)' },
      { value: 'Pemula (Golongan V)', label: 'Pemula (Golongan V)' },
    ],
  },
  {
    group: 'Non-ASN / Honorer / Lainnya',
    options: [
      { value: 'Non-ASN / GTY', label: 'Non-ASN / Guru Tetap Yayasan (GTY)' },
      { value: 'Non-ASN / GTT', label: 'Non-ASN / Guru Tidak Tetap (GTT)' },
      { value: 'Non-ASN / PTT', label: 'Non-ASN / Pegawai Tidak Tetap (PTT)' },
      { value: 'Tenaga Honorer / Kontrak', label: 'Tenaga Honorer / Kontrak' },
      { value: '-', label: '- (Tanpa Pangkat / Golongan)' },
    ],
  },
  {
    group: 'Peserta Didik / Siswa',
    options: [
      { value: 'Kelas VII', label: 'Siswa Kelas VII (MTs / SMP)' },
      { value: 'Kelas VIII', label: 'Siswa Kelas VIII (MTs / SMP)' },
      { value: 'Kelas IX', label: 'Siswa Kelas IX (MTs / SMP)' },
      { value: 'Kelas X', label: 'Siswa Kelas X (MA / SMA)' },
      { value: 'Kelas XI', label: 'Siswa Kelas XI (MA / SMA)' },
      { value: 'Kelas XII', label: 'Siswa Kelas XII (MA / SMA)' },
    ],
  },
];

export const JABATAN_OPTIONS: GroupedOption[] = [
  {
    group: 'Pimpinan & Manajemen Madrasah',
    options: [
      { value: 'Kepala Madrasah', label: 'Kepala Madrasah' },
      { value: 'Pelaksana Tugas (Plt.) Kepala Madrasah', label: 'Pelaksana Tugas (Plt.) Kepala Madrasah' },
      { value: 'Pelaksana Harian (Plh.) Kepala Madrasah', label: 'Pelaksana Harian (Plh.) Kepala Madrasah' },
      { value: 'Kepala Urusan Tata Usaha (Kaur TU)', label: 'Kepala Urusan Tata Usaha (Kaur TU)' },
      { value: 'Wakil Kepala Madrasah Bidang Kurikulum', label: 'Wakil Kepala Madrasah Bidang Kurikulum' },
      { value: 'Wakil Kepala Madrasah Bidang Kesiswaan', label: 'Wakil Kepala Madrasah Bidang Kesiswaan' },
      { value: 'Wakil Kepala Madrasah Bidang Sarana & Prasarana', label: 'Wakil Kepala Madrasah Bidang Sarana & Prasarana' },
      { value: 'Wakil Kepala Madrasah Bidang Humas', label: 'Wakil Kepala Madrasah Bidang Humas' },
      { value: 'Bendahara Madrasah / Pengelola BOS', label: 'Bendahara Madrasah / Pengelola BOS' },
    ],
  },
  {
    group: 'Jabatan Fungsional Guru (Jenjang)',
    options: [
      { value: 'Guru Ahli Utama', label: 'Guru Ahli Utama' },
      { value: 'Guru Ahli Madya', label: 'Guru Ahli Madya' },
      { value: 'Guru Ahli Muda', label: 'Guru Ahli Muda' },
      { value: 'Guru Ahli Pertama', label: 'Guru Ahli Pertama' },
      { value: 'Guru Madya', label: 'Guru Madya' },
      { value: 'Guru Muda', label: 'Guru Muda' },
      { value: 'Guru Pertama', label: 'Guru Pertama' },
    ],
  },
  {
    group: 'Tugas Pokok & Bidang Pengajaran Guru',
    options: [
      { value: 'Guru Mata Pelajaran', label: 'Guru Mata Pelajaran' },
      { value: 'Guru Kelas', label: 'Guru Kelas (MI / SD)' },
      { value: 'Guru Bimbingan dan Konseling (BK)', label: 'Guru Bimbingan dan Konseling (BK)' },
      { value: 'Guru Wali Kelas', label: 'Guru Wali Kelas' },
      { value: 'Guru Pembina OSIS / Ekstrakurikuler', label: 'Guru Pembina OSIS / Ekstrakurikuler' },
      { value: 'Guru Pembina Pramuka', label: 'Guru Pembina Pramuka' },
      { value: 'Guru Pembina Keagamaan / Tahfidz', label: 'Guru Pembina Keagamaan / Tahfidz' },
    ],
  },
  {
    group: 'Tenaga Kependidikan / Administrasi (TU & Teknis)',
    options: [
      { value: 'Pengadministrasi Umum / TU', label: 'Pengadministrasi Umum / TU' },
      { value: 'Pengelola Data Kepegawaian & SIMPATIKA', label: 'Pengelola Data Kepegawaian & SIMPATIKA' },
      { value: 'Operator EMIS & RDM', label: 'Operator EMIS & RDM' },
      { value: 'Pranata Komputer / Operator Madrasah', label: 'Pranata Komputer / Operator Madrasah' },
      { value: 'Pustakawan / Pengelola Perpustakaan', label: 'Pustakawan / Pengelola Perpustakaan' },
      { value: 'Pranata Laboratorium / Laboran', label: 'Pranata Laboratorium / Laboran' },
      { value: 'Petugas Keamanan / Satpam', label: 'Petugas Keamanan / Satpam' },
      { value: 'Petugas Kebersihan / Pramubakti', label: 'Petugas Kebersihan / Pramubakti' },
    ],
  },
  {
    group: 'Penugasan Khusus & Panitia',
    options: [
      { value: 'Ketua Tim / Koordinator', label: 'Ketua Tim / Koordinator' },
      { value: 'Sekretaris Panitia', label: 'Sekretaris Panitia' },
      { value: 'Bendahara Panitia', label: 'Bendahara Panitia' },
      { value: 'Anggota Tim / Panitia', label: 'Anggota Tim / Panitia' },
      { value: 'Proktor Asesmen / Ujian', label: 'Proktor Asesmen / Ujian' },
      { value: 'Teknisi Laboratorium Komputer', label: 'Teknisi Laboratorium Komputer' },
      { value: 'Pengawas Ruang Ujian / Asesmen', label: 'Pengawas Ruang Ujian / Asesmen' },
    ],
  },
  {
    group: 'Organisasi Siswa / Peserta Didik',
    options: [
      { value: 'Ketua OSIM / MPK', label: 'Ketua OSIM / MPK' },
      { value: 'Pengurus OSIM', label: 'Pengurus OSIM' },
      { value: 'Peserta Didik / Siswa', label: 'Peserta Didik / Siswa' },
      { value: 'Peserta Lomba / Delegasi', label: 'Peserta Lomba / Delegasi' },
    ],
  },
];
