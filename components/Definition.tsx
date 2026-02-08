import React from "react";
import {
  ChevronLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Definition: React.FC<Props> = ({ onNext, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={onBack}
          className="size-10 flex items-center justify-center rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-10">
          Pengertian Akhlak Terpuji
        </h2>
      </header>

      <main className="flex-1 p-4">
        <div className="w-full bg-gradient-to-br from-emerald-100 to-primary/30 dark:from-emerald-900/40 p-10 flex flex-col items-center justify-center rounded-xl border border-emerald-50">
          <div className="bg-white/90 dark:bg-emerald-800/50 p-6 rounded-full shadow-lg text-primary">
            <Sparkles className="w-14 h-14" />
          </div>
          <p className="mt-6 font-bold text-emerald-800 dark:text-emerald-100">
            Berpikir Kritis & Berakhlak Mulia
          </p>
        </div>

        <div className="mt-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="bg-primary/10 p-10 flex items-center justify-center text-primary">
            <BookOpen className="w-14 h-14" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="w-5 h-5 text-primary" />
              <p className="text-xl font-bold">Definisi Akhlak Terpuji</p>
            </div>
            <div className="h-1 w-12 bg-primary rounded-full mb-4"></div>
            <p className="text-[#4a6352] dark:text-gray-300 leading-relaxed">
              Sikap dan perilaku yang sesuai dengan ajaran Islam, membawa
              manfaat bagi diri sendiri dan orang lain, serta mencerminkan
              keridhaan Allah SWT.
            </p>
          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Macam-Macam Akhlak</h3>
            <span className="text-xs font-bold text-primary uppercase">
              Lihat Semua
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-4">
            {["Jujur", "Amanah", "Sabar", "Rendah Hati"].map((tag, i) => (
              <div
                key={i}
                className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 px-5"
              >
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-100">
                  {tag}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="p-4 mt-auto">
        <button
          onClick={onNext}
          className="w-full bg-primary text-black font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>Pelajari Lebih Lanjut</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Definition;
