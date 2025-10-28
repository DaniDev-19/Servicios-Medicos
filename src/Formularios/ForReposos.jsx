import React, { useState, useEffect } from "react";
import icon from "../components/icon";
import "../index.css";
import { useNavigate } from "react-router-dom";

// Simulación de catálogos (puedes reemplazar por fetch real)
const fetchPacientes = async () => [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "María Gómez" },
  { id: 3, nombre: "Pedro Ruiz" },
];
const fetchUsuarios = async () => [
  { id: 1, nombre: "Dr. Salas" },
  { id: 2, nombre: "Dra. López" },
];
const fetchConsultas = async () => [
  { id: 1, codigo: "CON-001" },
  { id: 2, codigo: "CON-002" },
  { id: 3, codigo: "CON-003" },
];

function ForReposos({ initialData = {}, onSave }) {
  const navigate = useNavigate();
  const initialForm = {
    codigo: "",
    fecha_inicio: "",
    fecha_fin: "",
    diagnostico: "",
    observacion: "",
    estado: "activo",
    consulta_id: "",
    pacientes_id: "",
    usuarios_id: "",
  };

  const [form, setForm] = useState({ ...initialForm, ...initialData });
  const [pacientes, setPacientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    setForm((f) => ({ ...f, ...initialData }));
  }, []);

  useEffect(() => {
    fetchPacientes().then(setPacientes);
    fetchUsuarios().then(setUsuarios);
    fetchConsultas().then(setConsultas);
  }, []);

  // Calcula días de reposo automáticamente
  const calcularDiasReposo = (inicio, fin) => {
    if (!inicio || !fin) return "";
    const d1 = new Date(inicio);
    const d2 = new Date(fin);
    const diff = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  const handleCancel = () => {
    navigate('/admin/Reposos');
  };

  const handleClear = () => {
    setForm(initialForm);
  };

  return (
    <form className="forc-page" onSubmit={handleSubmit}>
      <div className="forc-section-title">
        <img src={icon.folder || icon.user} alt="" className="icon" />
        <span>Registro de Reposo Médico</span>
      </div>
      <div className="forc-grid">
        <div className="fc-field">
          <label>Código</label>
          <input
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            placeholder="Se genera automáticamente"
            disabled
          />
        </div>
        <div className="fc-field">
          <label>Consulta asociada</label>
          <select
            name="consulta_id"
            value={form.consulta_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {consultas.map((c) => (
              <option key={c.id} value={c.id}>{c.codigo}</option>
            ))}
          </select>
        </div>
        <div className="fc-field">
          <label>Paciente</label>
          <select
            name="pacientes_id"
            value={form.pacientes_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {pacientes.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div className="fc-field">
          <label>Médico</label>
          <select
            name="usuarios_id"
            value={form.usuarios_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>{u.nombre}</option>
            ))}
          </select>
        </div>
        <div className="fc-field">
          <label>Fecha de inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={form.fecha_inicio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="fc-field">
          <label>Fecha de fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={form.fecha_fin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="fc-field">
          <label>Días de reposo</label>
          <input
            name="dias_reposo"
            value={calcularDiasReposo(form.fecha_inicio, form.fecha_fin)}
            readOnly
            disabled
          />
        </div>
        <div className="fc-field">
          <label>Diagnóstico</label>
          <textarea
            name="diagnostico"
            rows={2}
            value={form.diagnostico}
            onChange={handleChange}
            placeholder="Diagnóstico médico"
            required
          />
        </div>
        <div className="fc-field">
          <label>Observación</label>
          <textarea
            name="observacion"
            rows={2}
            value={form.observacion}
            onChange={handleChange}
            placeholder="Observaciones adicionales"
          />
        </div>
        <div className="fc-field">
          <label>Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="activo">Activo</option>
            <option value="finalizado">Finalizado</option>
            <option value="anulado">Anulado</option>
          </select>
        </div>
      </div>

      <div className="forc-actions">
        <button className="btn btn-outline" type="button" onClick={handleCancel}>
          Cancelar y Regresar
        </button>
        <div className="forc-actions-right">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleClear}
          >
            Limpiar
          </button>
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}

export default ForReposos;