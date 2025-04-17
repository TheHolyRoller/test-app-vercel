'use client';

// Configure the client, database and account here 
// Configure the client first and then use that to configure the account and database 

// import them from appwrite here 

import { Client, Databases, Account } from 'appwrite'; 
// IMPORT THE CREDS HERE USING VITE AND THE .ENV PAGAGE 
const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID; 

if (!projectID) {
  throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined');
}

// Create the client instance here 

const client = new Client(); 

client.setEndpoint("https://cloud.appwrite.io/v1")
.setProject(projectID); 


export const account = new Account(client); 
console.log('this is the client object \n', client); 

export const databases = new Databases(client); 

// Optional: Add a function to verify the connection
export const verifyConnection = async () => {
  try {
    const response = await account.get();
    return response;
  } catch (error) {
    console.error('Appwrite connection error:', error);
    throw error;
  }
};