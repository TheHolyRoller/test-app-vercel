
import { NextResponse } from "next/server";





export async function POST(req){



    try{


        // Now extract the user identification and consent status variables from the request 

        const body = await req.json(); 
        console.log('this is the body of the request \n', body); 

        // Now extract the rest of the variables through object destructuring 

        



    return NextResponse.json({message: 'successfully saved consent status to airtable database!'}, {status: 200}); 

    }
    catch(error){


        console.error('could not save consent status to airtable database', error); 
        return NextResponse.json({message: 'could not save consent status to airtable db'}, {status: 500}); 


    }



} 





















  // TODO Refactor this to be called after the init ulid route is called 
  // try {
  //   airtableResp = await base("Consent").create([{ fields }]);
  // } catch (error) {
  //   console.error("Airtable create error:", error);
  //   return NextResponse.json(
  //     { message: "Failed to save Airtable record" },
  //     { status: 500 }
  //   );
  // }