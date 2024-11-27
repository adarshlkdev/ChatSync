import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import "./App.css";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth , onlineUsers } = useAuthStore();
  const {theme} = useThemeStore();

  console.log({onlineUsers});

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/settings"
            element={authUser ? <SettingsPage /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
