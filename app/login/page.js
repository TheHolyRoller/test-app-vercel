import React from 'react'
import log from '../Styles/LoginPage.module.css'; 
// import the card element here
import SignInCard from '../Components/SignInCard'; 


function login() {
  
  
  
  return (
  
  <>

    <section className={log.loginSectionContainer}>

      {/* Add in the card component element here  */}
      <SignInCard/> 
      {/* Add in the sign in button as a child component here  */}



    </section>


    </>
  )
}

export default login