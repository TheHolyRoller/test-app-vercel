'use client'
// Import the context hook to access state variables
import { useQuiz } from '../context/QuizContext';
import { useRouter } from 'next/router';    



    export const useColorNav = () => {
    const { cardType, cardSection } = useQuiz();
    const router = useRouter(); 




    console.log('this is the color Nav module:::');
    console.log('cardType from context:', cardType);
    console.log('cardSection from context:', cardSection);

    let color;

    // Check if we're on the quiz page first
    if (router.pathname === '/quiz') {
        console.log('this is the quiz page in the color nav module');

        if (cardType === 'Question') {
            // color = colorQuestion(); 
            console.log('this is the color after calling color question function \n', color); 
            console.log('this is the returned color value in color nav module \n', color); 
            return color;
        } else {
            // color = colorCategory(); 
            console.log('this is the color category value in the else statement after calling color category function \n', color); 
            console.log('this is the color value in else in nav mod', color); 
            return color;
        }
    } else {
        // Not on quiz page - return default blue color
        console.log('this is NOT the quiz page - returning default blue color');
        color = '#809acc'; 
        console.log('this is the color in color nav module \n', color); 
        return color;
    }
};

    const colorCategory = () => {
    console.log('this is the color category function');

    const colorMap = { 
        reading: '#5EA772',
        writing: '#3B73A6', 
        memory: '#B3631C', 
        tests: '#BC990B', 
        plans: '#B53C31'
    };


    const key = cardSection.toLowerCase(); 
    console.log('this is the category key \n', key); 
    console.log('this is the returned value in color category \n', colorMap[key]); 

    return colorMap[key] || '#809ACC'; 
};

// Pass in the type and section variables here 
const colorQuestion = () => {
    console.log('this is the color question function'); 

    const colorMap = {
        reading: "#78D591",
        writing: "#4D95D5",
        memory: "#E77E22",
        tests: "#F3C70E",
        plans: "#CB3E32",
    };

    console.log('this is the color map \n', colorMap); 

    const key = cardSection.toLowerCase(); 
    console.log('this is the key \n', key); 
    console.log('this is the returned value in color question \n', colorMap[key]); 

    return colorMap[key] || '#809ACC';
};   