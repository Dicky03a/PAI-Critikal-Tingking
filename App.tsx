import React, { useState, useEffect } from "react";
import { Screen, UserActivity } from "./types";
import Dashboard from "./components/Dashboard";
import Guide from "./components/Guide";
import Competency from "./components/Competency";
import Definition from "./components/Definition";
import Analysis from "./components/Analysis";
import Design from "./components/Design";
import Implementation from "./components/Implementation";
import Evaluation from "./components/Evaluation";
import Success from "./components/Success";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import {
  saveActivity,
  onAuthStateChange,
  getCurrentUser,
  signOut,
} from "./supabase";
import { LogOut } from "lucide-react";

type AuthScreen = "LOGIN" | "SIGNUP" | "FORGOT_PASSWORD";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("LOGIN");
  const [currentScreen, setCurrentScreen] = useState<Screen>("DASHBOARD");
  const [activityData, setActivityData] = useState<UserActivity>({});
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userName, setUserName] = useState("");

  // Cek status autentikasi saat pertama kali load
  useEffect(() => {
    checkAuth();

    // Subscribe ke perubahan auth state
    const {
      data: { subscription },
    } = onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setIsAuthenticated(true);
        setUserName(
          session.user.user_metadata?.full_name || session.user.email || "",
        );
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        setUserName("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const user = await getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setUserName(user.user_metadata?.full_name || user.email || "");
    }
    setCheckingAuth(false);
  };

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      setIsAuthenticated(false);
      setCurrentScreen("DASHBOARD");
    }
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleSaveStep = async (
    step: keyof UserActivity,
    data: any,
    nextScreen: Screen,
  ) => {
    setIsLoading(true);
    setActivityData((prev) => ({ ...prev, [step]: data }));

    // Persist to Supabase
    await saveActivity(step, data);

    setIsLoading(false);
    navigateTo(nextScreen);
  };

  // Loading state saat cek autentikasi
  if (checkingAuth) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen shadow-2xl bg-white dark:bg-background-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-primary">Memuat...</p>
        </div>
      </div>
    );
  }

  // Tampilkan halaman auth jika belum login
  if (!isAuthenticated) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen shadow-2xl bg-white dark:bg-background-dark">
        {authScreen === "LOGIN" && (
          <Login
            onLoginSuccess={() => setIsAuthenticated(true)}
            onNavigateToSignUp={() => setAuthScreen("SIGNUP")}
            onNavigateToForgotPassword={() => setAuthScreen("FORGOT_PASSWORD")}
          />
        )}
        {authScreen === "SIGNUP" && (
          <SignUp
            onSignUpSuccess={() => setAuthScreen("LOGIN")}
            onNavigateToLogin={() => setAuthScreen("LOGIN")}
          />
        )}
        {authScreen === "FORGOT_PASSWORD" && (
          <ForgotPassword onNavigateToLogin={() => setAuthScreen("LOGIN")} />
        )}
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "DASHBOARD":
        return (
          <Dashboard
            onStart={() => navigateTo("GUIDE")}
            onMenu={(s) => navigateTo(s)}
          />
        );
      case "GUIDE":
        return (
          <Guide
            onNext={() => navigateTo("COMPETENCY")}
            onBack={() => navigateTo("DASHBOARD")}
          />
        );
      case "COMPETENCY":
        return (
          <Competency
            onNext={() => navigateTo("DEFINITION")}
            onBack={() => navigateTo("GUIDE")}
          />
        );
      case "DEFINITION":
        return (
          <Definition
            onNext={() => navigateTo("ANALYSIS")}
            onBack={() => navigateTo("COMPETENCY")}
          />
        );
      case "ANALYSIS":
        return (
          <Analysis
            onNext={(data) => handleSaveStep("analysis", data, "DESIGN")}
            onBack={() => navigateTo("DEFINITION")}
            loading={isLoading}
          />
        );
      case "DESIGN":
        return (
          <Design
            onNext={(data) => handleSaveStep("design", data, "IMPLEMENTATION")}
            onBack={() => navigateTo("ANALYSIS")}
            loading={isLoading}
          />
        );
      case "IMPLEMENTATION":
        return (
          <Implementation
            onNext={(data) =>
              handleSaveStep("implementation", data, "EVALUATION")
            }
            onBack={() => navigateTo("DESIGN")}
            loading={isLoading}
          />
        );
      case "EVALUATION":
        return (
          <Evaluation
            onNext={(data) => handleSaveStep("evaluation", data, "SUCCESS")}
            onBack={() => navigateTo("IMPLEMENTATION")}
            loading={isLoading}
          />
        );
      case "SUCCESS":
        return <Success onDashboard={() => navigateTo("DASHBOARD")} />;
      default:
        return (
          <Dashboard
            onStart={() => navigateTo("GUIDE")}
            onMenu={(s) => navigateTo(s)}
          />
        );
    }
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-screen shadow-2xl bg-white dark:bg-background-dark overflow-x-hidden relative">
      {renderScreen()}

      {/* Logout Button - hanya tampil di Dashboard */}
      {currentScreen === "DASHBOARD" && (
        <button
          onClick={handleLogout}
          className="fixed top-4 right-4 z-50 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 active:scale-95 transition-all"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-primary">Menyimpan Aktivitas...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
