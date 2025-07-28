// import { EmailTemplate } from '../../../components/EmailTemplate';
import { EmailTemplate } from '../../Components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Check for API key
const apiKey = process.env.NEXT_RESEND_API_KEY;
if (!apiKey) {
    console.error('❌ NEXT_RESEND_API_KEY is not set in environment variables');
}
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);


export async function POST(request: Request) {
    console.log('🚀 API Route Hit - POST /api/send');
    
    // Check if API key is available
    if (!apiKey) {
        return NextResponse.json(
            { 
                success: false, 
                error: 'Email service is not configured. Please check server configuration.'
            },
            { status: 500 }
        );
    }
    
    try {
        const body = await request.json();
        const { toEmail, subject, message, name, quizData } = body;

        console.log('📧 Email Details:', { toEmail, subject, message, name, hasQuizData: !!quizData });
        
        // Log yesAnswers data if available
        if (quizData?.yesAnswers) {
            console.log('✅ Yes Answers Found:', quizData.yesAnswers.length, 'total yes answers');
            console.log('📊 Yes Answers by Section:', quizData.yesAnswersBySection);
            console.log('🔍 Sample Yes Answers:', quizData.yesAnswers.slice(0, 3));
        }

        // Log score data
        if (quizData) {
            console.log('📊 Score Data Received:', {
                finalScore: quizData.finalScore,
                score: quizData.score,
                memoryScore: quizData.memoryScore,
                writingScore: quizData.writingScore,
                readingScore: quizData.readingScore,
                examResultsScore: quizData.examResultsScore,
                organisationalScore: quizData.organisationalScore,
                totalYesAnswers: quizData.totalYesAnswers
            });
            console.log('🔍 Full Quiz Data:', quizData);
        }

        if (!toEmail) {
            return NextResponse.json(
                { success: false, error: 'Email address is required' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Quiz App <info@results.ivvidyslexiascreener.com>',
            to: [toEmail],
            subject: subject || 'Your Dyslexia Screening Report',
            react: await EmailTemplate({ 
                firstName: name,
                message: message,
                // quizData now includes:
                // - results: transformed quiz results by section
                // - yesAnswers: formatted array of all yes answers
                // - yesAnswersBySection: yes answers grouped by section
                // - totalYesAnswers: total count of yes answers
                // - individual scores: finalScore, memoryScore, etc.
                quizData: quizData 
            }),
        });

        if (error) {
            console.error('❌ Email sending error:', error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        console.log('✅ Email sent successfully:', data);
        return NextResponse.json({ 
            success: true, 
            data,
            message: 'Email sent successfully'
        });
    } catch (error: any) {
        console.error('❌ Error in API route:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error.message || 'Failed to send email'
            },
            { status: 500 }
        );
    }
}