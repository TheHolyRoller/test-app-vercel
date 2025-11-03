'use client'
import React from 'react'; 

// Import the card element here 
import pc from '../Styles/ProfileCard.module.css'; 
import { nunito } from '../fonts/nunito';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import profile from '../assets/profile.svg'; 



function ProfileCard() {


  const router = useRouter(); 

  
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

                      {/* Add in the profile Card elements here  */}



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