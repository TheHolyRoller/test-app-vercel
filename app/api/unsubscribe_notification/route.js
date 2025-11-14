import axios from "axios";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import  EmailConsentTemplate  from '../../Components/emailConsentTemplate'; 



const apiKey = process.env.NEXT_RESEND_API_KEY;
console.log('this is the api key in the SEND route \n', apiKey); 
if (!apiKey) {
    console.error('❌ NEXT_RESEND_API_KEY is not set in environment variables');
}


const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(request) {
    console.log('🚀 API Route Hit - POST /api/updateConsent');
    
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

        console.log('this is the type of request \n', typeof request); 
        console.log('this is the body of the request \n', body); 


        // TO DO refactor this to extract the user email, name and consent variables 
    

        const { email } = body;
        // const { subscribed } = body;
        // console.log('this is the unsubscribed status \n', subscribed); 
        console.log('this is the email extracted from the body \n', email);
        // if(!email || !subscribed){

        //     return NextResponse.json({message: 'could not extract status or email from response'}, {status: 404}); 

        // } 
      
   const { data, error } = await resend.emails.send({
    from: 'Quiz App <info@results.ivvidyslexiascreener.com>',
    to: ['danny@ivvi.app'],
    subject: 'User Wished to unsubscribe from emails',
    html: `
        <html>
            <body>
                <h1>Hello danny user wants to be unsubscribed,</h1>
                <p>Email: ${email}</p>
            </body>
        </html>
    `,
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




























