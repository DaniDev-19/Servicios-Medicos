import React, { useState, useEffect } from "react";
import icon from "../components/icon";
import "../index.css";
import { useNavigate } from "react-router-dom";

// Simulación de catálogos (puedes reemplazar por fetch real)
const fetchEstados = async () => [
  { id: 1, nombre: "Aragua" },
  { id: 2, nombre: "Carabobo" },
];
const fetchMunicipios = async () => [
  { id: 1, nombre: "Girardot" },
  { id: 2, nombre: "Libertador" },
  { id: 3, nombre: "Valencia" },
];
const fetchParroquias = async () => [
  { id: 1, nombre: "Las Delicias" },
  { id: 2, nombre: "Candelaria" },
  { id: 3, nombre: "San Blas" },
];
const fetchSectores = async () => [
  { id: 1, nombre: "Sector 1" },
  { id: 2, nombre: "Sector 2" },
  { id: 3, nombre: "Sector 3" },
];
const fetchDepartamentos = async () => [
  { id: 1, nombre: "Administración" },
  { id: 2, nombre: "Producción" },
  { id: 3, nombre: "Almacén" },
];
const fetchCargos = async () => [
  { id: 1, nombre: "Supervisor" },
  { id: 2, nombre: "Operador" },
  { id: 3, nombre: "Jefe de Área" },
];
const fetchProfesiones = async () => [
  { id: 1, nivel: "Técnico" },
  { id: 2, nivel: "Ingeniero" },
  { id: 3, nivel: "Obrero" },
  { id: 4, nivel: "Administrativo" },
];

function ForPaciente({ initialData = {}, onSave }) {
  const navigate = useNavigate();
  const initialForm = {
    cedula: "",
    nombre: "",
    apellido: "",
    sexo: "",
    fecha_nacimiento: "",
    edad: "",
    correo: "",
    contacto: "",
    codigo_territorial: "",
    ubicacion: "",
    estado: "activo", // "activo" o "inactivo"
    estado_id: "",
    municipio_id: "",
    parroquia_id: "",
    sector_id: "",
    departamentos_id: "",
    cargos_id: "",
    profesion_id: "",
  };

  const [form, setForm] = useState({ ...initialForm, ...initialData });

  // Catálogos
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [profesiones, setProfesiones] = useState([]);

  useEffect(() => {
    setForm((f) => ({ ...f, ...initialData }));
  }, []);

  useEffect(() => {
    fetchEstados().then(setEstados);
    fetchMunicipios().then(setMunicipios);
    fetchParroquias().then(setParroquias);
    fetchSectores().then(setSectores);
    fetchDepartamentos().then(setDepartamentos);
    fetchCargos().then(setCargos);
    fetchProfesiones().then(setProfesiones);
  }, []);

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
    navigate('/admin/Pacientes');
  };

  const handleClear = () => {
    setForm(initialForm);
  };

  return (
    <form className="forc-page" onSubmit={handleSubmit}>
      <div className="forc-section-title">
        <img src={icon.user4 || icon.user} alt="" className="icon"/>
        <span>Datos del Paciente</span>
      </div>
      <div className="forc-grid">
        <div className="fc-field">
          <label>Cédula</label>
          <input
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            placeholder="Ej: V-12345678"
            required
          />
        </div>
        <div className="fc-field">
          <label>Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Juan Ernesto"
            required
          />
        </div>
        <div className="fc-field">
          <label>Apellido</label>
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Ej: Ramirez Tomai"
            required
          />
        </div>
        <div className="fc-field">
          <label>Sexo</label>
          <select
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            placeholder="Selecione...."
            required
          >
            <option value="">Seleccione…</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="fc-field">
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={form.fecha_nacimiento}
            onChange={handleChange}
            placeholder="10/12/2000"
            required
          />
        </div>
        <div className="fc-field">
          <label>Edad</label>
          <input
            name="edad"
            value={form.edad}
            onChange={handleChange}
            type="number"
            placeholder="20"
            min={0}
            required
          />
        </div>
        <div className="fc-field">
          <label>Correo</label>
          <input
            name="correo"
            value={form.correo}
            onChange={handleChange}
            type="email"
            placeholder="****@gmail.com"
            required
          />
        </div>
        <div className="fc-field">
          <label>Contacto</label>
          <input
            name="contacto"
            value={form.contacto}
            onChange={handleChange}
            placeholder="Ej: 0412-1234567"
            required
          />
        </div>
        {/* <div className="fc-field">
          <label>Código Territorial</label>
          <input
            name="codigo_territorial"
            value={form.codigo_territorial}
            onChange={handleChange}
            placeholder="Ej: E01-M01-P01-S01"
            required
          />
        </div> */}
        <div className="fc-field">
          <label>Ubicación (Residencia - Calle - Avenida)</label>
          <input
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            placeholder="Coloque Aqui"
            required
          />
        </div>
        <div className="fc-field">
          <label>Profesión</label>
          <select
            name="profesion_id"
            value={form.profesion_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {profesiones.map((p) => (
              <option key={p.id} value={p.id}>{p.nivel}</option>
            ))}
          </select>
        </div>
        {/* <div className="fc-field">
          <label>Estado (estatus)</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div> */}
      <div className="fc-field">
          <label>Estado </label>
          <select
            name="estado_id"
            value={form.estado_id}
            onChange={handleChange}
            placeholder= "Yaracuy"
            required
          >
            <option value="">Seleccione…</option>
            {estados.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
        </div>
        
         <div className="fc-field">
          <label>Cargo</label>
          <select
            name="cargos_id"
            value={form.cargos_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {cargos.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        
        <div className="fc-field">
          <label>Municipio</label>
          <select
            name="municipio_id"
            value={form.municipio_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {municipios.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>
          <div className="fc-field">
          <label>Departamento</label>
          <select
            name="departamentos_id"
            value={form.departamentos_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>{d.nombre}</option>
            ))}
          </select>
        </div>
        
        
        <div className="fc-field">
          <label>Parroquia</label>
          <select
            name="parroquia_id"
            value={form.parroquia_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {parroquias.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        
        <div className="fc-field">
          <label>Sector</label>
          <select
            name="sector_id"
            value={form.sector_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione…</option>
            {sectores.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
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

export default ForPaciente;