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
import { todo } from 'node:test';




const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID;


function ProfileCard() {




    // TO DO Define the Global Action Reducer object here 



    const [emailChecked, setEmailChecked] = useState(false); 
    const [resultChecked, setResultChecked] = useState(false); 
    const [user, setUser] = useState(); 
    const [email, setEmail] = useState(); 
    const [name, setName] = useState(); 

    
    






    // console.log('this is the base from appwrite in the profile CARD::: \n', base); 

    // TO DO find a way of extracting the user name 

    // TO DO Set a default toggle state for the permissions toggle 


  const router = useRouter();
  const [isSelected, setIsSelected] = React.useState(true); 



// TO DO Define the recuducer function here 

function reducer(state, action){

    // Create the switch statement to find the current action 
    switch(action.type){

        // case 



    }




}



//   TO DO add in the function here that reads the response back from the server and sets the user info 


  useEffect(() => {


    account.get().
    then(setUser).
    catch((err) => router.push('/login')); 


  }, [router]); 


  useEffect(() => {

    console.log('this is the user \n', user); 
    // console.log(`this is the user's email \n`, user.email); 
    if(user){
        const {email} = user; 
        console.log('this is the email extracted from user \n', email); 

        setEmail(email); 


    }


    // Set the values state values of the user details here 
    // setEmail(user.email); 


    

    // TO DO extract the elements from user including email and query the appwrite database for the user's set permissions 


    // TO DO include the code to handle the case when no user is found 




  }, [user]); 



//   create a useEffect hook to query the database for the user and if you find them set the permissions 

useEffect(() => {


    console.log('this is the use Effect function to query the consent database for the user \n'); 

    console.log('email is being updated \n', email); 

    if(email !== undefined){

        console.log("just about to call the query function email is defined \n", email); 
        queryConsentDataBase(); 

    }




}, [name, email]); 


// Add in a use Effect hook to track the state updates of the consent boolean variables 

useEffect(() => {
    console.log(`this is the baseline consent being updated: email => ${emailChecked} results => ${resultChecked}`); 
}, [emailChecked, resultChecked]); 


const queryConsentDataBase = async () => {



    console.log('this is the consent query function \n'); 

    // Now use the users email address and name to find them in the airtable database 

    // Call the api GET route with the email as the query parameter 
    // const response = await axios.post('http://localhost:3000/api/fetchConsentRecords', {

    //     email: email

    // }); 

    // console.log('this is the response from the server \n', response); 
    // console.log('this is the data from the server \n', response.data); 

    // Add in the logic here to handle when to data is returned back from the server 

    // const status = response.status; 
     const status = 200; 
    if(status === 200){

        const mockResponse = {
            status: 200, // HTTP status code
            data: {
                message: "Latest consent record fetched successfully",
                data: {
                user_id: "rec123ABC",
                name: "Emily Johnson",
                email: "emily.johnson@example.com",
                IP_ADDRESS: "192.168.1.100",
                result_consent: true,
                email_consent: false,
                time_stamp: "2025-11-06T12:00:00Z",
                },
            },
            };

        // Call the function here that takes the information and records from the response and updates the consent logic and everything else. 
        updateConsent(mockResponse); 



    }

    else{


        console.log('could not find user in airtable database \n', ); 

        // Set the baseline consent state to false or Just keep it as false 

    }
}

const updateConsent = async (response) => {

    // Now take the response and extract all the values from it 

    console.log('this is the response from the server \n', response); 
    console.log('this is the type of response from the server \n', typeof response); 

    const data = response.data; 
    console.log('this is the data from the response \n', data); 


    // Now extract the values from the data 
    // Extract the result consent first 
    const resultConsent = data.result_consent; 
    console.log('this is the result consent \n', resultConsent); 

    // Now extract the mail consent 

    const emailConsent = data.email_consent; 

    console.log('this is the email consent \n', emailConsent);
    console.log('this is the type of email consent \n', typeof emailConsent); 
    
    
    // Now you'll want to set the consent value of each state boolean variable to the value of the extracted consent boolean variable 
    setEmailChecked(emailConsent); 
    setResultChecked(resultConsent); 


}














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


  
  const handleYesClick = () => {
        
       router.push('/');

    };

       const handleChecked = async (e) => {
        
        console.log(`handle checked function`); 
        setEmailChecked(e.target.checked);
        
    }


     const handleResultChecked = async (e) => {
            e.preventDefault(); 
            
            console.log(`result consent update function`); 
            setResultChecked(!resultChecked); 

        }; 



        if(!user) return <p>No user found....</p>

  return (


    <>
    

    {/* TO DO Add in the dynamic content extracted from the user  */}
    
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

                            <input type="checkbox" defaultChecked className="toggle" checked={emailChecked} onChange={() => handleChecked()} id={pc.marketingToggle} />
                    
                        </div>
                        </div>


                        <div className={pc.resultsPermissionSection}>


                            <div className={pc.resultsPermissionSectionSubContainer}>


                                <div className={pc.resultsPermissionText}>

                                Screener Results 

                                </div>

                            <div className={pc.resultsPermissionToggleContainer}>

                            <input type="checkbox" defaultChecked className="toggle" checked={resultChecked} id={pc.resultsToggle} />

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