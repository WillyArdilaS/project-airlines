import { useState,useEffect } from "react";
import { ConnectionForm } from "./ConnectionForm";
import axios from 'axios';

export const SegmentForm = ({marginLeft, segmentNumber,airlines,airlineCode,lastAirline,setLastAirline}) => {
    const [connectionCreated, SetConnectionCreated] = useState(false);
    const [actualAirport,setActualAirport]= useState("")
    const [segmentAirports, setSegmentAirports] = useState([]);

    useEffect(() => {
        if (airlines.length != 0) {
            axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/airlineCode_idPlace', { params: { airlineCode: lastAirline } })
                .then((res) => {
                    let codePlace = res.data.idPlace[0]
                    axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/paisFK_idPlace', { params: { pais: codePlace } })
                        .then((res) => {
                            let division = res.data.idPlace
                            setSegmentAirports([])

                            division.map((item) => {
                                axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/idPlace_aiportName', { params: { idPlaceAirport: item } })
                                    .then((res) => {

                                        setSegmentAirports(dataElement => [...dataElement, res.data.nameAirport[0]])
                                        
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            })
                        })

                        .catch((error) => {
                            console.log(error)
                        })
                })

                .catch((error) => {
                    console.log(error)
                })
        }

    }, [airlineCode])

    const handleCreateConnection = () => {
        SetConnectionCreated(true);
    }

    const handleDeleteConnection = () => {
        SetConnectionCreated(false);
    }


    return (
        <div className={`w-1/5 ${marginLeft}`}>
            <article className="w-full"> 
                <h1 className="-mt-11 text-lg text-black text-center font-bold"> Segmento #{segmentNumber} </h1>

                <form className="flex flex-col mt-4 px-3 py-6 border-x-4 border-y-4 border-black">
                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="airportInput"> Aeropuerto </label>
                        <select name="airportInput" id="airportInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" onChange={(e)=>setActualAirport(e.target.value)} required>
                            <option value="nothing"></option>

                            {
                                segmentAirports.map((element, index) => {
                                    return (<option key={index} value={element}>{element}</option>)
                                })
                            }


                        </select>
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="countryInput"> País </label>
                        <input type="text" name="countryInput" id="countryInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required/>
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="cityInput"> Ciudad </label>
                        <input type="text" name="cityInput" id="cityInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required/>
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="divisionInput"> División </label>
                        <input type="text" name="divisionInput" id="divisionInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required/>
                    </div>

                    {(connectionCreated == false) ? (
                        <button className="w-3/4 self-center p-2 bg-black text-white font-semibold rounded-full hover:bg-white 
                        hover:text-black border-x-4 border-y-4 border-black transition-colors" onClick={handleCreateConnection}> 
                        Agregar conexión + </button>
                    ) : (
                        <button className="w-3/4 self-center p-2 bg-black text-white font-semibold rounded-full hover:bg-white 
                        hover:text-black border-x-4 border-y-4 border-black transition-colors" onClick={handleDeleteConnection}> 
                        Quitar conexión - </button>
                    )}
                </form>
            </article>

            {(connectionCreated == true) ? <ConnectionForm segmentNumber={segmentNumber} airlines={airlines} airlineCode={airlineCode} actualAirport={actualAirport} setLastAirline={setLastAirline}/> : false}
        </div>
    );
}