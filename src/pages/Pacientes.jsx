import { useMemo } from "react";
import '../index.css'
import Card from "../components/Card";
import Tablas from "../components/Tablas";
import icon from "../components/icon";
import { useNavigate } from "react-router-dom";
// Datos estáticos de ejemplo, reflejando los campos de la tabla SQL
const MOCK = [
  {
    id: 1,
    cedula: "V-12345678",
    nombre: "Juan",
    apellido: "Pérez",
    sexo: "M",
    fecha_nacimiento: "1990-05-12",
    edad: "34",
    correo: "juan.perez@yutong.com",
    contacto: "0412-1234567",
    codigo_territorial: "E01-M01-P01-S01",
    ubicacion: "Galpón 2",
    estado: "activo",
    estado_id: 1,
    municipio_id: 1,
    parroquia_id: 1,
    sector_id: 1,
    departamentos_id: 2,
    cargos_id: 3,
    profesion_id: 4,
  },
  {
    id: 2,
    cedula: "V-87654321",
    nombre: "María",
    apellido: "Gómez",
    sexo: "F",
    fecha_nacimiento: "1985-11-23",
    edad: "39",
    correo: "maria.gomez@yutong.com",
    contacto: "0414-7654321",
    codigo_territorial: "E01-M02-P03-S02",
    ubicacion: "Oficina Principal",
    estado: "activo",
    estado_id: 1,
    municipio_id: 2,
    parroquia_id: 3,
    sector_id: 2,
    departamentos_id: 1,
    cargos_id: 2,
    profesion_id: 3,
  },
  {
    id: 3,
    cedula: "E-22334455",
    nombre: "Pedro",
    apellido: "Ruiz",
    sexo: "M",
    fecha_nacimiento: "1978-02-10",
    edad: "46",
    correo: "pedro.ruiz@yutong.com",
    contacto: "0424-1112233",
    codigo_territorial: "E02-M03-P02-S03",
    ubicacion: "Almacén",
    estado: "activo",
    estado_id: 2,
    municipio_id: 3,
    parroquia_id: 2,
    sector_id: 3,
    departamentos_id: 3,
    cargos_id: 1,
    profesion_id: 2,
  },
];


function Pacientes() {
    const navigate = useNavigate();
    const stats = useMemo(() => {
      const total = MOCK.length;
      const activos = MOCK.filter(p => p.estado === "activo").length;
      const inactivos = MOCK.filter(p => p.estado === "inactivo").length;
      const nuevosMes = MOCK.filter(p => (p.fechaIngreso || "").startsWith("2025-10")).length;
      return { total, activos, inactivos, nuevosMes };
    }, []);

  const estadoBadge = (estado) =>
    estado === "activo" ? "badge badge--success" : "badge badge--muted";

  const columns = [
   { accessor: "id", header: "ID", width: 50 },
    { accessor: "cedula", header: "Cédula" },
    { accessor: "nombre", header: "Nombre" },
    { accessor: "apellido", header: "Apellido" },
    { accessor: "sexo", header: "Sexo", width: 60 },
    { accessor: "fecha_nacimiento", header: "F. Nacimiento" },
    { accessor: "edad", header: "Edad", width: 60 },
    // { accessor: "correo", header: "Correo" },
    { accessor: "contacto", header: "Contacto" },
    // { accessor: "fechaIngreso", header: "Ingreso" },
    { accessor: "estado", header: "Estado", render: (v) => <span className={estadoBadge(v)}>{v}</span> },
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

  const handleFormulario = () =>{
    console.log('handle pulsado');
    navigate('/admin/ForPacientes');
  };

  return (
    <div className="pac-page">
      <section className="card-container">
        <Card color="#0033A0" title="Total de Pacientes Registrados">
          <img src={icon.user3} alt="" className="icon-card" />
          <span className="number">{stats.total}</span>
          <h3>Total • Pacientes</h3>
        </Card>
        <Card color="#0B3A6A" title="Total de Pacientes Saludables">
          <img src={icon.escudobien} alt="" className="icon-card" />
          <span className="number">{stats.activos}</span>
          <h3>Total • Saludables</h3>
        </Card>
        <Card color="#CE1126" title="Total de Pacientes de Reposo">
          <img src={icon.mascarilla} alt="" className="icon-card" />
          <span className="number">{stats.inactivos}</span>
          <h3>Total • Reposo</h3>
        </Card>
        <Card color="#FCD116" title="Total de Pacientes Atendidos en el Día">
          <img src={icon.user5} alt="" className="icon-card" />
          <span className="number">{stats.nuevosMes}</span>
          <h3>Atendidos (Día)</h3>
        </Card>
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
            <button className="btn btn-primary" onClick={handleFormulario}>
              <img src={icon.user5} className="btn-icon" alt=""  /> Nuevo paciente
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

export default Pacientes;