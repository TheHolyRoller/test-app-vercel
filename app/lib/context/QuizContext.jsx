'use client';

/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from './UserContext';
import { databases } from '../appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const QUESTION_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_QUESTION_COLLECTION_ID;
const WEIGHTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_WEIGHT_COLLECTION_ID;

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
    const router = useRouter();
    const { userAge } = useUser();

    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [weights, setWeights] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [quizLength, setQuizLength] = useState(0);
    const [finalScore, setFinalScore] = useState(0);
    const [gif_URLs, setGIF_URLS] = useState();

    // Category score state variables
    const [readingScore, setReadingScore] = useState(0);
    const [writingScore, setWritingScore] = useState(0);
    const [organisationalScore, setOrganisationalScore] = useState(0);
    const [memoryScore, setMemoryScore] = useState(0);
    const [examResultsScore, setExamResultsScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await databases.listDocuments(DATABASE_ID, QUESTION_COLLECTION_ID);
                const documents = response.documents;
                
                setQuestions(documents);
                const gifURLS = documents.map(doc => doc.GIF_URL);
                setGIF_URLS(gifURLS);
                
                setCurrentQuestion(documents[0]);
                setQuizLength(documents.length);
            } catch (error) {
                console.error('Data retrieval failed:', error);
            }
        };

        fetchQuestions();
    }, []);

    const calculateScore = async (answer) => {
        if (!currentQuestion || answer === 'noop') return;

        const { 
            adult_yes_weight, 
            adult_no_weight, 
            adult_maybe_weight, 
            child_maybe_weight, 
            child_no_weight, 
            child_yes_weight,
            Section 
        } = currentQuestion;

        const updateScoreCategory = (type, score) => {
            const scoreSetters = {
                reading: setReadingScore,
                writing: setWritingScore,
                organisation: setOrganisationalScore,
                memory: setMemoryScore,
                exams: setExamResultsScore
            };

            const key = type.trim().toLowerCase();
            const scoreSetter = scoreSetters[key];

            if (scoreSetter) {
                scoreSetter(prevScore => prevScore + score);
            }
        };

        if (userAge === 'adult') {
            if (answer === 'yes') {
                setScore(prevScore => prevScore + adult_yes_weight);
                updateScoreCategory(Section, adult_yes_weight);
            } else if (answer === 'sometimes') {
                setScore(prevScore => prevScore + adult_maybe_weight);
                updateScoreCategory(Section, adult_maybe_weight);
            }
        } else {
            if (answer === 'yes') {
                setScore(prevScore => prevScore + child_yes_weight);
                updateScoreCategory(Section, child_yes_weight);
            } else if (answer === 'sometimes') {
                setScore(prevScore => prevScore + child_maybe_weight);
                updateScoreCategory(Section, child_maybe_weight);
            }
        }
    };

    const handleAnswer = async (answer) => {
        const question = questions[currentIndex];
        setCurrentQuestion(question);
        await calculateScore(answer);

        if (currentIndex < quizLength - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            setFinalScore(score);
            router.push('/quiz/email-permissions');
        }
    };

    return (
        <QuizContext.Provider value={{
            currentIndex,
            handleAnswer,
            questions,
            currentQuestion,
            quizLength,
            finalScore,
            score,
            memoryScore,
            writingScore,
            readingScore,
            examResultsScore,
            organisationalScore,
            gif_URLs
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuiz must be used within QuizProvider");
    }
    return context;
};