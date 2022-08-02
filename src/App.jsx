import Navbar from "./components/Navbar";
import AllGateways from "./components/AllGateways"
import "./styles/utils.css";
import { useState, useEffect } from "react";

const navButtons = [
  "List Gateways",
  "Add Gateway", 
  "Get Gateway",
  "Del Gateway",
  "Add Device", 
  "Del Device",
];

export default function App() {
  const [navState, setNavState] = useState("Gateways");
  useEffect(() => {
    if(navState) {
      console.log(navState)
    }
  });
  document.title = navState;
  return (
    <div className="container">
      <header className="centered">
        <h1 className="headingXL">Gateways</h1>
        <p>Control your devices</p>
      </header>
      <Navbar navButtons={navButtons} handleButton={setNavState} />
      <main className="centered">
        {navState === "List Gateways"? <AllGateways /> : ""}
      </main>
    </div>
  );
}
