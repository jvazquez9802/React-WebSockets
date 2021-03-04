import '../../assets/stylesheets/info.css'
import { useEffect, useState } from 'react'
import React from 'react'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import socket from '../Socket'


const Temperature = ({}) => {

    const [data, setData] = useState([])
    const [date,setDate] = useState('')
    const [current, setCurrent] = useState(0)
    const [max, setMax] = useState(0)
    const [min, setMin] = useState(0)    
    const [first, setFirst] = useState(true)
    //1.- Listen for a cpu event and update the state

    const getMinMax = (object) => {
        let tmax = object[0].temperatura
        let tmin = object[0].temperatura
        object.forEach(element => {
            if(element.temperatura > tmax){
                tmax = element.temperatura
            }
            if(element.temperatura < tmin){
                tmin = element.temperatura
            }
        });

        setMin(tmin)
        setMax(tmax)
    }


    const getData = async () => {
        try {
            const response = await fetch("http://localhost:5000/registros/temperatura");
            const jsonData = await response.json();
            setData(jsonData);
            getMinMax(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    };
    
    const getDate = () =>{
        let currentDate = new Date()
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        let hour = currentDate.getTime()

        if(month < 10){
            setDate(`${day}-0${month}-${year}`)
        }else{
            setDate(`${day}-${month}-${year} : ${hour}`)
        }
    }
    
    useEffect(() => {
        getData()
        console.log(data)
    }, [first])

    useEffect(() =>{
        socket.on('cpu', (cpuPercent) =>{
            setData(currentData => [...currentData, cpuPercent])
            setCurrent(cpuPercent.temperatura)
        })
        
        getDate()
    }, [])

    useEffect(() =>{
        let valor = current
        if(valor > max){
            setMax(valor)
        } else if(valor < min){
            setMin(valor)
        }
    }, [current])

    //2.- Render the line chart using the state

    return (
        <div className="Graph-content">
            <h1 className="Graph-header">Temperatura</h1>
            <p className="current-time">{date}</p>
            <h2 className="current-prop">Actual: {current}</h2>
            <h2 className="min-prop">Mínima: {min}</h2>
            <h2 className="max-prop">Máxima: {max}</h2>
            <h2 className="state-prop" >Estado: Undefined</h2>
            <div className="Graph-box">
                <div className="Graph-inner-box">
                <LineChart className="Graph" width={800} height={370} data={data}>
                    <XAxis dataKey="time" angle={-90} dy={10}/>
                    <YAxis 
                        yAxisId={2} 
                        label={{ value: 'Temp', angle: -90, tickMargin: 20 }} 
                        tickMargin={10}
                        domain={[-10, 55]}
                    />
                    <Tooltip />
                    <CartesianGrid stroke="#eee" strokeDasharray="1" />
                    <Line yAxisId={2} type="monotone" dataKey="temperatura" stroke="black" />
                </LineChart>

                </div>
            </div>
        </div>
    )
}

export default Temperature
