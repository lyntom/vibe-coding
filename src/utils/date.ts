/**
 * Helper pemformatan waktu & tanggal zona WITA (UTC+8) Kota Samarinda
 */

export function formatWitaTime(date: Date = new Date()): string {
  // Format HH:mm:ss WITA
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds} WITA`;
}

export function formatWitaDate(date: Date = new Date()): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
}

export function formatDisplayDateTime(isoString: string): { dateStr: string; timeStr: string } {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return { dateStr: '-', timeStr: '-' };

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return {
      dateStr: `${day}/${month}/${year}`,
      timeStr: `${hours}:${minutes} WITA`,
    };
  } catch {
    return { dateStr: '-', timeStr: '-' };
  }
}
