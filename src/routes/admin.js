import { Outlet, Link, useNavigate } from 'react-router-dom';
import './admin.css';

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/'; // Redirigir al login
  };

  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <Link to="/admin/crearColaborador">👥 Crear colaborador</Link> 
        <Link to="/admin/crearEquipo">👥 Crear Equipo</Link> 
        <Link to="/admin/">👤Usuarios</Link> 
        <Link to="/admin/">🛠 Configuración</Link>
      </nav>
      <div className="admin-buttons">
        <button className="admin-button" onClick={handleBack}>Atrás</button>
        <button className="admin-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <Outlet /> 
    </div>
  );
}

export default Admin;