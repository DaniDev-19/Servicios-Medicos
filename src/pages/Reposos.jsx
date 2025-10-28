import { useMemo } from "react";
import '../index.css';
import Card from "../components/Card";
import Tablas from "../components/Tablas";
import icon from "../components/icon";
import { useNavigate } from "react-router-dom";

// Datos estáticos de ejemplo, reflejando la tabla SQL reposos y relaciones
const MOCK = [
  {
    id: 1,
    codigo: "PAYV-REP-202510-00001",
    fecha_inicio: "2025-10-01",
    fecha_fin: "2025-10-10",
    dias_reposo: 10,
    diagnostico: "Lumbalgia aguda",
    observacion: "Reposo absoluto y control en 10 días",
    estado: "activo",
    fecha_creacion: "2025-10-01 09:00:00",
    consulta_id: 1,
    consulta: "CON-001",
    pacientes_id: 1,
    paciente: "Juan Pérez",
    usuarios_id: 2,
    usuario: "Dra. López",
  },
  {
    id: 2,
    codigo: "PAYV-REP-202510-00002",
    fecha_inicio: "2025-10-05",
    fecha_fin: "2025-10-12",
    dias_reposo: 8,
    diagnostico: "Gripe",
    observacion: "Reposo domiciliario y líquidos",
    estado: "finalizado",
    fecha_creacion: "2025-10-05 10:30:00",
    consulta_id: 2,
    consulta: "CON-002",
    pacientes_id: 2,
    paciente: "María Gómez",
    usuarios_id: 3,
    usuario: "Dr. Salas",
  },
  {
    id: 3,
    codigo: "PAYV-REP-202510-00003",
    fecha_inicio: "2025-10-08",
    fecha_fin: "2025-10-15",
    dias_reposo: 8,
    diagnostico: "Esguince de tobillo",
    observacion: "Reposo relativo, uso de férula",
    estado: "anulado",
    fecha_creacion: "2025-10-08 11:15:00",
    consulta_id: 3,
    consulta: "CON-003",
    pacientes_id: 3,
    paciente: "Pedro Ruiz",
    usuarios_id: 2,
    usuario: "Dra. López",
  },
];

function Reposos() {
  const navigate = useNavigate();

  // Métricas
  const stats = useMemo(() => {
    const total = MOCK.length;
    const activos = MOCK.filter(r => r.estado === "activo").length;
    const finalizados = MOCK.filter(r => r.estado === "finalizado").length;
    const anulados = MOCK.filter(r => r.estado === "anulado").length;
    const mesActual = MOCK.filter(r => (r.fecha_creacion || "").startsWith("2025-10")).length;
    return { total, activos, finalizados, anulados, mesActual };
  }, []);

  const estadoBadge = (estado) => {
    switch (estado) {
      case "activo": return <span className="badge badge--success">Activo</span>;
      case "finalizado": return <span className="badge badge--info">Finalizado</span>;
      case "anulado": return <span className="badge badge--muted">Anulado</span>;
      default: return <span className="badge">{estado}</span>;
    }
  };

  // Columnas reflejando la tabla SQL reposos y relaciones
  const columns = [
    // { accessor: "id", header: "ID", width: 50 },
    { accessor: "codigo", header: "Código" },
    // { accessor: "consulta", header: "Consulta" },
    { accessor: "paciente", header: "Paciente" },
    { accessor: "usuario", header: "Médico" },
    // { accessor: "fecha_inicio", header: "F. Inicio" },
    // { accessor: "fecha_fin", header: "F. Fin" },
    { accessor: "dias_reposo", header: "Días" },
    { accessor: "diagnostico", header: "Diagnóstico" },
    { accessor: "observacion", header: "Observación" },
    { accessor: "estado", header: "Estado", render: (v) => estadoBadge(v) },
    {
      header: "Acciones",
      render: () => (
        <div className="row-actions">
          <button className="btn btn-xs" title="Ver">Ver</button>
          <button className="btn btn-xs btn-warn" title="Editar">Editar</button>
          <button className="btn btn-xs btn-outline" title="Imprimir">Imprimir</button>
          <button className="btn btn-xs btn-outline btn-danger" title="Eliminar">Eliminar</button>
        </div>
      ),
    },
  ];

  return (
    <div className="pac-page">
      {/* Métricas */}
      <section className="card-container">
        <Card color="#0033A0" title="Total de Reposos">
          <img src={icon.folder} alt="" className="icon-card" />
          <span className="number">{stats.total}</span>
          <h3>Reposos • Total</h3>
        </Card>
        <Card color="#0B3A6A" title="Reposos Activos">
          <img src={icon.escudobien} alt="" className="icon-card" />
          <span className="number">{stats.activos}</span>
          <h3>Reposos • Activos</h3>
        </Card>
        <Card color="#FCD116" title="Reposos Finalizados">
          <img src={icon.user5} alt="" className="icon-card" />
          <span className="number">{stats.finalizados}</span>
          <h3>Reposos • Finalizados</h3>
        </Card>
        <Card color="#CE1126" title="Reposos Anulados">
          <img src={icon.mascarilla} alt="" className="icon-card" />
          <span className="number">{stats.anulados}</span>
          <h3>Reposos • Anulados</h3>
        </Card>
      </section>

      {/* Filtros y acciones */}
      <section className="quick-actions2">
        <div className="pac-toolbar">
          <div className="filters">
            <div className="field">
              <img src={icon.buscar || icon.calendario} alt="" className="field-icon" />
              <input type="text" placeholder="Buscar por paciente, médico, consulta o diagnóstico…" />
            </div>
            <div className="field">
              <select defaultValue="todos">
                <option value="todos">Todos</option>
                <option value="activo">Activo</option>
                <option value="finalizado">Finalizado</option>
                <option value="anulado">Anulado</option>
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
            <button className="btn btn-outline">
              <img src={icon.impresora} className="btn-icon" alt="" /> Exportar
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/admin/ForReposos')}>
              <img src={icon.user5} className="btn-icon" alt="" /> Nuevo reposo
            </button>
          </div>
        </div>
      </section>

      {/* Tabla de reposos */}
      <div className="table-wrap">
        <Tablas columns={columns} data={MOCK} rowsPerPage={5} />
      </div>
    </div>
  );
}

export default Reposos;