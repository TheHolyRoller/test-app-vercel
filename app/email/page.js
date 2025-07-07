'use client';

import { useQuiz } from '../lib/context/QuizContext';
import { useUser } from '../lib/context/UserContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'; 
import { databases } from '../lib/appwrite';
import emailSubmission from '../Styles/email.module.css'; 
// import emailSubmission from '../Styles/Quiz.module.css'; 

    
import { nunito } from '../fonts/nunito';
import Image from 'next/image';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID;



export default function EmailPermission() {
    const router = useRouter();
    const { handleAnswer } = useQuiz();
    const { name, userAge } = useUser();
    const [inputEmail, setInputEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Extract the set email function from the quiz context here 
    const { setEmail } = useQuiz(); 
    const { 
        finalScore, 
        score, 
        memoryScore, 
        writingScore, 
        readingScore, 
        examResultsScore, 
        organisationalScore 
    } = useQuiz();

    const handleChange = (e) => {
        setInputEmail(e.target.value);
        console.log('this is the input \n', e.target.value); 
    };

    // Add in the useEffect hook that will run when the Input Email changes 
    useEffect(() => {
        console.log('this is the input email in the useEffect hook \n', inputEmail); 
        setEmail(inputEmail); 
    }, [inputEmail]);

    const sendEmail = async () => {
        console.log('📤 Starting email send process...');

        try {
            const emailData = {
                from: 'support@dyslexiaquiz.com',
                toEmail: inputEmail,
                subject: 'Your Quiz Results',
                message: `Hi ${name},\n\nThank you for taking the quiz! Here are your results:\n\nOverall Score: ${score}\nFinal Score: ${finalScore}\nMemory Score: ${memoryScore}\nWriting Score: ${writingScore}\nReading Score: ${readingScore}\nExam Results Score: ${examResultsScore}\nOrganisational Score: ${organisationalScore}`,
                name: name
            };

            console.log('📦 Sending email data:', emailData);

            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            console.log('📡 Response status:', res.status);
            console.log('📥 Response headers:', Object.fromEntries(res.headers.entries()));
            
            // Log the raw response text first
            const responseText = await res.text();
            console.log('📥 Raw response:', responseText);

            // Try to parse as JSON only if it looks like JSON
            let data;
            try {
                data = JSON.parse(responseText);
                console.log('📨 Parsed response:', data);
            } catch (parseError) {
                console.error('❌ Failed to parse response as JSON:', parseError);
                throw new Error(`Invalid JSON response: ${responseText}`);
            }
            
            if (!res.ok) {
                throw new Error(data.error || `HTTP error! status: ${res.status}`);
            }

            if (data.success) {
                console.log('✅ Email sent successfully');
                return data;
            } else {
                throw new Error(data.error || 'Failed to send email');
            }
        } catch (error) {
            console.error('❌ Email sending error:', error);
            throw error; // Re-throw to be handled by handleSubmit
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('📝 Form submission started');

        setIsLoading(true);

        try {
            // Create a promise that will resolve after 2 seconds maximum
            const timeoutPromise = new Promise((resolve) => {
                setTimeout(() => resolve('timeout'), 2000);
            });

            // Create the submission promise
            const submissionPromise = async () => {
                // First, save to database
                console.log('💾 Saving to database...');
                const response = await databases.createDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    'unique()',
                    {
                        inputEmail,
                        finalScore,
                        score,
                        memoryScore,
                        writingScore,
                        readingScore,
                        examResultsScore,
                        organisationalScore,
                        userAge,
                        name,
                        createdAt: new Date().toISOString(),
                    }
                );
                
                console.log('✅ Database save successful:', response);

                // Then send email
                console.log('📧 Sending email...');
                await sendEmail();
                
                return 'success';
            };

            // Race between submission and timeout
            const result = await Promise.race([submissionPromise(), timeoutPromise]);
            
            // Navigate to confirmation page after successful submission or timeout
            console.log('🔄 Navigating to confirmation page...');
            router.push('/confirmation');
            
        } catch (error) {
            console.error('❌ Error in form submission:', error);
            // Still navigate to confirmation page even if there's an error
            router.push('/confirmation');
        } finally {
            setIsLoading(false);
        }
    };

    

    const Section = "Results Email";
    const audio_URL = '';
    const questionText = `Enter your email to receive results`;
    const currentQuestion = { questionText: "" };
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
          className={`${emailSubmission.card} ${nunito.className}`} 
          id={emailSubmission.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
              marginTop: '-40px'
          }}
          >
      <div 
          className={emailSubmission.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#4168b3',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
  
          }}
      >
          {audio_URL && (
              <audio 
                  key={audio_URL} 
                  controls 
                  autoPlay 
                  style={{ opacity: '0', position: 'absolute' }}
                  onPlay={() => console.log('🎵 Audio Started Playing:', audio_URL)}
                  onError={(e) => console.error('❌ Audio Error:', e)}
              >
                  <source src={audio_URL} type="audio/mp3" />
              </audio>
          )}
          
  
          <div className={`${emailSubmission.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${emailSubmission.categoryLabel} ${nunito.className}`}>
  
  
                  <div className={`${emailSubmission.labelContainer} ${nunito.className}`} style={{backgroundColor: getLabelColorBySection(Section)}}>
  
                  Email
                  </div>
              </label>
          </div>
      </div>
  
      {questionText && (
          <div className={`${emailSubmission.questionTextContainer} ${nunito.className}`} >
              <h2 className={`${emailSubmission.questionText} ${nunito.className}`}>
                  {questionText}
  
  
                  <span>
                      {currentQuestion?.questionText}
                  </span>
              </h2>
          </div>
      )}
      
  


        <div className={emailSubmission.inputContainer}>
        <article className={emailSubmission.userNameContainer}>
    <form onSubmit={handleSubmit} className={emailSubmission.detailsForm} id='emailForm'>
    <label className={emailSubmission.nameLabel} >Enter Email</label>

    <input placeholder='Enter your email'
        id="email"
        type="email"
        value={inputEmail}
        onChange={handleChange} 
        required                                                                       
        className={emailSubmission.userNameInput}
        autoComplete="off"
     ></input>
    </form>
    </article>
        </div>







  
      <article className={emailSubmission.card} id={emailSubmission.cardOne}></article>
      <article className={emailSubmission.card} id={emailSubmission.cardTwo}></article>
      <article className={emailSubmission.card} id={emailSubmission.cardThree}></article>
      <article className={emailSubmission.card} id={emailSubmission.cardFour}></article>
  </article>

      

  <div className={emailSubmission.nextButtonContainer}>

<button 
    className={emailSubmission.nextButton} 
    form='emailForm' 
    type='submit'
    disabled={isLoading}
    style={{ 
        opacity: isLoading ? 0.7 : 1,
        cursor: isLoading ? 'not-allowed' : 'pointer'
    }}
>
    {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="spinner" style={{
                width: '20px',
                height: '20px',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                borderTop: '3px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}></div>
            Sending...
        </div>
    ) : (
        'Next'
    )}
</button>

{/* Add spinner animation CSS */}
<style jsx>{`
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`}</style>

</div>

        </div>

        
      </div>
    );
} 