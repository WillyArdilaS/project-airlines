import { useState, useEffect } from "react";
import axios from 'axios';

export const ConnectionForm = ({ segmentNumber, airlines, airlineCode,actualAirport,setLastAirline,num}) => {
    const [flightNumber, setFlightNumber] = useState('')
    const [airlineCodeConnection, setAirlineCodeConnection] = useState('')
    

    useEffect(() => {
        if (airlineCode == airlineCodeConnection) {
            let newFlightNumber = parseInt(flightNumber)+num
                setFlightNumber(newFlightNumber.toString())
                
        } 
    }, [airlineCodeConnection])

    const handleFlight = (e) => {
        axios.get(`http://localhost:8081/api/nuevoVuelo/aerolineas/airlineName`, { params: { airlineName: e.target.value } })
            .then((res) => {
                console.log(res.data)
               let code = res.data.airlineCode
                axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/airlineCode_flightNumber', { params: { airlineCode: code } })
                    .then((res) => {
                        setAirlineCodeConnection(code)
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

    return (
        <article className="w-full mt-20">
            <h1 className="-mt-11 text-lg text-black text-center font-bold"> Conexión #{segmentNumber} </h1>

            <form className="flex flex-col mt-4 px-3 py-6 border-x-4 border-y-4 border-black">
                <div className='w-full flex justify-between mb-10'>
                    <label htmlFor="airline-select"> Aerolínea </label>
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
                    <label htmlFor="flight-number"> N° de vuelo </label>
                    <input type="number" name="flight-number" id="flight-number" value={flightNumber} className="w-1/2 px-1 border-x-2 border-y-2 border-black" disabled />
                </div>

                <div className="w-full flex justify-between">
                    <label htmlFor="airport-select"> Aeropuerto </label>
                    <input type="text" name="airport-select" id="airport-select" value={actualAirport} className="w-1/2 px-1 border-x-2 border-y-2 border-black" disabled />
                </div>
            </form>
        </article>
    );
}