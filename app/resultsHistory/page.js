'use client';
import { useQuiz } from '../lib/context/QuizContext'
// import the databases object from appwrite library 
import { databases } from '../lib/appwrite'; 
import { createContext, useContext, useState, useEffect, use } from 'react';
// import the quiz context here 
import { Query } from 'appwrite';



const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const QUESTION_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RESULTS_COLLECTION_ID;

function Page() {

    // Add state to store the results
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Create the function that list the documents out and puts them in an array and then call this function in a useEffect hook 
    const renderResults = async () => {

        try{
            
            // Perform the query here and set the result variable to a state variable 
            // Add in the do while loop here to ensure that we are listing all the documents in the list 
            if(!databases){
                setError('Database object null could not read files from database');
                setLoading(false);
                return;
            }

            if (!DATABASE_ID || !QUESTION_COLLECTION_ID) {
                throw new Error('Missing required Appwrite configuration');
            }

                                    
            const allQuestions = [];
            const limit = 1000; 
            let offset = 0;
            let totalDocuments = 0;
            let total; 

            // Now add in the do while loop here 
            do {

                const response = await databases.listDocuments(
                    DATABASE_ID,
                    QUESTION_COLLECTION_ID,
                    [
                      Query.limit(1000),
                      Query.offset(offset)
                    ]
                  );

                  
                  allQuestions.push(...response.documents);
                  console.log('this is the length of all QUESTIONS \n', allQuestions.length); 

                // Check the length of the response object here 
                if (response.documents.length === 0) break;

                // Add in after the response from the database 
                total = response.total;
                offset += response.documents.length;

            }
            while(offset < total); 

            console.log(`✅ Total questions fetched: ${allQuestions.length}`);
            
            // Set the results in state
            setResults(allQuestions);
            setLoading(false);

        }
        catch(error){
            console.error('there was a problem reading documents from database: operation unsuccessful \n', error); 
            setError(error.message);
            setLoading(false);
        }
    }

    // Call renderResults in useEffect instead of directly in component body
    useEffect(() => {
        renderResults();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div style={{ 
                padding: '2rem', 
                textAlign: 'center',
                backgroundColor: '#ffffff',
                minHeight: '100vh',
                color: '#2c3e50'
            }}>
                <h2 style={{ 
                    color: '#3498db', 
                    fontSize: '1.8rem', 
                    fontWeight: '600' 
                }}>
                    Loading results...
                </h2>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                color: '#e74c3c',
                backgroundColor: '#ffffff',
                minHeight: '100vh' 
            }}>
                <h2 style={{ color: '#c0392b', fontSize: '1.8rem', marginBottom: '1rem' }}>
                    Error loading results
                </h2>
                <p style={{ color: '#e74c3c', fontSize: '1.1rem' }}>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ 
            padding: '2rem', 
            paddingTop: '8rem',
            backgroundColor: '#ffffff',
            color: '#1a1a1a',
            minHeight: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <h1 style={{ 
                color: '#2c3e50', 
                fontSize: '2.5rem', 
                marginBottom: '1rem',
                fontWeight: '700'
            }}>
                Quiz Results History
            </h1>
            <p style={{ 
                color: '#34495e', 
                fontSize: '1.2rem', 
                fontWeight: '500',
                marginBottom: '2rem'
            }}>
                Total Results: {results.length}
            </p>
            
            {results.length === 0 ? (
                <p style={{ 
                    color: '#7f8c8d', 
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    No results found.
                </p>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
                    {results.map((result, index) => (
                        <div 
                            key={result.$id} 
                            style={{ 
                                border: '2px solid #e8f4f8', 
                                borderRadius: '12px', 
                                padding: '1.5rem',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <h3 style={{ 
                                color: '#2c3e50', 
                                fontSize: '1.4rem', 
                                marginBottom: '1rem',
                                fontWeight: '600',
                                borderBottom: '2px solid #3498db',
                                paddingBottom: '0.5rem'
                            }}>
                                Result #{index + 1}
                            </h3>
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                                gap: '0.8rem' 
                            }}>
                                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: '#1a1a1a' }}>Name:</strong> {result.name || 'N/A'}
                                </p>
                                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: '#1a1a1a' }}>Email:</strong> {result.inputEmail || 'N/A'}
                                </p>
                                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: '#1a1a1a' }}>Age:</strong> {result.userAge || 'N/A'}
                                </p>
                                <p style={{ color: '#27ae60', fontSize: '1rem', lineHeight: '1.5', fontWeight: '500' }}>
                                    <strong style={{ color: '#1a1a1a' }}>Total Score:</strong> {result.score || 0}
                                </p>
                                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: '#1a1a1a' }}>Memory Score:</strong> {result.memoryScore || 0}
                                </p>
                                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: '#1a1a1a' }}>Writing Score:</strong> {result.writingScore || 0}
                                </p>
                                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: '#1a1a1a' }}>Reading Score:</strong> {result.readingScore || 0}
                                </p>
                                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: '#1a1a1a' }}>Exam Results Score:</strong> {result.examResultsScore || 0}
                                </p>
                                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: '1.5' }}>
                                    <strong style={{ color: '#1a1a1a' }}>Organisational Score:</strong> {result.organisationalScore || 0}
                                </p>
                                {result.createdAt && (
                                    <p style={{ 
                                        color: '#7f8c8d', 
                                        fontSize: '0.95rem', 
                                        lineHeight: '1.5',
                                        fontStyle: 'italic'
                                    }}>
                                        <strong style={{ color: '#1a1a1a' }}>Created:</strong> {new Date(result.createdAt).toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Page