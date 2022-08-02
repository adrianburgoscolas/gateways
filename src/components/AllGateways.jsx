import { useState, useEffect } from "react";
import "../styles/utils.css"

export default function AllGateways() {

  const [data, setData] = useState([]);

  const list = data.map( (gw, i) => <li className="listItem" key={i}>
      <section>
        <h4 className="listheading">Gateway {gw.gatewayName}</h4>
        <p className="text">Serial number {gw.gatewaySerial}</p>
        <p className="text">Devices {gw.associatedDevices}</p>
      </section>
    </li> );

  useEffect(() => {
      fetch("/api/getallgateways")
        .then(res => res.json())
        .then(res => setData(res));
    // eslint-disable-next-line
  },[]);
  if(!data[0]) {
    return <h4>Loading...</h4>
  } else {
    return (<ul className="list left">{list}</ul>);
  }
}
