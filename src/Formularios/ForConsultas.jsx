import React, { useState, useEffect } from "react";
import icon from "../components/icon";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";

const fetchEnfermedades = async () => [
  { id: 1, nombre: "Hipertensión" },
  { id: 2, nombre: "Diabetes" },
];
const fetchHistorias = async () => [
  { id: 1, paciente: "Juan Pérez" },
  {  id: 2, paciente: "María Gómez" },
];
const fetchMedicamentos = async () => [
  { id: 1, nombre: "Paracetamol" },
  { id: 2, nombre: "Ibuprofeno" },
  { id: 3, nombre: "Acetaminofen" },
  { id: 4, nombre: "Loratadina" },
  { id: 5, nombre: "Atamel" },
  { id: 6, nombre: "Tachipirin" },
];

const fetchPresentacion = async () => [
  {id: 1,presentacion: "Unidades"},
  {id: 2,presentacion: "Tabletas"},
  {id: 3,presentacion: "Caja"},
  {id: 4,presentacion: "Ampoya"},
  // {id: 5,presentacion: "Tabletas"},
];

function ForConsultas({ initialData = {}, onSave}) {
  const navigate = useNavigate();
  const initialForm = {
    codigo: "",
    fecha_atencion: "",
    diagnostico: "",
    tratamientos: "",
    observaciones: "",
    estado: true,
    historias_medicas_id: "",
    enfermedades_id: "",
    medicamentos: [],
  };

  const [form, setForm] = useState({
    ...initialForm,
    ...initialData,
  });

  const [enfermedades, setEnfermedades] = useState([]);
  const [historias, setHistorias] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [presentacion, setPresentacion] = useState([]);

  // Para agregar medicamentos a la consulta
  const [medicamentoSel, setMedicamentoSel] = useState("");
  const [cantidadSel, setCantidadSel] = useState("");
  const [medicamentoPre, setMedicamentoPre] = useState("");

  useEffect(() => {
    setForm((f) => ({ ...f, ...initialData }));
  }, []);

  useEffect(() => {
    fetchEnfermedades().then(setEnfermedades);
    fetchHistorias().then(setHistorias);
    fetchMedicamentos().then(setMedicamentos);
    fetchPresentacion().then(setPresentacion);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddMedicamento = () => {
    if (
      medicamentoSel &&
      cantidadSel &&
      !form.medicamentos.some((m) => m.medicamento_id === medicamentoSel)
    ) {
      setForm((prev) => ({
        ...prev,
        medicamentos: [
          ...prev.medicamentos,
          { medicamento_id: medicamentoSel, cantidad_utilizada: cantidadSel },
        ],
      }));
      setMedicamentoSel("");
      setCantidadSel("");
    }
  };

  const handleRemoveMedicamento = (id) => {
    setForm((prev) => ({
      ...prev,
      medicamentos: prev.medicamentos.filter((m) => m.medicamento_id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  const handleCancel = () => {
    console.log("Cancel pressed");
    navigate('/admin/Consultas');
  };

  const handleSave = () => {
    console.log('registro guardado y boton pulsado.... redireccionando');
    navigate('/admin/Seguimiento');
  };

  return (
    <form className="forc-page" onSubmit={handleSubmit}>

      <div className="forc-section-title">
        <img src={icon.user4 || icon.user} alt="" />
        <span>Datos del Paciente a Consultar</span>
      </div>
      <div className="forc-grid">
        <div className="fc-field">
          <label>Código</label>
          <input
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            placeholder="Ej: CON-001"
            required
          />
        </div>
        <div className="fc-field">
          <label>Fecha de atención</label>
          <input
            type="datetime-local"
            name="fecha_atencion"
            value={form.fecha_atencion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="fc-field">
          <label>Historia médica</label>
          <select
            name="historias_medicas_id"
            value={form.historias_medicas_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {historias.map((h) => (
              <option key={h.id} value={h.id}>
                {h.paciente} 
              </option>
            ))}
          </select>
        </div>
        <div className="fc-field">
          <label>Enfermedad</label>
          <select
            name="enfermedades_id"
            value={form.enfermedades_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {enfermedades.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="forc-section-title">
        <img src={icon.doctor} alt="" />
        <span>Diagnóstico y tratamiento</span>
      </div>
      <div className="forc-grid cols-1">
        <div className="fc-field">
          <label>Diagnóstico</label>
          <textarea
            name="diagnostico"
            rows={2}
            value={form.diagnostico}
            onChange={handleChange}
            placeholder="Diagnostico del Paciente"
            required
          />
        </div>
        <div className="fc-field">
          <label>Tratamientos</label>
          <textarea
            name="tratamientos"
            rows={2}
            value={form.tratamientos}
            onChange={handleChange}
            placeholder="Detalle de tratamientos"
          />
        </div>
        <div className="fc-field">
          <label>Observaciones</label>
          <textarea
            name="observaciones"
            rows={2}
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Observaciones adicionales"
          />
        </div>
      </div>

      <div className="forc-section-title">
        <img src={icon.monitorcardiaco} alt="" />
        <span>Medicamentos utilizados</span>
      </div>
      <div className="forc-grid">
        <div className="fc-field">
          <label>Medicamento</label>
          <select
            value={medicamentoSel}
            onChange={(e) => setMedicamentoSel(e.target.value)}
          >
            <option value="">Seleccione…</option>
            {medicamentos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="fc-field">
          <label>Presentación</label>
          <select
            value={medicamentoPre}
            onChange={(e) => setMedicamentoPre(e.target.value)}
          >
            <option value="">Seleccione…</option>
            {presentacion.map((m) => (
              <option key={m.id} value={m.id}>
                {m.presentacion}
              </option>
            ))}
          </select>
        </div>
        <div className="fc-field">
          <label>Cantidad utilizada</label>
          <input
            type="number"
            min={1}
            value={cantidadSel}
            onChange={(e) => setCantidadSel(e.target.value)}
            placeholder="Cantidad"
          />
        </div>
        
        <div className="fc-field" style={{ alignSelf: "end" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddMedicamento}
          >
            Agregar
          </button>
        </div>
      </div>
      {form.medicamentos.length > 0 && (
        <div className="fc-field">
          <ul>
            {form.medicamentos.map((m, idx) => {
              const med = medicamentos.find((med) => med.id === Number(m.medicamento_id));
              return (
                <li key={idx}>
                  {med ? med.nombre : "Medicamento"} - {m.cantidad_utilizada}{" "}
                  <button
                    type="button"
                    className="btn btn-xs btn-outline"
                    onClick={() => handleRemoveMedicamento(m.medicamento_id)}
                  >
                    Quitar
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="forc-actions">
        <button className="btn btn-outline" type="button" onClick={handleCancel}>
          Cancelar y Regresar
        </button>
        <div className="forc-actions-right">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setForm(initialForm)}
        >
        Limpiar
      </button>
          <button className="btn btn-primary" type="button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}

export default ForConsultas;