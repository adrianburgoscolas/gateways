import "../styles/utils.css";
import { useState } from "react";

export default function AddGateway() {
  const [gatewaySerial, setSerial] = useState("");
  const [gatewayName, setName] = useState("");
  const [ipv4, setIpv4] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState();

  function sendForm(e){
    e.preventDefault();
    setError();
    setData();
    fetch("https://gateways.onrender.com/api/addgateway",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body : JSON.stringify({gatewaySerial, gatewayName, ipv4}),
    })
      .then(res => {
        var contentType = res.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return res.json().then(json => {
            setData(json);
            setSerial("");
            setName("");
            setIpv4("");
          });
        } else {
          return res.text().then(text => {
            setError(text)
            setSerial("");
            setName("");
            setIpv4("");
          });
        }
      });
  }

  return (
    <div>
      <form onSubmit={sendForm} className="form">
        <input 
          required
          type="text" 
          placeholder="Gateway Serial Number" 
          value={gatewaySerial} 
          onChange={e => setSerial(e.currentTarget.value)} 
        />
        <input 
          required
          type="text" 
          placeholder="Gateway Name" 
          value={gatewayName} 
          onChange={e => setName(e.currentTarget.value)} 
        />
        <input 
          required
          type="text" 
          placeholder="Gateway Ipv4 Address" 
          value={ipv4} 
          onChange={e => setIpv4(e.currentTarget.value)} 
        />
        <input type="submit" value="Submit"/>
      </form>
      <h3>
        {error?error:""}
        {data?`Added Gateway '${data.gatewayname}'`:""}
      </h3>
    </div>
  );
}
