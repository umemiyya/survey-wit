'use client'

import { useState } from 'react'

interface Column<T> {
  key: string
  label: string
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  itemsPerPage?: number
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage))
  const start = (page - 1) * itemsPerPage
  const pageData = data.slice(start, start + itemsPerPage)

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-slate-400">Belum ada data survey.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left font-medium text-slate-400 text-xs uppercase tracking-wide px-4 py-3 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr
                key={i}
                className="border-b border-slate-50 last:border-0 hover:bg-blue-50/30 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-xs text-slate-400">
            Halaman {page} dari {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}
    </div>
  )
}