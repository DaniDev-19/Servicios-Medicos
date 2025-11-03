import React, { useState, useEffect } from "react";
import icon from "../components/icon";
import "../index.css";
import axios from "axios";
import { BaseUrl } from "../utils/Constans";
import { validateField, validationRules } from "../utils/validation";
import Spinner from "../components/spinner";
import { useToast } from "../components/userToasd";

function ForDoctor({ initialData = {}, onSave, onClose }) {
const showToast = useToast();
const isEdit = !!initialData?.id;

const initialForm = {
cedula: "",
nombre: "",
apellido: "",
contacto: "",
cargos_id: "",
profesion_id: "",
estado: true,
...initialData,
};

const [form, setForm] = useState(initialForm);
const [errors, setErrors] = useState({});
const [cargos, setCargos] = useState([]);
const [profesiones, setProfesiones] = useState([]);
const [loading, setLoading] = useState(false);

// Cargar catálogos
useEffect(() => {
const fetchCatalogos = async () => {
setLoading(true);
try {
    const token = (localStorage.getItem('token') || '').trim();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    // Llama a los endpoints correctos
    const cargosRes = await axios.get(`${BaseUrl}doctores/cargos`, { headers });
    const profesionesRes = await axios.get(`${BaseUrl}doctores/profesiones`, { headers });
    setCargos(cargosRes.data);
    setProfesiones(profesionesRes.data);
} catch (error) {
    console.error('Error al cargar Catálogos', error);
    showToast?.("Error cargando catálogos", "error");
} finally {
    setLoading(false);
}
};
fetchCatalogos();
}, []);

useEffect(() => {
setForm({ ...initialForm, ...initialData });
}, []);

// Validación de campos
const validate = (field, value) => {
if (validationRules[field]) {
    const { regex, errorMessage } = validationRules[field];
    const result = validateField(value, { text: v => regex.test(v) }, errorMessage);
    return result.valid ? "" : result.message;
}
return "";
};

const handleChange = (e) => {
const { name, value, type, checked } = e.target;
setForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
}));
setErrors((prev) => ({
    ...prev,
    [name]: validate(name, type === "checkbox" ? checked : value),
}));
};

// Validar todo antes de guardar
const validateAll = () => {
const newErrors = {};
Object.keys(form).forEach((field) => {
    if (field === "estado") return;
    const err = validate(field, form[field]);
    if (err) newErrors[field] = err;
});
setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

// Guardar doctor (POST o PUT)
const handleSave = async (e) => {
e.preventDefault();
if (!validateAll()) {
    showToast?.("Corrige los errores antes de guardar", "warning");
    return;
}
setLoading(true);
try {
    const token = (localStorage.getItem('token') || '').trim();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let res;
    if (isEdit) {
    res = await axios.put(`${BaseUrl}doctores/actualizar/${initialData.id}`, form, { headers });
    } else {
    res = await axios.post(`${BaseUrl}doctores/registrar`, form, { headers });
    }
    showToast?.(isEdit ? "Doctor actualizado correctamente" : "Doctor registrado correctamente", "success");
    if (onSave) onSave(res.data);
    if (onClose) onClose();
} catch (err) {
    const msg = err?.response?.data?.message || "Error guardando doctor";
    showToast?.(msg, "error");
} finally {
    setLoading(false);
}
};

const handleClear = () => {
setForm(initialForm);
setErrors({});
};

return (
<form className="forc-page" onSubmit={handleSave}>
    <div className="forc-section-title">
    <img src={icon.user3 || icon.user} alt="" />
    <span>{isEdit ? "Editar Doctor" : "Registro de Doctor"}</span>
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
        {errors.cedula && <span style={{ color: "red" }}>{errors.cedula}</span>}
    </div>
    <div className="fc-field">
        <label>Nombre</label>
        <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        />
        {errors.nombre && <span style={{ color: "red" }}>{errors.nombre}</span>}
    </div>
    <div className="fc-field">
        <label>Apellido</label>
        <input
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
        required
        />
        {errors.apellido && <span style={{ color: "red" }}>{errors.apellido}</span>}
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
        {errors.contacto && <span style={{ color: "red" }}>{errors.contacto}</span>}
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
        <label>Profesión</label>
        <select
        name="profesion_id"
        value={form.profesion_id}
        onChange={handleChange}
        required
        >
        <option value="">Seleccione…</option>
        {profesiones.map((p) => (
            <option key={p.id} value={p.id}>{p.carrera}</option>
        ))}
        </select>
    </div>
    <div className="fc-field">
        <label>
        <input
            type="checkbox"
            name="estado"
            checked={form.estado}
            onChange={handleChange}
        />
        Activo
        </label>
    </div>
    </div>

    <div className="forc-actions">
    <button className="btn btn-outline" type="button" onClick={onClose}>
        Cancelar
    </button>
    <div className="forc-actions-right">
        <button className="btn btn-secondary" type="button" onClick={handleClear}>
        Limpiar
        </button>
        <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? <Spinner size={18} inline label="Guardando..." /> : "Guardar"}
        </button>
    </div>
    </div>
</form>
);
}

export default ForDoctor;