import { useState } from "react";
import { SegmentForm } from "./SegmentForm";
import axios from 'axios';
import { useEffect } from "react";

export const FlightForm = () => {

    const [segmentsArray, setSegmentsArray] = useState([1]);
    const [airlines, setAirlines] = useState([]);
    const [flightNumber, setFlightNumber] = useState('')
    const [airlineCode, setAirlineCode] = useState('')
    const [airports, setAirports] = useState([]);
    const [pilots, setPilots] = useState([]);
    const [lastAirline,setLastAirline]= useState("")
    

    useEffect(() => {
        axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas')
            .then((res) => {
                res.data.airlines.map(item => {
                    setAirlines(dataElement => [...dataElement, item.airlineName])
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        if (airlines.length != 0) {
            axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/airlineCode_idPlace', { params: { airlineCode: airlineCode } })
                .then((res) => {
                    let codePlace = res.data.idPlace[0]
                    axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/paisFK_idPlace', { params: { pais: codePlace } })
                        .then((res) => {
                            let division = res.data.idPlace
                            setAirports([])
                            division.map((item) => {
                                axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/idPlace_aiportName', { params: { idPlaceAirport: item } })
                                    .then((res) => {

                                        setAirports(dataElement => [...dataElement, res.data.nameAirport[0]])

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


    useEffect(() => {
        if (airlines.length != 0) {
            axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/airlineCode_pilot', { params: { airlineCode: airlineCode } })
                .then((res) => {
                    let pilotCode = res.data.employeeNumber[0]
                    axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/employeeNumber_idPerson', { params: { employeeNumber: pilotCode } })
                        .then((res) => {
                            let idPerson = res.data.idPerson[0]
                            setPilots([])
                            axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/idPerson_piloto', { params: { idPerson: idPerson } })
                                .then((res) => {
                                    setPilots(dataElement => [...dataElement, res.data.piloto[0]])
                                })
                                .catch((error) => {
                                    console.log(error)
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


    const handleFlight = (e) => {
        axios.get(`http://localhost:8081/api/nuevoVuelo/aerolineas/airlineName`, { params: { airlineName: e.target.value } })
            .then((res) => {
                
                let code = res.data.airlineCode
                axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/airlineCode_flightNumber', { params: { airlineCode: code } })
                    .then((res) => {
                        setAirlineCode(code)
                        setLastAirline(code)
                        let parse = parseInt(res.data.flightNumber) + 1
                        setFlightNumber(parse.toString())
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const handleSegmentsNumber = (e) => {
        setSegmentsArray([]);
        for (let i = 1; i <= e.target.value; i++) {
            setSegmentsArray(data => [...data, i]);
        }
    }



    return (
        <>
            <article className="w-1/5 flex flex-col">
                <form className="px-3 py-6 border-x-4 border-y-4 border-black">
                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="airlineInput"> Aerolínea </label>
                        <select name="airlineInput" id="airlineInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" onChange={handleFlight} required>
                            <option value="nothing"></option>
                            {
                                airlines.map((element, index) => {
                                    return (<option key={index} value={element}>{element}</option>)
                                })
                            } 
                        </select>
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="flightInput"> N° de vuelo </label>
                        <input type="number" name="flightInput" id="flightInput" className="w-1/2 px-1 border-x-2 border-y-2 
                        border-black" value={flightNumber} disabled />
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="segmentInput"> N° de segmentos </label>
                        <input type="number" name="segmentInput" id="segmentInput" value={segmentsArray.length} min={1} className="w-1/2 px-1 
                        border-x-2 border-y-2 border-black" onChange={handleSegmentsNumber} required />
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="airportInput"> Aeropuerto </label>
                        <select name="airportInput" id="airportInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required>
                            <option value="nothing"></option>

                            {
                                airports.map((element, index) => {
                                    return (<option key={index} value={element}>{element}</option>)
                                })
                            }


                        </select>
                    </div>

                    <div className="w-full flex justify-between">
                        <label htmlFor="pilotInput"> Piloto </label>
                        <select name="pilotInput" id="pilotInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required>
                            <option value="nothing"></option>

                            {
                                pilots.map((element, index) => {
                                    return (<option key={index} value={element}>{element}</option>)
                                })
                            }


                        </select>

                    </div>
                </form>

                <button className="w-2/3 mt-8 mx-auto p-3 bg-black text-white font-semibold rounded-full 
                hover:bg-white hover:text-black border-x-4 border-y-4 border-black transition-colors"> Confirmar Vuelo </button>
            </article>

            {segmentsArray.map((index) => {
                return (
                    <SegmentForm key={index} marginLeft={"ml-32"} segmentNumber={index} airports={airports} airlines={airlines} airlineCode={airlineCode} lastAirline={lastAirline} setLastAirline={setLastAirline} num={index}/>
                    
                );
            })}
        </>
    );
}