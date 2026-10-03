export const NOMOR_SURAT_LIST: string[] = Array.from({ length: 300 }, (_, i) => {
  const num = String(i + 1).padStart(3, '0');
  return `B.${num}`;
});

export const TAHUN_SURAT_LIST: string[] = [
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
];

export const BULAN_SURAT_LIST = [
  { value: '01', label: '01 (Januari)' },
  { value: '02', label: '02 (Februari)' },
  { value: '03', label: '03 (Maret)' },
  { value: '04', label: '04 (April)' },
  { value: '05', label: '05 (Mei)' },
  { value: '06', label: '06 (Juni)' },
  { value: '07', label: '07 (Juli)' },
  { value: '08', label: '08 (Agustus)' },
  { value: '09', label: '09 (September)' },
  { value: '10', label: '10 (Oktober)' },
  { value: '11', label: '11 (November)' },
  { value: '12', label: '12 (Desember)' },
];

// Presets Kode Madrasah: [Jenjang].[Kode_Provinsi].[Kode_Kabupaten].[Kode_Madrasah]
// Contoh: MTs.21.07.03 (MTsN 3 Jeneponto: MTs=Madrasah, 21=Sulsel, 07=Jeneponto, 03=Nomor Madrasah)
export const KODE_MADRASAH_PRESETS = [
  { value: 'MTs.21.07.03', label: 'MTs.21.07.03 (MTsN 3 Jeneponto)', jenjang: 'MTs', prov: '21', kab: '07', noMadrasah: '03', nama: 'MTsN 3 Jeneponto' },
  { value: 'MTs.21.07.01', label: 'MTs.21.07.01 (MTsN 1 Jeneponto)', jenjang: 'MTs', prov: '21', kab: '07', noMadrasah: '01', nama: 'MTsN 1 Jeneponto' },
  { value: 'MTs.21.07.02', label: 'MTs.21.07.02 (MTsN 2 Jeneponto)', jenjang: 'MTs', prov: '21', kab: '07', noMadrasah: '02', nama: 'MTsN 2 Jeneponto' },
  { value: 'MTs.21.07.04', label: 'MTs.21.07.04 (MTsN 4 Jeneponto)', jenjang: 'MTs', prov: '21', kab: '07', noMadrasah: '04', nama: 'MTsN 4 Jeneponto' },
  { value: 'MTs.21.07.05', label: 'MTs.21.07.05 (MTsN 5 Jeneponto)', jenjang: 'MTs', prov: '21', kab: '07', noMadrasah: '05', nama: 'MTsN 5 Jeneponto' },
  { value: 'Ma.21.07.01', label: 'Ma.21.07.01 (MAN 1 Jeneponto)', jenjang: 'Ma', prov: '21', kab: '07', noMadrasah: '01', nama: 'MAN 1 Jeneponto' },
  { value: 'Ma.21.07.02', label: 'Ma.21.07.02 (MAN 2 Jeneponto)', jenjang: 'Ma', prov: '21', kab: '07', noMadrasah: '02', nama: 'MAN 2 Jeneponto' },
  { value: 'MI.21.07.01', label: 'MI.21.07.01 (MIN 1 Jeneponto)', jenjang: 'MI', prov: '21', kab: '07', noMadrasah: '01', nama: 'MIN 1 Jeneponto' },
  { value: 'MI.21.07.02', label: 'MI.21.07.02 (MIN 2 Jeneponto)', jenjang: 'MI', prov: '21', kab: '07', noMadrasah: '02', nama: 'MIN 2 Jeneponto' },
  { value: 'RA.21.07.01', label: 'RA.21.07.01 (RA Perwanida Jeneponto)', jenjang: 'RA', prov: '21', kab: '07', noMadrasah: '01', nama: 'RA Jeneponto' },
];

// Alias for backwards compatibility
export const KODE_SATKER_PRESETS = KODE_MADRASAH_PRESETS;

export function buildNomorSurat(
  noUrut: string = 'B.001',
  kodeMadrasah: string = 'MTs.21.07.03',
  klasifikasi: string = 'PP.00.6',
  bulan: string = '09',
  tahun: string = '2026'
): string {
  const cleanNo = noUrut.trim() || 'B.001';
  const cleanMadrasah = kodeMadrasah.trim() || 'MTs.21.07.03';
  const cleanKlas = klasifikasi.trim() || 'PP.00.6';
  const cleanBulan = bulan.trim() || '09';
  const cleanTahun = tahun.trim() || '2026';
  return `${cleanNo}/${cleanMadrasah}/${cleanKlas}/${cleanBulan}/${cleanTahun}`;
}

export function parseNomorSurat(nomor: string) {
  if (!nomor) {
    return {
      nomorUrut: 'B.001',
      satker: 'MTs.21.07.03',
      kodeMadrasah: 'MTs.21.07.03',
      klasifikasi: 'PP.00.6',
      bulan: '09',
      tahun: '2026',
    };
  }

  const parts = nomor.split('/');
  const kodeMadrasah = parts[1] || 'MTs.21.07.03';
  return {
    nomorUrut: parts[0] || 'B.001',
    satker: kodeMadrasah,
    kodeMadrasah: kodeMadrasah,
    klasifikasi: parts[2] || 'PP.00.6',
    bulan: parts[3] || '09',
    tahun: parts[4] || '2026',
  };
}
