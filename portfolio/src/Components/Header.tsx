import {useState} from 'react'

const Header = () => {
  const [menu, setMenu] = useState(false)

  const Dropdown=(): void => {
    menu? setMenu(false): setMenu(true)
  }
  return (
    <div className="Header_container">
        <span className="Header_Logo">
            <img src="" alt="Logo" />
        </span>
        <ul className="Header_list">
            <li>About</li>
            <li>Projects</li>
            <li>Contact</li>
        </ul>

        <div className="Header_Menu" onClick={Dropdown}>Menu</div>
        {
          menu? (
        <ul className="Mobile_Header_list">
            <li>About</li>
            <li>Projects</li>
            <li>Contact</li>
        </ul>
          ) : null
        }
        

    </div>
  )
}

export default Header