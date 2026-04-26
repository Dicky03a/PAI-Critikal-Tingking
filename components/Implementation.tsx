import React, { useState } from "react";
import { ChevronLeft, PenLine, Camera, Send } from "lucide-react";

interface Props {
  onNext: (data: { journal: string }) => void;
  onBack: () => void;
  loading: boolean;
}

const Implementation: React.FC<Props> = ({ onNext, onBack, loading }) => {
  const [journal, setJournal] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 sticky top-0 bg-white dark:bg-background-dark z-10 flex items-center border-b border-gray-100">
        <button onClick={onBack} className="size-12 flex items-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-12">
          Penerapan Nyata
        </h2>
      </header>

      

      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex flex-col items-center py-6 text-center">
          <h3 className="text-2xl font-bold">Berbagi Pengalaman Nyata</h3>
          <p className="text-gray-500 mt-2 px-4">
            Ceritakan pengalaman pribadimu menerapkan sikap{" "}
            <span className="text-primary font-bold">jujur atau amanah</span>.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              className="w-full h-48 bg-white dark:bg-zinc-800 border rounded-xl p-4 resize-none"
              placeholder="Tuliskan cerita Anda di sini..."
            />
          </div>

          <div className="rounded-xl overflow-hidden relative h-40 shadow-sm mt-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALseI7EN3IWgSirfpPVig9JYPLtlasMDeiwEj_XCWEtHfzscgIlA0tMY9f8Ucc42ARZfyxEyM6tQTkJ5rDyQHnBCZW8RzJSOZyYML0KgAasoujeU6lPT2GtNAObKYxri3cVkmoo_zs2i-rCgig827GyKRSys3fvEVg08eq6ym3kgQMUguS7jSkXjRpH75ZYChzhLRMzSBEVR57Hgr4OInk5ijxtjijDhfVUomrcXHADvAmaBNWfv77WWFUpfjfD_qLhvlDq3JefFc"
              className="w-full h-full object-cover opacity-80"
              alt="Documentation"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="p-4 mt-auto mb-6">
        <button
          disabled={loading || !journal}
          onClick={() => onNext({ journal })}
          className="w-full bg-primary text-white font-bold h-14 rounded-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          <span>Simpan</span>
        </button>
      </div>
    </div>
  );
};

export default Implementation;
