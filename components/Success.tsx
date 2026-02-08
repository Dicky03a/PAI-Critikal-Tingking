import React from "react";
import { Sparkles, Church } from "lucide-react";

interface Props {
  onDashboard: () => void;
}

const Success: React.FC<Props> = ({ onDashboard }) => {
  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,212,98,0.15)_0%,rgba(16,34,24,0.9)_100%)] pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h1 className="text-[32px] font-bold italic leading-tight mb-8">
          'Bukan siapa yang paling cepat, tetapi siapa yang paling tahan untuk
          jatuh, bangkit, dan belajar.'
        </h1>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-primary/30"></div>
          <Church className="w-4 h-4 text-primary/50" />
          <div className="h-[1px] w-12 bg-primary/30"></div>
        </div>

        <h2 className="text-primary text-2xl font-bold mb-2">Terima Kasih</h2>
        <p className="text-white/80 text-lg max-w-sm mx-auto">
          Semoga menjadi sarana belajar dan refleksi menuju pribadi yang lebih
          baik.
        </p>

        <div className="mt-12 w-full max-w-xs aspect-square relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
          <div
            className="w-full h-full bg-center bg-no-repeat bg-contain opacity-40 mix-blend-screen"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUCaR_kExCuUSpLPW1Qd4tNYoaE6iK8DzsaePsQ-2QIkBjpC9FFAqJtb7Z0N42EsanCIh9OjlTdaGNO1NMrdoxZK5IKmHC0xYtP4w6K7gd45T7Jyj5ZlLWy1OLH9CU_CGlXMnL_ald4vT21cZRVAiHN78q_4H4FHoo5-mrSC1OJ1uj1SjLsCt-ZjRrB_EI1RmGky7KRpfSpyNShlaGVkH7KPl7cgTgCW1MOcs1hnt12RKDUSiQF7dvxRtjRboyq1qnIxMt-CrQ1xc")',
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 pb-12 pt-4">
        <button
          onClick={onDashboard}
          className="w-full h-14 bg-primary text-background-dark text-lg font-bold rounded-xl active:scale-95 transition-transform"
        >
          Kembali ke Dashboard
        </button>
        <p className="mt-4 text-white/40 text-sm">
          Modul Berpikir Kritis PAI • Selesai
        </p>
      </div>
    </div>
  );
};

export default Success;
