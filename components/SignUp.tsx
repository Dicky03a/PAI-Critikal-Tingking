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
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-zinc-950">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl p-10 text-center border border-gray-100 dark:border-zinc-800">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-bounce">
            <UserPlus className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Pendaftaran Berhasil!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
            Silakan cek email Anda untuk verifikasi akun.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-primary font-bold">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span>Mengalihkan ke Login...</span>
          </div>
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

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Daftar Akun</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Bergabunglah untuk memulai pembelajaran
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">{error}</p>
                </div>
              )}

              {/* Full Name Input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2 ml-1">Nama Lengkap</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full h-12 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-2xl pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 transition-all outline-none text-sm"
                    placeholder="Nama Lengkap"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2 ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-2xl pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 transition-all outline-none text-sm"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-12 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-2xl pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 transition-all outline-none text-sm"
                      placeholder="Minimal 6"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2 ml-1">Konfirmasi</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full h-12 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-2xl pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 transition-all outline-none text-sm"
                      placeholder="Ulangi"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end px-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-primary font-bold flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showPassword ? "Sembunyikan" : "Lihat Password"}
                </button>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading || !email || !password || !fullName || !confirmPassword}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Daftar Sekarang</span>
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-50 dark:border-zinc-800">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Sudah punya akun?{" "}
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
      </div>
    </div>
  );
};

export default SignUp;
