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
      <span></span>
     </article>
      <article className="Home_text">
        <h1>Hi, I'm Ajibade Hassan</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Neque odit labore doloribus in alias ea pariatur laborum,
          officiis saepe? Pariatur aliquam eius praesentium impedit
           ipsam eaque voluptatem, assumenda quae ex.</p>
      </article>
    </div>
  )
}

export default Home