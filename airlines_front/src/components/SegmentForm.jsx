import { useState,useEffect } from "react";
import { ConnectionForm } from "./ConnectionForm";
import axios from 'axios';

export const SegmentForm = ({marginLeft, segmentNumber,airlines,airlineCode,lastAirline,setLastAirline,num}) => {
    const [connectionCreated, SetConnectionCreated] = useState(false);
    const [actualAirport,setActualAirport]= useState("")
    const [segmentAirports, setSegmentAirports] = useState([]);
    const [division, setDivision] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
   
    
    

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

    const handleCreateConnection = (e) => {
        e.preventDefault()
        SetConnectionCreated(true);
    }

    const handleDeleteConnection = (e) => {
        e.preventDefault()
        SetConnectionCreated(false);
    }

    const handleAirport =(e)=>{
        e.preventDefault()
        setActualAirport(e.target.value)
        axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/aiportName_airport',{params:{airportName: e.target.value}})
        .then((res)=>{
            let divisionCode =res.data.aiports[0]
            axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/id_place',{params:{idPlace:divisionCode}})
            .then((res)=>{
                setDivision(res.data.place[0].placeName)
                let tempCountry = res.data.place[0].pais
                let tempCity = res.data.place[0].ciudad
                
                axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/idPLace_PlaceName',{params:{idPlace:tempCountry}})
                .then((res)=>{
                    setCountry(res.data.placeNames[0]) 
                    
                })
                .catch((error)=>{
                    console.log(error)
                })

                axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/idPLace_PlaceName',{params:{idPlace:tempCity}})
                .then((res)=>{
                    setCity(res.data.placeNames[0])    
                })
                .catch((error)=>{
                    console.log(error)
                })
            })
            .catch((error)=>{
                console.log(error)
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div className={`w-1/5 ${marginLeft}`}>
            <article className="w-full"> 
                <h1 className="-mt-11 text-lg text-black text-center font-bold"> Segmento #{segmentNumber} </h1>
                <form className="flex flex-col mt-4 px-3 py-6 border-x-4 border-y-4 border-black">
                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="airportInput"> Aeropuerto </label>
                        <select name="airportInput" id="airportInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" onChange={handleAirport}>
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
                        <input type="text" name="countryInput" id="countryInput" value={country} className="w-1/2 px-1 border-x-2 border-y-2 border-black" disabled />
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="cityInput"> Ciudad </label>
                        <input type="text" name="cityInput" id="cityInput" value={city} className="w-1/2 px-1 border-x-2 border-y-2 border-black" disabled />
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="divisionInput"> División </label>
                        <input type="text" name="divisionInput" id="divisionInput" value={division} className="w-1/2 px-1 border-x-2 border-y-2 border-black" disabled />
                    </div>
                    {(connectionCreated == false) ? (
                        <button className="w-3/4 self-center p-2 bg-black text-white font-semibold rounded-full hover:bg-white 
                        hover:text-black border-x-4 border-y-4 border-black transition-colors" onClick={handleCreateConnection}> 
                        Agregar Conexión + </button>
                    ) : (
                        <button className="w-3/4 self-center p-2 bg-black text-white font-semibold rounded-full hover:bg-white 
                        hover:text-black border-x-4 border-y-4 border-black transition-colors" onClick={handleDeleteConnection}> 
                        Quitar Conexión - </button>
                    )}               
                </form>  
            </article>

            {(connectionCreated == true) ? <ConnectionForm segmentNumber={segmentNumber} airlines={airlines} airlineCode={airlineCode} actualAirport={actualAirport} setLastAirline={setLastAirline} num={num}/> : false}
        </div>
    );
}