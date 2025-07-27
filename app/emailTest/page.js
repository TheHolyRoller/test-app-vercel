import { EmailTemplate } from "../Components/email-template"

export default function EmailTest(){

    // Test Case 1: Very Low Likelihood (0-24%)
    const veryLowSample = {
        recipientName: "Alex Johnson",
        results: {
            reading: { 
                yes: 0, 
                sometimes: 1, 
                no: 4,
                questions: []
            },
            writing: { 
                yes: 1, 
                sometimes: 0, 
                no: 4,
                questions: [
                    { q: "Do you have difficulty spelling?", answer: "Yes" }
                ]
            },
            memory: { 
                yes: 0, 
                sometimes: 2, 
                no: 3,
                questions: []
            },
            tests: { 
                yes: 0, 
                sometimes: 1, 
                no: 4,
                questions: []
            },
            plans: { 
                yes: 0, 
                sometimes: 0, 
                no: 5,
                questions: []
            }
        }
    };

    // Test Case 2: Low Likelihood (25-49%)
    const lowSample = {
        recipientName: "Sarah Chen",
        results: {
            reading: { 
                yes: 1, 
                sometimes: 2, 
                no: 2,
                questions: [
                    { q: "Do you read slowly?", answer: "Yes" }
                ]
            },
            writing: { 
                yes: 2, 
                sometimes: 1, 
                no: 2,
                questions: [
                    { q: "Do you have difficulty spelling?", answer: "Yes" },
                    { q: "Is your handwriting hard to read?", answer: "Yes" }
                ]
            },
            memory: { 
                yes: 1, 
                sometimes: 2, 
                no: 2,
                questions: [
                    { q: "Do you forget instructions easily?", answer: "Yes" }
                ]
            },
            tests: { 
                yes: 1, 
                sometimes: 2, 
                no: 2,
                questions: [
                    { q: "Do you get anxious during tests?", answer: "Yes" }
                ]
            },
            plans: { 
                yes: 1, 
                sometimes: 1, 
                no: 3,
                questions: [
                    { q: "Do you have trouble organizing tasks?", answer: "Yes" }
                ]
            }
        }
    };

    // Test Case 3: Moderate Likelihood (50-74%)
    const moderateSample = {
        recipientName: "Michael Brown",
        results: {
            reading: { 
                yes: 3, 
                sometimes: 1, 
                no: 1,
                questions: [
                    { q: "Do you read slowly?", answer: "Yes" },
                    { q: "Do you have difficulty with phonics?", answer: "Yes" },
                    { q: "Do you avoid reading out loud?", answer: "Yes" }
                ]
            },
            writing: { 
                yes: 2, 
                sometimes: 2, 
                no: 1,
                questions: [
                    { q: "Do you have difficulty spelling?", answer: "Yes" },
                    { q: "Is your handwriting hard to read?", answer: "Yes" }
                ]
            },
            memory: { 
                yes: 2, 
                sometimes: 2, 
                no: 1,
                questions: [
                    { q: "Do you forget instructions easily?", answer: "Yes" },
                    { q: "Do you have trouble remembering sequences?", answer: "Yes" }
                ]
            },
            tests: { 
                yes: 3, 
                sometimes: 1, 
                no: 1,
                questions: [
                    { q: "Do you get anxious during tests?", answer: "Yes" },
                    { q: "Do you run out of time on tests?", answer: "Yes" },
                    { q: "Do you know answers but can't write them down?", answer: "Yes" }
                ]
            },
            plans: { 
                yes: 2, 
                sometimes: 2, 
                no: 1,
                questions: [
                    { q: "Do you have trouble organizing tasks?", answer: "Yes" },
                    { q: "Do you struggle with time management?", answer: "Yes" }
                ]
            }
        }
    };

    // Test Case 4: High Likelihood (75-100%)
    const highSample = {
        recipientName: "Emma Davis",
        results: {
            reading: { 
                yes: 4, 
                sometimes: 1, 
                no: 0,
                questions: [
                    { q: "Do you read slowly?", answer: "Yes" },
                    { q: "Do you have difficulty with phonics?", answer: "Yes" },
                    { q: "Do you avoid reading out loud?", answer: "Yes" },
                    { q: "Do you lose your place when reading?", answer: "Yes" }
                ]
            },
            writing: { 
                yes: 4, 
                sometimes: 1, 
                no: 0,
                questions: [
                    { q: "Do you have difficulty spelling?", answer: "Yes" },
                    { q: "Is your handwriting hard to read?", answer: "Yes" },
                    { q: "Do you avoid writing tasks?", answer: "Yes" },
                    { q: "Do you struggle with grammar?", answer: "Yes" }
                ]
            },
            memory: { 
                yes: 4, 
                sometimes: 1, 
                no: 0,
                questions: [
                    { q: "Do you forget instructions easily?", answer: "Yes" },
                    { q: "Do you have trouble remembering sequences?", answer: "Yes" },
                    { q: "Do you struggle to remember names?", answer: "Yes" },
                    { q: "Do you lose track of time?", answer: "Yes" }
                ]
            },
            tests: { 
                yes: 4, 
                sometimes: 1, 
                no: 0,
                questions: [
                    { q: "Do you get anxious during tests?", answer: "Yes" },
                    { q: "Do you run out of time on tests?", answer: "Yes" },
                    { q: "Do you know answers but can't write them down?", answer: "Yes" },
                    { q: "Do you struggle with multiple choice questions?", answer: "Yes" }
                ]
            },
            plans: { 
                yes: 4, 
                sometimes: 1, 
                no: 0,
                questions: [
                    { q: "Do you have trouble organizing tasks?", answer: "Yes" },
                    { q: "Do you struggle with time management?", answer: "Yes" },
                    { q: "Do you have difficulty prioritizing?", answer: "Yes" },
                    { q: "Do you forget appointments?", answer: "Yes" }
                ]
            }
        }
    };

    return(
        <div style={{ padding: '20px' }}>
        

            <div style={{ marginBottom: '60px', border: '2px solid #ddd', borderRadius: '10px', padding: '20px' }}>
                <h2 style={{ color: '#dc2626', marginBottom: '20px' }}>Test Case 4: High Likelihood (75-100%)</h2>
                <EmailTemplate 
                    firstName="Emma" 
                    quizData={highSample}
                />
            </div>
        </div>
    )
}