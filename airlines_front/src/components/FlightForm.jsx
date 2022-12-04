import { useState } from "react";
import { SegmentForm } from "./SegmentForm";

export const FlightForm = () => {
    const [segmentsArray, setSegmentsArray] = useState([1]);

    const handleSegmentsNumber = (e) => {
        setSegmentsArray([]);

        for(let i=1; i<=e.target.value; i++) {
            setSegmentsArray(data => [...data, i]);
        }
    }

    return (
        <>
            <article className="w-1/5 flex flex-col"> 
                <form className="px-3 py-6 border-x-4 border-y-4 border-black">
                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="airlineInput"> Aerolínea </label>
                        <select name="airlineInput" id="airlineInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required>
                            <option value=""> 1 </option>
                            <option value=""> 2 </option>
                        </select>
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="flightInput"> N° de vuelo </label>
                        <input type="number" name="flightInput" id="flightInput" className="w-1/2 px-1 border-x-2 border-y-2 
                        border-black" required/>
                    </div>
                    
                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="segmentInput"> N° de segmentos </label>
                        <input type="number" name="segmentInput" id="segmentInput" value={segmentsArray.length} min={1} className="w-1/2 px-1 
                        border-x-2 border-y-2 border-black" onChange={handleSegmentsNumber} required/>
                    </div>

                    <div className="w-full flex justify-between mb-10">
                        <label htmlFor="airportInput"> Aeropuerto </label>
                        <select name="airportInput" id="airportInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required>
                            <option value=""> 1 </option>
                            <option value=""> 2 </option>
                        </select>
                    </div>

                    <div className="w-full flex justify-between">
                        <label htmlFor="pilotInput"> Piloto </label>
                        <input type="text" name="pilotInput" id="pilotInput" className="w-1/2 px-1 border-x-2 border-y-2 
                        border-black" required/>
                    </div>
                </form>

                <button className="w-2/3 mt-8 mx-auto p-3 bg-black text-white font-semibold rounded-full 
                hover:bg-white hover:text-black border-x-4 border-y-4 border-black transition-colors"> Confirmar Vuelo </button>
            </article>

            {segmentsArray.map((index) => {
                return(
                    <SegmentForm key={index} marginLeft={"ml-32"} segmentNumber={index}/>
                );
            })}
        </>
    );
}