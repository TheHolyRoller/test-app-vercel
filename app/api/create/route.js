
// import the airtable personal access token here 
import { NextResponse } from "next/server";
import axios from 'axios'; 
import EmailPermission from "@/app/Components/StartCard";
import { rejects } from "assert";
const Airtable = require('airtable'); 


const ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN; 
const BASE_ID = process.env.BASE_ID;
// const TABLE_ID = process.env.TABLE_ID; 

export async function POST(req){

    
    console.log('this is the create route outside the try block'); 
    
    try{

        console.log('this is the create post request ')
        const base = new Airtable({apiKey: ACCESS_TOKEN}).base(BASE_ID); 
        console.log('this is the base from air table \n', base); 



        console.log("this is the request object \n", req);

            

                  const body = await req.json(); 
            console.log('this is the body of the request \n', body); 
          


            const {score, memoryScore, writingScore, readingScore, examResultsScore, organisationalScore, ageRange} = await body; 

            console.log("these are the score, memoryScore, writingScore, readingScore, examResultsScore, organisationalScore Score \n", score, memoryScore, writingScore, readingScore, examResultsScore, organisationalScore, ageRange); 
            console.log('this is the type of main score and reading score \n', typeof score, typeof readingScore, typeof writingScore, typeof memoryScore, typeof examResultsScore, typeof organisationalScore, typeof ageRange);
            console.log(`this is the age range in create route ${ageRange}`); 
            

        // const name = await body[body.length -2]; 
        const { name } = body; 
        const { email } = body; 
        const { answers } = body; 

        console.log('these are the quiz answers in the create route \n', answers); 
        console.log('this is the name \n', name); 
        console.log('this is the email \n', email); 
        console.log('these are the quiz answers with the last two records sliced out \n', answers); 



        const fields = {

                User_Name: name, 
                User_Email: email, 
                Main_Score: score, 
                Reading_Score: readingScore, 
                Writing_Score: writingScore, 
                Memory_Score: memoryScore, 
                Tests_Score: examResultsScore, 
                Organisational_Score: organisationalScore, 
                ageRange: ageRange

        }
        


        console.log('these are the initial fields \n', fields); 


        answers.forEach((item, index) => {
                const qNum = index + 1;
                fields[`Q${qNum}_Text`] = item.question_text;
                fields[`Q${qNum}_Answer`] = item.answer;

                });



        console.log('these are the fields \n', fields); 

        const response = await base("Table 1").create([{ fields }]);

        console.log('this is the resonse from the database server \n', response); 

        return NextResponse.json({message: `Data received successfull ${response}`}, {status: 200}); 

    }
    catch(error){

        console.error("Could not create record in airtable \n", error); 

        return NextResponse.json({message: "Could not read data properly"}, {status: 500}); 


    }

}
