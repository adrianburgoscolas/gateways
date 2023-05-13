import Navbar from "./components/Navbar";
import AllGateways from "./components/AllGateways";
import AddGateway from "./components/AddGateway";
import GetGateway from "./components/GetGateway";
import DelGateway from "./components/DelGateway";
import AddDevice from "./components/AddDevice";
import DelDevice from "./components/DelDevice";
import "./styles/utils.css";
import { useEffect, useState } from "react";

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
  const [gatewayId, setGatewayId] = useState("");
  const [focusGetGateway, setFocusGetGateway] = useState(false);
  document.title = navState;
  function handleGatewayId(id) {
    setGatewayId(id);
    setNavState("Get Gateway");
    setFocusGetGateway(true);
  }
  useEffect(() => {
    setFocusGetGateway(false);
  },[navState]);
  return (
    <div className="container">
      <header className="centered">
        <h1 className="headingXL text-dark">Gateways</h1>
        <p className="text-light">Control your devices</p>
      </header>
      <Navbar navButtons={navButtons} handleButton={setNavState} focusGetGateway={focusGetGateway} />
      <main className="centered">
        {navState === "List Gateways" && <AllGateways handleGatewayId={handleGatewayId} />}
        {navState === "Add Gateway" && <AddGateway />}
        {navState === "Get Gateway" && <GetGateway gatewayId={gatewayId}/>}
        {navState === "Del Gateway" && <DelGateway gatewayId={gatewayId}/>}
        {navState === "Add Device" && <AddDevice gatewayId={gatewayId}/>}
        {navState === "Del Device" && <DelDevice gatewayId={gatewayId}/>}
      </main>
    </div>
  );
}
