import '../../assets/stylesheets/info.css'
import { useEffect, useState } from 'react'
import React from 'react'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import socket from '../Socket'


const Temperature = ({}) => {

    const [data, setData] = useState([])
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [date,setDate] = useState('')
    const [current, setCurrent] = useState(0)
    

    //1.- Listen for a cpu event and update the state
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

    useEffect(() =>{
        socket.on('cpu', (cpuPercent) =>{
            setData(currentData => [...currentData, cpuPercent])
            setCurrent(cpuPercent['temp'])
            if (current > max) {
                setMax(current)
            } else if(current['temp'] < min){
                setMin(current)
            }
        })
        
        getDate()
    }, [])

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
                    <Line yAxisId={2} type="monotone" dataKey="temp" stroke="black" />
                </LineChart>

                </div>
            </div>
        </div>
    )
}

export default Temperature
