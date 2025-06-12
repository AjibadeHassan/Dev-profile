import {useState} from 'react'
import Logo from '../assets/carefree.jpg'
import {FiMenu} from 'react-icons/fi'


const Header = () => {
  const Menuicon : any = <FiMenu/>
  const [menu, setMenu] = useState(false)

  const Dropdown=(): void => {
    menu? setMenu(false): setMenu(true)
  }
  return (
    <div className="Header_container">
      <span className="Header_Logo">
        <img src={Logo} alt="Logo" />
        <h1>Ajibade Hassan</h1>
      </span>
      <ul className="Header_list">
        {/* <a href="#Home">Home</a> */}
        <a style={{ textDecoration: "none" }} href="#about">
          About
        </a>
        <a style={{ textDecoration: "none" }} href="#projects">
          Projects
        </a>
        <a style={{ textDecoration: "none" }} href="#contacts">
          Contact
        </a>
      </ul>

      <div className="Header_Menu" onClick={Dropdown}>
        {Menuicon}
      </div>
      {menu ? (
        <ul className="Mobile_Header_list">
          <li>
            <a
              href="#about"
              style={{
                listStyleType: "none",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              style={{
                listStyleType: "none",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contacts"
              style={{
                listStyleType: "none",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default Header