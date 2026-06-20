/**
 * Sumber kebenaran tunggal untuk warna & styling 5 tingkat kepuasan.
 * Import dari sini di semua komponen yang menampilkan badge/warna prediksi,
 * supaya kalau skema warna berubah, cukup edit di satu tempat.
 */

export const SATISFACTION_LEVELS = [
  'Tidak Puas',
  'Kurang Puas',
  'Netral',
  'Puas',
  'Sangat Puas',
] as const

export type SatisfactionLevel = (typeof SATISFACTION_LEVELS)[number]

// Untuk badge teks (Tailwind classes)
export const SATISFACTION_BADGE_CLASS: Record<SatisfactionLevel, string> = {
  'Tidak Puas': 'bg-red-50 text-red-600',
  'Kurang Puas': 'bg-amber-50 text-amber-600',
  Netral: 'bg-slate-100 text-slate-600',
  Puas: 'bg-blue-50/60 text-blue-600',
  'Sangat Puas': 'bg-blue-50 text-blue-700',
}

// Untuk chart (hex, dari merah → biru tua, gradasi kepuasan rendah ke tinggi)
export const SATISFACTION_HEX: Record<SatisfactionLevel, string> = {
  'Tidak Puas': '#E24B4A',
  'Kurang Puas': '#EF9F27',
  Netral: '#94A3B8',
  Puas: '#85B7EB',
  'Sangat Puas': '#185FA5',
}

export function getSatisfactionBadgeClass(value: string | null | undefined): string {
  if (!value || !(value in SATISFACTION_BADGE_CLASS)) {
    return 'bg-slate-100 text-slate-500'
  }
  return SATISFACTION_BADGE_CLASS[value as SatisfactionLevel]
}

export function getSatisfactionHex(value: string | null | undefined): string {
  if (!value || !(value in SATISFACTION_HEX)) {
    return '#94A3B8'
  }
  return SATISFACTION_HEX[value as SatisfactionLevel]
}