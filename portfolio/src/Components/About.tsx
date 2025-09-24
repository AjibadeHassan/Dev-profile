// import React from 'react'


const About = () => {


  const mySkills: Array<string> = ['Git', 'HTML', 'CSS','SCSS', 'Javascript', 'Reactjs', 'SEO','Rensponsive Design', 'Github', 'Terminal', 'Python','Django', 'MySql','Jest', 'Docker', 'Rest API', 'PostGreSQL']
  return (
    <div className='About_Container'>
        <section className="About_Header">
          <h1>ABOUT ME</h1>
          <span id='aboutid'></span>
          <p>Here you will find more information about me,
             what I do, and my current skills mostly in terms
              of programming and technology</p>
        </section>
        <section className="About_body">
          <div className="About_details">
            <h2>Get To Know Me!</h2>
            <p>I'm a Fullstack Web Developer building the Front-end and Back-end of Websites and Web Applications 
              that leads to the success of the overall product. Check out some of my work in the Projects section.
            </p>
            <p>
            I'm open to Job opportunities where I can contribute, learn and grow.
             If you have a good opportunity that matches my skills and experience then don't hesitate to contact me.
            </p>
            <span className="About_Btn">Contact</span>
          </div>
          <div className="About_skills">
            <h2>My Skills!</h2>
            <section className="Skills_container">
            {
              mySkills.map((props)=>(
                <span  key={props} className="Skill_Card">{props}</span>

              ))
            }
            </section>
            
          </div>
        </section>
    </div>
  )
}

export default About