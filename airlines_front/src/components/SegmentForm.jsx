import { useState } from "react";
import { ConnectionForm } from "./ConnectionForm";

export const SegmentForm = ({marginLeft, segmentNumber}) => {
    const [connectionCreated, SetConnectionCreated] = useState(false);

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
                        <select name="airportInput" id="airportInput" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required>
                            <option value=""> 1 </option>
                            <option value=""> 2 </option>
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

            {(connectionCreated == true) ? <ConnectionForm segmentNumber={segmentNumber} /> : false}
        </div>
    );
}