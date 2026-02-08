import React, { useState } from "react";
import { ChevronLeft, Building2, Code } from "lucide-react";

interface Props {
  onNext: (data: { steps: string; argument: string }) => void;
  onBack: () => void;
  loading: boolean;
}

const Design: React.FC<Props> = ({ onNext, onBack, loading }) => {
  const [steps, setSteps] = useState("");
  const [argument, setArgument] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 sticky top-0 bg-white dark:bg-background-dark z-10 flex items-center border-b border-gray-100">
        <button onClick={onBack} className="size-12 flex items-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-12">
          Rancang Solusi
        </h2>
      </header>

      <div className="flex items-center justify-center gap-3 py-6">
        <div className="h-2 w-2 rounded-full bg-gray-200"></div>
        <div className="h-2 w-8 rounded-full bg-primary"></div>
        <div className="h-2 w-2 rounded-full bg-gray-200"></div>
        <div className="h-2 w-2 rounded-full bg-gray-200"></div>
      </div>

      <div className="p-4 space-y-6 flex-1">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/20 p-1.5 rounded-full text-primary">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Tahap 2: Design</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Rencanakan langkah-langkah strategis untuk menyikapi kasus.
          </p>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full h-36 bg-zinc-50 dark:bg-zinc-800 border-gray-100 rounded-lg p-4 resize-none"
            placeholder="Misal: Bertabayyun, bermusyawarah..."
          />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/20 p-1.5 rounded-full text-primary">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Tahap 3: Development</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Kembangkan argumen logis solusi ini mencerminkan Akhlak Terpuji.
          </p>
          <textarea
            value={argument}
            onChange={(e) => setArgument(e.target.value)}
            className="w-full h-36 bg-zinc-50 dark:bg-zinc-800 border-gray-100 rounded-lg p-4 resize-none"
            placeholder="Berikan alasan logis..."
          />
        </div>
      </div>

      <div className="mt-auto flex gap-4 p-4 pb-10">
        <button
          onClick={onBack}
          className="flex-1 h-12 border-2 rounded-xl font-bold"
        >
          Kembali
        </button>
        <button
          disabled={loading || !steps || !argument}
          onClick={() => onNext({ steps, argument })}
          className="flex-1 h-12 bg-primary text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
};

export default Design;
