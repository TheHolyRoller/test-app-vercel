import {Client, Databases, ID } from 'node-appwrite'; 


const client = new Client().setEndpoint(process.env.APPWRITE_ENDPOINT).setProject(process.env.APPWRITE_PROJECT_ID).setKey(process.env.APPWRITE_API_KEY); 

console.log('this is the client component in the server appwrite setup \n', client); 

export const databases = new Databases(client); 

export { ID }; 
