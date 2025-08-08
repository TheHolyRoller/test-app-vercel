/* eslint-disable no-unused-vars */

// Add in the imports here 
import { useEffect, useState, useRef, useReducer, useMemo, useContext } from 'react'; 

// Import the style sheet here 
import ns from '../Styles/Nav.module.css'; 
// Import the static assets here 
import logo from '../assets/ivvi_Logo.svg'; 
import Image from 'next/image';
import { useQuiz } from '../lib/context/QuizContext';

// Create the functional component here 

export default function Navbar(){
    const { navColor } = useQuiz();


    return(
        <nav class={ns.navContainer} style={{backgroundColor: navColor || '#809ACC'}}>

            <header  class={ns.navbarLogoSection} >
            <div class={ns.logoSubContainer} >
            <a href='/' className={ns.logoLink} >
            {/* <Image
                src={logo}
                alt="Logo"
                width={110}
                height={50}
                /> */}


            </a>
            </div>
            </header>
        </nav>
    )

}