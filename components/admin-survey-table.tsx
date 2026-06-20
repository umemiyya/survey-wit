'use client'

import { DataTable } from '@/components/data-table'
import { getSatisfactionBadgeClass } from '@/lib/satisfaction'

interface Survey {
  responden: string
  bulan: string
  pelayananService: number
  kualitasAroma: number
  prediksi: string | null
}

interface AdminSurveyTableProps {
  data: Survey[]
}

export function AdminSurveyTable({ data }: AdminSurveyTableProps) {
  return (
    <DataTable
      columns={[
        { key: 'responden', label: 'Nama' },
        { key: 'bulan', label: 'Bulan' },
        {
          key: 'pelayananService',
          label: 'Pelayanan',
          render: (value: number) => `${value}/5`,
        },
        {
          key: 'kualitasAroma',
          label: 'Aroma',
          render: (value: number) => `${value}/5`,
        },
        {
          key: 'prediksi',
          label: 'Prediksi',
          render: (value: string) => (
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${getSatisfactionBadgeClass(value)}`}
            >
              {value}
            </span>
          ),
        },
      ]}
      data={data}
      itemsPerPage={10}
    />
  )
}