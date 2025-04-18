/* eslint-disable no-unused-vars */


// Import the react dependencies here 
import { useState, useEffect, useMemo, useReducer, useRef } from 'react'; 

// Import the style sheet here 
import ft from '../Styles/Footer.module.css'; 
// Import the icons here 
import linked from '../assets/linkedin_2504923.png'; 
import x from '../assets/x.png'; 
// import podcast from '../assets/noun-podcast-648424.svg'; 
import podcast from '../assets/podcast.svg'; 

import tiktok from '../assets/tiktok_3938072.png'; 



export default function Footer(){

    // Setup the state management here 

    // Setup the global variables here 

    // Setup the references here 


    // Create the functions here 




    return(

        <footer className={ft.footerMainContainer}>
            
            <section className={ft.footerSubContainerSection}>

                {/* Add in the top section container here  */}
                <div className={ft.footerTopSectionContainer}>

                    {/* Add in the left text container here  */}
                    <div className={ft.topSectionTextMainContainer}> 
                    <h3 className={ft.footerTopText}> 
                        Unlock your full potential 
                    </h3>
                     </div>


                {/* Add in the contact button container here  */}

                <div className={ft.contactButtonContainer}>
                    {/* Add in the event listener here  */}
                    <button className={ft.footerContactButton}>
                        Contact us
                    </button>

                </div>

                    </div>


                    {/* Add in the bottom section here  */}
                <div className={ft.footerBottomSectionContainer}>

                    {/* Add in the sub container here  */}


                    <section className={ft.footerBottomSectionSubContainer}>

                        {/* Add in the copyright info here */}

                        <ul className={ft.footerInfoList}>
                            <li className={ft.footerInfoListItem}>  

                                {/* Add in the CopyRight Info here  */}
                                <span className={ft.footerCopyRightInfo}>
                                    Copyright © ivvi ltd All rights reserved 
                                </span>

                             </li>

                            {/* Add in the website link here  */}

                            <li className={ft.footerListItem}>

                                <a href='https://www.ivvi.app/' className={ft.footerWebsiteLink} >
                                    <span  className={ft.footerWebsiteLinkText}>
                                        
                                        ivvi 

                                    </span>
                                    
                                </a>
                            </li>

                        </ul>

                        




                    </section>



                    <section className={ft.footerBottomRightSectionContainer}>

                                <div className={ft.footerBottomRightSection}>

                                    <ul className={ft.footerBottomRightSectionList}>
                                        <li className={ft.footerSocialIconItem}>
                                        <a href='tel:0131 3928358'>
                                            
                                            Call us 

                                        </a>
                                        </li>
                                        {/* Add in the social media links here  */}
                                        <li className={ft.footerSocialIconItem} >
                                        <a href="/" alt='linkedin.com' className={ft.iconListLink} >
                                        <img src={linked} alt='linkedin' className={ft.iconListIcon} />
                                            {/* Add in the Icon here  */}
                                        </a>
                                        </li>

                                        <li className={ft.footerSocialIconItem} >
                                        <a href="/" alt='linkedin.com'>
                                        <img src={x} alt='x' className={ft.iconListIcon} />
                                        </a>
                                        </li>

                                        <li className={ft.footerSocialIconItem} >
                                        <a href="/" alt='linkedin.com'>
                                        <podcast width={50} height={50} className={ft.iconListIcon} />
                                        </a>
                                        </li>


                                    </ul>


                                </div>


                        </section>
                </div>
            </section>
        </footer>
    ); 

}

