import { NextResponse } from "next/server";
import axios from "axios";

// Environment variables
const KAJABI_SECRET = process.env.KAJABI_API_SECRET;
const KAJABI_API_KEY = process.env.KAJABI_API_KEY;
const KAJABI_SITE_ID = process.env.KAJABI_SITE_ID; // your site ID
const BASE_URL = process.env.KAJABI_BASE_URL; // e.g., https://api.kajabi.com/v1

// Utility function to get Kajabi access token
const getAccessToken = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/oauth/token`, {
        grant_type: 'client_credentials',
        client_id: KAJABI_API_KEY,
        client_secret: KAJABI_SECRET
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (!response.data.access_token) {
        throw new Error("Could not retrieve access token from Kajabi");
      }
  
      return response.data.access_token;
    } catch (error) {
      console.error("Error getting access token:", error.response?.data || error.message);
      throw new Error("Failed to get Kajabi access token");
    }
  };
  

// App Router POST API Route
export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required in request body" },
        { status: 400 }
      );
    }

    // Build the payload for Kajabi contacts
    const payload = {
      data: {
        type: "contacts",
        attributes: {
          email: email,
        },
        relationships: {
          site: {
            data: {
              type: "sites",
              id: KAJABI_SITE_ID,
            },
          },
        },
      },
    };

    console.log("this is the payload in kajabi route \n", payload); 

    // Get access token
    const token = await getAccessToken();

    console.log('this is the access token \n ', token); 


    // Call Kajabi API
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json", // JSON:API format
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return NextResponse.json(
      { message: "Updated the Kajabi email contact list", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Could not update Kajabi email list:", error);
    return NextResponse.json(
      { message: "Could not update Kajabi email list", error: error.message },
      { status: 500 }
    );
  }
}
