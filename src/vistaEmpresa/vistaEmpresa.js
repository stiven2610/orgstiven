import React, { useState } from 'react';
 import { v4 as uuidv4 } from 'uuid';

import MiOrg from '../componentes/MiOrg';
import Equipo from '../componentes/Equipo';
import Formulario from '../componentes/Formulario/Formulario';
import Admin from '../routes/admin';

const VistaEmpresa = () => {
    const [mostrarFormulario, actualizarMostrar] = useState(false);
    const [colaboradores, actualizarColaboradores] = useState([
        {
            id: uuidv4(),
            documento: "",
            equipo: "Innovación y Gestión",
            foto: "https://github.com/JoseDarioGonzalezCha.png",
            nombre: "Jose Gonzalez",
            puesto: "Dev FullStack",
            fav: false
        }
    ]);

    const [equipos, actualizarEquipos] = useState([
        {
            id: uuidv4(),
            titulo: "Programación",
            colorPrimario: "#57C278",
            colorSecundario: "#D9F7E9"
        }
    ]);

    const cambiarMostrar = () => {
        actualizarMostrar(!mostrarFormulario);
    };

    const registrarColaborador = (colaborador) => {
        console.log("Nuevo colaborador", colaborador);
        actualizarColaboradores([...colaboradores, colaborador]);
    };

    const eliminarColaborador = (id) => {
        console.log("Eliminar colaborador", id);
        const nuevosColaboradores = colaboradores.filter((colaborador) => colaborador.id !== id);
        actualizarColaboradores(nuevosColaboradores);
    };

    const actualizarColor = (color, id) => {
        console.log("Actualizar: ", color, id);
        const equiposActualizados = equipos.map((equipo) => {
            if (equipo.id === id) {
                equipo.colorPrimario = color;
            }
            return equipo;
        });
        actualizarEquipos(equiposActualizados);
    };

    const crearEquipo = (nuevoEquipo) => {
        console.log(nuevoEquipo);
        actualizarEquipos([...equipos, { ...nuevoEquipo, id: uuidv4() }]);
    };

    const like = (id) => {
        console.log("like", id);
        const colaboradoresActualizados = colaboradores.map((colaborador) => {
            if (colaborador.id === id) {
                colaborador.fav = !colaborador.fav;
            }
            return colaborador;
        });
        actualizarColaboradores(colaboradoresActualizados);
    };

    return (
        <>
        <Admin/>           
            <MiOrg cambiarMostrar={cambiarMostrar} />
            {equipos?.map((equipo) => (
                <Equipo
                    datos={equipo}
                    key={equipo.titulo}
                    colaboradores={colaboradores.filter(colaborador => colaborador.equipo === equipo.titulo)}
                    eliminarColaborador={eliminarColaborador}
                    actualizarColor={actualizarColor}
                    like={like}
                />
            ))}
        </>
    );
};

export default VistaEmpresa;