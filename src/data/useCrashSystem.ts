import { useState, useEffect } from "react";

export const useCrashSystem = () => {
  const [isCrashed, setIsCrashed] = useState(false);

  useEffect(() => {
    // Vérifie si déjà crashé dans cette session
    if (sessionStorage.getItem("system_status") === "CRITICAL_ERROR") {
      setCrash();
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Gamma est l'inclinaison latérale, Beta est l'avant/arrière
      // Sur certains devices, le 180° se détecte sur Beta
      if (event.beta && Math.abs(event.beta) > 120) {
        setCrash();
      }
    };

    // Demande la permission iOS si nécessaire
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (e) { console.error("Permission denied"); }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    window.addEventListener("click", requestPermission, { once: true });
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  const setCrash = () => {
    setIsCrashed(true);
    sessionStorage.setItem("system_status", "CRITICAL_ERROR");
    document.body.classList.add("is-crashed");
  };

  return { isCrashed, setCrash };
};