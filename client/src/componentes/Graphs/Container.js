import '../../assets/stylesheets/info.css'
import { useEffect, useState } from 'react'
import React from 'react'
import socket from '../Socket'
import Graph from './Graph'
import Table from './Table'
import { useLocation, Link } from 'react-router-dom'

const Container = () => {

    const [data, setData] = useState([])
    const [current, setCurrent] = useState({})
    const [change, setChange] = useState(false)

    
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:5000/registros");
            const jsonData = await response.json();
            setData(jsonData);
            setCurrent(jsonData[jsonData.length - 1])
        } catch (err) {
            console.error(err.message)
        }
    };

    const getMax = (object, prop) => {
        let tmax = object[0][prop]
        object.forEach(element => {
            if(element[prop] > tmax){
                tmax = element[prop]
            }
        });
        return tmax
    }

    const getMin = (object, prop) => {
        let tmin = object[0][prop]
        object.forEach(element => {
            if(element[prop] < tmin){
                tmin = element[prop]
            }
        });
        return tmin
    }

    useEffect(() => {
        getData()
    }, [change]);

    useEffect(() =>{
            socket.on('new: data', (c) =>{
            getData()

        })
    }, []);
    

    const location = useLocation()
    return (
        <div className="Graph-content">
            {location.pathname !== "/info" &&(
                <Link className='data-table-path' to='/info'>Tabla de registros</Link>
            )}
            {location.pathname === "/info" &&(
                <Table/>
            )}
           {location.pathname === "/info/temperatura" &&(
               <Graph 
               title="Temperatura" 
               registry={data} 
               prop="temperatura" 
               label="Temp" 
               lastData={current['temperatura']} 
               pmax={getMax}
               pmin={getMin}
               />
            )}
            {location.pathname === "/info/humedad" &&(
               <Graph 
                    title="Humedad" 
                    registry={data} 
                    prop="humedad" 
                    label="Hum" 
                    lastData={current['humedad']}
                    pmax={getMax}
                    pmin={getMin}
                />
            )}
            {location.pathname === "/info/viento" &&(
               <Graph 
                    title="Viento" 
                    registry={data} 
                    prop="viento" 
                    label="Hum" 
                    lastData={current['viento']}
                    pmax={getMax}
                    pmin={getMin}
                />
            )}
            {location.pathname === "/info/presion" &&(
               <Graph 
                    title="Presion" 
                    registry={data} 
                    prop="presion" 
                    label="Hum" 
                    lastData={current['presion']}
                    pmax={getMax}
                    pmin={getMin}
                />
            )}
            {location.pathname === "/info/radiacion" &&(
               <Graph 
                    title="Radiacion" 
                    registry={data} 
                    prop="radiacion" 
                    label="Hum" 
                    lastData={current['radiacion']}
                    pmax={getMax}
                    pmin={getMin}
                />
            )}
            {location.pathname === "/info/precipitacion" &&(
               <Graph 
                    title="Precipitacion" 
                    registry={data} 
                    prop="precipitacion" 
                    label="Hum" 
                    lastData={current['precipitacion']}
                    pmax={getMax}
                    pmin={getMin}
                />
            )}
        </div>
    )
}

export default Container
