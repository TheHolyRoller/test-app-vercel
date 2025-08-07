
// Import the context Type and Section variables 
import { cardType, cardSection} from '../context/QuizContext'; 

// Okay so now create a function that can check for both type and section and if they are not defined fall back on them

export const colorNav = () => {

let color; 

if(!cardType && ! cardSection){

    color = 



}








}


// Add in each of the functions to color in the sections
// Pass in the type and section variables here 
const colorCategory = () => {

    let color; 






    return color; 

}

// Pass in the type and section variables here 
const colorQuestion = () => {

    let color; 





    return color; 

}