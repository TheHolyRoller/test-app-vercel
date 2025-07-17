'use client';
import { Suspense, use, useEffect } from 'react';
import { useUser } from '../lib/context/UserContext';
import { useQuiz } from '../lib/context/QuizContext';
import { useSearchParams } from 'next/navigation';
import r from '../Styles/Results.module.css'; 
import resultStyles from '../Styles/Result.module.css'; 
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

import Barchart from '../Components/Barchart'; 
import PhoneBarChart from '../Components/PhoneBarChart'; 

// Import the appwrite credentials here 
import { databases } from '../lib/appwrite';

  
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

        // Call the function that saves the results to the database here 
        console.log('calling the save results function here '); 
        // saveResults(databases, data);





    }, [writingPercentage, memoryPercentage, readingPercentage, examResultsPercentage, organisationalPercentage])


    let percentage;

    // Create the function that formats the final score here 
    const formatScore = (finalScore) => {
        // Add in the max score here 
        const maxScore = 439;
        
        // Calculate raw percentage
        const rawPercentage = (finalScore / 5) * 10;
        
        // Apply scaling to map scores appropriately:
        // - High scores (80%+ of max) should map to 90-100%
        // - Medium scores (50% of max) should map to around 60%
        // - Low scores should map to lower percentages
        
        // if (rawPercentage >= 80) {
        //     // Most answers are "yes" - map to 90-100%
        //     percentage = Math.floor(90 + ((rawPercentage - 80) / 20) * 10);
        // } else if (rawPercentage >= 50) {
        //     // Roughly half answers are "yes" - map to 60-89%
        //     percentage = Math.floor(60 + ((rawPercentage - 50) / 30) * 29);
        // } else {
        //     // Lower scores - map to 30-59%
        //     percentage = Math.floor(30 + (rawPercentage / 50) * 29);
        // }
        let percentage = rawPercentage; 

        console.log('this is the raw percentage::::: \n', rawPercentage); 
        console.log('this is the percentage:::::: \n', percentage); 


        
        // Ensure percentage doesn't exceed 100
        percentage = Math.min(percentage, 100);
        
        console.log('Raw percentage:', rawPercentage);
        console.log('Formatted percentage:', percentage);

        return percentage; 
        


    }

    formatScore(finalScore); 

    
    return (
        <>
        <main className={resultStyles.mainChartContainer} style={{outline: '5px solid red'}}>
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
                                {/* Chart content area - ready for future enhancements */}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Button with Expert UI Design */}
                    <div className={resultStyles.buttonContainer}
                    
                    >

                        <div 
                            className={resultStyles.button} 
                            onClick={() => router.push('/results-explanation')} 
                            style={{cursor: 'pointer', fontSize: '2rem', letterSpacing: '1px'}}
                        >
                          
Next    
                        </div>
                    </div>

                </section>

            </div>
        </main>
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