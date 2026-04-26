import React, { useState } from "react";
import { ChevronLeft, BadgeCheck, Sparkles, Save } from "lucide-react";

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  loading: boolean;
  initialData?: {
    most_difficult: string;
    challenge_reason: string;
  };
}

const Evaluation: React.FC<Props> = ({
  onNext,
  onBack,
  loading,
  initialData,
}) => {
  const [difficult, setDifficult] = useState(initialData?.most_difficult || "");
  const [reason, setReason] = useState(initialData?.challenge_reason || "");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center border-b border-gray-100">
        <button
          onClick={onBack}
          className="size-12 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-12">
          Evaluasi & Refleksi
        </h2>
      </header>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="pt-6">
          <div className="flex items-center gap-2 text-primary mb-1"></div>
          <h3 className="text-2xl font-bold">Refleksi Diri</h3>
          <p className="text-gray-500 mt-2">
            Terima kasih telah berbagi pengalaman Anda. Mari terus melanjutkan
            proses pembelajaran dengan semangat dan komitmen untuk berkembang
            secara berkelanjutan.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border rounded-xl p-4 shadow-sm">
            <label className="font-bold block mb-4">
              Nilai akhlak apa yang paling sulit kamu terapkan?
            </label>
            <select
              value={difficult}
              onChange={(e) => setDifficult(e.target.value)}
              className="w-full h-12 rounded-lg border-gray-200 bg-zinc-50 dark:bg-zinc-800 focus:ring-primary"
            >
              <option disabled value="">
                Pilih Nilai Akhlak
              </option>
              <option value="jujur">Jujur (As-Sidiq)</option>
              <option value="sabar">Sabar (As-Sabr)</option>
              <option value="amanah">Amanah (Al-Amanah)</option>
            </select>
          </div>

          <div className="bg-white dark:bg-zinc-900 border rounded-xl p-4 shadow-sm">
            <label className="font-bold block mb-4">
              Mengapa hal tersebut menjadi tantangan bagimu?
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-40 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 resize-none border-gray-200"
              placeholder="Tuliskan isi pikiranmu secara jujur..."
            />
          </div>
        </div>
      </div>

      <div className="p-4 mb-10">
        <button
          disabled={loading || !difficult || !reason}
          onClick={() =>
            onNext({ most_difficult: difficult, challenge_reason: reason })
          }
          className="w-full bg-primary h-14 rounded-xl text-white font-bold flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>Simpan Refleksi</span>
        </button>
        <p className="text-center text-xs text-gray-400 italic mt-4">
          "Maka barangsiapa mengerjakan kebaikan sebesar dzarrah, niscaya dia
          akan melihatnya."
        </p>
      </div>
    </div>
  );
};

export default Evaluation;
