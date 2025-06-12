// import React from 'react'
// import Logo from '../assets/carefree.jpg'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Home = () => {
  return (
    <div className="Home_container">
      <article className="Home_media">
        <span>
          <a href="https://x.com/devcarefree" target="blank">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/ajibade-hassan-2a2691242/"
            target="blank"
          >
            <FaLinkedin />
          </a>
        </span>
        <span>
          <a href="https://https://github.com/AjibadeHassan" target="blank">
            <FaGithub />
          </a>
        </span>
      </article>
      <article className="Home_text">
        <h1>Hi, I'm Ajibade Hassan.</h1>
        <p>
          I'm a MERN Stack Web Developer building the Front-end and Back-end of
          projects as well as the integration between the client side and the
          server-side of Websites and Web Applications that leads to the success
          of the overall product. Check out some of my work in the Projects
          section.
        </p>
        <span className="Home_Btn">
          <a
            href="#projects"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Projects
          </a>
        </span>
      </article>
    </div>
  );
}

export default Home