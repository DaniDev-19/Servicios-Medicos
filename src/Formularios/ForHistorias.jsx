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
const fetchEnfermedades = async () => [
  { id: 1, nombre: "Migraña" },
  { id: 2, nombre: "Hipertensión" },
  { id: 3, nombre: "Gastritis" },
  { id: 4, nombre: "Cuadro viral" },
];

function ForHistorias({ initialData = {}, onSave }) {
  const navigate = useNavigate();
  const initialForm = {
    codigo: "",
    fecha_consulta: "",
    fecha_alta: "",
    motivo_consulta: "",
    historia: "",
    examen_fisico: "",
    diagnostico: "",
    observacion: "",
    pacientes_id: "",
    usuarios_id: "",
    estado: true,
    enfermedades: [], // array de ids
  };

  const [form, setForm] = useState({ ...initialForm, ...initialData });
  const [pacientes, setPacientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);

  useEffect(() => {
    setForm((f) => ({ ...f, ...initialData }));
  }, []);

  useEffect(() => {
    fetchPacientes().then(setPacientes);
    fetchUsuarios().then(setUsuarios);
    fetchEnfermedades().then(setEnfermedades);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEnfermedadToggle = (id) => {
    setForm((prev) => ({
      ...prev,
      enfermedades: prev.enfermedades.includes(id)
        ? prev.enfermedades.filter((eid) => eid !== id)
        : [...prev.enfermedades, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  const handleCancel = () => {
    navigate('/admin/Historias');
  };

  const handleClear = () => {
    setForm(initialForm);
  };

  return (
    <form className="forc-page" onSubmit={handleSubmit}>
      <div className="forc-section-title">
        <img src={icon.folder || icon.user} alt="" className="icon" />
        <span>Historia Médica</span>
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
          <label>Fecha de Consulta</label>
          <input
            type="date"
            name="fecha_consulta"
            value={form.fecha_consulta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="fc-field">
          <label>Fecha de Alta</label>
          <input
            type="date"
            name="fecha_alta"
            value={form.fecha_alta}
            onChange={handleChange}
          />
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
          <label>Motivo de Consulta</label>
          <input
            name="motivo_consulta"
            value={form.motivo_consulta}
            onChange={handleChange}
            placeholder="Motivo principal"
            required
          />
        </div>
      </div>

      <div className="forc-section-title">
        <img src={icon.doctor} alt="" />
        <span>Detalles Clínicos</span>
      </div>
      <div className="forc-grid cols-1">
        <div className="fc-field">
          <label>Historia</label>
          <textarea
            name="historia"
            rows={2}
            value={form.historia}
            onChange={handleChange}
            placeholder="Historia clínica detallada"
            required
          />
        </div>
        <div className="fc-field">
          <label>Examen Físico</label>
          <textarea
            name="examen_fisico"
            rows={2}
            value={form.examen_fisico}
            onChange={handleChange}
            placeholder="Examen físico realizado"
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
      </div>

      <div className="forc-section-title">
        <img src={icon.monitorcardiaco} alt="" />
        <span>Enfermedades Relacionadas</span>
      </div>
      <div className="forc-grid cols-1">
        <div className="fc-field">
          <label>Seleccione una o varias enfermedades</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {enfermedades.map((e) => (
              <label key={e.id} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <input
                  type="checkbox"
                  checked={form.enfermedades.includes(e.id)}
                  onChange={() => handleEnfermedadToggle(e.id)}
                />
                {e.nombre}
              </label>
            ))}
          </div>
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

export default ForHistorias;