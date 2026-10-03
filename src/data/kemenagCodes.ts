export interface KemenagCode {
  code: string;
  category: string;
  title: string;
  description: string;
  suitableLetterTypes: Array<'surat_tugas' | 'sk' | 'undangan' | 'keterangan' | 'rekomendasi' | 'pengantar' | 'izin_dispensasi'>;
}

export const KEMENAG_CLASSIFICATION_CODES: KemenagCode[] = [
  // PP - Pendidikan Islam & Madrasah
  {
    code: 'PP.00',
    category: 'Pendidikan Islam',
    title: 'Pendidikan Islam (Umum)',
    description: 'Surat dinas terkait kebijakan dan urusan umum pendidikan madrasah',
    suitableLetterTypes: ['surat_tugas', 'sk', 'undangan', 'keterangan', 'pengantar'],
  },
  {
    code: 'PP.00.1',
    category: 'Pendidikan Islam / Kurikulum',
    title: 'Kurikulum & Pembelajaran',
    description: 'SK Pembagian Jam Mengajar, Jadwal Pelajaran, Kurikulum Merdeka / K-13, Perangkat Ajar',
    suitableLetterTypes: ['sk', 'surat_tugas', 'undangan'],
  },
  {
    code: 'PP.00.2',
    category: 'Pendidikan Islam / Kesiswaan',
    title: 'Kesiswaan & Ekstrakurikuler',
    description: 'Matsama, OSIM, Pramuka, PMR, Paskibra, LDKS, dan kegiatan kesiswaan',
    suitableLetterTypes: ['sk', 'surat_tugas', 'undangan', 'izin_dispensasi', 'rekomendasi'],
  },
  {
    code: 'PP.00.4',
    category: 'Pendidikan Islam / Beasiswa',
    title: 'Beasiswa & Bantuan Siswa (PIP/KIP)',
    description: 'Surat Keterangan Penerima PIP/KIP, Rekomendasi Beasiswa, Bantuan Pendidikan',
    suitableLetterTypes: ['keterangan', 'rekomendasi', 'sk', 'pengantar'],
  },
  {
    code: 'PP.00.6',
    category: 'Pendidikan Islam / Asesmen',
    title: 'Asesmen, Penilaian & Ujian',
    description: 'Asesmen Madrasah (AM), Asesmen Nasional (ANBK), Sumatif Akhir Semester, Ujian Praktek',
    suitableLetterTypes: ['surat_tugas', 'sk', 'undangan', 'pengantar'],
  },
  {
    code: 'PP.01.1',
    category: 'Pendidikan Islam / Kelulusan & Alumni',
    title: 'Kelulusan, Ijazah & Dokumen Ujian',
    description: 'Surat Keterangan Lulus (SKL), Keterangan Tidak Diterbitkan SKHU/SKHUN, Ralat Ijazah, Dokumen Alumni',
    suitableLetterTypes: ['keterangan', 'pengantar', 'sk'],
  },
  {
    code: 'PP.00.8',
    category: 'Pendidikan Islam / GTK',
    title: 'Guru & Tenaga Kependidikan (GTK)',
    description: 'Sertifikasi Guru, Simpatika, EMIS, TPG, Pelatihan/Workshop Guru, MGMP, KKG',
    suitableLetterTypes: ['surat_tugas', 'sk', 'undangan', 'rekomendasi', 'keterangan'],
  },
  {
    code: 'PP.00.9',
    category: 'Pendidikan Islam / Kelembagaan',
    title: 'Akreditasi & Sarana Prasarana',
    description: 'Persiapan Akreditasi BAN-PDM, Sarpras, Inventaris Lab, Perpustakaan Madrasah',
    suitableLetterTypes: ['sk', 'surat_tugas', 'undangan'],
  },

  // KP - Kepegawaian
  {
    code: 'KP.01.1',
    category: 'Kepegawaian',
    title: 'Penugasan & Pengangkatan',
    description: 'Penugasan wali kelas, kepala laboratorium, kepala perpustakaan, pembina upacara',
    suitableLetterTypes: ['sk', 'surat_tugas'],
  },
  {
    code: 'KP.01.2',
    category: 'Kepegawaian',
    title: 'Mutasi & Penempatan Pegawai',
    description: 'Rekomendasi pindah tugas guru/staf, serah terima tugas',
    suitableLetterTypes: ['rekomendasi', 'pengantar', 'keterangan'],
  },
  {
    code: 'KP.04.1',
    category: 'Kepegawaian',
    title: 'Cuti Pegawai & Guru',
    description: 'Permohonan dan persetujuan cuti tahunan, sakit, melahirkan, atau alasan penting',
    suitableLetterTypes: ['keterangan', 'pengantar'],
  },
  {
    code: 'KP.07.1',
    category: 'Kepegawaian',
    title: 'Pembinaan & Disiplin',
    description: 'Pemberitahuan, pembinaan pegawai, tata tertib guru dan tenaga kependidikan',
    suitableLetterTypes: ['undangan', 'sk'],
  },

  // KU - Keuangan
  {
    code: 'KU.00.1',
    category: 'Keuangan',
    title: 'Anggaran & DIPA',
    description: 'Rencana Kerja Anggaran Madrasah (RKAM), DIPA Madrasah, Pengelolaan Anggaran',
    suitableLetterTypes: ['sk', 'surat_tugas', 'undangan'],
  },
  {
    code: 'KU.01.2',
    category: 'Keuangan',
    title: 'Bantuan Operasional Sekolah (BOS / BOP)',
    description: 'SK Tim Manajemen BOS Madrasah, Laporan Pertanggungjawaban BOS',
    suitableLetterTypes: ['sk', 'surat_tugas', 'pengantar'],
  },

  // HM - Hubungan Masyarakat & Undangan
  {
    code: 'HM.00',
    category: 'Hubungan Masyarakat',
    title: 'Humas, Publikasi & Dokumentasi',
    description: 'Rilis berita madrasah, publikasi media sosial, publikasi prestasi madrasah',
    suitableLetterTypes: ['surat_tugas', 'pengantar'],
  },
  {
    code: 'HM.01',
    category: 'Hubungan Masyarakat',
    title: 'Undangan Rapat & Acara Dinas',
    description: 'Undangan rapat dinas guru, rapat komite, rapat wali murid, peringatan PHBI/PHBN',
    suitableLetterTypes: ['undangan'],
  },

  // OT - Organisasi & Tata Laksana
  {
    code: 'OT.00',
    category: 'Organisasi & Tata Laksana',
    title: 'Tata Laksana & Surat Keputusan',
    description: 'Penetapan SOP madrasah, tata tertib madrasah, SK kepengurusan komite madrasah',
    suitableLetterTypes: ['sk', 'undangan'],
  },

  // BA - Bimbingan & Kegiatan Keagamaan
  {
    code: 'BA.00',
    category: 'Kegiatan Keagamaan',
    title: 'Kegiatan Keagamaan & Ibadah',
    description: 'Peringatan Isra Miraj, Maulid Nabi, Pondok Ramadhan, Sholat Dhuha/Dzuhur Berjamaah',
    suitableLetterTypes: ['sk', 'surat_tugas', 'undangan'],
  },

  // KS - Kerjasama
  {
    code: 'KS.01',
    category: 'Kerjasama',
    title: 'Kerjasama (MoU) & Kemitraan',
    description: 'MoU dengan Puskesmas, Kepolisian, Perguruan Tinggi, Balai Diklat, atau Dunia Industri',
    suitableLetterTypes: ['sk', 'undangan', 'pengantar'],
  },
];

export function formatNomorSuratKemenag(options: {
  nomorUrut?: string;
  kodeMadrasah?: string;
  kodeKlasifikasi?: string;
  bulanRomawi?: string;
  tahun?: string;
}): string {
  const no = options.nomorUrut || '001';
  const madrasah = options.kodeMadrasah || 'Ma.21.14';
  const klasifikasi = options.kodeKlasifikasi || 'PP.00.6';
  const bulan = options.bulanRomawi || '09';
  const tahun = options.tahun || '2026';
  return `B-${no}/${madrasah}/${klasifikasi}/${bulan}/${tahun}`;
}
