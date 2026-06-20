import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ClipboardList, GitBranch, LineChart } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium text-blue-600 mb-4">
              PT Pink Service Indonesia
            </p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
              Sistem klasifikasi tingkat kepuasan pelanggan
            </h1>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Ukur kepuasan pelanggan secara digital dan dapatkan klasifikasi
              otomatis menggunakan algoritma Random Forest yang akurat dan
              terpercaya.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/user/survey">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  Isi survey
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Masuk
                </Button>
              </Link>
            </div>
          </div>

          {/* Signature visual: decision tree, literal nod to Random Forest */}
          <div className="hidden lg:flex bg-blue-50/60 rounded-2xl p-10 h-80 items-center justify-center">
            <svg viewBox="0 0 280 180" className="w-full h-full max-w-sm">
              <line x1="140" y1="26" x2="80" y2="76" stroke="#85B7EB" strokeWidth="2" />
              <line x1="140" y1="26" x2="200" y2="76" stroke="#85B7EB" strokeWidth="2" />
              <line x1="80" y1="76" x2="44" y2="130" stroke="#85B7EB" strokeWidth="2" />
              <line x1="80" y1="76" x2="116" y2="130" stroke="#85B7EB" strokeWidth="2" />
              <line x1="200" y1="76" x2="166" y2="130" stroke="#85B7EB" strokeWidth="2" />
              <line x1="200" y1="76" x2="236" y2="130" stroke="#85B7EB" strokeWidth="2" />

              <circle cx="140" cy="26" r="11" fill="#0C447C" />
              <circle cx="80" cy="76" r="9" fill="#185FA5" />
              <circle cx="200" cy="76" r="9" fill="#185FA5" />
              <circle cx="44" cy="130" r="7" fill="#378ADD" />
              <circle cx="116" cy="130" r="7" fill="#378ADD" />
              <circle cx="166" cy="130" r="7" fill="#378ADD" />
              <circle cx="236" cy="130" r="7" fill="#378ADD" />

              <circle cx="44" cy="130" r="7" fill="#1D9E75" opacity="0.9" />
              <circle cx="236" cy="130" r="7" fill="#D85A30" opacity="0.85" />

              <text x="140" y="160" textAnchor="middle" fontSize="11" fill="#185FA5">
                pohon keputusan
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-50/60 border-y border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              Fitur utama
            </h2>
            <p className="text-lg text-slate-500">
              Sistem lengkap untuk manajemen kepuasan pelanggan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-8">
              <div className="bg-blue-50 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                <ClipboardList className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2.5">
                Survey digital
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Formulir survey yang mudah diisi dengan validasi real-time
                untuk pengumpulan data yang akurat.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-8">
              <div className="bg-blue-50 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                <GitBranch className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2.5">
                Klasifikasi Random Forest
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Algoritma machine learning yang menggabungkan banyak pohon
                keputusan untuk klasifikasi kepuasan dengan akurasi tinggi.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-8">
              <div className="bg-blue-50 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
                <LineChart className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2.5">
                Dashboard monitoring
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Dashboard real-time untuk memantau tren kepuasan pelanggan dan
                membuat keputusan berdasarkan data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-6">
              Tentang sistem kami
            </h2>
            <p className="text-lg text-slate-500 mb-4 leading-relaxed">
              Sistem klasifikasi tingkat kepuasan pelanggan menggunakan
              teknologi Random Forest untuk memberikan insight yang akurat
              tentang kepuasan pelanggan PT Pink Service Indonesia.
            </p>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Dengan interface yang mudah digunakan dan analisis yang
              komprehensif, platform ini membantu manajemen membuat keputusan
              strategis untuk meningkatkan kualitas layanan.
            </p>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700 text-sm font-medium">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-0.5">
                    Akurasi tinggi
                  </h4>
                  <p className="text-slate-500 text-sm">
                    Model Random Forest dengan akurasi 94%
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700 text-sm font-medium">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-0.5">
                    Mudah digunakan
                  </h4>
                  <p className="text-slate-500 text-sm">
                    Interface yang intuitif dan responsif
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700 text-sm font-medium">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-0.5">
                    Insight real-time
                  </h4>
                  <p className="text-slate-500 text-sm">
                    Dashboard monitoring yang selalu terbarui
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/60 rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="w-full max-w-xs">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-4">
                <p className="text-xs text-slate-400 mb-1">Probabilitas</p>
                <p className="text-3xl font-semibold text-slate-900">94%</p>
                <p className="text-xs text-blue-600 mt-1">Sangat puas</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <p className="text-xs text-slate-400 mb-2">Distribusi pohon</p>
                <div className="flex items-end gap-1.5 h-12">
                  <div className="flex-1 bg-blue-200 rounded-sm h-[60%]" />
                  <div className="flex-1 bg-blue-300 rounded-sm h-[85%]" />
                  <div className="flex-1 bg-blue-600 rounded-sm h-full" />
                  <div className="flex-1 bg-blue-300 rounded-sm h-[70%]" />
                  <div className="flex-1 bg-blue-200 rounded-sm h-[45%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}