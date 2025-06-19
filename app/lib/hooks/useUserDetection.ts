'use client';
import { useEffect, useState } from "react";
import { createAnonymousSession } from '../appwrite'; 

export const useUserDetection = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isNewUser, setIsNewUser] = useState(null);

    useEffect(() => {
        const detectUser = async () => {
            try {
                console.log('🔍 Detecting user status...');
                
                // Override console.log temporarily to capture the messages
                const originalLog = console.log;
                let isNewUserDetected = null;
                
                console.log = (...args) => {
                    originalLog(...args);
                    const message = args.join(' ');
                    
                    if (message.includes('No session found, creating anonymous session')) {
                        isNewUserDetected = true;
                    } else if (message.includes('User already exists')) {
                        isNewUserDetected = false;
                    }
                };
                
                // Call the auth function
                const authResult = await createAnonymousSession();
                
                // Restore original console.log
                console.log = originalLog;
                
                setUser(authResult);
                setIsNewUser(isNewUserDetected);
                
                console.log('🎯 User Detection Result:', {
                    userId: authResult.$id,
                    isNewUser: isNewUserDetected
                });
                
            } catch (error) {
                console.error('❌ User detection error:', error);
                setIsNewUser(false); // Default to returning user on error
            } finally {
                setLoading(false);
            }
        };

        detectUser();
    }, []);

    return { user, loading, isNewUser };
}; 