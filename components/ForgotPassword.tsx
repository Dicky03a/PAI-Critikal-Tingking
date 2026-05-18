import React, { useState } from "react";
import { KeyRound, Mail, ArrowLeft, Check, Loader2 } from "lucide-react";
import { resetPassword } from "../supabase";

interface Props {
  onNavigateToLogin: () => void;
}

const ForgotPassword: React.FC<Props> = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await resetPassword(email);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || "Gagal mengirim email reset. Coba lagi.");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-zinc-950">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl p-10 text-center border border-gray-100 dark:border-zinc-800">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Check className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Email Terkirim!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Kami telah mengirimkan link reset password ke <strong>{email}</strong>. Silakan cek inbox atau folder spam Anda.
          </p>
          <button
            onClick={onNavigateToLogin}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-950 px-4 py-8 justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100 dark:border-zinc-800 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 pb-4">
            <button
              onClick={onNavigateToLogin}
              className="group flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-primary mb-6 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm uppercase tracking-wider">Kembali</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lupa Password?</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Masukkan email Anda untuk menerima link pemulihan kata sandi
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-4">
            <form onSubmit={handleResetPassword} className="space-y-5">
              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">{error}</p>
                </div>
              )}

              {/* Info Alert */}
              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-2xl p-4">
                <p className="text-primary dark:text-primary/80 text-xs leading-relaxed text-center font-medium">
                  Pastikan email yang Anda masukkan sudah terdaftar. Kami akan mengirimkan instruksi selanjutnya ke alamat tersebut.
                </p>
              </div>

              {/* Email Input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2 ml-1">Alamat Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-2xl pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 transition-all outline-none"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Kirim Link Reset</span>
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-50 dark:border-zinc-800">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Ingat kata sandi Anda?{" "}
                <button
                  onClick={onNavigateToLogin}
                  className="text-primary font-bold hover:underline"
                >
                  Masuk Sekarang
                </button>
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8 font-medium">
          PAI Critical Thinking © 2026
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
