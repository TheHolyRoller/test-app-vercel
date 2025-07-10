'use client';
import { Suspense, use, useEffect } from 'react';
import { useUser } from '../lib/context/UserContext';
import { useQuiz } from '../lib/context/QuizContext';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';
import r from '../Styles/Results.module.css'; 

import PhoneBarChart from '../Components/PhoneBarChart'; 

function ResultsExplanationContent() {
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
        email
    } = useQuiz();  
    

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

    let percentage;

    // Create the function that formats the final score here 
    const formatScore = (finalScore) => {
        const maxScore = 439;
        const rawPercentage = (finalScore / maxScore) * 100;
        
        if (rawPercentage >= 80) {
            percentage = Math.floor(90 + ((rawPercentage - 80) / 20) * 10);
        } else if (rawPercentage >= 50) {
            percentage = Math.floor(60 + ((rawPercentage - 50) / 30) * 29);
        } else {
            percentage = Math.floor(30 + (rawPercentage / 50) * 29);
        }
        
        percentage = Math.min(percentage, 100);
    }

    
    formatScore(finalScore); 

    const handleNext = () => {
        router.push('/email-permissions');
    };
    
    return (
        <>
            <PhoneBarChart
                percentage={percentage}
                finalScore={finalScore}
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
                isExplanationPage={true}
                onNext={handleNext}
                
            />
        </>
    );
}

export default function ResultsExplanation() {
    return (
        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading results...</div>}>
            <ResultsExplanationContent />
        </Suspense>
    );
} 