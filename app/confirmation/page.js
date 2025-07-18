'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; 
// import e from '../Styles/emailPermission.modul.css'; 
import n from '../Styles/name.module.css'; 


import { nunito } from '../fonts/nunito';
import Image from 'next/image';
import { databases } from '../lib/appwrite';


export default function EmailPermission() {
    const router = useRouter();
    const { handleAnswer } = useQuiz();
    const { setUserName, sound } = useUser();
    const [userName, setName] = useState('');


    const { name, userAge } = useUser();
    const { 
        score,
        finalScore,
        memoryScore,
        writingScore,
        readingScore,
        examResultsScore,
        organisationalScore, 
        email, 
        answers
    } = useQuiz();



    console.log('this is the answers object that will be saved to the database here \n', answers); 


    
    const formattedAnswers = JSON.stringify(answers, null, 4); 

    console.log('this is the formatted Answer object \n', formattedAnswers);
    console.log('this is the type of formatted Answers \n', typeof formattedAnswers); 
    
    const data = {

        name, 
        email, 
        score, 
        readingScore, 
        writingScore, 
        memoryScore, 
        examResultsScore, 
        organisationalScore,
        formattedAnswers

        // Add in the user's name and email here  

    }

    const saveResults = async (databases, data) => {

        console.log('save results function')

        try{

            const result = await databases.createDocument(
                
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID, 
                'unique()', 
                data
            
            ); 
            console.log('document successfully created'); 
            console.log('this is the result saved to the database \n', result); 
            alert('Results saved to the database!'); 
            return result; 


        }
        catch(error){

            console.error('there was an error saving results operation unsuccessful \n', error); 

        }

    }



    const handleChange =  (e) => {
        setName(e.target.value);
        console.log('this is the handle change function in the confirmation file ')

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        setUserName(userName);
        handleAnswer('noop');
        console.log('this is the handle change function in the confirmation file ')
        // Call the save answers to the database function here 
        console.log('calling the save answers function in the handle submit function')
        const response = saveResults(databases, data); 
        console.log('this is the response of the save results function \n', response); 


        setTimeout(() => {
            router.push('/postquiz');
        }, 310);
    };


   

    const Section = "Audio Permission";
    const audio_url = '';
    const currentQuestion = { question_text: "" };
    const currentIMG = '';

    console.log('this is the answers object from the quiz context \n', answers); 
    
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
          className={`${n.card} ${nunito.className}`} 
          id={n.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              marginTop: '-40px'
          }}
          >
      <div 
          className={n.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >
          {audio_url && (
              <audio 
                  key={audio_url} 
                  controls 
                  autoPlay 
                  style={{ opacity: '0', position: 'absolute' }}
                  onPlay={() => console.log('🎵 Audio Started Playing:', audio_url)}
                  onError={(e) => console.error('❌ Audio Error:', e)}
              >
                  <source src={audio_url} type="audio/mp3" />
              </audio>
          )}
          
  
          <div className={`${n.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${n.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${n.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
  
                  ready
                  </div>
              </label>
          </div>
      </div>
  
    
          <div className={`${n.question_textContainer} ${nunito.className}`} >
              <h2 className={`${n.question_text} ${nunito.className}`}>
            <span style={{display: 'block'}}>

              Email Sent!
            </span>
              Check your inbox for the report.
  
  
                  <span>
                      {currentQuestion?.question_text}
                  </span>
              </h2>
          </div>
      

  
      <article className={n.card} id={n.cardOne}></article>
      <article className={n.card} id={n.cardTwo}></article>
      <article className={n.card} id={n.cardThree}></article>
      <article className={n.card} id={n.cardFour}></article>
      </article>
      
  <div className={n.nextButtonContainer}>

<button className={n.nextButton} onClick={handleSubmit} style={{fontSize: '2rem', letterSpacing: '1px'}} >
    Next 
</button>
</div>

        </div>

        
      </div>
    );
} 