import React, { useEffect, useMemo, useState } from "react";
import "../index.css";
import api from "../utils/instanceSesion";
import Spinner from "../components/spinner";
import { useToast } from "../components/userToasd";
import SingleSelect from "../components/SingleSelect";
import { validateField, getValidationRule } from "../utils/validation";
import icon from "../components/icon";

function ForUsuarios({ initialData = {}, onSave, onClose }) {
  const showToast = useToast();
  const isEdit = !!initialData?.id;

  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [form, setForm] = useState(() => ({
    username: initialData?.username || "",
    correo: initialData?.correo || "",
    confirmPassword: "",
    password: "",
    roles_id: initialData?.roles_id || initialData?.rol_id || null,
    doctor_id: initialData?.doctor_id || null,
    estatus: initialData?.estatus || "activo",
    estado: typeof initialData?.estado === "boolean" ? initialData.estado : true
  }));

  useEffect(() => {
    setForm({
      username: initialData?.username || "",
      correo: initialData?.correo || "",
      password: "", // Siempre vacío al editar para no mostrar el hash
      confirmPassword: "",
      roles_id: initialData?.roles_id || initialData?.rol_id || "",
      doctor_id: initialData?.doctor_id || "",
      estatus: initialData?.estatus || "activo",
      estado: typeof initialData?.estado === "boolean" ? initialData.estado : true
    });
  }, [initialData?.id]);


  // Cargar catálogos
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [rRes, dRes] = await Promise.all([
          api.get('usuarios/catalogos/roles'),
          api.get('usuarios/catalogos/doctores'),
        ]);
        setRoles(rRes.data || []);
        setDoctores(dRes.data || []);
      } catch (error) {
        console.error("Error cargando catálogos de usuarios", error);
        showToast?.("Error cargando catálogos", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [showToast]);

  // Validación de campos
  const validate = (field, value) => {

    if (isEdit && (field === "password" || field === "confirmPassword") && !value) {
      return "";
    }

    if (field === "confirmPassword") {
      return value !== form.password ? "Las contraseñas no coinciden" : "";
    }

    const rule = getValidationRule(field);
    if (rule && rule.regex) {

      if (!rule.required && !value) return "";

      const result = validateField(value, { text: v => rule.regex.test(v) }, rule.errorMessage);
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


  const validateAll = () => {
    const newErrors = {};
    const fieldsToValidate = ["username", "correo", "roles_id", "doctor_id", "password", "confirmPassword"];

    fieldsToValidate.forEach((field) => {
      const err = validate(field, form[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setForm({
      username: "",
      correo: "",
      password: "",
      confirmPassword: "",
      roles_id: "",
      doctor_id: "",
      estatus: "activo",
      estado: true
    });
    setErrors({});
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      showToast?.("Corrige los errores antes de guardar", "warning");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('usuarios/registrar', form);
      showToast?.("Usuario registrado con éxito", "success");
      onSave?.(res.data);
      onClose?.();
    } catch (error) {
      const msg = error?.response?.data?.message || "Error registrando usuario";
      showToast?.(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      showToast?.("Corrige los errores antes de guardar", "warning");
      return;
    }
    setLoading(true);
    try {
      console.log("Editando usuario:", initialData.id, form);
      const res = await api.put(`usuarios/actualizar/${initialData.id}`, form);
      showToast?.("Usuario actualizado correctamente", "success");
      onSave?.(res.data);
      onClose?.();
    } catch (error) {
      const msg = error?.response?.data?.message || "Error actualizando usuario";
      showToast?.(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={isEdit ? handleEdit : handleSave}>
      <div className="forc-grid cols-2">
        <div className="fc-field">
          <label><span className="unique">*</span>Usuario</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Ej: admin"
            required
          />
          {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
        </div>

        <div className="fc-field">
          <label><span className="unique">*</span>Correo</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
          {errors.correo && <span style={{ color: "red" }}>{errors.correo}</span>}
        </div>


        <div className="fc-field">
          <label><span className="unique">*</span>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={isEdit ? "Dejar en blanco para conservar" : "••••••••"}
              required={!isEdit}
              style={{ paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <img
                src={showPass ? icon.ojito : icon.ojitoculto}
                alt="toggle password"
                style={{ width: '20px', height: '20px' }}
              />
            </button>
          </div>
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>

        <div className="fc-field">
          <label>Confirmar contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repite la contraseña"
              required={!!form.password}
              style={{ paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <img
                src={showConfirmPass ? icon.ojito : icon.ojitoculto}
                alt="toggle password"
                style={{ width: '20px', height: '20px' }}
              />
            </button>
          </div>
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
        </div>


        <div className="fc-field">
          <label><span className="unique">*</span>Rol</label>
          <SingleSelect
            options={roles.map(r => ({ value: r.id, label: r.nombre }))}
            value={roles.find(r => r.id === form.roles_id) ? { value: form.roles_id, label: roles.find(r => r.id === form.roles_id)?.nombre } : null}
            onChange={(opt) => setForm((p) => ({ ...p, roles_id: opt ? opt.value : null }))}
            placeholder="Seleccione…"
            isClearable={false}
          />
        </div>

        <div className="fc-field">
          <label><span className="unique">*</span> Doctor</label>
          <SingleSelect
            options={doctores.map(d => ({ value: d.id, label: `${d.nombre} ${d.apellido} (${d.cedula})` }))}
            value={
              doctores.find(d => d.id === form.doctor_id)
                ? {
                  value: form.doctor_id,
                  label: `${doctores.find(d => d.id === form.doctor_id)?.nombre} ${doctores.find(d => d.id === form.doctor_id)?.apellido} (${doctores.find(d => d.id === form.doctor_id)?.cedula})`
                }
                : null
            }
            onChange={(opt) => setForm((p) => ({ ...p, doctor_id: opt ? opt.value : null }))}
            placeholder="Seleccione…"
            isClearable
          />
        </div>

      </div>

      <div className="forc-actions" style={{ marginTop: 24, marginBottom: 12 }}>
        <button className="btn btn-outline" type="button" onClick={onClose}>
          Cancelar
        </button>
        <div className="forc-actions-right">
          <button className="btn btn-secondary" type="button" onClick={handleClear} disabled={loading}>
            Limpiar
          </button>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? <Spinner size={10} inline label="Procesando..." /> : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ForUsuarios;