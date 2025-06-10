'use client';
import { Suspense, use, useEffect } from 'react';
import { useUser } from '../lib/context/UserContext';
import { useQuiz } from '../lib/context/QuizContext';
import { useSearchParams } from 'next/navigation';
import r from '../Styles/Results.module.css'; 
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

import Barchart from '../Components/Barchart'; 
import PhoneBarChart from '../Components/PhoneBarChart'; 



function ResultContent() {
    const searchParams = useSearchParams();
    const { name } = useUser();
    const router = useRouter(); 
    const {percentageScore, setPercentageScore } = useState(0);
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
        email
    } = useQuiz();



    
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


    const formatCategoryCounter = (memoryScore, writingScore, readingScore, examResultsScore, organisationalScore ) => {


   
        const memory = 10; 
        const writing = 10; 
        const exam = 10; 
        const reading = 10
        const organisation = 12;

        const examPercent = (examResultsScore / exam) * 100; 
        console.log('this is the exam percentage \n', examPercent)    

        setExamResultsPercentage( Math.floor((examResultsScore / exam) * 100));
        setWritingPercentage((writingScore / exam) * 100);
        setOrganisationalPercentage((organisationalScore / exam) * 100);
        setReadingPercentage(Math.floor((readingScore / exam) * 112));
        setMemoryPercentage((memoryScore / exam) * 100);



    }

    useEffect(() =>{

    console.log('calling format category score function in the useEffect hook');
    formatCategoryCounter(memoryScore, writingScore, readingScore, examResultsScore, organisationalScore); 

    }, [])


    useEffect(() => {


        console.log('this is the percentage of each category in the useEffect hook \n', writingPercentage, memoryPercentage, readingPercentage, examResultsPercentage, organisationalPercentage);

        // Call the function that translates the percentages to a pixel value here 



    }, [writingPercentage, memoryPercentage, readingPercentage, examResultsPercentage, organisationalPercentage])


    let percentage;

    // Create the function that formats the final score here 
    const formatScore = (finalScore) => {


        // Add in the max score here 
        const maxScore = 439;
        let rounder;
        let total; 
        let normalization = maxScore / finalScore; 
        let update = Math.floor(finalScore / 12); 
        console.log('this is the max score divide by the final score \n', normalization); 
        percentage = (maxScore / update) * 5; 
        percentage = Math.floor(percentage); 
        console.log('this is the formatted % Score \n', percentage); 
        if(percentage > 100){

        rounder = percentage -100; 
        percentage = percentage - rounder; 
            
        }

        console.log('this is the rounded down percentage \n', percentage); 

    }

    formatScore(finalScore); 
    // formatCategoryCounter(memoryScore, writingScore, readingScore, examResultsScore, organisationalScore); 




    
    return (
        <>

       
        {/* <PhoneBarChart/> */}
        <PhoneBarChart
        percentage={percentage}
        writingPercentage={writingPercentage}
        memoryPercentage={memoryPercentage}
        readingPercentage={readingPercentage}
        examResultsPercentage={examResultsPercentage}
        organisationalPercentage={organisationalPercentage}
        writingScore={writingScore}
        readingScore={readingScore}
        examResultsScore={examResultsScore}
        organisationalScore={organisationalScore}
        memoryScore={memoryScore}


/>
        



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