import "./Campo.css";

const Campo = (props) => {
  const placeholderModificado = `${props.placeholder}...`;

  // Destructuración
  const { type = "text", error } = props;

  const manejarCambio = (e) => {
    props.actualizarValor(e.target.value.trimStart());
  };

  return (
    <div className={`campo campo-${type} ${error ? "campo-error" : ""}`}>
      <label>{props.titulo}</label>
      <input
        placeholder={placeholderModificado}
        required={props.required}
        value={props.valor}
        onChange={manejarCambio}
        type={type}
        className={error ? "input-error" : ""}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Campo;