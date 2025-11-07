import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contacts: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!form.current) return;

  emailjs
    .sendForm(
      "service_ixvm20l",
      "template_1ujszuw",
      form.current,
      "aNbg8Un7hiLbZ46Ns"
    )
    .then(() => {
      console.log("Message sent");
      alert("Message sent successfully!");
      form.current?.reset(); // optional reset
    })
    .catch((error: any) => {
      console.error("Failed to send", error);
      alert("Failed to send message. Try again.");
    });
};


  return (
    <div className="Contacts_Container">
        <h1>CONTACT</h1>
        <span></span>
        <p>Feel free to Contact me by submitting the form below and
             I will get back to you as soon as possible.
        </p>
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="enter your name" title="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="enter your email address" title="email" />
          <label htmlFor="message">Message</label>
          <textarea name="message" placeholder="enter your message" id="message"></textarea>
          <button onClick={()=> {
            // alert('Thank you for your message, I will get back to you as soon as possible');
            // window.location.reload();
          }} className="Home_Btn" type="submit">Submit</button>
        </form>
    </div>
  );
}

export default Contacts;