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
import logo from '../assets/ivvi_Logo.svg'; 
import instagram from '../assets/instagram.svg'; 
import facebook from '../assets/facebook.svg'; 



import Image from 'next/image';

export default function Footer(){



    return(

        <footer className={ft.footerMainContainer}>

        <div className={ft.footerSubContainer} >

            <section className={ft.footerLeftSection}>


                <div className={ft.logoContainer}>

                <Image
                src={logo}
                alt="Logo"
                width={150}
                height={80}/>

                </div>

            </section>


            {/* Add in the right section here  */}
            <section className={ft.footerRightSection}>


            {/* Add in the sub container here */}
            <div className={ft.rightSectionSubContainer}>


      

            {/* Add in the two list containers here  */}
            <div className={ft.listContainerOne}>

                <ul className={ft.leftList}>

                <li className={ft.leftListItem}>
                    Try out Ivvi 

                    </li>  <li className={ft.leftListItem}>
                    Try out Ivvi 

                    </li>  <li className={ft.leftListItem}>
                    Try out Ivvi 

                    </li>


                </ul>
            </div>

            <div className={ft.listContainerTwo}>

                
                <ul className={ft.leftList}>

                <li className={ft.leftListItem}>
                    Try out Ivvi 

                    </li>  <li className={ft.leftListItem}>
                    Try out Ivvi 

                    </li>  <li className={ft.leftListItem}>
                    Try out Ivvi 

                    </li>

                </ul>




            </div>


            {/* Add in the social media section here  */}

        

            {/* Add in the sub container here  */}
            </div>




            </section>

            <section className={ft.socialMediaSection}>

            <div className={ft.socialMediaSectionContainer}>

                <ul className={ft.footerSocialMediaList}>

                <section className={ft.socialMediaSection}>

<div className={ft.socialMediaSectionContainer}>

    <ul className={ft.footerSocialMediaList}>

        <li className={ft.socialMediaIconItem}>

            {/* Add in the SVG Icon here  */}
            <Image
            src={instagram}
            alt="Logo"
            width={150}
            height={80}/>

        </li>
        <li className={ft.socialMediaIconItem}>

{/* Add in the SVG Icon here  */}
                <Image
                src={instagram}
                alt="Logo"
                width={150}
                height={80}/>

                </li>  <li className={ft.socialMediaIconItem}>

                {/* Add in the SVG Icon here  */}
                <Image
                src={instagram}
                alt="Logo"
                width={150}
                height={80}/>

                </li>  <li className={ft.socialMediaIconItem}>

                {/* Add in the SVG Icon here  */}
                <Image
                src={instagram}
                alt="Logo"
                width={150}
                height={80}/>

                </li>

    </ul>

</div>

</section>

                </ul>

            </div>

            </section>



        </div>
        </footer>
    ); 

}

