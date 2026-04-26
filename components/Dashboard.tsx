import React, { useEffect, useState } from "react";
import { Screen } from "../types";
import { BookOpen, MessageCircle, HelpCircle } from "lucide-react";
import { getCurrentUser } from "../supabase";

interface Props {
  onStart: () => void;
  onMenu: (screen: Screen) => void;
}

const Dashboard: React.FC<Props> = ({ onStart, onMenu }) => {
  const [userName, setUserName] = useState("Ahmad");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = await getCurrentUser();
    if (user) {
      // Ambil nama dari user metadata, fallback ke email atau default
      const name =
        user.user_metadata?.full_name || user.email?.split("@")[0] || "Ahmad";
      setUserName(name);
      setUserEmail(user.email || "");
    }
  };

  // Fungsi untuk mendapatkan greeting berdasarkan waktu
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Assalamu'alaikum";
    if (hour < 18) return "Assalamu'alaikum";
    return "Assalamu'alaikum";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-950">
      <main className="flex-1 pb-24 px-6">
        <header className="pt-8 pb-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">
              {getGreeting()}, <span className="text-primary">{userName}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base font-medium">
              Mari berpikir kritis hari ini.
            </p>
            {userEmail && (
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                {userEmail}
              </p>
            )}
          </div>
        </header>

        <section className="py-6">
          <div className="flex flex-col items-stretch justify-start rounded-2xl shadow-md bg-white dark:bg-zinc-900 overflow-hidden border border-gray-100 dark:border-zinc-800">
            <div
              className="relative w-full bg-center bg-no-repeat aspect-video bg-cover"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuClWerzi6_ml74YT6nhIo1UR2pJQqDaMM8uBMdS6zu102TSrVz6HQKjAidAgu9d5mXusQgVK1W2IBgOua2DPdxdjmkxv1BRq4Kz-1qZaL8r2KuQSuG3_GCE6TvlbUWLSJt8I9mlCmzAPiWwkWlh-dhWoHw-S7235J3sIxr1m1EY_JrTU9Q_M1bTc4xq0C1PvHYICIxJjKbNsUEyk8uTOgoztmRhVWGt00LZoHZtQN6YNMwYtPatRpCGT0K2WjumevmW-_FG-_EpRBg")',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-5">
                <span className="px-3 py-1.5 rounded-lg bg-primary/95 text-white text-xs font-bold uppercase tracking-widest shadow-md">
                  Tentang Aplikasi
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 p-6">
              <div>
                <p className="text-gray-900 dark:text-white text-2xl font-bold leading-snug">
                  Aplikasi Belajar
                  <br />
                  Pendidikan Agama Islam
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-normal leading-relaxed">
                Aplikasi ini dirancang untuk membantu siswa memahami nilai-nilai
                Akhlak Terpuji secara mendalam melalui aktivitas reflektif dan
                analitis yang menantang.
              </p>
              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={onStart}
                  className="flex items-center justify-center rounded-lg h-11 px-8 bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all duration-200"
                >
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-2">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold pb-6">
            Akses Cepat
          </h2>
          <div className="grid grid-cols-3 gap-5">
            <button
              onClick={() => onMenu("COMPETENCY")}
              className="flex flex-col items-center gap-4 group active:scale-95 transition-transform duration-200"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary group-hover:from-primary group-hover:to-primary group-hover:text-white shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-200">
                <BookOpen className="w-10 h-10" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-200 text-center">
                Materi
              </span>
            </button>
            <button
              onClick={() => onMenu("ANALYSIS")}
              className="flex flex-col items-center gap-4 group active:scale-95 transition-transform duration-200"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100/80 to-orange-50 flex items-center justify-center text-orange-600 group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white shadow-sm group-hover:shadow-lg group-hover:shadow-orange/20 transition-all duration-200">
                <MessageCircle className="w-10 h-10" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-200 text-center">
                Diskusi
              </span>
            </button>
            <button
              onClick={() => onMenu("EVALUATION")}
              className="flex flex-col items-center gap-4 group active:scale-95 transition-transform duration-200"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100/80 to-amber-50 flex items-center justify-center text-amber-600 group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white shadow-sm group-hover:shadow-lg group-hover:shadow-amber/20 transition-all duration-200">
                <HelpCircle className="w-10 h-10" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-200 text-center">
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
