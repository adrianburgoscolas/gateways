import "../styles/utils.css";
import { useState } from "react";

export default function DelDevice() {
  const [gatewaySerial, setSerial] = useState("");
  const [uid, setUid] = useState("");
  const [stateUid, setStateUid] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();

  function sendForm(e){
    e.preventDefault();
    setError();
    setData();
    fetch("/api/deldevice",{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body : JSON.stringify({gatewaySerial, device:{uid: Number(uid)}}),
    })
      .then(res => {
        var contentType = res.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return res.json().then(json => {
            setData(json);
            setSerial("");
            setUid("");
          });
        } else {
          return res.text().then(text => {
            setError(text)
            setSerial("");
            setUid("");
          });
        }
      });
  }
  function handleUid(e) {
    setUid(e.currentTarget.value); 
    setStateUid(e.currentTarget.value); 
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
        <input 
          type="number" 
          placeholder="Device Uid" 
          value={uid} 
          onChange={handleUid} 
        />
        <input type="submit" value="Submit"/>
      </form>
      <h3 className="heading">
        {error?error:""}
        {data?`Gateway '${data.gatewayname}'`:""}
      </h3>
      <div>{data?`Deleted Device Uid: ${stateUid}`:""}</div>
    </div>
  );
}
