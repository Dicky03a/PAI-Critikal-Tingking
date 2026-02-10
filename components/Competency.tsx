import React, { useEffect, useState } from "react";
import { fetchMaterial } from "../supabase";
import { Material } from "../types";
import { ChevronLeft, BookOpenText } from "lucide-react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Competency: React.FC<Props> = ({ onNext, onBack }) => {
  const [material, setMaterial] = useState<Material | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchMaterial("competency");
      if (data) setMaterial(data);
    };
    load();
  }, []);

  const goals = [
    {
      title: "Memahami konsep Akhlak Terpuji",
      desc: "Definisi dan urgensi dalam kehidupan",
    },
    {
      title: "Menganalisis contoh perilaku",
      desc: "Studi kasus tokoh inspiratif",
    },
    {
      title: "Menarik kesimpulan & sikap",
      desc: "Implementasi nyata pengambilan keputusan",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 sticky top-0 z-10 bg-background-light dark:bg-background-dark">
        <button
          onClick={onBack}
          className="size-12 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-12">
          Kompetensi & Tujuan
        </h2>
      </header>

      <main className="flex-1 p-4">
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 overflow-hidden shadow-sm">
          <div
            className="w-full aspect-video bg-cover bg-center"
            style={{
              backgroundImage: `url("${material?.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDlu-yoCAFmEOzvMTEGCOlJxrgqQhs8wxugwDCitNHfPiMZthOWFc7PjsOu7TB09-o-k_7e3uQTgm5gh17ubifYG6u0fKUyBHa337k_BXYHdgSBAceFhik_nyH8Q970qEy37aNF7i7rG-dltdQtIzxccaUqcWFyIhU_PaFzYhU0Rc5yBUhVHspj5DNHlRgzuVJmTRqBCWnBh-9EaLXhxQLCItlysOK_Y1j6ftsUeye89zhpxHelBvDWZHnHFrPQ0P6G3bLP73go_Ug"}")`,
            }}
          ></div>
          <div className="p-5">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <BookOpenText className="w-5 h-5" />
              <p className="text-lg font-bold">
                {material?.title || "Kompetensi Dasar"}
              </p>
            </div>
            <p className="mt-3 text-emerald-800 dark:text-emerald-100/80 leading-relaxed">
              {material?.content?.body ||
                "Peserta didik mampu memahami dan menerapkan kemampuan berpikir kritis dalam perspektif Pendidikan Agama Islam dengan menganalisis informasi dan permasalahan secara logis, objektif, dan bertanggung jawab, serta mengaitkannya dengan nilai-nilai keislaman untuk membentuk sikap bijak, perilaku terpuji, dan akhlak mulia dalam kehidupan sehari-hari.."}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold px-1 mb-4">Tujuan Pembelajaran</h2>
          <div className="space-y-2">
            {goals.map((g, i) => (
              <label
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={i === 0}
                  readOnly
                  className="mt-1 h-6 w-6 rounded-full border-primary text-primary focus:ring-0"
                />
                <div>
                  <p className="font-bold leading-tight">{g.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{g.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-4 border-t border-gray-100 dark:border-gray-800 bg-background-light dark:bg-background-dark">
        <button
          onClick={onNext}
          className="w-full bg-primary text-white font-bold h-14 rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          Mulai Belajar
        </button>
        <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-4">
          Materi: Berpikir Kritis (PAI)
        </p>
      </footer>
    </div>
  );
};

export default Competency;
