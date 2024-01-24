// import React from 'react'
import Header from "./Components/Header"
import Home from "./Components/Home"
import About from "./Components/About"
import './SCSS/Header.scss'
import './SCSS/Home.scss'
import './SCSS/About.scss'
const App = () => {
  return (
    <div>
      <Header/>
      <Home/>
      <About/>
    </div>
  )
}

export default App
