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

        <nav className={ns.navContainer} style={{backgroundColor: navColor}}>
            <header  className={ns.navbarLogoSection} >
            <div className={ns.logoSubContainer} >
            <a href='/' className={ns.logoLink} >
            </a>
            </div>
            </header>
        </nav>
    )

}