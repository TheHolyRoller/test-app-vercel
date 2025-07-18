'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import QuizCard from '../Components/QuizCard';
import {PermissionAnswer} from '../Components/PermissionAnswer'; 
// import uc from '../Styles/emailPermission.module.css'; 
// import uc from '../Styles/UnderstandCard.module.css'; 
// import id from '../Styles/IdealCard.module.css'; 
import ad from '../Styles/AdultCard.module.css'; 

import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import ivvi_group from '../assets/ivvi_group.svg'; 
// import all from '../assets/All in one resource.svg'; 
import learn from '../assets/Listen and learn, confident.svg'; 
import say from '../assets/Say goodbye to the time.svg'; 
import real from '../assets/Real time NotetakinListen and learn, confident.svg'; 
import study from '../assets/Study anywhere.svg'; 
import your from '../assets/Your notes are comprehensiv.svg'; 
import multi from '../assets/Multi Style Learning.svg'; 
import listen from '../assets/Listen and learn, confident.svg'; 
import high from '../assets/Highlight Key Info.svg'; 
import all from '../assets/All in one resource.svg';



export default function EmailPermission() {
    const router = useRouter();
    const { finalScore } = useQuiz();
    const { name, sound } = useUser();

    const handleYesClick = () => {
        router.push('/function');
    };


    const handleNoClick = () => {
        // Set flag to trigger refresh when landing on home page
        sessionStoragad.setItem('needsRefreshFromEmailDecline', 'true');
        router.push('/');
    };

    const Section = "Audio Permission";
    const audio_URL = '';
    const question_text = `t`;
    const currentQuestion = { question_text: "" };
    const currentIMG = 'https://frad.cloud.appwritad.io/v1/storage/buckets/dood_gifs/files/EMAIL_SEND_TEST/view?project=test-domain&mode=admin';
    
    // Placeholder functions
    const getLabelColorBySection = (section) => "#033699";

    return (
        <div>
        {/* Top Blue Navbar Strip */}
        <div 
          style={{
            width: '100%',
            height: '120px',
            backgroundColor: '#023597',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100
          }}
        />
        

        {/* Main Content Container */}
        <div style={{ paddingTop: '60px' }}>
          <article 
          className={`${ad.card} ${nunito.className}`} 
          id={ad.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              marginTop: '-40px', 

          }}
          >
      <div 
          className={ad.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >
      
          
  
          <div className={`${ad.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${ad.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${ad.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
                  Welcome
                  </div>
              </label>
          </div>
      </div>


      <header className={ad.headerImageContainer}>

            <Image className={ad.mainImage}  src={high} width={150} height={150} alt='notes' /> 
            </header>




  
      {question_text && (
          <div className={`${ad.question_textContainer} ${nunito.className}`} style={{color:'#333333' }} >
              <h2 className={`${ad.question_text} ${nunito.className}`} style={{color:'#333333' }}>
                  {/* {question_text} */}
  
  
                  <span className={ad.questionTextSpan} style={{color:'rgb(40, 84, 168)', fontWeight: 'bolder' }}>
                      Adult Dyslexia Can Affect:
                  </span>
              </h2>
          </div>
      )}

      {/* Add in the supporting text section here  */}
      <div className={ad.supportingTextSectionContainer}>


        <div className={ad.supportingText} style={{fontWeight: 'lighter'}}>

        <article className={ad.mainSupportingTextContainer}>

<ul className={ad.affectsList}> 
<li className={ad.affectsListItem}>

    Reading 


</li>
<li className={ad.affectsListItem}>

        Writing  


    </li> 
    <li className={ad.affectsListItem}>

        Memory  

        </li> 

<li className={ad.affectsListItem}>

        Tests 


    </li>
 <li className={ad.affectsListItem}>

       Planning  


    </li>


</ul>


</article>







        </div>

      </div>

      <div className={ad.paginationElementContainer}
      
      style={{ margin: '0 auto'}}

      >
      <div className={ad.paginationElementSubContainer}>

        <ul className={ad.paginationList}

          style={{display: 'flex', gap: '0.8em'}}
        
        >

          <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(153, 187, 154)', borderRadius: '14px', display: 'block'}}
          
          ></li>
             <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
            <li className={ad.paginationItem} 
          
          style={{height: '5px', width: '33px', backgroundColor: 'rgb(227, 225, 228)', borderRadius: '14px', display: 'block'}}
          
          ></li>
        </ul>
      </div>
      </div>


  
      <article className={ad.card} id={ad.cardOne}></article>
      <article className={ad.card} id={ad.cardTwo}></article>
      <article className={ad.card} id={ad.cardThree}></article>
      <article className={ad.card} id={ad.cardFour}></article>
  </article>


<section className={ad.buttonSectionContainer}>

  <div className={ad.ctaContainer}>

    <div className={ad.cta} onClick={handleYesClick} style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}} >
        Next

    </div>



  </div>
  
</section>
        </div>
      </div>
    );
} 