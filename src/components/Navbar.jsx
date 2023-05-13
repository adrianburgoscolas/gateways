import {useEffect} from "react";
import "../styles/utils.css"
export default function Navbar({navButtons, handleButton, focusGetGateway}) {

  const buttonList = navButtons.map((navButton, i) => <li className="navbutton" key={i}>
    <input  
      id={navButton.replace(" ", "_")}
      className="button text-dark"
      type="submit" 
      value={navButton}
      onClick={(e) => handleButton(e.currentTarget.value)} 
    />
  </li>);

  useEffect(() => {
    if(focusGetGateway){
      document.querySelector("#Get_Gateway").focus();
    }
  });

  return (
    <nav>
      <ul className="navbar">{buttonList}</ul>
    </nav>
  );
}
