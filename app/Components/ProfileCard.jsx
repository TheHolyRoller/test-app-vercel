'use client'
import React from 'react'; 

// Import the card element here 
import pc from '../Styles/ProfileCard.module.css'; 
import { nunito } from '../fonts/nunito';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import profile from '../assets/profile.svg'; 

import Link from 'next/link';

import { useUser } from '../lib/context/UserContext';

import { useState, useEffect, useReducer } from 'react'; 
import axios from 'axios'; 


import cabin from '../assets/cabin.jpg'; 
import homeIcon from '../assets/homeIcon.svg'; 
import contact from '../assets/contact.svg'; 
import { account } from '../lib/appwrite';
import {ACTIONS} from '../lib/hooks/useConsentManager'; 
import useConsentManager from '../lib/hooks/useConsentManager';



const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID;


function ProfileCard() {


    console.log('this is the use Consent manager import \n', useConsentManager);
    console.log('this is the type of useConsentManager \n', typeof useConsentManager); 

    const {state, dispatch, isDirty, isDirtyAndFalse} = useConsentManager(); 
    console.log('these are the values extracted from the useConsent Manager hook through object destructuring \n', state, dispatch, isDirty, isDirtyAndFalse); 


    const { emailConsent, resultConsent } = state; 


    console.log('this is the email consent and the result consent \n', emailConsent, resultConsent); 


    const [emailChecked, setEmailChecked] = useState(false); 
    const [resultChecked, setResultChecked] = useState(false); 
    const [user, setUser] = useState(); 
    const [email, setEmail] = useState(); 
    const [name, setName] = useState(); 




  const router = useRouter();
  const [isSelected, setIsSelected] = React.useState(true); 



  useEffect(() => {


    account.get().
    then(setUser).
    catch((err) => router.push('/login')); 


  }, [router]); 


  useEffect(() => {

    console.log('this is the user \n', user); 
    if(user){
        const {email} = user; 
        console.log('this is the email extracted from user \n', email); 

        setEmail(email); 

    }

  }, [user]); 


useEffect(() => {

    
    // Set boolean state variables 
    setEmailChecked(emailConsent); 
    setResultChecked(resultConsent); 


}, [name, email]); 


useEffect(() => {
    console.log(`this is the baseline consent being updated: email => ${emailChecked} results => ${resultChecked}`); 
}, [emailChecked, resultChecked]);




useEffect(() => {

    console.log('email and resul consent have just been updated:::!!!`` \n', emailConsent, resultConsent); 

    // Now update the state variables that control the toggle switches 

    setEmailChecked(emailConsent); 
    setResultChecked(resultConsent); 


}, [emailConsent, resultConsent]); 


useEffect(() => {

    console.log('this is the email and result checked being updated in the use Effect hook:::::###### \n', emailChecked, resultChecked); 

}, [emailChecked, resultChecked])




// const queryConsentDataBase = async () => {



//     console.log('this is the consent query function \n'); 

//      const status = 200; 
//     if(status === 200){

//         const mockResponse = {
//             status: 200, // HTTP status code
//             data: {
//                 message: "Latest consent record fetched successfully",
//                 data: {
//                 user_id: "rec123ABC",
//                 name: "Emily Johnson",
//                 email: "emily.johnson@example.com",
//                 IP_ADDRESS: "192.168.1.100",
//                 result_consent: true,
//                 email_consent: false,
//                 time_stamp: "2025-11-06T12:00:00Z",
//                 },
//             },
//             };

//         // Call the function here that takes the information and records from the response and updates the consent logic and everything else. 

//         // Don't call this function instaed set the values of the 
//         updateConsent(mockResponse); 



//     }

//     else{


//         console.log('could not find user in airtable database \n', ); 

//         // Set the baseline consent state to false or Just keep it as false 

//     }
// }









// Instead of using this for query just use the imported custom hook and set the consent values to the values that it imports in after it's own code has run 
// const updateConsent = async (response) => {

//     // Now take the response and extract all the values from it 

//     console.log('this is the response from the server \n', response); 
//     console.log('this is the type of response from the server \n', typeof response); 

//     const data = response.data; 
//     console.log('this is the data from the response \n', data); 

//     const resultConsent = data.result_consent; 
//     console.log('this is the result consent \n', resultConsent); 

//     // Now extract the mail consent 

//     const emailConsent = data.email_consent; 

//     console.log('this is the email consent \n', emailConsent);
//     console.log('this is the type of email consent \n', typeof emailConsent); 
    
    
//     // Now you'll want to set the consent value of each state boolean variable to the value of the extracted consent boolean variable 
//     setEmailChecked(emailConsent); 
//     setResultChecked(resultConsent); 


// }




// Mock this function 
  const signOut = async () => {


    console.log('this is the sign out function'); 
    try{



            const currentSession = await account.getSession({ sessionId: "current" });

            console.log('this is the current session \n', currentSession || "no current session found!!!!!"); 

            const response = await account.deleteSession({sessionId: "current"}); 

            console.log(`this is the response from the delete session request ${response}`); 
                 console.log('redirecting to logout'); 
                router.push("/login");  

            return response; 


    }
    catch(error){


        console.error("Could not find the current session \n", error); 
        return error; 

    }


  }


  const handleMail = async () => {


    const email = 'danny@ivvi.app';
    const subject = 'inquiry'; 
    
    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`; 
    console.log('this is th mailto link \n', mailToLink); 
    console.log('this is the type of the mailto link \n', typeof mailToLink); 
    window.open(mailToLink, "_blank"); 

  }


  
  const handleYesClick = async () => {
        

        console.log('this is the handle click function'); 

        console.log('this is the is dirty boolean variable \n', isDirty); 
        console.log('this is the isDirtyAndFalse boolean variables \n', isDirtyAndFalse); 


         const consentPayload = {

            name: name, 
            email: email,
            result_consent: resultChecked,    
            email_consent: emailChecked


        }

                console.log('this is the consent payload \n', consentPayload); 


        // Add in the logic here to check if the consent database needs updating 
        if(isDirty){

            // Call the consent capture api here 
            // This is to ensure that the latest consent configuration is changed and recorded for future use 

            const response = await axios.post('/api/fetchip', consentPayload); 
            console.log('this is the response Payload from the airtable api request \n', consentPayload); 




        }

        if(isDirtyAndFalse){


            // Call the send email api here 
            const response = await axios.post('/api/updateConsent', consentPayload); 

            console.log('this is the response from the email api route \n', response); 
            console.log('this is thet type of response from the api route \n', typeof response); 




        }

       

      
      // Call the update baseline dispatch here 

      dispatch({type: ACTIONS.FETCH_START}); 
      dispatch({type: ACTIONS.SAVE_BASELINE, payload: consentPayload }); 
      
      // Add in a timeout promise here 
        // router.push('/');


    };


        if(!user) return <p>No user found....</p>

  return (


    <>
    
    <article 
                className={`${pc.card} ${nunito.className}`} 
                id={pc.firstCARD} 
                style={{
                    backgroundcolor: 'blue',
                    position: 'relative',
                    zIndex: 200,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',

                    }}>



                      <div 
                className={pc.cardCategoryColorContainer} 
                style={{
                    backgroundColor: "#012973",    
                    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
                }}
            >


                <div className={`${pc.categoryLabelContainer} ${nunito.className}`} >
                    <label className={`${pc.categoryLabel} ${nunito.className}`}>


                        <div className={`${pc.labelContainer} ${nunito.className}`} style={{backgroundColor: '#033699'}}>

                            <div className={pc.cardLabelText}>

                                Profile

                            </div>

                        <div className={pc.soundIconContainer} >


                                <div className={pc.iconBackground}>

                                      {/* Add in a next.js image here with the src as the imported icon  */}

                                          <Image src={profile} alt="profile" width={12} height={12} quality={100}/> 

                                </div>

                        </div>

                        </div>
                    </label>
                </div>
            </div>

                <article className={pc.mainLogoContainer}>


                    <section className={pc.profilePageContentContainer}>


                      {/* Add in the profile Card elements here  */}
                    {/* Add in the Profile Image section container here  */}
                    <section className={pc.profileDetailContainer}>

                        {/* Add in the sub container here */}
                    
                    <article className={pc.profileDetailSubContainer}>

                        {/* Add in the profile image container here  */}

                        <div className={pc.profileImageContainer} >
                        <Image src={cabin} alt="cabin" height={1} width={1} className={pc.profileImg} /> 

                        </div>


                        {/* Add in the profile text container here  */}

                        <article className={pc.profileTextSectionContainer}>

                            {/* Add in the name container here */}

                        <div className={pc.profileNameContainer}>

                            <h1 className={pc.profileNameText}>

                                Emily 


                            </h1>


                        </div>


                        {/* Add in the email container here */}

                        <div className={pc.profileEmailContainer}>
                            
                        <div className={pc.profileEmail}>
                            
                            email@02.io 
                            
                            </div>     
                            
                            
                            
                        </div>



                        </article>


                    </article>
                    </section>

                    {/* Add in the permissions section container here  */}
                    
                    <section className={pc.permissionsSectionContainer}>

                    <section className={pc.permissionSectionSubContainer}>


                    {/* Add in the title container here  */}
                    <div className={pc.permissionMainTitle}>


                    Permissions 


                    </div>

                    {/* Add in the permissions toggle section here  */}
                    <div className={pc.permissionsToggleSectionContainer}>

                        {/* Add in the Text element here and then the toggle switch component  */}

                        <div className={pc.marketingPermissionSection}>

                        <div className={pc.marketingPermissionText}>

                            Marketing Emails

                            </div>
                            
                            <div className="flex flex-col gap-2" id={pc.marketingCheckBoxContainer} >

                            <input type="checkbox" defaultChecked className="toggle" checked={emailChecked} onChange={() => dispatch({type: ACTIONS.TOGGLE_EMAIL})} id={pc.marketingToggle} />
                    
                        </div>
                        </div>


                        <div className={pc.resultsPermissionSection}>


                            <div className={pc.resultsPermissionSectionSubContainer}>


                                <div className={pc.resultsPermissionText}>

                                Screener Results 

                                </div>

                            <div className={pc.resultsPermissionToggleContainer}>

                            <input type="checkbox" defaultChecked className="toggle" checked={resultChecked} id={pc.resultsToggle} onChange={() => dispatch({type: ACTIONS.TOGGLE_RESULTS})} />

                            </div>



                            </div>

                        </div>
                    </div>

                    </section>

                    </section>


                    {/* Add in the user controls container here  */}
                    
                    <section className={pc.controlsContainer}>

                    <section className={pc.controlsSubContainer}>

                    
                            <Link href="/" style={{cursor: 'pointer', minHeight: '35px'}} >
                        <div className={pc.homeButtonContainer} style={{minHeight: '35px', position: 'relative'}}>

                        {/* Add in the icon container here */}
                        <div className={pc.homeIconContainer}  >

                        {/* Add in the icon herer  */}
                        <Image src={homeIcon} width={15} height={15} alt="home icon" style={{}}  />


                        </div>


                        {/* Add in the home text here  */}

                        <div className={pc.hometext}>

                            Home


                        </div>


                        </div>

                        {/* Add in the contact button container */}
                            </Link>

                        <div className={pc.contactButtonContainer} onClick={() => handleMail()} style={{cursor: 'pointer'}} >


                            {/* Add in the icon container here  */}
                        
                        <div className={pc.contactIconContainer}>

                            <Image src={contact} alt="contact" width={22} height={22} /> 

                        </div>

                        {/* add in the text container here  */}
                        <div className={pc.contactTextContainer}>

                            Contact us 


                        </div>


                        </div>


                    </section>



                    </section>


                    <section className={pc.alterationSection}>

                    <section className={pc.alterationSubContainer}>

                        {/* Add in the first link container here  */}
                        <div className={pc.accountDetailsLinkContainer} onClick={() => handleMail()} style={{cursor: 'pointer'}} >


                            Alter Account Details 


                        </div>

                        <div className={pc.singoutLinkContainer}  style={{cursor: 'pointer'}} onClick={() => signOut()}>


                            Sign Out 


                        </div>




                    </section>



                    </section>






                    </section>


                </article>

         

                <article className={pc.card}  id={pc.cardOne}></article>
                <article className={pc.card}  id={pc.cardTwo}></article>
                <article className={pc.card}  id={pc.cardThree}></article>
                <article className={pc.card}  id={pc.cardFour}></article>
            </article> 


                   <section className={pc.buttonSectionContainer} style={{cursor: 'pointer'}} onClick={handleYesClick}>

  <div className={pc.ctaContainer} style={{cursor: 'pointer'}} onClick={handleYesClick}>

    <div className={pc.cta} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Confirm

    </div>

  </div>
  
</section>
    
    
    </>

  )
}

export default ProfileCard