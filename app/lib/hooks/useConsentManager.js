'use client';

import { useState, useEffect, useReducer } from "react";    
import axios from "axios";

export const ACTIONS = {
  TOGGLE_EMAIL: "TOGGLE_EMAIL_CONSENT",
  TOGGLE_RESULTS: "TOGGLE_QUIZ_CONSENT",
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  SAVE_START: "SAVE_START",
  SAVE_BASELINE: "SAVE_BASELINE",
  SAVE_ERROR: "SAVE_ERROR",
};

const reducer = (state, action) => {
    switch(action.type){
        case(ACTIONS.TOGGLE_EMAIL): 
            return {...state, emailConsent: !state.emailConsent }
        
        case(ACTIONS.TOGGLE_RESULTS): 
            return {...state, resultConsent: !state.resultConsent}

        case(ACTIONS.FETCH_START): 
            return {...state, loading: true, error: null}

        case(ACTIONS.FETCH_SUCCESS): 
            return {...state, loading: false,
                resultConsent: action.payload.data.result_consent,
                emailConsent: action.payload.data.email_consent,
                baseline: {
                    resultConsent: action.payload.data.result_consent,
                    emailConsent: action.payload.data.email_consent,
                }, 
                error: null}; 

        case(ACTIONS.FETCH_ERROR): 
            return {...state, loading: false, error: action.payload}; 

        case(ACTIONS.SAVE_START): 
            return {...state, saving: true, error: null}

        case(ACTIONS.SAVE_BASELINE): 
            return {...state, saving: false, baseline: {
                resultConsent: state.resultConsent,     
                emailConsent: state.emailConsent
            }}

        case(ACTIONS.SAVE_ERROR): 
            return {...state, saving: false, error: action.payload }; 

        default: 
            return state; 
    }
}

export default function useConsentManager(){
    // Parse cookies IMMEDIATELY - before any hooks
    let user = null;
    let result_consent = false;
    let email_consent = false;

    // This runs synchronously during render (not in useEffect)
    if (typeof document !== 'undefined') {
        const cookieMap = Object.fromEntries(
            document.cookie.split("; ").map((c) => c.split("="))
        );

        console.log('this is the cookie map \n', cookieMap);

        if (cookieMap.user) {
            try {
                const decodedUser = decodeURIComponent(decodeURIComponent(cookieMap.user));
                console.log('this is the decoded user \n', decodedUser);
                
                const cleaned = decodedUser.replace(/^"|"$/g, "");
                console.log('this is the cleaned element \n', cleaned);
                
                user = JSON.parse(cleaned);
                console.log('this is the user \n', user);

                // Extract the consent values
                result_consent = user.resultConsent || false;
                email_consent = user.emailConsent || false;

                console.log('extracted consent values:', result_consent, email_consent);

            } catch (err) {
                console.error("Failed to parse cookie:", err);
            }
        }

        if (!user) {
            console.log('NO USER FOUND!!');
        }
    }

    // NOW create initialState with the extracted values
    const initialState = {
        resultConsent: result_consent,
        emailConsent: email_consent,
        baseline: {
            resultConsent: result_consent,
            emailConsent: email_consent
        },
        loading: false,
        error: null,
        saving: false,
    };

    console.log('this is the initial state \n', initialState);

    // Initialize useReducer with properly set initialState
    const [state, dispatch] = useReducer(reducer, initialState);

    // This useEffect can stay for any async fetching if needed
    useEffect(() => {
        const fetchConsent = async () => {
            dispatch({type: ACTIONS.FETCH_START});
            
            try {
                // If you need to fetch from an API, do it here
                // For now, just use the cookie data
                dispatch({
                    type: ACTIONS.FETCH_SUCCESS, 
                    payload: { 
                        data: {
                            result_consent: result_consent,
                            email_consent: email_consent
                        }
                    }
                });
            } catch(error) {
                console.error('could not fetch consent \n', error);
                dispatch({type: ACTIONS.FETCH_ERROR, payload: error});
            }
        };

        
        fetchConsent();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isDirty = state.resultConsent !== state.baseline.resultConsent || 
                    state.emailConsent !== state.baseline.emailConsent;

    console.log('this is the is dirty flag \n', isDirty);

    const isDirtyAndFalse = isDirty && (!state.emailConsent || !state.resultConsent);
    console.log('this is the is dirty and false flag \n', isDirtyAndFalse);

    return { state, dispatch, isDirty, isDirtyAndFalse };
}