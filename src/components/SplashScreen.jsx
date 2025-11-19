import { useEffect, useState } from "react";
import "./SplashScreen.css";

const EXIT_DURATION = 500;

const SplashScreen = ({ isActive }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    let timeout;

    if (!isActive) {
      timeout = setTimeout(() => setShouldRender(false), EXIT_DURATION + 80);
    } else {
      setShouldRender(true);
    }

    return () => timeout && clearTimeout(timeout);
  }, [isActive]);

  if (!shouldRender) return null;

  return (
    <div
      className={`splash-overlay ${
        isActive ? "splash-overlay--visible" : "splash-overlay--hidden"
      }`}
      data-splash-fallback
    >
      <div className="splash-panel">
        <div className="page-stack">
          <span className="page page-one" />
          <span className="page page-two" />
          <span className="page page-three" />
          <span className="page-shadow" />
        </div>

        <div className="splash-text">
          <span className="splash-brand">UNIONE</span>
          <span className="splash-tagline">SIMPLIFY • LEARN • GROW</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
