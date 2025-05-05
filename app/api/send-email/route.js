import { resend } from "../../lib/resend";
import { NextResponse } from 'next/server';

export async function POST(request) {
    console.log('🚀 API Route Hit - POST /api/send-email');
    
    try {
        console.log('📦 Attempting to parse request body...');
        const body = await request.json();
        console.log('✅ Request body parsed successfully:', body);
        
        const { toEmail, subject, message, name } = body;

        if (!toEmail) {
            return NextResponse.json(
                { success: false, error: 'Email address is required' },
                { status: 400 }
            );
        }

        console.log('📧 Email Details:');
        console.log('To:', toEmail);
        console.log('Subject:', subject);
        console.log('Message:', message);
        console.log('Name:', name);

        console.log('🔑 Checking Resend API Key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');

        const data = await resend.emails.send({
            from: 'Quiz App <onboarding@resend.dev>',
            to: toEmail,
            subject: subject,
            name: name,
            message: message || 'Your Quiz Results',
            html: `<p>${message}</p>`
        });

        console.log('✅ Email sent successfully:', data);
        return NextResponse.json({ 
            success: true, 
            data,
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.error('❌ Email sending error:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        return NextResponse.json(
            { 
                success: false, 
                error: error.message || 'Failed to send email'
            },
            { status: 500 }
        );
    }
} 