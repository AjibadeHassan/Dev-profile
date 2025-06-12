// import React from 'react'
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Contacts from "./Components/contacts.";
import Footer from "./Components/Footer";

import "./SCSS/Header.scss";
import "./SCSS/Home.scss";
import "./SCSS/About.scss";
import "./SCSS/Projects.scss";
import "./SCSS/Mobile-projects.scss";
import "./SCSS/Contact.scss";
import "./SCSS/Footer.scss";
import "./SCSS/Mobile-contacts.scss";

const App = () => {
  return (
    <div>
      <Header />

      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contacts">
        <Contacts />
      </section>

      <Footer />
    </div>
  );
};

export default App;
