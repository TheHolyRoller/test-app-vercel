'use client';
import { Suspense, use, useEffect } from 'react';
import { useUser } from '../lib/context/UserContext';
import { useQuiz } from '../lib/context/QuizContext';
import { useSearchParams } from 'next/navigation';
import r from '../Styles/Results.module.css'; 
import resultStyles from '../Styles/Result.module.css'; 
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';
import { databases } from '../lib/appwrite';
// import rc from '../Styles/UnderstandCard.module.css'; 
import rc from '../Styles/resultsCard.module.css'; 
import { nunito } from '../fonts/nunito';



// Import the appwrite credentials here 
import UnderstandCard from '../Components/UnderstandCard'; 

  
function ResultContent() {
    const searchParams = useSearchParams();
    const { name, userAge } = useUser();
    const router = useRouter(); 
    const [percentageScore, setPercentageScore] = useState(0);
    // Add in the state variables about category score percentage 
    const [writingPercentage, setWritingPercentage] = useState(0); 
    const [memoryPercentage, setMemoryPercentage] = useState(0); 
    const [readingPercentage, setReadingPercentage] = useState(0); 
    const [examResultsPercentage, setExamResultsPercentage] = useState(0); 
    const [organisationalPercentage, setOrganisationalPercentage] = useState(0); 

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

    const formattedAnswers = JSON.stringify(answers, null, 4); 
    
    console.log('this is the formatted Answer object \n', formattedAnswers);
    console.log('this is the type of formatted Answers \n', typeof formattedAnswers); 
    


    // Detailed console logging with emojis
    console.log('🎯 === Quiz Results Details ===');
    console.log('👤 User Name:', name);
    console.log('📧 User Email:', email);
    console.log('🔍 Search Parameters:', Object.fromEntries(searchParams.entries()));
    console.log('📊 === Score Breakdown ===');
    console.log('🏆 Overall Score:', score);
    console.log('🎓 Final Score:', finalScore);
    console.log('🧠 Memory Score:', memoryScore);
    console.log('✍️ Writing Score:', writingScore);
    console.log('📚 Reading Score:', readingScore);
    console.log('📝 Exam Results Score:', examResultsScore);
    console.log('📋 Organisational Score:', organisationalScore);
    console.log('✨ ======================');


    /**
     *     memoryPercentage: memoryPercentage, 
        writingPercentage: writingPercentage, 
        readingPercentage: readingPercentage, 
        examResultsPercentage: examResultsPercentage, 
        organisationalPercentage: organisationalPercentage
     * 
     * 
     */


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

    console.log('this is the quiz result data saved to the appwrite database \n', data); 

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

        }
        catch(error){

            console.error('there was an error saving results operation unsuccessful \n', error); 

        }

    }

    const formatCategoryCounter = (memoryScore, writingScore, readingScore, examResultsScore, organisationalScore ) => {


   
        const memory = 10; 
        const writing = 10; 
        const exam = 10; 
        const reading = 10
        const organisation = 12;

        const examPercent = (examResultsScore / exam) * 100; 
        console.log('this is the exam percentage in format category score  \n', examPercent)    

        setExamResultsPercentage( Math.floor((examResultsScore / exam) * 100));
        setWritingPercentage((writingScore / exam) * 100);
        setOrganisationalPercentage((organisationalScore / exam) * 100);
        setReadingPercentage(Math.floor((readingScore / exam) * 112));
        setMemoryPercentage((memoryScore / exam) * 100);

    }

    useEffect(() =>{

    console.log('calling format category score function in the useEffect hook');
    formatCategoryCounter(memoryScore, writingScore, readingScore, examResultsScore, organisationalScore); 

    }, []); 




    useEffect(() => {


        console.log('this is the percentage of each category in the useEffect hook just before save results \n', writingPercentage, memoryPercentage, readingPercentage, examResultsPercentage, organisationalPercentage);
        console.log('calling the save results function here '); 

    }, [writingPercentage, memoryPercentage, readingPercentage, examResultsPercentage, organisationalPercentage])


    let percentage;

    // Create the function that formats the final score here 
    const formatScore = (finalScore) => {
        // Add in the max score here 
        const maxScore = 439;
        
        // Calculate raw percentage
        const rawPercentage = (finalScore / 5) * 10;
      
        let percentage = rawPercentage; 

        console.log('this is the raw percentage::::: \n', rawPercentage); 
        console.log('this is the percentage:::::: \n', percentage); 


        percentage = Math.min(percentage, 100);
        
        console.log('Raw percentage:', rawPercentage);
        console.log('Formatted percentage:', percentage);

        return percentage; 
        

    }

    formatScore(finalScore); 

    
    return (
        <>
        <main className={rc.mainContainer} style={{paddingTop: '80px'}}>
            
        <article 
          className={`${rc.card} ${nunito.className}`} 
          id={rc.firstCARD} 
          style={{
              position: 'relative',
              zIndex: 200,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',

          }}
          >
        <div 
          className={rc.cardCategoryColorContainer} 
          style={{
              backgroundColor: '#012973',
              boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1), -2px 0 8px rgba(0, 0, 0, 0.1), 2px 0 8px rgba(0, 0, 0, 0.1)', 
          }}
      >
      
          
          <div className={`${rc.categoryLabelContainer} ${nunito.className}`}>
              <label className={`${rc.categoryLabel} ${nunito.className}`}>
                  <div className={`${rc.labelContainer} ${nunito.className}`} style={{backgroundColor: '#033699'}}>
                  results
                  </div>
              </label>
          </div>
      </div>
          <div className={`${rc.question_textContainer} ${nunito.className}`} style={{color:'#333333' }} >
              <h2 className={`${rc.question_text} ${nunito.className}`} style={{color:'#333333' }}>
  
                  <span className={rc.understandSpan} style={{color:'white',}}>
                      {/* Understand how Dyslexia feels 
                       */}
                       Your Dyslexia Screener Score

                  </span>
              </h2>
          </div>
   

          <div className={resultStyles.mainScore}>
                        
                    <div className={resultStyles.scoreSpan}>

                    {score}
                    </div>
                    <span className={resultStyles.refSpan}>
                        /100
                    </span>
                </div>
                
                <div className={resultStyles.impactMessage} 
                >
                    <p className={resultStyles.impactText}>
                    
                        {finalScore >= 70 
                            ? "This Indicates your work could be significantly impacted by Dyslexia"
                            : "This indicates your work could be mildly impacted by Dyslexia"
                        }
                    </p>
                </div>

      <article className={rc.card} id={rc.cardOne}></article>
      <article className={rc.card} id={rc.cardTwo}></article>
      <article className={rc.card} id={rc.cardThree}></article>
      <article className={rc.card} id={rc.cardFour}></article>
  </article>

  <div className={resultStyles.buttonContainer}
                    
                    >

                        <div 
                            className={resultStyles.button} 
                            onClick={() => router.push('/results-explanation')} 
                            style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'
                            }}
                        >
                            See Breakdown  
                        </div>
                    </div>

  </main>

         {/* <main className={resultStyles.mainChartContainer} style={{}}>
            <div className={resultStyles.mainChartSubContainer}>

                <div className={resultStyles.mainHeadlineContainer}>
                    <h1 className={resultStyles.mainHeadline}>
                        Your Dyslexia Screener Score
                    </h1>
                </div>

                <div className={resultStyles.mainScore}>
                    {score}
                    <span className={resultStyles.refSpan}>
                        /100
                    </span>
                </div>
                
                <div className={resultStyles.impactMessage} 
                >
                    <p className={resultStyles.impactText}>
                    
                        {finalScore >= 70 
                            ? "This Indicates your work could be significantly impacted by Dyslexia"
                            : "This indicates your work could be mildly impacted by Dyslexia"
                        }
                    </p>
                </div>
                
                

                <section className={resultStyles.chartContainer}>
                    <div className={resultStyles.mainChartSubContainerTextSection}>
                        <div className={resultStyles.mainTitleContainer}>
                            <div className={resultStyles.mainTitleSubContainer}>
                            </div>
                        </div>
                    </div>

                   

                </section>

            </div>
        </main>  */}
        
        </>
    );
}

export default function RenderResults() {
    return (
        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading results...</div>}>
            <ResultContent />
        </Suspense>
    );
} 