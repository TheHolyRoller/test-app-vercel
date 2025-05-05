    'use client';

    import { useState, useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { useUser } from '../lib/context/UserContext';
    import { useQuiz } from '../lib/context/QuizContext';
    import { databases } from '../lib/appwrite';
    // import q from '../../Styles/Quiz.module.css';
    import q from '../Styles/Quiz.module.css'; 


    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID;

    export default function EmailSignup() {
        const router = useRouter();
        // const [email, setInputEmail] = useState('');
        const [inputEmail, setInputEmail] = useState('');
        const { name, userAge } = useUser();
        // Extract the set email function from the quiz context here 
        const { setEmail} = useQuiz(); 
        const { 
            finalScore, 
            score, 
            memoryScore, 
            writingScore, 
            readingScore, 
            examResultsScore, 
            organisationalScore 
        } = useQuiz();

        const onSubmit = async (e) => {
            e.preventDefault();
            console.log('📝 Form submission started');

            try {
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
                        name
                    }
                );
                console.log('✅ Database save successful:', response);

                // Then send email
                console.log('📧 Sending email...');
                await sendEmail();
                
                // Navigate to results page after successful submission
                console.log('🔄 Navigating to results page...');
                router.push('/result');
            } catch (error) {
                console.error('❌ Error in form submission:', error);
                alert('An error occurred. Please try again.');
            }
        };

        const sendEmail = async () => {
            console.log('📤 Starting email send process...');

            try {
                const emailData = {
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

                console.log('📥 Response status:', res.status);
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
                throw error; // Re-throw to be handled by onSubmit
            }
        };

        const handleChange = (e) => {
            setInputEmail(e.target.value);
            console.log('this is the input \n', e.target.value); 


            
        };


        // Add in the useEffect hook that will run when the Input Email changes 
        useEffect(() => {

            console.log('this is the input email in the useEffect hook \n', inputEmail); 
            setEmail(inputEmail); 

        }, [inputEmail])



        return (
            <section style={{color: 'white'}}>
                <main className={q.quizComponentContainer} id='quizElement'>
                    <section className={q.cardContainer}>
                        <article className={q.card}>
                            <div className={q.cardCategoryColorContainer}>
                                <div className={q.categoryLabelContainer}>
                                    <label className={q.categoryLabel}>Writing</label>
                                </div>
                            </div>

                            <div className={q.questionTextContainer}>
                                <h2 className={q.questionText}>
                                    <span>
                                        Which Email is Best
                                    </span>
                                </h2>
                            </div>
                            
                            <div className={q.doodleContainer}>
                                {/* Add doodle image here if needed */}
                            </div>
                        </article>
                    </section>

                    <form onSubmit={onSubmit} className={q.emailForm}>
                        <div className={q.emailInputContainer}>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={inputEmail}
                                onChange={handleChange}
                                required
                                className={q.emailInput}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={q.yesButton}
                            style={{marginLeft: '0.5rem'}}
                        >
                            Next
                        </button>
                    </form>
                </main>
            </section>
        );
    } 