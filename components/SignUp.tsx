import React, { useState } from "react";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { signUp } from "../supabase";

interface Props {
  onSignUpSuccess: () => void;
  onNavigateToLogin: () => void;
}

const SignUp: React.FC<Props> = ({ onSignUpSuccess, onNavigateToLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi password
    if (password !== confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    setLoading(true);

    const result = await signUp(email, password, fullName);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        onSignUpSuccess();
      }, 3000);
    } else {
      setError(result.error || "Gagal mendaftar. Coba lagi.");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-background-dark">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-bounce">
          <UserPlus className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Pendaftaran Berhasil!
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-2">
          Silakan cek email Anda untuk verifikasi akun.
        </p>
        <p className="text-sm text-gray-500 text-center">
          Anda akan dialihkan ke halaman login...
        </p>
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
            <UserPlus className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center">Daftar Akun Baru</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Bergabunglah untuk memulai pembelajaran
        </p>
      </header>

      {/* Form */}
      <main className="flex-1 px-6 py-8">
        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Full Name Input */}
          <div>
            <label className="text-sm font-bold block mb-2">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full h-14 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Ahmad Fauzi"
              />
            </div>
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

          {/* Password Input */}
          <div>
            <label className="text-sm font-bold block mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-14 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-12 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Minimal 6 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="text-sm font-bold block mb-2">
              Konfirmasi Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full h-14 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-12 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Ulangi password"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={
              loading || !email || !password || !fullName || !confirmPassword
            }
            className="w-full bg-primary text-white font-bold h-14 rounded-xl shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Mendaftar...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                <span>Daftar</span>
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Sudah punya akun?{" "}
            <button
              onClick={onNavigateToLogin}
              className="text-primary font-bold hover:underline"
            >
              Masuk Sekarang
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

export default SignUp;
