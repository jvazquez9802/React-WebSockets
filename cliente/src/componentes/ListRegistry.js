import React, { Fragment, useEffect, useState } from "react";

const ListRegistry = () => {

    const [registros, setRegistros] = useState([]);

    const getRegystry = async () => {
        try {
            const response = await fetch("http://localhost:5000/registros");
            const jsonData = await response.json();
            setRegistros(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getRegystry();
    }, []);

    console.log(registros);

    return (
        <Fragment>
            {""}
            <table>
                <thead>
                    <tr>
                        <th>Temperatura</th>
                        <th>Humedad</th>
                        <th>Viento</th>
                        <th>Presión</th>
                        <th>Radiación</th>
                        <th>Precipitación</th>
                        <th>Fecha y hora</th>
                    </tr>
                </thead>
                <tbody>
                    {/*<tr>
                    <td></td>
                </tr> */}
                    {registros.map(registro => (
                        <tr key={registro.registro_id}>
                            <td>{registro.temperatura}</td>
                            <td>{registro.humedad}</td>
                            <td>{registro.viento}</td>
                            <td>{registro.presion}</td>
                            <td>{registro.radiacion}</td>
                            <td>{registro.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListRegistry; 