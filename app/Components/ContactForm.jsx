import React from 'react'
import cf from '../Styles/ContactForm.module.css'; 


function ContactForm() {
  return (


    <section className={cf.contactFormContainer}>

    <div className={cf.formBackdrop}>

    
    <legend className={cf.legend}>Get in Touch  </legend>
    <div className={cf.textSpan} >Hey how can we help? </div>


    <form className={cf.contactForm}>
    <fieldset className={cf.fieldSet}>


    <label htmlFor="name" className={cf.label}>Name</label>
    <input type='text' id='name' name="name" className={cf.input} required />


    <label htmlFor='email' className={cf.label}>
        Email: 
    </label>

    <input type="text" id='email' name='email' className={cf.input} required />


    <label htmlFor="message" className={cf.label}>
     Message 
    </label>

    
    <textarea id="message" name="message" rows='6' className={cf.textarea} required >
    </textarea>

    <button type="submit" className={cf.button}> 

        Send 
    
    </button>

    </fieldset>
    </form>
    </div>

    </section>



)
}

export default ContactForm