import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const RoadmapForm = () => {
    const [origin, setOrigin] = useState("");
    const [destiny, setDestiny] = useState("");
    const [hour, setHour] = useState("");
    const [date, setDate] = useState("");
    const [airportsArray, setAirportsArray] = useState([])

    const navigate = useNavigate();

    const goToRoadmap = () => {
        navigate("/itinerarios", {state: {origin: origin, destiny: destiny, hour: hour, date: date}});
    }

    useEffect(() => {
        axios.get('http://localhost:8081/api/aeropuertos')
        .then((res)=>{
            console.log(res.data.aiports)
            res.data.aiports.map((item) =>{
                setAirportsArray(dataElement => [...dataElement,item.aiportName])
                console.log(item.aiportName)
            })
        }).catch((error)=>{
            console.log(error)
        })
      }
    , [])
    

    return (
        <main className="flex justify-center mt-16 px-6 min-w-max">    
            <article className="w-full flex flex-col justify-center">
                <section className="flex justify-between">
                    <form className="w-1/4 mr-16 px-3 py-5 border-x-4 border-y-4 border-black max-h-20">
                        <div className="w-full flex justify-between">
                            <label htmlFor="originInput"> Origen </label>
                            <select name="originInput" id="originInput" onChange={(e) => setOrigin(e.target.value)} 
                            className="w-1/2 px-1 border-x-2 border-y-2 border-black" required>
                                <option value="nothing"></option>
                                {
                                    airportsArray.map((element, index) => {
                                        return (<option key={index} value={element}>{element}</option>)
                                    })
                                } 
                            </select>
                        </div>
                    </form>

                    <form className="w-1/4 mr-16 px-3 py-5 border-x-4 border-y-4 border-black max-h-20">
                        <div className="w-full flex justify-between">
                            <label htmlFor="destinyInput"> Destino </label>
                            <select name="destinyInput" id="destinyInput" onChange={(e) => setDestiny(e.target.value)}
                            className="w-1/2 px-1 border-x-2 border-y-2 border-black" required>
                                <option value="nothing"></option>
                                {
                                    airportsArray.map((element, index) => {
                                        return (<option key={index} value={element}>{element}</option>)
                                    })
                                } 
                            </select>
                        </div>
                    </form>

                    <form className="w-1/4 px-3 py-5 border-x-4 border-y-4 border-black">
                        <div className="w-full flex justify-between mb-6">
                            <label htmlFor="dateInput"> Fecha </label>
                            <input type="date" name="dateInput" id="dateInput" value={date} 
                            onChange={(e) => setDate(e.target.value)} className="w-1/2 px-1 border-x-2 border-y-2 border-black" required/>
                        </div>

                        <div className="w-full flex justify-between">
                            <label htmlFor="hourInput"> Hora de salida </label>
                            <input type="time" name="hourInput" id="hourInput" min="00:00" max="23:59" value={hour} 
                            onChange={(e) => setHour(e.target.value)} className="w-1/2 px-1 border-x-2 border-y-2 border-black" required/>
                        </div>
                    </form>
                </section>

                <button onClick={goToRoadmap} className="w-1/4 mt-14 mx-auto p-3 bg-black text-white font-semibold rounded-full 
                hover:bg-white hover:text-black border-x-4 border-y-4 border-black transition-colors"> Generar Itinerarios </button>
            </article>
        </main>
    );
}