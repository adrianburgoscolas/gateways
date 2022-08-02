import "../styles/utils.css";
import { useState } from "react";

export default function AddGateway() {
  const [gatewaySerial, setSerial] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState();

  function sendForm(e){
    e.preventDefault();
    setError();
    setData();
    fetch("/api/getgateway",{
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
    devices = data.devices.map((device, i) => <li className="listItem" key={i}>
      <h3 className="listheading">{`device: ${device.uid}`}</h3>
      <div>{`vendor: ${device.vendor}`}</div>
      <div>{`date created: ${device.datecreated}`}</div>
      <div>{`status: ${device.status}`}</div>
      </li>);
  }
  return (
    <div>
      <form onSubmit={sendForm} className="form">
        <input 
          type="text" 
          placeholder="Gateway Serial Number" 
          value={gatewaySerial} 
          onChange={e => setSerial(e.currentTarget.value)} 
        />
        <input type="submit" value="Submit"/>
      </form>
      <h3 className="heading">
        {error?error:""}
        {data?`Gateway '${data.gatewayname}'`:""}
      </h3>
      <div>{data?`Serial number: ${data.gatewayserial}`:""}</div>
      <div>{data?`Ipv4 address: ${data.ipv4}`:""}</div>
      <ul className="list">{devices}</ul>
    </div>
  );
}
