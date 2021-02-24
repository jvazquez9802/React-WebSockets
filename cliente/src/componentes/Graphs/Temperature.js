import '../../assets/stylesheets/info.css'
import { useEffect, useState } from 'react'
import { BarChart, Bar, Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import socket from '../Socket'


const Temperature = ({}) => {

    const [data, setData] = useState([])
    //1.- Listen for a cpu event and update the state
    useEffect(() =>{
        socket.on('cpu', (cpuPercent) =>{
            setData(currentData => [...currentData, cpuPercent])
        })
    }, [])
    
    //2.- Render the line chart using the state
    
    return (
        <div className="Graph-content">
            <LineChart width={500} height = {300} data={data}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Line dataKey="value" />
            </LineChart>
        </div>
    )
}

export default Temperature
