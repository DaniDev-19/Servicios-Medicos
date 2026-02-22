# Cuidarte Yutong - Frontend

Plataforma web para la gestión integral de servicios médicos, desarrollada con **React 19** y **Vite**. Permite la administración de historias clínicas, usuarios, medicamentos, notificaciones y reportes, con una interfaz moderna y responsiva.

## 🚀 Características

- Gestión de usuarios, roles y permisos.
- Registro y consulta de historias médicas.
- Administración de pacientes y doctores.
- Inventario de medicamentos.
- Notificaciones internas y alertas.
- Dashboards y reportes exportables (PDF/Excel).
- Seguridad y control de acceso por roles.

## 🛠️ Tecnologías Utilizadas

- **React 19**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para el frontend.
- **React Router Dom**: Gestión de navegación y rutas protegidas.
- **Axios**: Cliente HTTP para consumir la API del Backend.
- **Chart.js**: Visualización de estadísticas y dashboards.
- **Socket.io-client**: Comunicación en tiempo real con el servidor.
- **jsPDF / SheetJS (XLSX)**: Generación de reportes en PDF y Excel.
- **Tailwind CSS / CSS Modules**: Estilizado moderno y responsivo.

## 📦 Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/JDPR19/Servicios-Medicos.git
   cd Frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Define las URL de conexión al backend en archivos `.env.development` y `.env.production`:
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```

## 🏃 Comandos Disponibles

- **Desarrollo**:
  ```bash
  npm run dev
  ```

- **Construcción (Build)**:
  ```bash
  npm run build
  ```

- **Vista Previa de Producción**:
  ```bash
  npm run preview
  ```

- **Linting**:
  ```bash
  npm run lint
  ```

---
Para más detalles sobre los componentes y la lógica de la aplicación, consulta la [Wiki de Frontend](./wiki.md).
