import { useEffect, useState } from "react";
import Campo from "../componentes/Campo";
import Boton from "../componentes/Boton";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogin }) => {
  const [correo, actualizarCorreo] = useState("");
  const [contraseña, actualizarContraseña] = useState("");

  const navigate = useNavigate();

  const loguear = async (e) => {
    e.preventDefault();
    //api login 
 try {
  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contraseña }),
  }); 
  const data = await response.json(); 
  if (data.token) {
    setLogin(true);
    sessionStorage.setItem("token", data.token);
    navigate("/dashboard");
  } else {
    alert("Usuario o contraseña incorrectos");
  }
} catch (error) {
console.log("error al iniciar sesión",error);
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
