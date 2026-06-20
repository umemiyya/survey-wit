'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { RatingInput } from '@/components/rating-input'
import { surveySchema, type SurveyFormData } from '@/lib/schemas'
import { submitSurvey } from '@/actions/survey'

import { useUser } from "@clerk/nextjs";

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function SurveyPage() {

  const router = useRouter()
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      responden: '',
      bulan: '',
      kualitasPengharum: 0,
      pelayananService: 0,
      pelayananComplain: 0,
      akanMenggunakan: '',
      pelayananDiperpanjang: '',
      kualitasAroma: 0,
      kebersihanAlat: 0,
      ketepatanWaktu: 0,
      kecepatanRespon: 0,
      saran: '',
    },
  })

  const ratings = {
    kualitasPengharum: watch('kualitasPengharum'),
    pelayananService: watch('pelayananService'),
    pelayananComplain: watch('pelayananComplain'),
    kualitasAroma: watch('kualitasAroma'),
    kebersihanAlat: watch('kebersihanAlat'),
    ketepatanWaktu: watch('ketepatanWaktu'),
    kecepatanRespon: watch('kecepatanRespon'),
  }

const onSubmit = async (data: SurveyFormData) => {
  setIsSubmitting(true)

  // Gabungkan responden dengan nama user sebelum submit
  const finalData = {
    ...data,
    responden: `${data.responden} - ${user?.fullName ?? user?.emailAddresses[0].emailAddress ?? ''}`,
  }

  const result = await submitSurvey(finalData)

  setIsSubmitting(false)

  if (!result.success) {
    alert(result.error || 'Terjadi kesalahan saat mengirim survey.')
    return
  }

  router.push(`/user/result?id=${result.id}`)
}

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-6">
        <PageHeader
          title={`Halo,  ${user?.fullName || ""}`}
          description="Mohon isi form berikut untuk memberikan feedback Anda"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Nama Responden */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              Nama Responden *
            </label>
            <input
              {...register('responden')}
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.responden && (
              <p className="text-sm text-red-600">{errors.responden.message}</p>
            )}
          </div>

          {/* Bulan */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              Bulan *
            </label>
            <select
              {...register('bulan')}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Pilih bulan</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            {errors.bulan && (
              <p className="text-sm text-red-600">{errors.bulan.message}</p>
            )}
          </div>

          {/* Kualitas Pengharum */}
          <div>
            <RatingInput
              label="Kualitas Pengharum *"
              value={ratings.kualitasPengharum}
              onChange={(value) => setValue('kualitasPengharum', value)}
              error={errors.kualitasPengharum?.message}
            />
          </div>

          {/* Pelayanan Service */}
          <div>
            <RatingInput
              label="Pelayanan Service *"
              value={ratings.pelayananService}
              onChange={(value) => setValue('pelayananService', value)}
              error={errors.pelayananService?.message}
            />
          </div>

          {/* Pelayanan Complain */}
          <div>
            <RatingInput
              label="Pelayanan Complain *"
              value={ratings.pelayananComplain}
              onChange={(value) => setValue('pelayananComplain', value)}
              error={errors.pelayananComplain?.message}
            />
          </div>

          {/* Akan Menggunakan Layanan */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              Akankah menggunakan layanan kami di masa depan? *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('akanMenggunakan')}
                  type="radio"
                  value="Ya"
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">Ya</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('akanMenggunakan')}
                  type="radio"
                  value="Tidak"
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">Tidak</span>
              </label>
            </div>
            {errors.akanMenggunakan && (
              <p className="text-sm text-red-600">
                {errors.akanMenggunakan.message}
              </p>
            )}
          </div>

          {/* Pelayanan Diperpanjang */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              Apakah pelayanan service dan jasa pengharum masih dapat
              diperpanjang? *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('pelayananDiperpanjang')}
                  type="radio"
                  value="Ya"
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">Ya</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('pelayananDiperpanjang')}
                  type="radio"
                  value="Tidak"
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">Tidak</span>
              </label>
            </div>
            {errors.pelayananDiperpanjang && (
              <p className="text-sm text-red-600">
                {errors.pelayananDiperpanjang.message}
              </p>
            )}
          </div>

          {/* Kualitas Aroma */}
          <div>
            <RatingInput
              label="Kualitas Aroma *"
              value={ratings.kualitasAroma}
              onChange={(value) => setValue('kualitasAroma', value)}
              error={errors.kualitasAroma?.message}
            />
          </div>

          {/* Kebersihan Alat */}
          <div>
            <RatingInput
              label="Kebersihan Alat Pengharum *"
              value={ratings.kebersihanAlat}
              onChange={(value) => setValue('kebersihanAlat', value)}
              error={errors.kebersihanAlat?.message}
            />
          </div>

          {/* Ketepatan Waktu */}
          <div>
            <RatingInput
              label="Ketepatan Waktu Perawat *"
              value={ratings.ketepatanWaktu}
              onChange={(value) => setValue('ketepatanWaktu', value)}
              error={errors.ketepatanWaktu?.message}
            />
          </div>

          {/* Kecepatan Respon */}
          <div>
            <RatingInput
              label="Kecepatan Respon Petugas *"
              value={ratings.kecepatanRespon}
              onChange={(value) => setValue('kecepatanRespon', value)}
              error={errors.kecepatanRespon?.message}
            />
          </div>

          {/* Saran dan Masukan */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground block">
              Saran dan Masukan
            </label>
            <textarea
              {...register('saran')}
              placeholder="Masukkan saran dan masukan Anda (opsional)"
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Survey'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
