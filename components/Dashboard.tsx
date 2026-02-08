import React from "react";
import { Screen } from "../types";
import { BookOpen, MessageCircle, HelpCircle } from "lucide-react";

interface Props {
  onStart: () => void;
  onMenu: (screen: Screen) => void;
}

const Dashboard: React.FC<Props> = ({ onStart, onMenu }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 justify-between border-b border-gray-100 dark:border-gray-800">
        <div
          className="flex size-10 shrink-0 items-center overflow-hidden rounded-full border border-primary/20 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKGIBQYGLuxwHINchtv5GjddYtT-fdHXH2xGKcThFVkP2CG7wXVkoRmSJmcyr6wrwiEjdZMLIOPSsl4a45L5M86iDzEf6FLvV6hDG0zMbUMF-_5hwtsojTjdkF6oSsEaD1Ze30vPaKvr-KYZTv1gXZnHm21k9vQ9XJWnn_6Ci04GS131sa3cXhrvVGScbrrXuwTmIpSodLCGnZWu4polSn9UyQdkpK6X130FO3oMolwQDWtJ7oXdMfIXk3oTnkxutv6PFBmC8nvQs")',
          }}
        ></div>
        <h2 className="text-[#111813] dark:text-white text-base font-bold leading-tight tracking-tight flex-1 text-center font-display">
          PAI Critical Thinking
        </h2>
        <div className="w-10"></div>
      </nav>

      <main className="flex-1 pb-24">
        <header className="p-4 pt-6">
          <div className="flex flex-row gap-4 items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 border-2 border-primary shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIZKnanlHIA9u3wnLXb9v9hY0F-anxRA9tq3ICdwWKsCH2-ddEhhChnO-snPIVFeWavZ-Xr6FCzvL5_7ZIImHDiacd53hOhOsljZLQq2JMCiGpS8W1RV275E8r-G6Oz06odmNqIUgbJVJIme0mdKAnIIR6gF6Ew38KuOrE0luXnEyhLxmBQCaPb_CbGOOoG5yctgR2J1WTYxmi90yrarP3CntbTB1H5mYmojKlCPg-ZypxmP4YhFQVp2bAgc79LVJUQRm0i6HyA4o")',
              }}
            ></div>
            <div className="flex flex-col">
              <p className="text-[#111813] dark:text-white text-xl font-bold leading-tight font-display">
                Assalamu'alaikum, Ahmad
              </p>
              <p className="text-[#61896f] dark:text-primary/80 text-sm font-normal">
                Mari berpikir kritis hari ini.
              </p>
            </div>
          </div>
        </header>

        <section className="px-4 py-2">
          <div className="flex flex-col items-stretch justify-start rounded-xl shadow-lg bg-white dark:bg-zinc-900 overflow-hidden">
            <div
              className="relative w-full bg-center bg-no-repeat aspect-video bg-cover"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuClWerzi6_ml74YT6nhIo1UR2pJQqDaMM8uBMdS6zu102TSrVz6HQKjAidAgu9d5mXusQgVK1W2IBgOua2DPdxdjmkxv1BRq4Kz-1qZaL8r2KuQSuG3_GCE6TvlbUWLSJt8I9mlCmzAPiWwkWlh-dhWoHw-S7235J3sIxr1m1EY_JrTU9Q_M1bTc4xq0C1PvHYICIxJjKbNsUEyk8uTOgoztmRhVWGt00LZoHZtQN6YNMwYtPatRpCGT0K2WjumevmW-_FG-_EpRBg")',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-4">
                <span className="px-2 py-1 rounded-md bg-accent-gold text-white text-[10px] font-bold uppercase tracking-wider">
                  Tentang Aplikasi
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 p-5">
              <p className="text-[#111813] dark:text-white text-lg font-bold leading-tight font-display">
                Aplikasi Belajar PAI
              </p>
              <p className="text-[#111813] dark:text-zinc-300 text-sm font-normal leading-relaxed">
                Aplikasi ini dirancang untuk membantu siswa memahami nilai-nilai
                Akhlak Terpuji secara mendalam melalui aktivitas reflektif dan
                analitis.
              </p>
              <div className="flex items-center justify-end mt-2">
                <button
                  onClick={onStart}
                  className="flex items-center justify-center rounded-lg h-9 px-6 bg-primary text-white text-sm font-bold shadow-sm shadow-primary/30 active:scale-95 transition-transform"
                >
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 px-4">
          <h2 className="text-[#111813] dark:text-white text-lg font-bold pb-4 font-display">
            Akses Cepat
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => onMenu("COMPETENCY")}
              className="flex flex-col items-center gap-3 active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <BookOpen className="w-8 h-8" />
              </div>
              <span className="text-sm font-semibold text-[#111813] dark:text-zinc-300">
                Materi
              </span>
            </button>
            <button
              onClick={() => onMenu("ANALYSIS")}
              className="flex flex-col items-center gap-3 active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white transition-colors">
                <MessageCircle className="w-8 h-8" />
              </div>
              <span className="text-sm font-semibold text-[#111813] dark:text-zinc-300">
                Diskusi
              </span>
            </button>
            <button
              onClick={() => onMenu("EVALUATION")}
              className="flex flex-col items-center gap-3 active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 hover:bg-amber-500 hover:text-white transition-colors">
                <HelpCircle className="w-8 h-8" />
              </div>
              <span className="text-sm font-semibold text-[#111813] dark:text-zinc-300">
                Kuis
              </span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
