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

let initialState; 

/**

Okay so let's just talk things through. 

First of all I need follow the flow of data and workout how I can pipe it down to where it's needed. 

Next I need to workout when the state is being queried. 

This is an excellent use case for a debugger. 

So I'll setup and use a debugger. 

Next I'll work on adding in some sort of tracing and something that can help me monitor what happens and when it happens. 

Then I'll put it all together. 
















*/











// Create the useReducer update function here 
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

    let user = null; 
    let result_consent; 
    let email_consent; 
    let user_name;
    let user_email; 

    


    // Add in the useEffect hook here 
useEffect(() => {

// Query the user from cookies here 
const cookieMap = Object.fromEntries(
    document.cookie.split("; ").map((c) => c.split("="))
); 

        console.log('this is the cookie map \n', cookieMap);

if (cookieMap.user) {
    try {
    //   const decodedUser = decodeURIComponent(cookieMap.user);
        const decodedUser = decodeURIComponent(decodeURIComponent(cookieMap.user));

      console.log('this is the decoded user \n', decodedUser); 
      console.log('this is the type of decoded user \n', typeof decodedUser); 
  
      // Remove surrounding quotes if present (sometimes added accidentally)
      const cleaned = decodedUser.replace(/^"|"$/g, "");

      console.log('this is the cleaned element \n', cleaned); 

  
      user = JSON.parse(cleaned);
      console.log('this is the user \n', user); 
      console.log('this is the type of user \n', typeof user); 

      const {name, email, resultConsent, emailConsent } = user; 

      console.log('this is the name, email, result & email consent extracted from the user with object destructuring \n', name, email, resultConsent, emailConsent); 


    //   Set the intial state variables to these extracted variables 

    result_consent = resultConsent; 
    email_consent = emailConsent; 


    console.log('this is now the initial state \n', initialState); 

    console.log('these are the new values of the initial state variables \n', result_consent, email_consent); 

     debugger;  
     
     initialState = {

        // TODO Set to variables extracted from cookies 
    // Instead of false fill it in with the extracted variables w
            resultConsent: false, 
        emailConsent: false, 
    
        baseline: {
            resultConsent: result_consent || false, 
            emailConsent: email_consent || false
        }, 
         loading: false,
         error: null,
         saving: false,
    
    }


            } catch (err) {
                console.error("Failed to parse cookie:", err);
            }
        }

        if (!user) {
            console.log('NO USER FOUND!!');
        }
    }

    // NOW create initialState with the extracted values
     initialState = {
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
            
            try{

            // Send over the initial set state as the payload instead 
            dispatch({type:ACTIONS.FETCH_SUCCESS, payload: initialState}); 

            }
            catch(error){


                console.error('could not save or update state \n', error); 
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