import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const surveySchema = z.object({
  responden: z.string().min(1, 'Nama responden harus diisi'),
  bulan: z.string().min(1, 'Bulan harus dipilih'),
  kualitasPengharum: z.number().min(1, 'Kualitas pengharum harus diisi').max(5),
  pelayananService: z
    .number()
    .min(1, 'Pelayanan service harus diisi')
    .max(5),
  pelayananComplain: z
    .number()
    .min(1, 'Pelayanan complain harus diisi')
    .max(5),
  akanMenggunakan: z.string().min(1, 'Pilihan harus dipilih'),
  pelayananDiperpanjang: z.string().min(1, 'Pilihan harus dipilih'),
  kualitasAroma: z.number().min(1, 'Kualitas aroma harus diisi').max(5),
  kebersihanAlat: z
    .number()
    .min(1, 'Kebersihan alat harus diisi')
    .max(5),
  ketepatanWaktu: z
    .number()
    .min(1, 'Ketepatan waktu harus diisi')
    .max(5),
  kecepatanRespon: z
    .number()
    .min(1, 'Kecepatan respon harus diisi')
    .max(5),
  saran: z.string().optional(),
})

export type SurveyFormData = z.infer<typeof surveySchema>
