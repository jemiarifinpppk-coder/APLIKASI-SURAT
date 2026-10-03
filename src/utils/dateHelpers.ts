const NAMA_BULAN_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const BULAN_ROMAWI = [
  'I', 'II', 'III', 'IV', 'V', 'VI',
  'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
];

const NAMA_HARI_ID = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
];

export function formatIndoDate(dateStr?: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  const day = date.getDate();
  const month = NAMA_BULAN_ID[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

export function formatIndoDayDate(dateStr?: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  const dayName = NAMA_HARI_ID[date.getDay()];
  const day = date.getDate();
  const month = NAMA_BULAN_ID[date.getMonth()];
  const year = date.getFullYear();
  
  return `${dayName}, ${day} ${month} ${year}`;
}

export function getMonthRoman(dateStr?: string): string {
  if (!dateStr) return 'IX';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'IX';
  return BULAN_ROMAWI[date.getMonth()];
}

export function getMonthTwoDigit(dateStr?: string): string {
  if (!dateStr) return '09';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '09';
  const m = date.getMonth() + 1;
  return m < 10 ? `0${m}` : `${m}`;
}

export function getYear(dateStr?: string): string {
  if (!dateStr) return new Date().getFullYear().toString();
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '2026';
  return date.getFullYear().toString();
}
