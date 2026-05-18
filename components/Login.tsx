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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-950 px-4 py-12 justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100 dark:border-zinc-800 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 pb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Selamat Datang</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Masuk untuk melanjutkan pembelajaran
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-4">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-4">
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
                      className="w-full h-14 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-2xl pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 transition-all outline-none"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-center mb-2 ml-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Password</label>
                    <button
                      type="button"
                      onClick={onNavigateToForgotPassword}
                      className="text-xs text-primary font-bold hover:opacity-80 transition-opacity"
                    >
                      Lupa?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-14 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-2xl pl-12 pr-12 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 transition-all outline-none"
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Masuk</span>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-50 dark:border-zinc-800">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Belum punya akun?{" "}
                <button
                  onClick={onNavigateToSignUp}
                  className="text-primary font-bold hover:underline"
                >
                  Daftar Sekarang
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

export default Login;
