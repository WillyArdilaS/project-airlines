import { useState } from "react";
import { FlightForm } from "./components/FlightForm";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SegmentForm } from "./components/SegmentForm";

function App() {
  const [flightCreated, setFlightCreated] = useState(false);

  const handleCreateFlight = () => {
    setFlightCreated(true);
  }

  return (
    (flightCreated == false) ? (
      <button className=" w-1/6 mt-8 ml-6 p-2 bg-black text-white font-semibold rounded-full hover:bg-white hover:text-black 
      border-x-4 border-y-4 border-black transition-colors" onClick={handleCreateFlight}> Nuevo Vuelo + </button>
    )


      : (
        
            <main className="flex justify-start mt-16 px-6 min-w-max">
              <BrowserRouter>
          <Routes>
              <Route path="/" element={<FlightForm />} />
              <Route path="/itinerario" element={<SegmentForm />} />
              </Routes>
        </BrowserRouter>
            </main>
            
          
      ));
}

export default App;