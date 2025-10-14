
// import the airtable personal access token here 
import { NextResponse } from "next/server";
import axios from 'axios'; 
import EmailPermission from "@/app/Components/StartCard";
import { rejects } from "assert";
const Airtable = require('airtable'); 


const ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN; 
const BASE_ID = process.env.BASE_ID;
// const TABLE_ID = process.env.TABLE_ID; 

const chuckData = async (array, chunkSize) => {

    console.log('this is the chunk Data function'); 
    console.log('this is the chunk size \n', chunkSize); 
    console.log("this is the input array \n", array); 

    const chunks = [];  

    console.log('this is the empty chunks array \n', chunks); 

    // Look through the array here 




    for(let i = 0; i < array.length; i += chunkSize){

        chunks.push(array.slice(i,  i + chunkSize)); 
        console.log('this is the slide being pushed to the chunks array \n', chunks); 


    }

    // Might need to add a timeout primise here 
    

    console.log('this is the chunks array after interating through the input array \n', chunks); 
    console.log('these are the fields in the chunked object \n', chunks?.fields ?? "No fields accessible!!"); 

    return chunks;

}



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

        const formattedData = await quizAnswers.map(item => ({

            fields: {

                Question_ID: item.question_id, 
                Question_Text: item.question_text, 
                Answer: item.answer, 
                User_Name: name, 
                User_Email: email

            }

        }) ); 


        console.log('this is the formatted data \n', formattedData); 

        const chunkedData = await chuckData(formattedData, 10); 
        console.log('this is the chunked Data \n', chunkedData); 


        // Loop through the chunked data here 

        for(const chunk of chunkedData){

            console.log("this is the current chunk \n", chunk); 

            // Now create the promise that will run and pass in a resolve reject object to it 
                await new Promise((resolve, reject) => {
                base("Table 1").create(chunk, function(err, response) {
                    if(err){
                        return reject(err);  // properly reject the promise
                    }
                    resolve(response); // resolves after Airtable finishes
                });
            });




        }




        const slicedData = await formattedData.slice(0, 8); 



        // replace formatted data with the chucked data 
        // base('Table 1').create(slicedData, function(err, records) {
        //     if (err) {
        //         console.error('Error creating records in Airtable:', err);
        //         return;
        //     }

        //     records.forEach(function(record) {
        //         console.log('Created record with ID:', record.getId());
        //     });
        //     });





        return NextResponse.json({message: "Data received successfull", status: 200}); 

    }
    catch(error){

        console.error("Could not create record in airtable \n", error); 

        return NextResponse.json({message: "Could not read data properly"}, {status: 500}); 


    }

}
