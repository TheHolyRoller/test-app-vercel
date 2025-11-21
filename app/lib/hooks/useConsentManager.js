'use client';

import { useState, useEffect, useReducer } from "react";    
import axios from "axios";

export const ACTIONS = {
  TOGGLE_EMAIL: "TOGGLE_EMAIL_CONSENT",     // maps to your reducer case
  TOGGLE_RESULTS: "TOGGLE_QUIZ_CONSENT",   // maps to your reducer case
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  SAVE_START: "SAVE_START",
  SAVE_BASELINE: "SAVE_BASELINE",
  SAVE_ERROR: "SAVE_ERROR",
};

const initialState = {

    resultConsent: false, 
    emailConsent: false, 

    baseline: {
        resultConsent: false, 
        emailConsent: false
    }, 
     loading: false,
     error: null,
     saving: false,

}; 

// Create the useReducer update function here 
const reducer = (state, action) => {
    

    switch(action.type){

        case(ACTIONS.TOGGLE_EMAIL): 
        return {...state, emailConsent: !state.emailConsent }
        
        case(ACTIONS.TOGGLE_RESULTS): 
        return {...state, resultConsent: !state.resultConsent}


        case(ACTIONS.FETCH_START): 
            return {...state, loading: true, error: null}


            // Refactor this to 
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


    const [state, dispatch] = useReducer(reducer, initialState); 

    useEffect(() =>{


        const fetchConsent = async () => {


            // Call the fetch start dispatch here 
            dispatch({type: ACTIONS.FETCH_START}); 

            
            try{



                // TODO Refactor this to actually call the fetch consent api route 
                const response = {
            status: 200, // HTTP status code
            data: {
                message: "Latest consent record fetched successfully",
                data: {
                user_id: "rec123ABC",
                userName: "Emily Johnson",
                userEmail: "emily.johnson@example.com",
                IP_ADDRESS: "192.168.1.100",
                result_consent: true,
                email_consent: false,
                time_stamp: "2025-11-06T12:00:00Z",
                },
            },
            };

            // Call the reducer dispatch function indicating success
            dispatch({type:ACTIONS.FETCH_SUCCESS, payload: response.data}); 



            }
            catch(error){


                console.error('could not save or update state \n', error); 
                dispatch({type: ACTIONS.FETCH_ERROR, payload: error}); 

            }


        }

        fetchConsent(); 

    }, []); 





    // Return the state the dispatch and the isDirty flags here 


    
            const isDirty = state.resultConsent !== state.baseline.resultConsent || 

                state.emailConsent !== state.baseline.emailConsent; 

                console.log('this is the is dirty flag \n', isDirty); 


                const isDirtyAndFalse = isDirty && !state.emailConsent || !state.resultConsent; 
             console.log('this is the is dirty and false flag \n', isDirtyAndFalse); 


                return{ state, dispatch, isDirty, isDirtyAndFalse}; 




}


























