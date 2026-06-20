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

interface SurveyTableProps {
  data: Survey[]
}

export function SurveyTable({ data }: SurveyTableProps) {
  return (
    <DataTable
      columns={[
        {
          key: 'responden',
          label: 'Nama',
        },
        {
          key: 'bulan',
          label: 'Bulan',
        },
        {
          key: 'pelayananService',
          label: 'Pelayanan',
          render: (value: number) => (
            <div className="flex items-center gap-2">
              <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${(value / 5) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-slate-500">{value}/5</span>
            </div>
          ),
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