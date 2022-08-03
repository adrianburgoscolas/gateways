import "../styles/utils.css";
import { useState } from "react";

export default function DelDevice() {
  const [gatewaySerial, setSerial] = useState("");
  const [uid, setUid] = useState("");
  const [stateUid, setStateUid] = useState();
  const [vendor, setVendor] = useState("");
  const [status, setStatus] = useState("online");
  const [data, setData] = useState();
  const [error, setError] = useState();

  function sendForm(e){
    e.preventDefault();
    setError();
    setData();
    fetch("/api/adddevice",{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body : JSON.stringify({gatewaySerial, device:{uid: Number(uid), vendor, status}}),
    })
      .then(res => {
        var contentType = res.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return res.json().then(json => {
            setData(json);
            setSerial("");
            setUid("");
            setVendor("");
          });
        } else {
          return res.text().then(text => {
            setError(text)
            setSerial("");
            setUid("");
            setVendor("");
          });
        }
      });
  }
  function handleUid(e) {
    setUid(e.currentTarget.value); 
    setStateUid(e.currentTarget.value); 
  }
  let device;
  if(data){
    [device] = data.devices.filter(dev => dev.uid === Number(stateUid));
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
        <input 
          type="text" 
          placeholder="Device Vendor" 
          value={vendor} 
          onChange={e => setVendor(e.currentTarget.value)} 
        />
        <fieldset className="left button">
          <legend>Device status:</legend>
          <div className="left">
            <input 
              type="radio" 
              name="status"
              id="online"
              value="online"
              checked={status === "online"}
              onChange={e => setStatus(e.currentTarget.value)} 
            />
            <label for="online">Oline</label>
          </div>
          <div className="left">
            <input 
              type="radio" 
              name="status"
              id="offline"
              value="offline"
              checked={status === "offline"}
              onChange={e => setStatus(e.currentTarget.value)} 
            />
            <label for="offline">Offline</label>
          </div>
        </fieldset>
        <input type="submit" value="Submit"/>
      </form>
      <h3 className="heading">
        {error?error:""}
        {data?`Gateway '${data.gatewayname}'`:""}
      </h3>
      <div>{data?`Added Device:`:""}</div>
      <div>{data?`Uid: ${device.uid}`:""}</div>
      <div>{data?`Vendor: ${device.vendor}`:""}</div>
      <div>{data?`Date created: ${device.datecreated}`:""}</div>
      <div>{data?`Status: ${device.status}`:""}</div>
    </div>
  );
}
