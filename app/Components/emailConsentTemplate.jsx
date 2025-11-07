

import React from 'react'

function EmailConsentTemplate({name, email, emailConsent, resultConsent}) {



    console.log('these are the values parsed in through props \n', name, email, emailConsent, resultConsent); 

  return (
    <div>
    
    <span>Name: {name} </span>
    <span>Email {email} </span>
    <span> emailConsent: {emailConsent} </span>
    <span>resultConsent: {resultConsent} </span>



    </div>
  )
}

export default EmailConsentTemplate