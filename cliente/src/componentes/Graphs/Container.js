import '../../assets/stylesheets/info.css'
import { useEffect, useState } from 'react'
import React from 'react'
import socket from '../Socket'
import Graph from './Graph'
import { useLocation } from 'react-router-dom'


const Container = ({}) => {

    const [data, setData] = useState([])
    const [change, setChange] = useState([false])
    //1.- Listen for a cpu event and update the state

    
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:5000/registros");
            const jsonData = await response.json();
            setData(jsonData);
            //getMinMax(data)
        } catch (err) {
            console.error(err.message)
        }
    };
    
    useEffect(() => {
        getData()
        console.log(data)
    }, [change])

   useEffect(() =>{
        socket.on('cpu', (cpuPercent) =>{
            setData(currentData => [...currentData, cpuPercent])
        })
    }, [])

    //2.- Render the line chart using the state
    const location = useLocation()
    return (
        <div className="Graph-content">
           <button onClick={() => console.log(data)}>Click to check</button>
           {location.pathname === "/info/temperatura" &&(
               <Graph title="Temperatura" registry={data} prop="temperatura" label="Temp"/>
            )}
            {location.pathname === "/info/humedad" &&(
               <Graph title="Humedad" registry={data} prop="humedad" label="Hum"/>
            )}
            {location.pathname === "/info/viento" &&(
               <Graph title="viento" registry={data} prop="viento" label="Hum"/>
            )}
            {location.pathname === "/info/presion" &&(
               <Graph title="presion" registry={data} prop="presion" label="Hum"/>
            )}
            {location.pathname === "/info/radiacion" &&(
               <Graph title="radiacion" registry={data} prop="radiacion" label="Hum"/>
            )}
            {location.pathname === "/info/precipitacion" &&(
               <Graph title="precipitacion" registry={data} prop="precipitacion" label="Hum"/>
            )}
        </div>
    )
}

export default Container
