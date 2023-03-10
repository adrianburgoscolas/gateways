import "../styles/utils.css";
import { useState } from "react";

export default function GetGateway() {
  const [gatewaySerial, setSerial] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState();

  function sendForm(e){
    e.preventDefault();
    setError();
    setData();
    fetch("https://gateways.onrender.com/api/delgateway",{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body : JSON.stringify({gatewaySerial}),
    })
      .then(res => {
        var contentType = res.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return res.json().then(json => {
            setData(json);
            setSerial("");
          });
        } else {
          return res.text().then(text => {
            setError(text)
            setSerial("");
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
        <input type="submit" value="Submit"/>
      </form>
      <h3 className="heading">
        {error?error:""}
        {data?`Deleted Gateway '${data.gatewayname}'`:""}
      </h3>
      <div>{data?`Serial number: ${data.gatewayserial}`:""}</div>
      <div>{data?`Ipv4 address: ${data.ipv4}`:""}</div>
    </div>
  );
}
