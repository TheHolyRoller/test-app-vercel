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

import { useState, useEffect } from 'react'; 
import axios from 'axios'; 


import cabin from '../assets/cabin.jpg'; 
import homeIcon from '../assets/homeIcon.svg'; 
import contact from '../assets/contact.svg'; 
import { account } from '../lib/appwrite';



const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID;


function ProfileCard() {


    const [emailChecked, setEmailChecked] = useState(false); 
    const [resultChecked, setResultChecked] = useState(false); 
    const [user, setUser] = useState(); 

    // TO DO Set a default toggle state for the permissions toggle 


  const router = useRouter();
  const [isSelected, setIsSelected] = React.useState(true); 


//   TO DO add in the function here that reads the response back from the server and sets the user info 


  useEffect(() => {


    account.get().
    then(setUser).
    catch((err) => router.push('/login')); 


  }, [router]); 


  useEffect(() => {

    console.log('this is the user \n', user); 

    // TO DO extract the elements from user including email and query the appwrite database for the user's set permissions 


    // TO DO include the code to handle the case when no user is found 




  }, [user]); 




  const signOut = async () => {


    console.log('this is the sign out function'); 
    try{



            const currentSession = await account.getSession("current"); 
            console.log('this is the current session \n', currentSession); 
    
            const response = await account.deleteSession(); 

            console.log(`this is the response from the delete session request ${response}`); 

            // Add in the route redirect here 
            router.push('/'); 
            return response; 




    }
    catch(error){


        console.error("Could not find the current session \n", currentSession); 
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

                            <input type="checkbox" defaultChecked className="toggle" id={pc.marketingToggle} />
                    
                        </div>
                        </div>


                        <div className={pc.resultsPermissionSection}>


                            <div className={pc.resultsPermissionSectionSubContainer}>


                                <div className={pc.resultsPermissionText}>

                                Screener Results 

                                </div>

                            <div className={pc.resultsPermissionToggleContainer}>


                            <input type="checkbox" defaultChecked className="toggle" id={pc.resultsToggle} />


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

                        <div className={pc.singoutLinkContainer}  >


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