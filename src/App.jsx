import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useRef, useState } from "react";
import Home from "./components/Home";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import EntrySplash from "./components/EntrySplash";

function App() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const hasCheckedReload = useRef(false);
  const [showStartupSplash, setShowStartupSplash] = useState(true);
  const [startupLeaving, setStartupLeaving] = useState(false);

  useEffect(() => {
    const visibleMs = 2400;
    const fadeMs = 700;

    const t1 = setTimeout(() => setStartupLeaving(true), visibleMs);
    const t2 = setTimeout(() => setShowStartupSplash(false), visibleMs + fadeMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (hasCheckedReload.current) {
      return;
    }

    hasCheckedReload.current = true;
    const navEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navEntry?.type === "reload";

    if (isReload && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Header />
      {showStartupSplash ? (
        <>
          <EntrySplash leaving={startupLeaving} showText={false} />
          <div className="invisible">
            <Outlet />
          </div>
        </>
      ) : navigation.state === "loading" ? (
        <div className="flex min-h-[60vh] items-center justify-center bg-normalbg px-6 py-16 dark:bg-black">
          <div className="rounded-2xl border border-primary/15 bg-white px-8 py-5 text-lg font-semibold text-primary shadow-sm dark:border-primary/20 dark:bg-gray-900 dark:text-light">
            Loading...
          </div>
        </div>
      ) : (
        <Outlet />
      )}

      <Footer />
    </>
  );
}

export default App;
