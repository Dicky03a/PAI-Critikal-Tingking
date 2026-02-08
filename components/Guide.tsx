import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Library,
  BookOpen,
  Brain,
  Heart,
} from "lucide-react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Guide: React.FC<Props> = ({ onNext, onBack }) => {
  const steps = [
    {
      num: 1,
      Icon: Library,
      title: "Pilih menu materi",
      desc: "Akses berbagai topik PAI yang telah dikurasi.",
    },
    {
      num: 2,
      Icon: BookOpen,
      title: "Baca materi berurutan",
      desc: "Pahami konsep secara bertahap dari dasar hingga analisis.",
    },
    {
      num: 3,
      Icon: Brain,
      title: "Aktivitas berpikir kritis",
      desc: "Latih kemampuan analisis dengan studi kasus.",
    },
    {
      num: 4,
      Icon: Heart,
      title: "Isi refleksi diri",
      desc: "Evaluasi perkembangan belajar Anda.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
      <div className="flex items-center p-4 sticky top-0 bg-white dark:bg-background-dark z-10 border-b border-gray-100 dark:border-emerald-900/30">
        <button
          onClick={onBack}
          className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-emerald-900/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-10">
          Petunjuk Penggunaan
        </h2>
      </div>

      <div className="p-4">
        <div
          className="w-full relative h-[180px] rounded-xl overflow-hidden shadow-sm bg-emerald-100 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(17, 212, 82, 0.1), rgba(17, 212, 82, 0.3)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDnGFiVI2AeFdoyZa7SRwhZIELPVkKItVNfNQevFFre3MktPjgVl3VwoHFcRwcmdwPmq_0aj-iLJSCD4L0rDNEwIQ4XqxmiWPYY4i5MOE4CqsoCwPd6kjmJB6zxqDe06E5Gj0leScUhHaJmONBEJybEIPa02kUyztpisjWq9zN5_dzYWrx8im8TrXrbp8IgiAwhLob_M5fm3p0UY7zaQxHo6v6uCzoZCPrXb1qk1-zTpwqIXAz5qAEBlYsokNJp8z7MwMM0EDDEMro")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"></div>
          <div className="relative p-5 h-full flex flex-col justify-end">
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block uppercase w-fit">
              Panduan Belajar
            </span>
            <p className="text-white text-sm font-medium opacity-90">
              Maksimalkan potensi berpikir kritis Anda.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-bold">Mulai Belajar Disini</h3>
          <p className="text-gray-600 dark:text-emerald-100/70 mt-2">
            Ikuti 4 langkah mudah untuk menguasai berpikir kritis Islami.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {steps.map((step, idx) => {
            const IconComponent = step.Icon;
            return (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className="w-[2px] bg-primary/20 flex-1 my-1"></div>
                  )}
                </div>
                <div className="pb-4">
                  <span className="bg-primary/20 dark:bg-primary/30 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    Langkah {step.num}
                  </span>
                  <p className="font-bold text-lg mt-1">{step.title}</p>
                  <p className="text-sm text-gray-600 dark:text-emerald-100/60 mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-4 pb-10">
        <button
          onClick={onNext}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <span>Saya Mengerti, Mulai Sekarang</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Guide;
