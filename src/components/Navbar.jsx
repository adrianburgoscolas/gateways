import "../styles/utils.css"
export default function Navbar({navButtons, handleButton}) {

  const buttonList = navButtons.map((navButton, i) => <li className="navbutton" key={i}>
    <input 
      type="submit" 
      value={navButton}
      onClick={(e) => handleButton(e.currentTarget.value)} 
    />
  </li>);
  return (
    <nav>
      <ul className="navbar">{buttonList}</ul>
    </nav>
  );
}
