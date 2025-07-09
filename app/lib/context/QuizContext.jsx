'use client';

/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from './UserContext';
import { databases } from '../appwrite';
import { useRef } from 'react';
import { Query } from 'appwrite';
import { off } from 'process';

// Environment variable checks
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const QUESTION_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_QUESTION_COLLECTION_ID;

// Log environment variables (without sensitive values)
    // console.log('🔍 Appwrite Configuration:', {
    //     hasDatabaseId: !!DATABASE_ID,
    //     hasQuestionCollectionId: !!QUESTION_COLLECTION_ID,
    //     environment: process.env.NODE_ENV
    // });



const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {


    // Add in the use Ref instance here 
    const hasInitialized = useRef(false); 

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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Category score state variables
    const [readingScore, setReadingScore] = useState(0);
    const [writingScore, setWritingScore] = useState(0);
    const [organisationalScore, setOrganisationalScore] = useState(0);
    const [memoryScore, setMemoryScore] = useState(0);
    const [examResultsScore, setExamResultsScore] = useState(0);


    // Add in the counters for each category here 

    // Add these state variables to the context export 
    const [readingCounter, setReadingCounter] = useState(0);
    const [writingCounter, setWritingCounter] = useState(0); 
    const [memoryCounter, setMemoryCounter] = useState(0); 
    const [plansCounter, setPlansCounter] = useState(0); 
    const [testsCounter, setTestsCounter] = useState(0);

    // Button click counters that persist across renders
    const [buttonCounters, setButtonCounters] = useState({
        yesNum: 0, 
        noNum: 0, 
        sometimesNum: 0 
    });

    // Function to increment button counters
    const incrementButtonCounter = (buttonType) => {
        setButtonCounters(prev => ({
            ...prev, 
            [buttonType]: prev[buttonType] + 1
        })); 
    };

    // Track quiz completion count
    const incrementQuizCompletionCount = () => {
        const currentCount = parseInt(localStorage.getItem('quizCompletionCount') || '0');
        const newCount = currentCount + 1;
        localStorage.setItem('quizCompletionCount', newCount.toString());
        console.log('📊 Quiz completion count:', newCount);
    }; 




    const [email, setEmail] = useState(''); 

    // Monitor quiz-related state changes
    useEffect(() => {
        console.log('📊 Quiz State Update:', {
            currentIndex,
            quizLength,
            score,
            finalScore,
            currentQuestion: currentQuestion ? {
                id: currentQuestion.$id,
                section: currentQuestion.Section,
                question: currentQuestion.questionText
            } : null,
            questionsCount: questions.length,
            gifURLsCount: gif_URLs?.length || 0
        });
    }, [currentIndex, quizLength, score, finalScore, currentQuestion, questions, gif_URLs]);

    // Monitor category score changes
    useEffect(() => {
        console.log('📈 Category Scores Update:', {
            reading: readingScore,
            writing: writingScore,
            organisation: organisationalScore,
            memory: memoryScore,
            exams: examResultsScore,
            totalScore: score
        });
    }, [readingScore, writingScore, organisationalScore, memoryScore, examResultsScore, score]);

    useEffect(() => {
        console.log('🔄 QuizContext: Initializing quiz data fetch');
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                if (!DATABASE_ID || !QUESTION_COLLECTION_ID) {
                    throw new Error('Missing required Appwrite configuration');
                }

                            
                const allQuestions = [];
                const limit = 1000; 
                let offset = 0;
                let totalDocuments = 0;
                let total; 

                // console.log('this is the limit \n', limit); 
                // console.log('this is the offset \n', offset); 


                // console.log('📥 QuizContext: Fetching questions from Appwrite');
                // console.log('🔗 :', {
                //     databaseId: DATABASE_ID,
                //     collectionId: QUESTION_COLLECTION_ID
                // });

                do {
                    const response = await databases.listDocuments(
                      DATABASE_ID,
                      QUESTION_COLLECTION_ID,
                      [
                        Query.limit(1000),
                        Query.offset(offset), 
                        Query.orderAsc('Sequence_Number'), 
                        
                      ]
                    );
                    

                    // console.log(`📄 Fetched ${response.documents.length} questions (offset ${offset})`);

                  
                    if (response.documents.length === 0) break;
                  
                    allQuestions.push(...response.documents);
                    console.log('this is the length of all QUESTIONS \n', allQuestions.length); 
                  
                    total = response.total;
                    offset += response.documents.length;
                  
                  } while (offset < total);

                  console.log(`✅ Total questions fetched: ${allQuestions.length}`);

                if (!hasInitialized.current ) {
                    

                    hasInitialized.current = true;
                    setQuestions(allQuestions);

                    const gifURLS = allQuestions.map(doc => doc.GIF_URL);
                    setGIF_URLS(gifURLS);
                    setQuizLength(allQuestions.length);
                    setCurrentQuestion(allQuestions[0]);
                    console.log('✅ Loaded all questions:', allQuestions.length);

                }


            } catch (error) {
                console.error('❌ QuizContext: Error fetching questions:', error);
                setError(error.message);
                // Log the full error for debugging
                console.error('Full error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {

        console.log('this is the current question \n', currentQuestion); 

    }, [currentQuestion])

    useEffect(() => {

        setCurrentQuestion(questions[currentIndex]);

    },[currentIndex, questions]); 


    // Add in a useEffect hook here to track when counters from different question categories are incremented 
    useEffect(() => {

        console.log('category updated for question category counter \n', writingCounter, readingCounter, plansCounter, memoryCounter, testsCounter);

        // Fill the dependency array with all the category counter state variables here 
    }, [writingCounter, readingCounter, plansCounter, memoryCounter, testsCounter]); 



    const calculateScore = async (answer) => {
        if (!currentQuestion || answer === 'noop') {
            console.log('⏭️ QuizContext: Skipping score calculation - no question or noop answer');
            return;
        }

        console.log(`🎯 QuizContext: Calculating score for answer: ${answer}`);
        const { 
            adult_yes_weight, 
            adult_no_weight, 
            adult_maybe_weight, 
            child_maybe_weight, 
            child_no_weight, 
            child_yes_weight,
            Section 
        } = currentQuestion;

        
        console.log(`📊 QuizContext: Current section: ${Section}`);

        const updateScoreCategory = (type, score) => {
            console.log(`📈 QuizContext: Updating ${type} score by ${score}`);
            const scoreSetters = {
                reading: setReadingScore,
                writing: setWritingScore,
                memory: setMemoryScore,
                plans: setOrganisationalScore,
                tests: setExamResultsScore
            };
            

            
            const key = type.trim().toLowerCase();
            const scoreSetter = scoreSetters[key];

            if (scoreSetter) {
                scoreSetter(prevScore => prevScore + 1);

            }
        };



        
        const updateQuestionTypeCounter = (type, score) => {


            console.log('Updating the counter of each score category \n, ', type);
            
            const counterSetters = {

                readingCount: setReadingCounter,
                writingCount: setWritingCounter, 
                plansCount: setPlansCounter, 
                testsCount: setTestsCounter, 
                memoryCount: setMemoryCounter

   
            }

            const key = type.trim().toLowerCase(); 
            const counterSetter = counterSetters[key]; 
            if(counterSetter){
                counterSetter(prevCounter => prevCounter + 1); 
                
            }


              

        }



        if (userAge === 'adult') {
            console.log('👤 QuizContext: Calculating score for adult');
            if (answer === 'yes') {
                setScore(prevScore => prevScore + adult_yes_weight);
                updateScoreCategory(Section, adult_yes_weight);
                console.log('this is the question Section \n', Section); 
            } else if (answer === 'sometimes') {
                setScore(prevScore => prevScore + adult_maybe_weight);
                updateScoreCategory(Section, adult_maybe_weight);
                console.log('this is the question Section \n', Section); 

            }
        } else {
            console.log('👶 QuizContext: Calculating score for child');
            if (answer === 'yes') {
                setScore(prevScore => prevScore + child_yes_weight);
                updateScoreCategory(Section, child_yes_weight);
                console.log('this is the question Section \n', Section); 

            } else if (answer === 'sometimes') {
                setScore(prevScore => prevScore + child_maybe_weight);
                updateScoreCategory(Section, child_maybe_weight);
                console.log('this is the question Section \n', Section); 

            }
        }
    };


    const handleAnswer = async (answer) => {

        if(answer === 'noop') return

        console.log(`🎯 QuizContext: Handling answer: ${answer}`);
        const question = questions[currentIndex];
        await calculateScore(answer);

        if (currentIndex < quizLength - 1) {
            console.log(`📝 QuizContext: Moving to next question (${currentIndex + 1}/${quizLength})`);
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            console.log('🏁 QuizContext: Quiz completed, setting final score');
            setFinalScore(score);
            incrementQuizCompletionCount();
            router.push('/result');
        }
    };


    useEffect(() => {

        const renderResults = async (databases) => {

            try{
                
                if(!databases){
    
                    return console.error('Database object null could not read files from database'); 
    
                }
    
                if (!DATABASE_ID || !QUESTION_COLLECTION_ID) {
                    throw new Error('Missing required Appwrite configuration');
                }
    
                                        
                const allQuestions = [];
                const limit = 1000; 
                let offset = 0;
                let totalDocuments = 0;
                let total; 
    
    
                do {
    
                    const resultsResponse = await databases.listDocuments(
                        DATABASE_ID,
                        QUESTION_COLLECTION_ID,
                        [
                          Query.limit(1000),
                          Query.offset(offset)
                        ]
                      );
    
                      
                      allQuestions.push(...resultsResponse.documents);
                      console.log('this is the length of all QUESTIONS \n', allQuestions.length); 
                      
                    // Check the length of the response object here 
                    if (resultsResponse.documents.length === 0) break;

                    total = resultsResponse.total;
                    offset += resultsResponse.documents.length;
    
                }
                while(offset < total); 
    
                console.log(`✅ Total questions fetched: ${allQuestions.length}`);


            }
            catch(error){
    
                console.error('there was a problem reading documents from database: operation unsuccessful \n', error); 
    
            }
    
        }
    


    }, [])


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
            gif_URLs,
            email, 
            setEmail,
            isLoading,
            error, 
            readingCounter, 
            writingCounter, 
            memoryCounter, 
            testsCounter, 
            plansCounter,
            buttonCounters,
            incrementButtonCounter
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        console.error('❌ QuizContext: useQuiz must be used within QuizProvider');
        throw new Error("useQuiz must be used within QuizProvider");
    }
    return context;
};