import "./Formulario.css";
import Campo from "../Campo";
import Boton from "../Boton";
import Admin from "../../routes/admin";
import { useState } from "react";
import axios from "axios";
import { obtenerPayload } from "../../login/Login";
import { API } from "../../config";

const Formulario = () => {
  const token = sessionStorage.getItem("token");
 const datos =  obtenerPayload(token);
 console.log(datos);
  const [colaborador, setColaborador] = useState({
    documento: "",
    nombre: "",
    puesto: "",
    foto: "",
  });

  const [equipo, setEquipo] = useState({
    titulo: "",
    empresa:datos.empresa.id,
    colorPrimario: "",
    colorSecundario:"#00000",
  });

  const actualizarColaborador = (campo, valor) => {
    setColaborador({ ...colaborador, [campo]: valor });
  };

  const actualizarEquipo = (campo, valor) => {
    setEquipo({ ...equipo, [campo]: valor });
  };

  const crearColaborador = (e) => {
    e.preventDefault();
    console.log("Colaborador creado:", colaborador);
  };

  const crearEquipo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API + "equipo", equipo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Equipo creado:", response.data);
    } catch (error) {
      console.error("Error al crear equipo:", error);
    }
  };

  return (
    <>
      <Admin />
      <section className="formulario">
        <form onSubmit={crearColaborador}>
          <h2>Rellena el formulario para crear el colaborador.</h2>
          <Campo
            titulo="Documento"
            placeholder="Ingresar documento"
            type="number"
            required
            valor={colaborador.documento}
            actualizarValor={(valor) => actualizarColaborador("documento", valor)}
          />
          <Campo
            titulo="Nombre"
            placeholder="Ingresar nombre"
            required
            valor={colaborador.nombre}
            actualizarValor={(valor) => actualizarColaborador("nombre", valor)}
          />
          <Campo
            titulo="Puesto"
            placeholder="Ingresar puesto"
            required
            valor={colaborador.puesto}
            actualizarValor={(valor) => actualizarColaborador("puesto", valor)}
          />
          <Campo
            titulo="Foto"
            placeholder="Ingresar enlace de foto"
            required
            valor={colaborador.foto}
            actualizarValor={(valor) => actualizarColaborador("foto", valor)}
          />
        
          <div className="botonForm">
            <Boton>Crear</Boton>
          </div>
        </form>

        <form onSubmit={crearEquipo}>
          <h2>Rellena el formulario para crear el equipo.</h2>
          <Campo
            titulo="Titulo"
            placeholder="Ingresar titulo"
            required
            valor={equipo.titulo}
            actualizarValor={(valor) => actualizarEquipo("titulo", valor)}
          />
          <Campo
            titulo="Color"
            placeholder="Ingresar el color en Hex"
            required
            valor={equipo.colorPrimario}
            actualizarValor={(valor) => actualizarEquipo("colorPrimario", valor)}
            type="color"
          />
          <div className="botonForm">
            <Boton>Registrar equipo</Boton>
          </div>
        </form>
      </section>
    </>
  );
};

export default Formulario;
