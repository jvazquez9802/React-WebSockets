import React from 'react'
import '../../assets/stylesheets/info.css'
import { useEffect, useState } from 'react'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
//import socket from '../Socket'

const Graph = ({title, registry, prop, label}) => {

    let [current, setCurrent] = useState(0)
    let [max, setMax] = useState(0)
    let [min, setMin] = useState(0)    
    //1.- Listen for a cpu event and update the state

    return (
        <>
            <button onClick={() => console.log(registry[0][prop])}>click me babe</button>
            <h1 className="Graph-header">{title}</h1>
            <h2 className="current-prop">Actual: {current}</h2>
            <h2 className="min-prop">Mínima: {min}</h2>
            <h2 className="max-prop">Máxima: {max}</h2>
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
