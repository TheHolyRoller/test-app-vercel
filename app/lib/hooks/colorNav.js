
// Import the context Type and Section variables 
import { cardType, cardSection} from '../context/QuizContext'; 
import { useState, useEffect } from 'react';
// Okay so now create a function that can check for both type and section and if they are not defined fall back on them

export const colorNav = async () => {


const [navColor, setNavColor] = useState(); 

let color; 

if(!cardType && ! cardSection){

    color = '#809ACC'; 


}
else {



    // Check the Card Type here 

    if(cardType == 'Question'){

        // Now call color question function here 
        color = colorQuestion(); 
        console.log('this is the color after calling color question function \n', color); 

        // Add in a timeout function here 


        // return the set color variable here 
        return color; 



    }

    else{


        // Call the color category card function here 
        color = await colorCategory(); 
        console.log('this is the color category value in the else statement after calling color category funciont \n', color); 

        // Add in a timeout function here 
        setTimeout(() => {
            console.log('timeout function waiting for other function calls'); 
          }, 200);

        return color; 

    }
}

}


// Add in each of the functions to color in the sections
// Pass in the type and section variables here 
const colorCategory = () => {


    const colorMap = { 

        reading: '#5EA772',
        writing: '#3B73A6', 
        memory: '#B3631C', 
        tests: '#BC990B', 
        plans: '#B53C31'
    }

    const key = cardSection.toLowerCase(); 

    return colorMap[key] || '#FFFFF'; 


}

// Pass in the type and section variables here 
const colorQuestion = () => {

            const colorMap = {
                reading: "#78D591",
                writing: "#4D95D5",
                memory: "#E77E22",
                tests: "#F3C70E",
                plans: "#CB3E32",
              };

              const key = cardSection.toLowerCase(); 
              

              return colorMap[key] || '#FFFFFF';


}   