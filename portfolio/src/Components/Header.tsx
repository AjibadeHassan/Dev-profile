import {useState} from 'react'
import Logo from '../assets/carefree.jpg'
import {FiMenu} from 'react-icons/fi'
import { Link } from 'react-router-dom'

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
        <li><Link style={{listStyleType :'none', textDecoration: 'none'}} to="/">Home</Link></li>
            <li><Link style={{listStyleType :'none', textDecoration: 'none'}} to="/about">About</Link></li>
            <li><Link style={{listStyleType :'none', textDecoration: 'none'}} to="/projects">Projects</Link></li>
            <li><Link style={{listStyleType :'none', textDecoration: 'none'}} to="/contacts">Contact</Link></li>
        </ul>

        <div className="Header_Menu" onClick={Dropdown}>{Menuicon}</div>
        {
          menu? (
        <ul className="Mobile_Header_list">
        <li><Link style={{listStyleType :'none', textDecoration: 'none'}} to="/">Home</Link></li>
            <li><Link style={{listStyleType :'none', textDecoration: 'none'}} to="/about">About</Link></li>
            <li><Link style={{listStyleType :'none', textDecoration: 'none'}} to="/projects">Projects</Link></li>
            <li><Link style={{listStyleType :'none', textDecoration: 'none'}} to="/contacts">Contact</Link></li>
        </ul>
          ) : null
        }
        

    </div>
  )
}

export default Header