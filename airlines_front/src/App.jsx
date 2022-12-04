import { useState } from "react";
import { FlightForm } from "./components/FlightForm";

function App() {
  const [flightCreated, setFlightCreated] = useState(false);

  const handleCreateFlight = () => {
    setFlightCreated(true);
  }

  return (
    (flightCreated == false) ? (
      <button className=" w-1/6 mt-8 ml-6 p-2 bg-black text-white font-semibold rounded-full hover:bg-white hover:text-black 
      border-x-4 border-y-4 border-black transition-colors" onClick={handleCreateFlight}> Nuevo Vuelo + </button>
    ) : (
      <main className="flex justify-start mt-16 px-6 min-w-max">
        <FlightForm />
      </main>
    )
  );
}

export default App;