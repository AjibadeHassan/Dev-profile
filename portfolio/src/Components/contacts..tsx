// import React from 'react'

const Contacts = () => {
  return (
    <div className="Contacts_Container">
        <h1>CONTACT</h1>
        <span></span>
        <p>Feel free to Contact me by submitting the form below and
             I will get back to you as soon as possible
        </p>
        <form action="">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="enter your name" title="name" />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="enter your email address" title="email" />
          <label htmlFor="message">message</label>
          <textarea name="message" placeholder="enter your message" id="message"></textarea>
        <button className="Home_Btn">Submit</button>
        </form>
    </div>
  )
}

export default Contacts