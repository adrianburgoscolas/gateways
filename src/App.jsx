import Navbar from "./components/Navbar";
import AllGateways from "./components/AllGateways";
import AddGateway from "./components/AddGateway";
import GetGateway from "./components/GetGateway";
import DelGateway from "./components/DelGateway";
import AddDevice from "./components/AddDevice";
import DelDevice from "./components/DelDevice";
import "./styles/utils.css";
import { useState } from "react";

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
  document.title = navState;
  return (
    <div className="container">
      <header className="centered">
        <h1 className="headingXL text-dark">Gateways</h1>
        <p className="text-light">Control your devices</p>
      </header>
      <Navbar navButtons={navButtons} handleButton={setNavState} />
      <main className="centered">
        {navState === "List Gateways"? <AllGateways /> : ""}
        {navState === "Add Gateway"? <AddGateway /> : ""}
        {navState === "Get Gateway"? <GetGateway /> : ""}
        {navState === "Del Gateway"? <DelGateway /> : ""}
        {navState === "Add Device"? <AddDevice /> : ""}
        {navState === "Del Device"? <DelDevice /> : ""}
      </main>
    </div>
  );
}
