// import React from 'react'
import Header from "./Components/Header"
import Home from "./Components/Home"
import About from "./Components/About"
import Projects from "./Components/Projects"
import './SCSS/Header.scss'
import './SCSS/Home.scss'
import './SCSS/About.scss'
import './SCSS/Projects.scss'
import './SCSS/Mobile-projects.scss'
const App = () => {
  return (
    <div>
      <Header/>
      <Home/>
      <About/>
      <Projects/>
    </div>
  )
}

export default App
