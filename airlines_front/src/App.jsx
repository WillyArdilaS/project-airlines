import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FlightForm } from "./components/FlightForm";
import  { RoadmapForm } from "./components/RoadmapForm";
import  { Roadmap } from "./components/Roadmap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<FlightForm />} />
        <Route path="/formulario-itinerario" element={<RoadmapForm />} />
        <Route path="/itinerarios" element={<Roadmap />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;