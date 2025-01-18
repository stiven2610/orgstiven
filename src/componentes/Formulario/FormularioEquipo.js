import React, { useState } from "react";
import Campo from "../Campo";
import Boton from "../Boton";
import { obtenerPayload } from "../../login/Login";
import { API } from "../../config";
import axios from "axios";
import Admin from "../../routes/admin";

const FormularioEquipo = () => {
  const token = sessionStorage.getItem("token");
  const datos = obtenerPayload(token);
  const [equipo, setEquipo] = useState({
    titulo: "",
    empresa: datos.empresa.id,
    colorPrimario: "",
    colorSecundario: "#00000",
  });
  const [error, setError] = useState({});

  const actualizarEquipo = (campo, valor) => {
    setEquipo({ ...equipo, [campo]: valor });
    setError((prevError) => ({ ...prevError, [campo]: "" }));
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
      <section className="formulario">
        <div>
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
        </div>
      </section>
    </>
  );
};

export default FormularioEquipo;
