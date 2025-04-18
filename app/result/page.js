'use client';

import { Suspense } from 'react';
import { useUser } from '../lib/context/UserContext';
import { useQuiz } from '../lib/context/QuizContext';
import { useSearchParams } from 'next/navigation';

function ResultContent() {
    const searchParams = useSearchParams();
    const { name } = useUser();
    const { 
        score,
        finalScore,
        memoryScore,
        writingScore,
        readingScore,
        examResultsScore,
        organisationalScore
    } = useQuiz();

    return (
        <div style={{ 
            color: 'white',
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1>Quiz Results</h1>
            
            <div style={{ 
                marginTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <h2>Overall Score: {score}</h2>
                <h2>Final Score: {finalScore}</h2>
                
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginTop: '2rem'
                }}>
                    <div className="score-card">
                        <h3>Memory Score</h3>
                        <p>{memoryScore}</p>
                    </div>
                    
                    <div className="score-card">
                        <h3>Writing Score</h3>
                        <p>{writingScore}</p>
                    </div>
                    
                    <div className="score-card">
                        <h3>Reading Score</h3>
                        <p>{readingScore}</p>
                    </div>
                    
                    <div className="score-card">
                        <h3>Exam Results Score</h3>
                        <p>{examResultsScore}</p>
                    </div>
                    
                    <div className="score-card">
                        <h3>Organisational Score</h3>
                        <p>{organisationalScore}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RenderResults() {
    return (
        <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading results...</div>}>
            <ResultContent />
        </Suspense>
    );
} 