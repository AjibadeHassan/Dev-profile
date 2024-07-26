import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="Footer_Container">
        <div className="Footer_Body">
            <div className="Footer_Top">
                <span>
                    <h1>AJIBADE HASSAN</h1>
                    <p>
                    I'm a MERN Stack Web Developer building the Front-end and Back-end of projects.</p>
                </span>
                <span className="Social_Container">
                  <h1>SOCIAL</h1>
                  <span className="Social_Icons"><FaXTwitter/></span>
      <span className="Social_Icons"><FaLinkedin/></span>
      <span className="Social_Icons"><FaGithub/></span>
                </span>
            </div>
            <div className="Footer_Bottom">© Copyright 2024 . Made by Ajibade Hassan</div>
        </div>
    </div>
  )
}

export default Footer