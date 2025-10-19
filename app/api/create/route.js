
// import the airtable personal access token here 
import { NextResponse } from "next/server";
import axios from 'axios'; 
import EmailPermission from "@/app/Components/StartCard";
import { rejects } from "assert";
import { an } from "@upstash/redis/zmscore-CgRD7oFR";
const Airtable = require('airtable'); 


const ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN; 
const BASE_ID = process.env.BASE_ID;
// const TABLE_ID = process.env.TABLE_ID; 


export async function POST(req){
    
    try{


        const base = new Airtable({apiKey: ACCESS_TOKEN}).base(BASE_ID); 


        console.log("this is the request object \n", req);

        const body = await req.json(); 

        console.log('this is the body of the request \n', body); 


        const name = await body[body.length -2]; 

        console.log('this is the name \n', name); 
        
        const email = await body[body.length -1]; 
        console.log('this is the email \n', email); 

        const quizAnswers = await body.slice(0, body.length -2); 

        console.log('these are the quiz answers with the last two records sliced out \n', quizAnswers); 

        const fields = {

                User_Name: name, 
                User_Email: email



        }

        // format the question key here 

        quizAnswers.forEach((item, index) => {


            const key = `Q${index + 1}`; 
            console.log('this is the field key \n', key); 

            const questionText = item.questionText; 
            console.log('this is the question text \n', questionText); 

            const answer = item.quetionAnswer; 
            console.log("this is the question answer \n", answer); 
            console.log('this is the extracted answer \n', item.quetionAnswer); 


            fields[key] = `${questionText}: ${answer}`; 
            console.log('this is the fields key \n', fields[key]); 




        }); 

        console.log('these are the fields \n', fields); 


        // await base(("Table 1").create([{fields}])); 




        


        return NextResponse.json({message: "Data received successfull", status: 200}); 

    }
    catch(error){

        console.error("Could not create record in airtable \n", error); 

        return NextResponse.json({message: "Could not read data properly"}, {status: 500}); 


    }

}
