import { useState } from "react";
import Campo from "../componentes/Campo";
import Header from "../componentes/Header/Header";
import Boton from "../componentes/Boton";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogin }) => {
  const [correo, actualizarCorreo] = useState("");
  const [contraseña, actualizarContraseña] = useState("");
  const correoPrueba = "stivenrozo1@gmail.com";
  const contraseñaPrueba = "123456";
  const navigate = useNavigate();

  const loguear = (e) => {
    e.preventDefault();
    if (contraseñaPrueba === contraseña && correoPrueba === correo) {
      sessionStorage.setItem("login", true);
      setLogin(true); // Actualiza el estado login
      navigate("/admin");
    } else {
      console.log("Datos incorrectos");
    }
  };

  return (
    <>
      <section className="formulario">
        <div className="contenedor">
          <form onSubmit={loguear}>
            <h2>Rellena el formulario para iniciar sesión.</h2>
            <Campo
              titulo="Correo"
              type="email"
              placeholder="Ingresar correo"
              required
              valor={correo}
              actualizarValor={actualizarCorreo}
            />
            <Campo
              titulo="Contraseña"
              placeholder="Ingresar contraseña"
              required
              valor={contraseña}
              type="password"
              actualizarValor={actualizarContraseña}
            />
            <div className="botonForm">
              <Boton>Iniciar sesión</Boton>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
