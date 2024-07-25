// import React from 'react'
import Header from "./Components/Header"
import Home from "./Components/Home"
import About from "./Components/About"
import Projects from "./Components/Projects"
import Contacts from "./Components/contacts."
import './SCSS/Header.scss'
import './SCSS/Home.scss'
import './SCSS/About.scss'
import './SCSS/Projects.scss'
import './SCSS/Mobile-projects.scss'
import './SCSS/Contact.scss'
import './SCSS/Mobile-contacts.scss'
const App = () => {
  return (
    <div>
      <Header/>
      <Home/>
      <About/>
      <Projects/>
      <Contacts/>
    </div>
  )
}

export default App
