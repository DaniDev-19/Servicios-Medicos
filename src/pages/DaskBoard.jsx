import '../styles/daskboard.css';
import '../index.css';
import Card from '../components/Card';
import icon from '../components/icon';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();
  
  const handleCard = () => {
    alert('pulse una carta');
  };
  
  return (
    <div className='dashboard-layout'>

      <main className="dashboard-main">

      <section className='card-container'>
          
          <Card onClick={handleCard} color='#0033A0'  title='Total de Pacientes Registrados'>
            <img src={icon.consulta3} alt="icon-card" className='icon-card'/>
            <span className='number'>1</span>
            <h3>Pacientes Totales</h3>
          </Card>

          <Card color='#CE1126'  title='Total de Historias Medicas Realizadas'>
            <img src={icon.folder} alt="icon-card" className='icon-card'/>
            <span className='number'>1</span>
            
            <h3>Historias Médicas</h3>
          </Card>

          <Card color='#FCD116'  title='Total de Consultas Realizadas'>
            <img src={icon.estetoscopio} alt="icon-card" className='icon-card'/>
            <span className='number'>1</span>
            <h3>Consultas Totales</h3>
          </Card>

          <Card color='#0B3A6A'  title='Total de Productor registrados en el Inventario'>
            <img src={icon.maletindoctor3} alt="icon-card" className='icon-card'/>
            <span className='number'>1</span>
            <h3>En Inventario</h3>
          </Card>
          
      </section>
      
      {/* Acciones rápidas */}
        <section className="quick-actions">
          <h3 className="section-title">Acciones rápidas</h3>
          <div className="qa-grid">
            <button className="qa-card" onClick={() => navigate('/admin/pacientes/nuevo')} title='Registrar Nuevo Paciente'>
              <img src={icon.user4} alt="pacientes" className="icon" />
              <span>Registrar Paciente</span>
            </button>
            <button className="qa-card" onClick={() => navigate('/admin/medicamentos/cargar')} title='Cargar un Medicamento al inventario'>
              <img src={icon.cv3} alt="medicamentos" className="icon" />
              <span>Nueva Historia Médica</span>
            </button>
            <button className="qa-card" onClick={() => navigate('/admin/consulta/nueva')} title='Diagnosticar un Paciente'>
              <img src={icon.estetoscopio2} alt="consultas" className="icon" />
              <span>Nueva Consulta</span>
            </button>
            <button className="qa-card" onClick={() => navigate('/admin/reposos/nuevo')} title='Dar Reposos'>
              <img src={icon.muela} alt="reposos" className="icon" />
              <span>Registrar Reposo</span>
            </button>
            <button className="qa-card" onClick={() => navigate('/admin/medicamentos/cargar')} title='Cargar un Medicamento al inventario'>
              <img src={icon.maletindoctor4} alt="medicamentos" className="icon" />
              <span>Cargar Medicamento</span>
            </button>
            <button className="qa-card" onClick={() => navigate('/admin/medicamentos/cargar')} title='Cargar una Nueva Patología'>
              <img src={icon.mascarilla3} alt="medicamentos" className="icon" />
              <span>Registrar Nueva Patología</span>
            </button>
          </div>
        </section>

        {/* Paneles informativos */}
        <section className="panels-grid">
          <div className="panel">
            <h3 className="panel-title">Actividad reciente</h3>
            <ul className="activity-list">
              <li>Se creó historia médica para Juan P.</li>
              <li>Consulta registrada por Dr. A. Pérez.</li>
              <li>Alta de medicamento: Ibuprofeno 400mg.</li>
              <li>Reposo emitido a M. Rodríguez.</li>
            </ul>
          </div>

          <div className="panel">
            <h3 className="panel-title">Próximas citas</h3>
            <ul className="list">
              <li>Hoy 10:30 — Odontología</li>
              <li>Hoy 14:00 — Medicina General</li>
              <li>Mañana 09:00 — Enfermería</li>
            </ul>
          </div>

          <div className="panel panel-chart">
            <h3 className="panel-title">Consultas por semana</h3>
            <div className="chart-placeholder">Gráfico aquí</div>
          </div>
          
        </section>
      </main>
    
    </div>
    
  );
}

export default DashboardPage;
