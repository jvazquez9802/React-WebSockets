import React from 'react'
import '../../assets/stylesheets/info.css'
import { useEffect, useState } from 'react'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import Spinner from '../utils/Spinner'
//import socket from '../Socket'


const Graph = ({title, registry, prop, label, lastData, pmax, pmin}) => {
    const [max, setMax] = useState(0)
    const [min, setMin] = useState(0)

    useEffect(() => {
        if(registry.length > 0){
            setMax(pmax(registry, prop))
            setMin(pmin(registry, prop))
        }
    }, [registry])

    if(registry.length == 0){
        return <Spinner/>
    }

    return (
        <>
            <h1 className="Graph-header">{title}</h1>
            <h2 className="current-prop">Actual: {lastData ? lastData : 0}</h2>
            <h2 className="max-prop">Máxima: {max} </h2>
            <h2 className="min-prop">Mínima: {min}</h2>
            <div className="Graph-box">
                <div className="Graph-inner-box">
                <LineChart className="Graph" width={800} height={370} data={registry}>
                    <XAxis dataKey="time" angle={-90} dy={10}/>
                    <YAxis 
                        yAxisId={2} 
                        label={{ value: label, angle: -90, tickMargin: 20 }} 
                        tickMargin={10}
                        domain={[-10, 55]}
                    />
                    <Tooltip />
                    <CartesianGrid stroke="#eee" strokeDasharray="1" />
                    <Line yAxisId={2} type="monotone" dataKey={prop} stroke="black" />
                </LineChart>

                </div>
            </div>
        </>
        
    )
}

export default Graph
