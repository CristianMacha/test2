import React from "react";
import "./App.css";
import DynamicGrid from "./components/DynamicGrid";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import FlavorsAndReviews from "./components/FlavorsAndReviews";
import EnergyGame from "./components/EnergyGame";
import MapAndContact from "./components/MapAndContact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App relative">
      {/* Cuadrícula dinámica de fondo */}
      <DynamicGrid />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <Hero />
        <Benefits />
        <FlavorsAndReviews />
        <EnergyGame />
        <MapAndContact />
        <Footer />
      </div>
    </div>
  );
}

export default App;