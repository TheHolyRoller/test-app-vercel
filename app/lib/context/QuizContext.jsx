    'use client';

    /* eslint-disable no-unused-vars */
    import { createContext, useContext, useState, useEffect, useRef } from 'react';
    import { useUser } from './UserContext';
    import { databases } from '../appwrite';
    import { Query } from 'appwrite';
    import { usePathname, useRouter } from 'next/navigation';


    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const QUESTION_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_QUESTION_COLLECTION_ID;

    const KIDS_QUESTION_COLLECTION_ID = ''; 
    const STUDENT_QUESTION_COLLECTION_ID = ''; 
    const ADULT_QUESTION_COLLECTION_ID = ''; 

    let CURRENT_QUESTION_COLLECTION_ID; 

    const QuizContext = createContext(null);
    

    export const QuizProvider = ({ children }) => {


        // Add in the use Ref instance here 
        const hasInitialized = useRef(false); 

        const pathname = usePathname();
        const router = useRouter();
        const { userAge } = useUser();
        console.log('this is the user age in the quiz context extracted from the user context::: \n', userAge); 


        const [score, setScore] = useState(0);
        const [questions, setQuestions] = useState([]);
        const [weights, setWeights] = useState([]);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [currentQuestion, setCurrentQuestion] = useState();
        const [quizLength, setQuizLength] = useState(0);
        const [finalScore, setFinalScore] = useState(0);
        const [gif_urls, setgif_urlS] = useState();
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);

        // Category score state variables
        const [readingScore, setReadingScore] = useState(0);
        const [writingScore, setWritingScore] = useState(0);
        const [organisationalScore, setOrganisationalScore] = useState(0);
        const [memoryScore, setMemoryScore] = useState(0);
        const [examResultsScore, setExamResultsScore] = useState(0);
        const [answers, setAnswers] = useState([]);
        const [yesAnswers, setYesAnswers] = useState([]); 


        const [readingCounter, setReadingCounter] = useState(0);
        const [writingCounter, setWritingCounter] = useState(0); 
        const [memoryCounter, setMemoryCounter] = useState(0); 
        const [plansCounter, setPlansCounter] = useState(0); 
        const [testsCounter, setTestsCounter] = useState(0);
        const [updateCounter, setUpdateCounter] = useState(0); 

        const [ cardSection, setCardSection] = useState(); 
        const [cardType, setCardType] = useState(); 
        const [navColor, setNavColor] = useState(); 

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

        const [email, setEmail] = useState(''); 

        // Monitor quiz-related state changes
        useEffect(() => {
            console.log('📊 Quiz State Update:', {
                currentIndex,
                quizLength,
                score,
                finalScore,
                answers,
                currentQuestion: currentQuestion ? {
                    id: currentQuestion.$id,
                    section: currentQuestion.Section,
                    question: currentQuestion.question_text
                } : null,
                questionsCount: questions.length,
                gifURLsCount: gif_urls?.length || 0
            });

            
            // Detailed answers logging
            console.log('📝 ANSWERS ARRAY CONTENTS:', answers);
            console.log('📝 ANSWERS COUNT:', answers.length);
            if (answers.length > 0) {
                console.log('📝 LAST ANSWER:', answers[answers.length - 1]);
            }
        }, [currentIndex, quizLength, score, finalScore, currentQuestion, questions, gif_urls, answers]);


        useEffect(() => {

            console.log('this is the current index being updated:::;;;; \n', currentIndex); 

        }, [currentIndex])


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
                    let total;

                    console.log('this is the limit \n', limit); 
                    console.log('this is the offset \n', offset); 


                    console.log('📥 QuizContext: Fetching questions from Appwrite');
                    console.log('🔗 :', {
                        databaseId: DATABASE_ID,
                        collectionId: QUESTION_COLLECTION_ID
                    });

                    // TO DO add in the functionality to check the type of user and assign the right question collection id to fetch the right questions 
                    // TO DO Assign the current question collection ID to the right question collection b

                    // Use a hash map here 
                    const ageMap = {}

                    ageMap["adult"] = ADULT_QUESTION_COLLECTION_ID; 
                    ageMap["child"] = KIDS_QUESTION_COLLECTION_ID; 
                    ageMap["student"] = STUDENT_QUESTION_COLLECTION_ID; 

                    CURRENT_QUESTION_COLLECTION_ID = ageMap[userAge]   

                    console.log('this is the current question collection', CURRENT_QUESTION_COLLECTION_ID); 
                    console.log('this is the current user age mag \n', ageMap[userAge]); 




                    do {
                        const response = await databases.listDocuments(

                        
                        DATABASE_ID,
                        // TO DO add in the current question collection here 
                        QUESTION_COLLECTION_ID,
                        [
                            Query.limit(1000),
                            Query.offset(offset), 
                            Query.orderAsc('sequence_number'), 
                            
                        ]
                        );

                        
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


                        const gifURLS = allQuestions.map(doc => doc.gif_url);
                        setgif_urlS(gifURLS);
                        setQuizLength(allQuestions.length);
                        setCurrentQuestion(allQuestions[0]);
                        console.log('✅ Loaded all questions:', allQuestions.length);
                        console.log('these are all the questions::::::::: \n', allQuestions); 
        
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
        }, [currentQuestion]); 

        // Calculate nav color based on cardType and cardSection
        useEffect(() => {
            let color = '#809acc'; // default color
            
            // Only apply quiz-specific colors if we're on the quiz page
            if (pathname === '/quiz' && cardType && cardSection) {
                if (cardType === 'Question') {
                    const colorMap = {
                        reading: "#78D591",
                        writing: "#4D95D5",
                        memory: "#E77E22",
                        tests: "#F3C70E",
                        plans: "#CB3E32",
                    };
                    
                    color = colorMap[cardSection.toLowerCase()];
                    console.log('nav color index contents \n', colorMap[cardSection.toLowerCase()]);
                    console.log('this is the current hash map key \n', cardSection.toLowerCase()); 
                    console.log('this is the color{}::::: \n', color); 



                } else {
                    const colorMap = { 
                        reading: '#5EA772',
                        writing: '#3B73A6', 
                        memory: '#B3631C', 
                        tests: '#BC990B', 
                        plans: '#B53C31'
                    };
                    color = colorMap[cardSection.toLowerCase()];
                    console.log('nav color index contents \n', colorMap[cardSection.toLowerCase()]);
                    console.log('this is the current hash map key \n', cardSection.toLowerCase()); 
                    console.log('this is the color{}::::: \n', color); 

                }
            }

            if(color === undefined){


                console.error('color is undefined!!! \n', color);    

                console.error('this is the current question in error  \n', currentQuestion); 
                console.error('this is the current index \n', currentIndex); 

                // Log the current keys here 
                console.log('this is the current key!!!!@@@@:::: \n', cardSection); 
                console.log('this is the current Card type \n', cardType);
                
            
                if(cardType === 'Category'){

                    color = '#3B73A6'; 
                    console.log('this is the fallback option:::: \n', color); 
                    console.log('this is the current card Section \n', cardSection); 
                    console.log('this is the card type in the last fallback \n', cardType); 

                }

                else{

                    color = '#78D591'; 
                    console.log('this is the first callback color \n', color); 
                    console.log('this is the current card Section \n', cardSection); 

                }

            }
            
            setNavColor(color);
            console.log('this is the current card section \n', cardSection); 
            console.log('this is the current Card Type \n', cardType); 
                
            // Find out why it's undefined on the 8th question & category cards 
            console.log('Nav color updated:', color, 'for cardType:', cardType, 'cardSection:', cardSection, 'pathname:', pathname);
        }, [cardType, cardSection, pathname]);
        
        useEffect(() => {

            setCurrentQuestion(questions[currentIndex]);

            if(currentQuestion && currentQuestion.Type && currentQuestion.Section){

                setCardSection(questions[currentIndex].Section); 

                setCardType(questions[currentIndex].Type); 
                console.log('this is the value of the card Section \n', cardSection); 
                console.log('this is the value of the card Type \n', cardType); 

            }
        


        },[currentIndex, questions]);


        // Add in a useEffect hook here to track when counters from different question categories are incremented 
        useEffect(() => {

            console.log('category updated for question category counter::::::::: \n', writingCounter, readingCounter, plansCounter, memoryCounter, testsCounter, updateCounter);

            // Fill the dependency array with all the category counter state variables here 
        }, [writingCounter, readingCounter, plansCounter, memoryCounter, testsCounter, updateCounter]); 


        const formatScore = async (score) => {

            console.log('this is the format score function'); 
            console.log('this is the inputted score \n', score); 

            let percentage; 
            // percentage = Math.floor((score));
            percentage = score; 
            console.log('this is just an experiment not using flooring the score percentage:::: \n', percentage )
            
            console.log('this is the final percentage of the quiz::::: \n', percentage); 
            console.log('returning percentage'); 

            return percentage; 

        }

        const calculateScore = async (answer) => {
            if (!currentQuestion || answer === 'noop') {
                console.log('⏭️ QuizContext: Skipping score calculation - no question or noop answer');
                return;
            }

            console.log(`🎯 QuizContext: Calculating score for answer: ${answer}`);
            const { 
                sometimes_weight,
                yes_weight,
                no_weight,
                Section 
            } = currentQuestion;


            console.log('this is the yes weight in the context::::::: \n', currentQuestion[yes_weight]); 
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

                

                setUpdateCounter(prev => prev + 1);  
                
                const key = type.trim().toLowerCase();
                const scoreSetter = scoreSetters[key];

                console.log('this is the score setter in the quiz context used to update the category score  \n', scoreSetter); 
                console.log('this is the score to set to the particular category here \n', score); 

                let categoryScore = score; 

                console.log('just about to update the category with the formatted category score \n', categoryScore); 
                


                if (scoreSetter) {

                    scoreSetter(prevScore => prevScore + categoryScore);

                } 
            };
            
            const updateQuestionTypeCounter = (type, score) => {


                console.log('Updating the counter of each score category \n, ', type);
                console.log('this is the current score that will update the right category::: \n', score); 

                
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
                    console.log('updating the counter setter \n', counterSetter); 

                    
                }

            }

            if(userAge === 'adult'){

                console.error('user age is adult'); 


            }

            if (userAge === 'adult') {
                console.log('👤 QuizContext: Calculating score for adult');
                if (answer === 'yes') {


                    console.log('this is the yes weight!! \n', yes_weight); 

                    setScore(prevScore => prevScore + yes_weight);
                    updateScoreCategory(Section, yes_weight);
                    console.log('this is the question Section \n', Section); 
                } else if (answer === 'sometimes') {
                    setScore(prevScore => prevScore + sometimes_weight);
                    updateScoreCategory(Section, sometimes_weight);
                    console.log('this is the question Section \n', Section); 
                }


            } else {
                console.log('👶 QuizContext: Calculating score for child');
                if (answer === 'yes') {
                    setScore(prevScore => prevScore + yes_weight);
                    updateScoreCategory(Section, yes_weight);
                    console.log('this is the question Section \n', Section); 

                } else if (answer === 'sometimes') {
                    setScore(prevScore => prevScore + sometimes_weight);
                    updateScoreCategory(Section, sometimes_weight);
                    console.log('this is the question Section \n', Section); 

                }
            }
        };


        const handleAnswer = async (answer) => {
            if(answer === 'noop') return

            console.log(`[${new Date().toLocaleTimeString()}] Button clicked handle answer function called`);
            console.log(`🎯 QuizContext: Handling answer: ${answer}`);
            const question = questions[currentIndex];
            console.log('this is the question type#### \n', question.Type); 
            console.log('this is the question id ##### \n', question.id); 
            console.log('this is the question text ##### \n', question.question_text); 
            console.log('this is the whole question #####', question); 


            const answerObject = {
                question_id: question.id, 
                question_text: question.question_text, 
                answer: answer, 
            }; 


            if(answer === 'yes'){

                const YesAnswerObject = {
                    question_section: question.Section, 
                    question_answer: "yes", 
                    question_text: question.question_text,
                    question_id: question.id,
                }; 

                // Actually store the yes answer - this gets passed to email template
                setYesAnswers(prevYesAnswers => [...prevYesAnswers, YesAnswerObject]);
                console.log('📝 Updated yesAnswers:', yesAnswers.length + 1, 'total yes answers'); 
                
            }
            

            console.log('this is the current answer object in the quiz context:: \n', answerObject)

            setAnswers(prev => [...prev, answerObject]); 
            
            // Calculate score first
            await calculateScore(answer);

            if (currentIndex < quizLength - 1) {
                // console.log(`📝 QuizContext: Moving to next question (${currentIndex + 1}/${quizLength})`);
                setCurrentIndex(prevIndex => prevIndex + 1);
                // setCurrentIndex(prevIndex => prevIndex);

                console.log('updating current index in real time...::::: \n', currentIndex); 
            } else {
                console.log('🏁 QuizContext: Quiz completed, setting final score');

                // Add in a sub-routine here that takes the score and formats it and sets the final score the the percentage that the format Score function returns 

                let percentage = await formatScore(score); 
                console.log('this is the percentage result of calling the format score function in handle Answer \n', percentage); 
                console.log('this is the FINAL MAIN SCORE::::', score); 


                setTimeout(() => {
                    console.log('quick break'); 
                }, 200); 


                setTimeout(() => {
                    console.log('just about to navigate to the result page'); 
                }, 2000);

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
                    let offset = 0;
                    let total; 
        
                    do {
                        
                        const res = await fetch('/api/questions', { cache: 'no-store' });
                        const allQuestions = await res.json();
                        

                        console.log('this is the length of all QUESTIONS \n', allQuestions.length); 
                        
                        // Check the length of the response object here 
                        if (resultsResponse.documents.length === 0) break;

                        total = resultsResponse.total;
                        offset += resultsResponse.documents.length;

                        console.log('this is the offset \n', offset); 
        
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
                handleAnswer,
                currentIndex,
                navColor,
                cardSection, 
                cardType, 
                questions,
                answers,
                setAnswers,
                yesAnswers, // Array of all "yes" answers - used in email template for detailed reporting
                currentQuestion,
                quizLength,
                finalScore, // Main score used in email template (0-100)
                score, // Raw accumulated score 
                memoryScore, // Category-specific scores used in email template
                writingScore,
                readingScore,
                examResultsScore,
                organisationalScore,
                gif_urls,
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