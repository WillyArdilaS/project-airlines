export const ConnectionForm = ({segmentNumber}) => {
    return (
        <article className="w-full mt-16">
            <h1 className="-mt-11 text-lg text-black text-center font-bold"> Conexión #{segmentNumber} </h1>

            <form className="flex flex-col mt-4 px-3 py-6 border-x-4 border-y-4 border-black">
                <div className='w-full flex justify-between mb-10'>
                    <label htmlFor="airline-select"> Aerolínea </label>
                    <select name="airline-select" id="airline-select" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required>
                        <option value=""> 1 </option>
                        <option value=""> 2 </option>
                    </select>
                </div>

                <div className="w-full flex justify-between mb-10">
                    <label htmlFor="flight-number"> N° de vuelo </label>
                    <input type="text" name="" id="" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required/>
                </div>

                <div className='w-full flex justify-between'>
                    <label htmlFor="airport-select"> Aeropuerto </label>
                    <select name="airport-select" id="airport-select" className="w-1/2 px-1 border-x-2 border-y-2 border-black" required>
                        <option value=""> 1 </option>
                        <option value=""> 2 </option>
                    </select>
                </div>     
            </form>
        </article>
    );
}