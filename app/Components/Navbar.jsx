/* eslint-disable no-unused-vars */

import ns from '../Styles/Nav.module.css'; 
import { useQuiz } from '../lib/context/QuizContext';

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