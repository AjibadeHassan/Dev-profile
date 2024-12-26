// import React from 'react'
import Header from "./Components/Header"
import Home from "./Components/Home"
import About from "./Components/About"
import Projects from "./Components/Projects"
import Contacts from "./Components/contacts."
import Footer from "./Components/Footer"
import './SCSS/Header.scss'
import './SCSS/Home.scss'
import './SCSS/About.scss'
import './SCSS/Projects.scss'
import './SCSS/Mobile-projects.scss'
import './SCSS/Contact.scss'
import './SCSS/Footer.scss'
import './SCSS/Mobile-contacts.scss'
import { Route, Routes } from "react-router-dom"
const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
      </Routes>
      <Footer/>


    </div>
  )
}

export default App
