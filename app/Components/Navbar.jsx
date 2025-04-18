/* eslint-disable no-unused-vars */

// Add in the imports here 
import { useEffect, useState, useRef, useReducer, useMemo, useContext } from 'react'; 

// Import the style sheet here 
import ns from '../Styles/Nav.module.css'; 
// Import the static assets here 
import logo from '../assets/Logo.png'; 



// Create the functional component here 

export default function Navbar(){


    // Setup the State Management here 


    // setup the global variables here 


    // Setup the useEffect data retrieval hooks here 


    // Setup the functions here 



    // Return the JSX here 

    return(


        <nav class={ns.navContainer}>

            <header  class={ns.navbarLogoSection} >
            <div class={ns.logoSubContainer} >
            <a href='/' className={ns.logoLink} >

                {/* Add in the dimensions here  */}
                <img src={logo} alt='logo' width={50} height={50} class={ns.logoImage} /> 

            </a>
            </div>
            </header>
        </nav>
    )

}