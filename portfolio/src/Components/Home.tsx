// import React from 'react'
// import Logo from '../assets/carefree.jpg'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Home = () => {
  return (
    <div className="Home_container">
     <article className="Home_media">
      <span><FaXTwitter/></span>
      <span><FaLinkedin/></span>
      <span><FaGithub/></span>
     </article>
      <article className="Home_text">
        <h1>Hi, I'm Ajibade Hassan.</h1>
        <p>I'm a MERN Stack Web Developer building the Front-end and Back-end of projects as well as the
           integration between the client side and the server-side of Websites 
          and Web Applications that leads to the success of the overall product.
           Check out some of my work in the Projects section.</p>
      <span className="Home_Btn">Projects</span>

      </article>
    </div>
  )
}

export default Home