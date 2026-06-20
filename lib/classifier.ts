/**
 * Weighted threshold classifier untuk prediksi kepuasan pelanggan.
 *
 * CATATAN PENTING:
 * Ini BUKAN Random Forest statistik (algoritma machine learning yang
 * dilatih dari data berlabel). Ini adalah rule-based classifier dengan
 * skema bobot per fitur, dipakai sebagai pengganti sementara karena belum
 * ada dataset survey berlabel untuk training model ML sungguhan.
 *
 * Bobot di bawah mengikuti urutan kepentingan fitur yang sama dengan
 * tampilan lama (Pelayanan Service & Kecepatan Respon paling berpengaruh).
 * Total bobot = 100.
 *
 * Cara migrasi ke Random Forest asli nanti:
 * 1. Kumpulkan minimal ~100-200 baris data survey yang prediksinya sudah
 *    dikonfirmasi benar oleh manusia (label ground truth).
 * 2. Pakai library `ml-random-forest` (lihat trainRandomForest.ts) untuk
 *    melatih model dari data tersebut.
 * 3. Ganti pemanggilan `classifySurvey()` di submitSurvey dengan
 *    pemanggilan model RandomForest yang sudah dilatih.
 */

export interface SurveyRatings {
  kualitasPengharum: number
  pelayananService: number
  pelayananComplain: number
  kualitasAroma: number
  kebersihanAlat: number
  ketepatanWaktu: number
  kecepatanRespon: number
}

export interface ClassificationResult {
  prediksi: 'Tidak Puas' | 'Kurang Puas' | 'Netral' | 'Puas' | 'Sangat Puas'
  probabilitas: number
  skor: number
  kontribusi: { fitur: string; bobot: number; nilai: number; kontribusi: number }[]
}

// Bobot tiap fitur (total = 100), mengikuti urutan feature importance lama
export const FEATURE_WEIGHTS = {
  pelayananService: 35,
  kecepatanRespon: 22,
  kualitasAroma: 18,
  kualitasPengharum: 10,
  ketepatanWaktu: 8,
  kebersihanAlat: 5,
  pelayananComplain: 2,
} as const

const FEATURE_LABELS: Record<keyof typeof FEATURE_WEIGHTS, string> = {
  pelayananService: 'Pelayanan service',
  kecepatanRespon: 'Kecepatan respon',
  kualitasAroma: 'Kualitas aroma',
  kualitasPengharum: 'Kualitas pengharum',
  ketepatanWaktu: 'Ketepatan waktu',
  kebersihanAlat: 'Kebersihan alat',
  pelayananComplain: 'Pelayanan komplain',
}

/**
 * Menghitung skor tertimbang (0-100) dari rating tiap fitur (skala 1-5),
 * lalu mengklasifikasikan ke salah satu dari 3 kategori kepuasan.
 */
export function classifySurvey(ratings: SurveyRatings): ClassificationResult {
  const kontribusi = (Object.keys(FEATURE_WEIGHTS) as Array<keyof typeof FEATURE_WEIGHTS>).map(
    (key) => {
      const bobot = FEATURE_WEIGHTS[key]
      const nilai = ratings[key]
      // Normalisasi rating 1-5 menjadi 0-1, lalu kali bobot
      const kontribusiPoin = ((nilai - 1) / 4) * bobot
      return {
        fitur: FEATURE_LABELS[key],
        bobot,
        nilai,
        kontribusi: Math.round(kontribusiPoin * 10) / 10,
      }
    }
  )

  const skorMentah = kontribusi.reduce((sum, k) => sum + k.kontribusi, 0)
  const skor = Math.round(skorMentah)

  // Threshold klasifikasi: 5 rentang sama rata, masing-masing 20 poin
  // 0-19   = Tidak Puas
  // 20-39  = Kurang Puas
  // 40-59  = Netral
  // 60-79  = Puas
  // 80-100 = Sangat Puas
  let prediksi: ClassificationResult['prediksi']
  let batasBawah: number
  let batasAtas: number

  if (skor >= 80) {
    prediksi = 'Sangat Puas'
    batasBawah = 80
    batasAtas = 100
  } else if (skor >= 60) {
    prediksi = 'Puas'
    batasBawah = 60
    batasAtas = 79
  } else if (skor >= 40) {
    prediksi = 'Netral'
    batasBawah = 40
    batasAtas = 59
  } else if (skor >= 20) {
    prediksi = 'Kurang Puas'
    batasBawah = 20
    batasAtas = 39
  } else {
    prediksi = 'Tidak Puas'
    batasBawah = 0
    batasAtas = 19
  }

  // Probabilitas: posisi skor di dalam rentangnya sendiri, dipetakan ke
  // rentang 65-99% (skor di tengah rentang = lebih percaya diri,
  // skor di tepi rentang/dekat batas = kurang percaya diri)
  const tengahRentang = (batasBawah + batasAtas) / 2
  const lebarRentang = (batasAtas - batasBawah) / 2 || 1
  const jarakKeTengah = Math.abs(skor - tengahRentang)
  const kedekatan = 1 - jarakKeTengah / lebarRentang // 1 = di tengah, 0 = di tepi

  const probabilitas = Math.min(99, Math.max(65, Math.round(65 + kedekatan * 34)))

  return {
    prediksi,
    probabilitas: Math.round(probabilitas),
    skor,
    kontribusi,
  }
}