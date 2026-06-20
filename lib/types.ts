export interface SurveyData {
  id: string
  responden: string
  bulan: string
  kualitasPengharum: number
  pelayananService: number
  pelayananComplain: number
  akanMenggunakan: string
  pelayananDiperpanjang: string
  kualitasAroma: number
  kebersihanAlat: number
  ketepatanWaktu: number
  kecepatanRespon: number
  saran: string
  prediksi: 'Sangat Puas' | 'Puas' | 'Tidak Puas'
  probabilitas: number
}

export interface StatCard {
  title: string
  value: string | number
  change?: string
}
