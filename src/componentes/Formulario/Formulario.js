import "./Formulario.css";
import Campo from "../Campo";
import Boton from "../Boton";
import Admin from "../../routes/admin";
import { useState } from "react";
import axios from "axios";
import { obtenerPayload } from "../../login/Login";
import { API } from "../../config";

const Formulario = () => {
  const [error, setError] = useState({});
  const token = sessionStorage.getItem("token");
  const datos = obtenerPayload(token);
  const [colaborador, setColaborador] = useState({
    documento: "",
    nombre: "",
    puesto: "",
    foto: "",
  });

  const [equipo, setEquipo] = useState({
    titulo: "",
    empresa: datos.empresa.id,
    colorPrimario: "",
    colorSecundario: "#00000",
  });

  const actualizarColaborador = (campo, valor) => {
    setColaborador({ ...colaborador, [campo]: valor });
    setError((prevError) => ({ ...prevError, [campo]: "" }));
  };

  const actualizarEquipo = (campo, valor) => {
    setEquipo({ ...equipo, [campo]: valor });
    setError((prevError) => ({ ...prevError, [campo]: "" }));
  };

  const crearColaborador = (e) => {
    e.preventDefault();
    console.log("Colaborador creado:", colaborador);
  };

  const crearEquipo = async (e) => {
    e.preventDefault();
    let hasError = false;
    let newError = {};

    if (!equipo.titulo) {
      newError.titulo = "El campo es obligatorio";
      hasError = true;
    }

    if (!equipo.colorPrimario) {
      newError.colorPrimario = "El campo es obligatorio";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

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
      <section className="contenedor-formulario">
        <form className="formulario" onSubmit={crearColaborador}>
          <h2>Rellena el formulario para crear el colaborador.</h2>
          <Campo
            titulo="Documento"
            placeholder="Ingresar documento"
            type="number"
            valor={colaborador.documento}
            actualizarValor={(valor) =>
              actualizarColaborador("documento", valor)
            }
            error={error.documento}
          />
          <Campo
            titulo="Nombre"
            placeholder="Ingresar nombre"
            required
            valor={colaborador.nombre}
            actualizarValor={(valor) => actualizarColaborador("nombre", valor)}
            error={error.nombre}
          />
          <Campo
            titulo="Puesto"
            placeholder="Ingresar puesto"
            required
            valor={colaborador.puesto}
            actualizarValor={(valor) => actualizarColaborador("puesto", valor)}
            error={error.puesto}
          />
          <Campo
            titulo="Foto"
            placeholder="Ingresar enlace de foto"
            required
            valor={colaborador.foto}
            actualizarValor={(valor) => actualizarColaborador("foto", valor)}
            error={error.foto}
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
            valor={equipo.titulo}
            error={error.titulo}
            actualizarValor={(valor) => actualizarEquipo("titulo", valor)}
          />
          <Campo
            titulo="Color"
            placeholder="Ingresar el color en Hex"
            required
            valor={equipo.colorPrimario}
            actualizarValor={(valor) =>
              actualizarEquipo("colorPrimario", valor)
            }
            type="color"
            error={error.colorPrimario}
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