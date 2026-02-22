# Wiki - Frontend Proyecto Yutong

## 🏛️ Arquitectura del Frontend

La aplicación está estructurada de la siguiente manera:

- **src/pages/**: Contenedores principales que representan las vistas del sistema (Dashboard, Pacientes, Consultas, etc.).
- **src/Formularios/**: Componentes especializados para la captura y edición de datos del sistema médico.
- **src/components/**: Elementos de UI reutilizables como Layouts, Providers (Alerts, Toast) y componentes de navegación.
- **src/utils/**: Lógica transversal como `ProtectedRoute` para la seguridad de las rutas.
- **src/assets/** & **src/images/**: Recursos estáticos y estilos generales.

## 🛣️ Sistema de Rutas y Navegación

El archivo `src/App.jsx` define el enrutamiento principal utilizando `react-router-dom`:
1. **Rutas Públicas**: `Landing Page` y `Login`.
2. **Rutas Privadas**: Agrupadas bajo `/admin` y protegidas por el componente `ProtectedRoute`. Requieren autenticación y validación de permisos de pantalla.

## 📋 Módulos de Formularios

El sistema cuenta con una amplia variedad de formularios para la gestión médica:
- `ForConsultas`: Registro de diagnósticos y evaluaciones.
- `ForPaciente`: Datos personales y contacto.
- `ForHistorias`: Creación del expediente médico inicial.
- `ForReposos`: Emisión de certificados de reposo médico.
- `ForDoctor` & `ForCargo`: Gestión del personal de salud.
- `ForMedicamentos`: Control de stock e inventario de farmacia.

## 🏗️ Gestión de Estado y Datos

- **Axios**: Se utiliza para todas las peticiones asíncronas al backend.
- **Toast & Alert Providers**: Gestión centralizada de notificaciones visuales para el usuario.
- **AutoLogout**: Mecanismo de seguridad para cerrar la sesión por inactividad.

## 📄 Generación de Reportes

La aplicación permite exportar información crítica:
- **PDF**: Utilizando `jsPDF` y `jspdf-autotable`.
- **Excel**: Utilizando la librería `xlsx`.

## 🎨 Estilos y Diseño

- Se utiliza un diseño responsive con soporte para temas (vía `next-themes` y CSS nativo).
- Las animaciones y transiciones se gestionan mediante CSS personalizado en `src/styles/` y `index.css`.
