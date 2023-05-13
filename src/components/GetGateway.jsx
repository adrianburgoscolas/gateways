import "../styles/utils.css";
import { useState } from "react";

export default function AddGateway({gatewayId}) {
  const [gatewaySerial, setSerial] = useState(gatewayId);
  const [data, setData] = useState();
  const [error, setError] = useState();

  function sendForm(e){
    e.preventDefault();
    setError();
    setData();
    fetch("https://gateways.onrender.com/api/getgateway",{
      method: "POST",
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
  let devices
  if(data){
    devices = data.devices.map((device, i) => <li className="listItem button" key={i}>
      <h3 className="listheading text-dark">{`device: ${device.uid}`}</h3>
      <div className="text-light">{`vendor: ${device.vendor}`}</div>
      <div className="text-light">{`date created: ${device.datecreated}`}</div>
      <div className="text-light">{`status: ${device.status}`}</div>
      </li>);
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
      <h3 className="heading text-dark">
        {error?error:""}
        {data?`Gateway '${data.gatewayname}'`:""}
      </h3>
      <div className="text-light">{data?`Serial number: ${data.gatewayserial}`:""}</div>
      <div className="text-light">{data?`Ipv4 address: ${data.ipv4}`:""}</div>
      <ul className="list">{devices}</ul>
    </div>
  );
}
