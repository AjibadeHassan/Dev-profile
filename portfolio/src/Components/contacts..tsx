import React, { useRef } from 'react';

const Contacts: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      const formData = new FormData(form.current);
      try {
        const response = await fetch('https://formspree.io/f/movvjygq', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          console.log('Email sent successfully');
        } else {
          console.log('Failed to send email');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  return (
    <div className="Contacts_Container">
        <h1>CONTACT</h1>
        <span></span>
        <p>Feel free to Contact me by submitting the form below and
             I will get back to you as soon as possible
        </p>
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="enter your name" title="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="enter your email address" title="email" />
          <label htmlFor="message">Message</label>
          <textarea name="message" placeholder="enter your message" id="message"></textarea>
          <button onClick={()=> {
            alert('Thank you for your message, I will get back to you as soon as possible');
            window.location.reload();
          }} className="Home_Btn" type="submit">Submit</button>
        </form>
    </div>
  );
}

export default Contacts;