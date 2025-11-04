'use client'
import React from 'react'; 

// Import the card element here 
import pc from '../Styles/ProfileCard.module.css'; 
import { nunito } from '../fonts/nunito';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import profile from '../assets/profile.svg'; 
import {useState} from 'react'; 

import {Switch} from "@heroui/switch";
// import { ThemeProvider } from '@heroui/theme';
import ThemeProvider from '@heroui/theme';
import Link from 'next/link';
import cabin from '../assets/cabin.jpg'; 
import homeIcon from '../assets/homeIcon.svg'; 
import contact from '../assets/contact.svg'; 



function ProfileCard() {


  const router = useRouter();
  const [isSelected, setIsSelected] = React.useState(true); 

  
  const handleYesClick = () => {
        
       router.push('/');

    };




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

                    
                    {/* Add in the home button container here  */}

                        <div className={pc.homeButtonContainer}>

                        {/* Add in the icon container here */}
                        <div className={pc.homeIconContainer}>

                        {/* Add in the icon herer  */}
                        <Image src={homeIcon} width={15} height={15} alt="home icon"/>


                        </div>


                        {/* Add in the home text here  */}

                        <div className={pc.hometext}>

                            Home


                        </div>


                        </div>

                        {/* Add in the contact button container */}

                        <div className={pc.contactButtonContainer}>


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
                        <div className={pc.accountDetailsLinkContainer}>
                            {/* <Link/>  */}

                            Alter Account Details 


                        </div>

                        <div className={pc.singoutLinkContainer}>


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