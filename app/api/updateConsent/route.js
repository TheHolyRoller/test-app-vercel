import  EmailConsentTemplate  from '../../Components/emailConsentTemplate'; 


import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Check for API key
const apiKey = process.env.NEXT_RESEND_API_KEY;
console.log('this is the api key in the SEND route \n', apiKey); 
if (!apiKey) {
    console.error('❌ NEXT_RESEND_API_KEY is not set in environment variables');
}


const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(request) {
    console.log('🚀 API Route Hit - POST /api/updateConsent');

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

        console.log('this is the type of request \n', typeof request); 
        console.log('this is the body of the request \n', body); 


        // TO DO refactor this to extract the user email, name and consent variables 
        
        const { name, email, resultConsent, emailConsent } = body;

        console.log('this is the consent data', name, email, resultConsent, emailConsent);
      
        const { data, error } = await resend.emails.send({
            from: 'Quiz App <info@results.ivvidyslexiascreener.com>',
            to: ['danny@ivvi.app'],
            subject: 'User Updated their consent',
            react: <EmailConsentTemplate 
                name='danny'
                email={email}
                emailConsent={emailConsent}
                resultConsent={resultConsent}
                />,
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
    } catch (error) {
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