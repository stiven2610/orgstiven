import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Footer from "./componentes/Footer";
import ProtectedRoute from "./routes/protectedRoute";
import VistaEmpresa from "./vistaEmpresa/vistaEmpresa";
import Header from "./componentes/Header/Header";
import { useEffect, useState } from "react";
import Formulario from "./componentes/Formulario/Formulario";
import { Login } from "./login/Login";
import FormularioColaborador from "./componentes/Formulario/FormularioColaborador";
import FormularioEquipo from "./componentes/Formulario/FormularioEquipo";

function App() {
  const [login, setLogin] = useState(!!sessionStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(!!sessionStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={login ? <Navigate to="/admin" /> : <Login setLogin={setLogin} />}
          />
          <Route path="/admin" element={<ProtectedRoute isLoggedIn={login} />}>
            <Route index element={<VistaEmpresa />} />
            <Route path="/admin/crearColaborador" element={<FormularioColaborador />} />
            <Route path="/admin/crearEquipo" element={<FormularioEquipo/>}/>
            <Route path="/admin/crearEquipo" element={""} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;