import React, { useState } from "react";
import Campo from "../Campo";
import Boton from "../Boton";
import Admin from "../../routes/admin";

const FormularioColaborador = ({ crearColaborador }) => {
  const [colaborador, setColaborador] = useState({
    documento: "",
    nombre: "",
    puesto: "",
    foto: "",
  });
  const [error, setError] = useState({});

  const actualizarColaborador = (campo, valor) => {
    setColaborador({ ...colaborador, [campo]: valor });
    setError((prevError) => ({ ...prevError, [campo]: "" }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    crearColaborador(colaborador, setError);
  };

  return (
    <>
      <Admin />
      <section className="formulario">
        <div>
          <form onSubmit={manejarEnvio}>
            <h2>Rellena el formulario para crear el colaborador.</h2>
            <Campo
              titulo="Documento"
              placeholder="Ingresar documento"
              type="number"
              required
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
              actualizarValor={(valor) =>
                actualizarColaborador("nombre", valor)
              }
              error={error.nombre}
            />
            <Campo
              titulo="Puesto"
              placeholder="Ingresar puesto"
              required
              valor={colaborador.puesto}
              actualizarValor={(valor) =>
                actualizarColaborador("puesto", valor)
              }
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
        </div>
      </section>
    </>
  );
};

export default FormularioColaborador;
