import "./Equipo.css";
import Colaborador from "../Colaborador";
import hexToRgba from "hex-to-rgba";

const Equipo = ({
  colorPrimario = "#000000", // Valor predeterminado
  colorSecundario = "#FFFFFF", // Valor predeterminado
  titulo = "Equipo",
  id,
  colaboradores = [], // Array vacío predeterminado
  eliminarColaborador = () => {}, // Función vacía por defecto
  actualizarColor = () => {}, // Función vacía por defecto
  like = () => {}, // Función vacía por defecto
}) => {
  const obj = {
    backgroundColor: hexToRgba(colorPrimario, 0.6),
  };

  const estiloTitulo = { borderColor: colorPrimario };

  return (
    <>
      {colaboradores.length > 0 && (
        <section className="equipo" style={obj}>
          <input
            type="color"
            className="input-color"
            value={colorPrimario}
            onChange={(evento) => {
              actualizarColor(evento.target.value, id);
            }}
          />
          <h3 style={estiloTitulo}>{titulo}</h3>
          <div className="colaboradores">
            {colaboradores.map((colaborador, index) => (
              <Colaborador
                datos={colaborador}
                key={index}
                colorPrimario={colorPrimario}
                eliminarColaborador={eliminarColaborador}
                like={like}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Equipo;
