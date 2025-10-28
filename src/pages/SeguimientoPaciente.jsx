import React, { useState } from "react";
import "../index.css";
import icon from "../components/icon";
import { useNavigate } from "react-router-dom";

// Simulación de evolución clínica (puedes reemplazar por datos reales)
const evolucionClinica = [
  { fecha: "2025-10-01", presion: 120, glucosa: 110, temperatura: 36.8 },
  { fecha: "2025-10-05", presion: 125, glucosa: 108, temperatura: 36.7 },
  { fecha: "2025-10-10", presion: 118, glucosa: 105, temperatura: 36.6 },
  { fecha: "2025-10-15", presion: 122, glucosa: 100, temperatura: 36.5 },
];

// Simulación de eventos clínicos (consultas, reposos, seguimientos)
const eventosClinicos = [
  { fecha: "2025-10-01", tipo: "Consulta", detalle: "Diagnóstico: Hipertensión. Tratamiento: Enalapril.", profesional: "Dra. López" },
  { fecha: "2025-10-05", tipo: "Seguimiento", detalle: "Presión controlada. Sin síntomas.", profesional: "Dra. López" },
  { fecha: "2025-10-10", tipo: "Reposo", detalle: "Reposo por 3 días. Observación: Fatiga.", profesional: "Dra. López" },
  { fecha: "2025-10-15", tipo: "Consulta", detalle: "Evolución favorable. Alta médica.", profesional: "Dra. López" },
];

function SeguimientoPaciente() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    anio: "2025",
    mes: "10",
    dia: "",
  });

  // Accesos rápidos a módulos médicos
  const accesos = [
    { icon: icon.user || "👤", label: "Paciente", desc: "Datos personales y contacto" },
    { icon: icon.maletindoctor4 || "📁", label: "Historia Médica", desc: "Historial clínico completo" },
    { icon: icon.estetoscopio2 || "🩺", label: "Consultas", desc: "Consultas realizadas" },
    { icon: icon.pildora || "💊", label: "Medicamentos", desc: "Tratamientos y recetas" },
    { icon: icon.reposo || "🛡️", label: "Reposos", desc: "Reposos médicos" },
    { icon: icon.pulso2 || "📈", label: "Signos Vitales", desc: "Evolución de signos" },
  ];

  // Gráfico simulado de evolución clínica
  const renderFakeChart = () => (
    <div className="seguimiento-fakechart">
      {evolucionClinica.map((d, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div className="seguimiento-bar seguimiento-bar--azul" style={{ height: d.presion / 2 }} title={`Presión: ${d.presion}`}/>
          <div className="seguimiento-bar seguimiento-bar--amarillo" style={{ height: d.glucosa / 2 }} title={`Glucosa: ${d.glucosa}`}/>
          <div className="seguimiento-bar seguimiento-bar--rojo" style={{ height: d.temperatura * 10 }} title={`Temp: ${d.temperatura}`}/>
          <div className="seguimiento-fecha">{d.fecha.slice(5)}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="seguimiento-bg">
      <div className="seguimiento-container">
        {/* Botón volver */}
        <button
          className="btn btn-secondary"
          style={{ marginBottom: 24 }}
          onClick={() => navigate("/admin/Consultas")}
        >
          <span style={{ fontSize: 18, marginRight: 6 }}>←</span> Volver
        </button>

        {/* Título */}
        <h1 className="seguimiento-title">
          Seguimiento Clínico del Juan Perez
        </h1>

        {/* Accesos rápidos */}
        <div className="seguimiento-accesos">
          {accesos.map((a, i) => (
            <div key={i} className="seguimiento-card">
              <img src={a.icon} alt={a.label} className="seguimiento-card-icon" />
              <h2 className="seguimiento-card-title">{a.label}</h2>
              <span className="seguimiento-card-desc">{a.desc}</span>
              <div className="seguimiento-card-actions">
                {/* <button className="btn btn-secondary btn-xs" title="Registrar"><span>✏️</span></button> */}
                <button className="btn btn-secondary btn-xs" title="Editar"><span>editar</span></button>
                <button className="btn btn-secondary btn-xs" title="Ver"><span>ver</span></button>
                <button className="btn btn-secondary btn-xs" title="Descargar"><span>Descargar</span></button>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de evolución clínica */}
        <div className="seguimiento-panel">
          {/* <div className="seguimiento-panel-header">
            <img src={icon.monitorcardiaco || "📈"} alt="Evolución" className="seguimiento-panel-icon" />
            <h2 className="seguimiento-panel-title">Evolución Clínica</h2>
            <div className="seguimiento-panel-actions">
              <button className="btn btn-secondary btn-xs" title="Registrar"><span>✏️</span></button>
              <button className="btn btn-secondary btn-xs" title="Editar"><span>🖊️</span></button>
              <button className="btn btn-secondary btn-xs" title="Ver"><span>👁️</span></button>
              <button className="btn btn-secondary btn-xs" title="Descargar"><span>⬇️</span></button>
              <button className="btn btn-outline btn-xs" style={{ marginLeft: 8 }}>Descargar ▼</button>
            </div>
          </div> */}
          {/* Gráfico simulado */}
          {renderFakeChart()}

          {/* Filtros */}
          <div className="seguimiento-filtros">
            <select
              className="btn btn-outline"
              value={filtros.anio}
              onChange={e => setFiltros(f => ({ ...f, anio: e.target.value }))}
            >
              <option value="2025">Año</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <select
              className="btn btn-outline"
              value={filtros.mes}
              onChange={e => setFiltros(f => ({ ...f, mes: e.target.value }))}
            >
              <option value="10">Mes</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
            <select
              className="btn btn-outline"
              value={filtros.dia}
              onChange={e => setFiltros(f => ({ ...f, dia: e.target.value }))}
            >
              <option value="">Día</option>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <button className="btn btn-primary">Descargar</button>
          </div>
        </div>

        {/* Tabla de eventos clínicos */}
        <div className="seguimiento-tabla-panel">
          <h2 className="seguimiento-tabla-title">Eventos Clínicos Recientes</h2>
          <table className="seguimiento-tabla">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Detalle</th>
                <th>Profesional</th>
              </tr>
            </thead>
            <tbody>
              {eventosClinicos.map((ev, idx) => (
                <tr key={idx}>
                  <td>{ev.fecha}</td>
                  <td>{ev.tipo}</td>
                  <td>{ev.detalle}</td>
                  <td>{ev.profesional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SeguimientoPaciente;