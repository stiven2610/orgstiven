import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Campo from "../componentes/Campo";
import Boton from "../componentes/Boton";
import { useNavigate } from "react-router-dom";
import { API } from "../config";

const obtenerPayload = (token)=>{
  try {
    const payload = jwtDecode(token);
    return payload
  } catch (error) {
    console.error("Error al obtener el payload del token", error);
    return null
  }
}
const Login = ({ setLogin }) => {
  const [correo, actualizarCorreo] = useState("");
  const [contraseña, actualizarContraseña] = useState("");

  const navigate = useNavigate();
  
  
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
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.log("error al iniciar sesión", error);
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

export {Login,obtenerPayload} ;
