import React from 'react'
import i from '../Styles/UserInput.module.css'; 

function UserInput() {
  return (

    <section className={i.mainUserNameSection}>
    <article className={i.userNameContainer}>
    
    <label>Enter Name</label>

    <input placeholder='Enter your name' className={i.userNameInput}></input>

    </article>

    {/* Add in the button section here  */}
    <aside className={i.buttonSectionContainer}>

      <div className={i.userInputButton}>

        Confirm 

      </div>


    </aside>

    </section>


  )
}

export default UserInput