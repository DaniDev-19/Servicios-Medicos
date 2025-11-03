import React, { useEffect, useState } from "react";
import '../styles/loader.css';
import icon from './icon';

function Pogress({
  color = "",
  label = "Procesando Solicitud...",
  progressDuration = 4000, // ms
  busIcon
}) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    setPct(0);
    if (!progressDuration || progressDuration <= 0) return;
    const start = Date.now();
    const tick = 80;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / progressDuration) * 100));
      setPct(next);
      if (next >= 100) clearInterval(timer);
    }, tick);
    return () => clearInterval(timer);
  }, [progressDuration]);

  return (
    <div className="pogress-wrapper" aria-live="polite" aria-label={label}>
      {/* Pista del auto (arriba) */}
      <div className="pogress-bus-track" aria-hidden>
        <img
          src={busIcon || icon.bus}
          alt=""
          className="pogress-bus"
          style={{ left: `${pct}%` }}
        />
      </div>

      {/* Barra de progreso (abajo) */}
      <div className="pogress-progress-row">
        <div className="pogress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <div className="pogress-bar-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
        <div className="pogress-meta">
          <span className="pogress-percent">{pct}%</span>
        </div>
      </div>

      {/* Etiqueta opcional debajo */}
      {label && <div className="pogress-label">{label}</div>}
    </div>
  );
}

export default Pogress;