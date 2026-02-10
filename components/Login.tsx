import React, { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn } from "../supabase";

interface Props {
  onLoginSuccess: () => void;
  onNavigateToSignUp: () => void;
  onNavigateToForgotPassword: () => void;
}

const Login: React.FC<Props> = ({
  onLoginSuccess,
  onNavigateToSignUp,
  onNavigateToForgotPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn(email, password);

    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.error || "Gagal login. Periksa email dan password Anda.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-background-dark">
      {/* Header */}
      <header className="p-6 pt-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center shadow-lg">
            <LogIn className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center">Selamat Datang</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Masuk untuk melanjutkan pembelajaran
        </p>
      </header>

      {/* Form */}
      <main className="flex-1 px-6 py-8">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

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
                placeholder="Masukkan password"
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

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={onNavigateToForgotPassword}
              className="text-sm text-primary font-semibold hover:underline"
            >
              Lupa Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-primary text-white font-bold h-14 rounded-xl shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Masuk</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          <span className="text-sm text-gray-500">atau</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Belum punya akun?{" "}
            <button
              onClick={onNavigateToSignUp}
              className="text-primary font-bold hover:underline"
            >
              Daftar Sekarang
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

export default Login;
