import { ulid } from "ulid";


export const generateULID = async () => {

    const id = await ulid(); 
    console.log('this is uild generated in the utility function \n', id); 

    return id; 

}