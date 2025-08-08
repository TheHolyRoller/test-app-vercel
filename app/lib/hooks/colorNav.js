
// Import the context hook to access state variables
import { useQuiz } from '../context/QuizContext';

// Create a custom hook that returns the color based on current context
export const useColorNav = () => {
    const { cardType, cardSection } = useQuiz();
    
    console.log('this is the color Nav module:::');
    console.log('cardType from context:', cardType);
    console.log('cardSection from context:', cardSection);

    let color;

    if (!cardType && !cardSection) {
        // Find out why these values are undefined 
        console.log('this is the card type in the color Nav first function  \n', cardType); 
        console.log('this is the cardSection \n', cardSection); 

        color = '#809acc'; 
        console.log('this is the color in color nav module \n', color); 

        return color;
    } else {
        console.log('this is the else statement in the color nav module ');

        if (cardType == 'Question') {
            color = colorQuestion(); 
            console.log('this is the color after calling color question function \n', color); 
            console.log('this is the returned color value in color nav module \n', color); 

            return color;
        } else {
            color = colorCategory(); 
            console.log('this is the color category value in the else statement after calling color category function \n', color); 

            console.log('this is the color value in else in nav mod', color); 

            return color;
        }
    }
};

// Add in each of the functions to color in the sections
// Pass in the type and section variables here 
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

    return colorMap[key] || '#FFFFFF'; 
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

    return colorMap[key] || '#FFFFFF';
};   