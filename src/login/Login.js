import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Campo from "../componentes/Campo";
import Boton from "../componentes/Boton";
import { useNavigate } from "react-router-dom";
import { API } from "../config";
import "./login.css";
const obtenerPayload = (token) => {
  try {
    const payload = jwtDecode(token);
    return payload;
  } catch (error) {
    console.error("Error al obtener el payload del token", error);
    return null;
  }
};
const Login = ({ setLogin }) => {
  const [correo, actualizarCorreo] = useState("");
  const [contraseña, actualizarContraseña] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleCorreoChange = (valor) => {
    actualizarCorreo(valor);
    if (error) setError("");
  };

  const handleContraseñaChange = (valor) => {
    actualizarContraseña(valor);
    if (error) setError("");
  };
  const loguear = async (e) => {
    e.preventDefault();
    //api login
    try {
      const response = await fetch(API + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contraseña }),
      });
      const data = await response.json();
      console.log(data);
      if (data.token) {
        setLogin(true);
        sessionStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error al iniciar sesión")
      console.log("Error al iniciar sesión", error);
    }
  };

  return (
    <>
      <section className="formulario">
        <div className={error ? "formulario-error" : ""}>
          <form  onSubmit={loguear}>
            <h2>Rellena el formulario para iniciar sesión.</h2>
            <Campo
              titulo="Correo"
              type="email"
              placeholder="Ingresar correo"
              required
              valor={correo}
              actualizarValor={handleCorreoChange}
            />
            <Campo
              titulo="Contraseña"
              placeholder="Ingresar contraseña"
              required
              valor={contraseña}
              type="password"
              actualizarValor={handleContraseñaChange}
            />
            {error && <span className="error">{error}</span>}
            <div className="botonForm">
              <Boton>Iniciar sesión</Boton>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export { Login, obtenerPayload };
