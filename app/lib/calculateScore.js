'use client';

/* eslint-disable no-unused-vars */
/** 
 * Okay so let's just talk through this file. 
 * 
 * So this is used to calculate the final score. So it'll be called from the useEffect hook and the finalScore state variable will be passed in as the argument. 
 * 
 * 
 * Okay so that's what I'm going to do. 
 * 
 * Later on in this function I'll be passing through multiple final scores and I'll be calculating a compound score and then I'll be formulating a response and packaging up all the info to be sent to the results renderer which will use the information 
 * and pass it to the results renderer functional component to render the results to the UI. 
 * 
 * Okay so that's basically it so all I need to worry about now is creating the basic function and then later on passing it back to the front end. 
 * 
 * Okay so that's what I'll do. 
 * 
 */

// Import the dependencies here 
import { useEffect, useState, useReducer, useMemo, useNavigate } from 'react'; 
import { useRouter } from 'next/navigation';

/**
 * Calculates the final score and handles navigation to the results page
 * @param {number} finalScore - The final score to calculate
 * @param {function} [router] - Optional Next.js router instance for navigation
 * @returns {Promise<{score: number, percentage: string}>} - The calculated score and percentage
 */
export const calculateScore = async (finalScore, router) => {
  try {
    if (!finalScore && finalScore !== 0) {
      throw new Error('Final score is required');
    }

    // Calculate base score and percentage
    const baseTen = finalScore * 2;
    const percentage = `${baseTen}%`;

    // If router is provided, use it for navigation
    if (router) {
    //   await router.push(`/quiz/email-permissions?score=${finalScore}`);
    //   return { score: finalScore, percentage };
    }

    // Fallback to window.location if no router is provided
    const url = `/quiz/email-permissions?score=${finalScore}`;
    if (window.location.pathname !== url) {
    //   window.location.href = url;
    }

    return { score: finalScore, percentage };
  } catch (error) {
    console.error('Error calculating score:', error);
    throw error;
  }
};