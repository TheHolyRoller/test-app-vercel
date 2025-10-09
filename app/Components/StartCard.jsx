'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { browserOS } from '../lib/browserOS'; 




import QuizCard from '../Components/QuizCard';
import {PermissionAnswer} from '../Components/PermissionAnswer'; 
import st from '../Styles/startCard.module.css'; 
import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import logo from '../assets/ivvi_Logo.svg'; 
import { type } from 'os';

export default function EmailPermission() {
    
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/understand');
    };

    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStorage.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Audio Permission";
    const audio_url = 'https://dyslexiaquizapp.s3.eu-west-2.amazonaws.com/audio+doodles/send+email-v1.mp3';
    const question_text = `t`;
    const currentQuestion = { question_text: "" };
    const currentIMG = 'https://fra.cloud.appwritst.io/v1/storage/buckets/dood_gifs/files/EMAIL_SEND_TEST/view?project=test-domain&mode=admin';
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";
    useEffect(() => {

        (async () => {
            const isMacChrome = await browserOS();
            console.log("Mac Chrome?", isMacChrome);

            if(isMacChrome === true){

                    console.log('you`re on a mac using chrome '); 

            }

          })();


    }, []); 

    // ensure browserOS is only invoked client-side inside useEffect
    


    return (


            <div className={st.cardElementContainer} >
        <div style={{}}>
          <article 
          className={`${st.card} ${nunito.className} [@media(min-width:428px)_and_(max-width:767px)]:-translate-y-[5rem]`} 
          id={st.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
          }}
          >
  
      {question_text && (
          <div className={`${st.question_textContainer} ${nunito.className}`} style={{color: 'white'}} >
              <h2 className={`${st.question_text} ${nunito.className}`} style={{fontSize: '2rem', letterSpacing: '-1px'}} >

                <span className={st.topHeaderSpan} style={{display: 'block', fontSize: '1rem'}}>
                    The 
                </span>

                    Adult Dyslexia
                    Screener

              </h2>
          </div>
      )}

        <footer className={st.ivviLogoContainer}>
                    <span className={st.bySpan}>by</span>
                    <figure className={st.logo}>
                        <Image src={logo} width={150} height={50} alt='logo' className={st.logoImage} />
                    </figure>
                </footer>

  
      <article className={st.card} id={st.cardOne}></article>
      <article className={st.card} id={st.cardTwo}></article>
      <article className={st.card} id={st.cardThree}></article>
      <article className={st.card} id={st.cardFour}></article>
  </article>


<section className={st.buttonSectionContainer}>

  <div  className={`${st.ctaContainer} [@media(min-width:428px)_and_(max-width:767px)]:-translate-y-[5rem] `}>

    <div className={`${st.cta}`} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Start Screener 

    </div>
  </div>

  
</section>
        </div>
      </div>
    );
} 