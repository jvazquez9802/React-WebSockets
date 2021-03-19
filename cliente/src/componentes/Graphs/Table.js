import '../../assets/stylesheets/table.css'

const Table = ({data}) => {



    return (
        <div className="table-content">
        <table className="table">
            <thead>
                <tr>
                    <th>Hora</th>
                    <th>Temperatura</th>
                    <th>Humedad</th>
                    <th>Viento</th>
                    <th>Presion</th>
                    <th>Radiación</th>
                    <th>Precipitacion</th>
                </tr>
            </thead>
                <tbody>
                    {data.slice(0).reverse().map(d => (
                            
                            <tr key={d.registro_id} style={{textAlign: 'center'}}>
                                <td>{d.hora}</td>
                                <td>{d.temperatura}</td>
                                <td>{d.humedad}</td>
                                <td>{d.viento}</td>
                                <td>{d.presion}</td>
                                <td>{d.radiacion}</td>
                                <td>{d.precipitacion}</td>
                            </tr>
                        ))}
            </tbody>
        </table>
        </div>
    );
};

export default Table; 