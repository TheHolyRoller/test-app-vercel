'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; 
// import e from '../Styles/emailPermission.modul.css'; 
import n from '../Styles/name.module.css'; 

import { nunito } from '../fonts/nunito';
import Image from 'next/image';


export default function EmailPermission() {
    const router = useRouter();
    const { handleAnswer } = useQuiz();
    const { setUserName, sound } = useUser();
    const [userName, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserName(userName);
        handleAnswer('noop');

        setTimeout(() => {
            router.push('/email');
        }, 210);
    };


    const Section = "Audio Permission";
    const audio_url = '';
    const question_text = `Enter your full name`;
    const currentQuestion = { question_text: "" };
    const currentIMG = '';
    
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
  
      {question_text && (
          <div className={`${n.question_textContainer} ${nunito.className}`} >
              <h2 className={`${n.question_text} ${nunito.className}`}>
                  {question_text}
  
  
                  <span>
                      {currentQuestion?.question_text}
                  </span>
              </h2>
          </div>
      )}
      
  
  


        <div className={n.inputContainer}>
        <article className={n.userNameContainer}>
    <form onSubmit={handleSubmit} className={n.detailsForm} id='nameForm'>
    <label className={n.nameLabel} >Enter Name</label>

    <input placeholder='Enter your name'
        id="name"
        type="text"
        value={userName}
        onChange={handleChange} 
        required                                                                       
        className={n.userNameInput}
        autoComplete="off" 
        style={{color: '#2c2c2c'}}
     ></input>
    </form>
    </article>
        </div>







  
      <article className={n.card} id={n.cardOne}></article>
      <article className={n.card} id={n.cardTwo}></article>
      <article className={n.card} id={n.cardThree}></article>
      <article className={n.card} id={n.cardFour}></article>
  </article>

      
  <div className={n.nextButtonContainer}>

<button className={n.nextButton} form='nameForm' type='submit' style={{fontSize: '2rem', letterSpacing: '1px'}}>
    Next 
</button>
</div>

        </div>

        
      </div>
    );
} 