import React, { useState } from "react";
import { KeyRound, Mail, ArrowLeft, Check } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-background-dark">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Email Terkirim!</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          Kami telah mengirimkan link reset password ke <strong>{email}</strong>
          . Silakan cek inbox atau folder spam Anda.
        </p>
        <button
          onClick={onNavigateToLogin}
          className="w-full max-w-sm bg-primary text-white font-bold h-14 rounded-xl shadow-lg active:scale-95 transition-all"
        >
          Kembali ke Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-background-dark">
      {/* Header */}
      <header className="p-6 pt-8">
        <button
          onClick={onNavigateToLogin}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Kembali</span>
        </button>

        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center shadow-lg">
            <KeyRound className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center">Lupa Password?</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Masukkan email Anda untuk reset password
        </p>
      </header>

      {/* Form */}
      <main className="flex-1 px-6 py-8">
        <form onSubmit={handleResetPassword} className="space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Info Alert */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-blue-700 dark:text-blue-400 text-sm">
              Kami akan mengirimkan link reset password ke email Anda. Pastikan
              email yang Anda masukkan sudah terdaftar.
            </p>
          </div>

          {/* Email Input */}
          <div>
            <label className="text-sm font-bold block mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="nama@email.com"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-primary text-white font-bold h-14 rounded-xl shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                <span>Kirim Link Reset</span>
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Ingat password Anda?{" "}
            <button
              onClick={onNavigateToLogin}
              className="text-primary font-bold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-xs text-gray-500">PAI Critical Thinking © 2025</p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
