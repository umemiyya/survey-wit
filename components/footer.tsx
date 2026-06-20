export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Survey Kepuasan Pelanggan
        </p>
        <p className="text-xs text-slate-400">Dibuat dengan Next.js & Prisma</p>
      </div>
    </footer>
  )
}