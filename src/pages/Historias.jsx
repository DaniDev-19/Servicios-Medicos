import { useMemo } from "react";
import '../index.css'
import Card from "../components/Card";
import Tablas from "../components/Tablas";
import icon from "../components/icon";
import { useNavigate } from "react-router-dom";

// Datos estáticos de ejemplo, reflejando la tabla SQL historias_medicas y relación con enfermedades
const MOCK = [
  {
    id: 1,
    codigo: "PAYV-HM-202510-00001",
    fecha_consulta: "2025-10-01",
    fecha_alta: "2025-10-10",
    motivo_consulta: "Dolor de cabeza persistente",
    historia: "Paciente refiere cefalea desde hace 3 días...",
    examen_fisico: "TA 120/80, FC 78, FR 16, Temp 36.8°C",
    diagnostico: "Migraña",
    observacion: "Se indica reposo y control en 7 días",
    fecha_creacion: "2025-10-01 09:00:00",
    pacientes_id: 1,
    paciente: "Juan Pérez",
    usuarios_id: 2,
    usuario: "Dra. López",
    estado: true,
    enfermedades: ["Migraña", "Hipertensión"],
  },
  {
    id: 2,
    codigo: "PAYV-HM-202510-00002",
    fecha_consulta: "2025-10-02",
    fecha_alta: "2025-10-05",
    motivo_consulta: "Dolor abdominal",
    historia: "Paciente con dolor abdominal tipo cólico...",
    examen_fisico: "TA 110/70, FC 80, FR 18, Temp 37.1°C",
    diagnostico: "Gastritis aguda",
    observacion: "Se prescribe omeprazol y dieta blanda",
    fecha_creacion: "2025-10-02 10:30:00",
    pacientes_id: 2,
    paciente: "María Gómez",
    usuarios_id: 3,
    usuario: "Dr. Salas",
    estado: true,
    enfermedades: ["Gastritis"],
  },
  {
    id: 3,
    codigo: "PAYV-HM-202510-00003",
    fecha_consulta: "2025-10-03",
    fecha_alta: "2025-10-08",
    motivo_consulta: "Fiebre y malestar general",
    historia: "Paciente refiere fiebre de 38.5°C y malestar...",
    examen_fisico: "TA 115/75, FC 90, FR 20, Temp 38.5°C",
    diagnostico: "Cuadro viral",
    observacion: "Reposo domiciliario y líquidos",
    fecha_creacion: "2025-10-03 11:15:00",
    pacientes_id: 3,
    paciente: "Pedro Ruiz",
    usuarios_id: 2,
    usuario: "Dra. López",
    estado: false,
    enfermedades: ["Cuadro viral"],
  },
];

function Consultas() {
    const navigate = useNavigate();
    const stats = useMemo(() => {
    const total = MOCK.length;
    const activos = MOCK.filter(p => p.estado === "activo").length;
    const inactivos = MOCK.filter(p => p.estado === "inactivo").length;
    const nuevosMes = MOCK.filter(p => (p.fechaIngreso || "").startsWith("2025-10")).length;
    return { total, activos, inactivos, nuevosMes };
  }, []);


  // Columnas reflejando la tabla SQL y relación con enfermedades
  const columns = [
    // { accessor: "id", header: "ID", width: 50 },
    { accessor: "codigo", header: "Código" },
    // { accessor: "fecha_consulta", header: "F. Consulta" },
    // { accessor: "fecha_alta", header: "F. Alta" },
    { accessor: "paciente", header: "Paciente" },
    { accessor: "usuario", header: "Médico" },
    // { accessor: "motivo_consulta", header: "Motivo" },
    // { accessor: "historia", header: "Historia" },
    // { accessor: "examen_fisico", header: "Examen Físico" },
    { accessor: "diagnostico", header: "Diagnóstico" },
    { accessor: "observacion", header: "Observación" },
    { accessor: "enfermedades", header: "Enfermedades", render: (v) => v && v.length ? v.join(", ") : "-" },
  
    { header: "Acciones", render: () => (
        <div className="row-actions">
          <button className="btn btn-xs" title="Ver">Ver</button>
          <button className="btn btn-xs btn-warn" title="Editar">Editar</button>
          <button className="btn btn-xs btn-outline" title="Imprimir">Imprimir</button>
          <button className="btn btn-xs btn-outline btn-danger" title="Eliminar">Eliminar</button>
        </div>
      )
    },
  ];

  return (
    <div className="pac-page">
      <section className="card-container">
        <Card color="#0033A0" title="Total de Historias">
          <img src={icon.folder} alt="" className="icon-card" />
          <span className="number">{stats.total}</span>
          <h3>Historias • Total</h3>
        </Card>
        {/* <Card color="#0B3A6A" title="Historias Activas">
          <img src={icon.escudobien} alt="" className="icon-card" />
          <span className="number">{stats.activas}</span>
          <h3>Historias • Activas</h3>
        </Card>
        <Card color="#CE1126" title="Historias Inactivas">
          <img src={icon.mascarilla} alt="" className="icon-card" />
          <span className="number">{stats.inactivas}</span>
          <h3>Inactivas</h3>
        </Card>
        <Card color="#FCD116" title="Historias Mes Actual">
          <img src={icon.user5} alt="" className="icon-card" />
          <span className="number">{stats.mesActual}</span>
          <h3>Mes Actual</h3>
        </Card> */}
      </section>

      <section className="quick-actions2">
        <div className="pac-toolbar">
          <div className="filters">
            <div className="field">
              <img src={icon.buscar || icon.calendario} alt="" className="field-icon" />
              <input type="text" placeholder="Buscar por cédula, nombre o apellido…" />
            </div>
            <div className="field">
              <select defaultValue="todos">
                <option value="todos">Todos</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <div className="field">
              <select defaultValue="todos">
                <option value="todos">Estado</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <div className="field">
              <label>Desde</label>
              <input type="date" />
            </div>
            <div className="field">
              <label>Hasta</label>
              <input type="date" />
            </div>
          </div>

          <div className="actions">
            {/* <button className="btn btn-secondary">
              <img src={icon.candado} className="btn-icon" alt="" /> Refrescar
            </button> */}
            <button className="btn btn-outline">
              <img src={icon.impresora} className="btn-icon" alt="" /> Exportar
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/admin/ForHistorias')}>
              <img src={icon.user5} className="btn-icon" alt="" /> Nueva historia
            </button>
          </div>
        </div>
      </section>

      <div className="table-wrap">
        <Tablas columns={columns} data={MOCK} rowsPerPage={5} />
      </div>
    </div>
  );
}

export default Consultas;