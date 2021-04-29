import '../../assets/stylesheets/table.css'
import { useState, useEffect } from 'react'


const Table = () => {

    const [data, setData] = useState([])
    const [low, setLow] = useState('')
    const [upper, setUpper] = useState('')

    const getDateRange = async () => {
        if (low === '' || upper === '') {
            alert('Debes seleccionar un rango válido de fechas')
            return;
        }


        if (Date.parse(low) > Date.parse(upper)) {
            alert('El rango de fechas no es válido')
        } else {
            try {
                const response = await fetch(`http://localhost:5000/filtro?lower=${low}&upper=${upper}`);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.error(err.message)
            }

            setUpper('')
            setLow('')
        }
    }

    if (data.length > 0) {
        return (
            <div>
               <input value={low} onChange={(e) => setLow(e.target.value)} type="date"></input>
                <input value={upper} onChange={(e) => setUpper(e.target.value)} type="date"></input>
                <button onClick={() => getDateRange()} >Buscar</button>
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

                                <tr key={d.registro_id} style={{ textAlign: 'center' }}>
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

            </div>
        );
    } else {
        return (
            <div>
                <input value={low} onChange={(e) => setLow(e.target.value)} type="date"></input>
                <input value={upper} onChange={(e) => setUpper(e.target.value)} type="date"></input>
                <button onClick={() => getDateRange()} >Buscar</button>
                <p>No hay registros para mostrar</p>
            </div>
        );
    }
};

export default Table;