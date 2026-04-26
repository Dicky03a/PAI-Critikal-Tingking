import React, { useState } from "react";
import { ChevronLeft, Building2, Code } from "lucide-react";

interface Props {
  onNext: (data: { steps: string; argument: string }) => void;
  onBack: () => void;
  loading: boolean;
  initialData?: {
    steps: string;
    argument: string;
  };
}

const Design: React.FC<Props> = ({ onNext, onBack, loading, initialData }) => {
  const [steps, setSteps] = useState(initialData?.steps || "");
  const [argument, setArgument] = useState(initialData?.argument || "");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-950">
      <header className="px-6 py-4 sticky top-0 bg-white dark:bg-zinc-900/95 z-10 flex items-center border-b border-gray-200 dark:border-zinc-800 shadow-sm backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <h2 className="flex-1 text-center font-bold text-xl text-gray-900 dark:text-white">
          Rancang Solusi
        </h2>
        <div className="w-10"></div>
      </header>

      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Rencanakan langkah-langkah strategis untuk menyikapi kasus.
          </p>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full h-40 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 resize-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
            placeholder="Misal: Bertabayyun, bermusyawarah, ijtihad bersama..."
          />
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
            {steps.length} karakter
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Kembangkan argumen logis bahwa solusi ini mencerminkan Akhlak
            Terpuji.
          </p>
          <textarea
            value={argument}
            onChange={(e) => setArgument(e.target.value)}
            className="w-full h-40 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-4 resize-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all"
            placeholder="Berikan alasan logis yang kuat..."
          />
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
            {argument.length} karakter
          </p>
        </div>
      </div>

      <div className="mt-auto flex gap-3 p-6 pb-8 bg-white dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-800">
        <button
          onClick={onBack}
          className="flex-1 h-12 border-2 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-95"
        >
          Kembali
        </button>
        <button
          disabled={loading || !steps || !argument}
          onClick={() => onNext({ steps, argument })}
          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
        >
          {loading ? "Memproses..." : "Lanjut"}
        </button>
      </div>
    </div>
  );
};

export default Design;
