import React, { useState } from "react";
import { ChevronLeft, ArrowRight, BookOpen } from "lucide-react";

interface Props {
  onNext: (data: { relevant_values: string; impact: string }) => void;
  onBack: () => void;
  loading: boolean;
}

const Analysis: React.FC<Props> = ({ onNext, onBack, loading }) => {
  const [relevantValues, setRelevantValues] = useState("");
  const [impact, setImpact] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center sticky top-0 bg-white dark:bg-background-dark z-10">
        <button
          onClick={onBack}
          className="size-12 flex items-center justify-start"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-12">
          Analisis Kasus
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center text-sm font-medium">
            <p>Tahap Analysis (ADDIE)</p>
            <p>Langkah 1 dari 5</p>
          </div>
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-2.5 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "20%" }}></div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-[#f0f9f0] dark:bg-green-950/30 border border-primary/20 rounded-xl p-4 shadow-sm">
            <div
              className="w-full aspect-video bg-cover bg-center rounded-lg mb-4"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxmI3hfy4XNFSDAwldahegAJ2t7aKHZrWNklriAP_d8Q4oolSd2A_5sEsvFYQUMzvN_74JrVrFV50NIMm7XqoOxcgwYvOvcMz9bs9US5P0u-a2YSCYLutJCkHLEWkEeBemhJq2A5kQLU_aflLVrVOif_O-RH_tOZPNnK3C53-1-lW_h27zQjJFsyq9cCP-hFJGrYdc5v7kH7NswFwCsIAQ_pSbi8t2TzAUg8_531S2bWDrHVhyJyCv21QfUdAorylhuwD4QD0KEns")',
              }}
            ></div>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <BookOpen className="w-5 h-5" />
              <p className="text-lg font-bold">Studi Kasus: Kejujuran</p>
            </div>
            <p className="italic text-gray-700 dark:text-gray-300 leading-relaxed">
              "Seorang siswa melihat temannya sedang menyontek saat ujian PAI.
              Namun, ia merasa bimbang apakah harus melaporkannya atau diam saja
              demi menjaga pertemanan."
            </p>
          </div>
        </div>

        <div className="px-4 mt-4">
          <h3 className="text-lg font-bold">Analisis Masalah</h3>
          <p className="text-xs text-gray-500">
            Gunakan kemampuan berpikir kritis Anda untuk menjawab.
          </p>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-bold block mb-2">
              Nilai Akhlak yang Relevan
            </label>
            <input
              value={relevantValues}
              onChange={(e) => setRelevantValues(e.target.value)}
              className="w-full h-14 bg-white dark:bg-zinc-800 border border-gray-200 rounded-xl px-4 focus:ring-primary focus:border-primary"
              placeholder="Contoh: Amanah, Shiddiq, Al-Haq..."
            />
          </div>
          <div>
            <label className="text-sm font-bold block mb-2">
              Dampak Sikap Diam
            </label>
            <textarea
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              className="w-full h-32 bg-white dark:bg-zinc-800 border border-gray-200 rounded-xl p-4 focus:ring-primary focus:border-primary resize-none"
              placeholder="Apa konsekuensi jangka panjang jika dibiarkan?"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t">
        <button
          disabled={loading || !relevantValues || !impact}
          onClick={() => onNext({ relevant_values: relevantValues, impact })}
          className="w-full bg-primary h-14 rounded-xl text-white font-bold text-lg shadow-lg active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <span>Selanjutnya</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Analysis;
