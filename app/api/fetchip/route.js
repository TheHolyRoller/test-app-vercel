import { NextResponse } from "next/server";
import { ulid } from "ulid";
import Airtable from "airtable";
import axios from "axios";

// Helper to get the base URL for internal API calls
const getBaseUrl = (req) => {
  return 'http://localhost:3000';
};

export async function POST(req) {
  console.log("🚀 Incoming request to /api/fetchip");
  console.log("Environment:", process.env.VERCEL_ENV || 'development');

  let body;
  let subscribed = false;
  let global_ULID;
  let airtableResp;

  // Get base URL (empty in production for relative URLs)
  const baseUrl = process.env.BASE_URL_PRODUCTION; 

  console.log("Using baseUrl:", baseUrl || '(relative)');
  console.log('this is the base url \n', baseUrl); 

  console.log('this is the type of base ULR \n', typeof baseUrl); 


  try {
    body = await req.json();
    console.log("📦 Parsed request body keys:", Object.keys(body));
  } catch (error) {
    console.error("❌ Failed to parse JSON:", error);
    return NextResponse.json({ 
      message: "Invalid JSON body",
      error: error.message 
    }, { status: 400 });
  }

  // Extract fields with defaults
  const {
    answers = [],
    email,
    name,
    resultChecked = false,
    checked = false,
    score = 0,
    memoryScore = 0,
    writingScore = 0,
    readingScore = 0,
    examResultsScore = 0,
    organisationalScore = 0,
    ageRange = 'unknown',
  } = body;

  // Validate required fields
  if (!email) {
    console.error("❌ Validation error: Email is required");
    return NextResponse.json({ 
      message: "Email is required",
      received: { email, name }
    }, { status: 400 });
  }

  if (!name) {
    console.error("❌ Validation error: Name is required");
    return NextResponse.json({ 
      message: "Name is required",
      received: { email, name }
    }, { status: 400 });
  } 


  // Set subscription status
  if (checked) subscribed = true;

  // Get client IP
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim() ?? "IP not found";
  console.log("🌐 Client IP:", ip);
  console.log('this is the type of the IP \n', typeof ip);  

  // Validate environment variables
  const ACCESS_TOKEN = process.env.IVVI_SUPPORT_AIRTABLE_PA_TOKEN;
  const BASE_ID = process.env.IVVI_SUPPORT_CONSENT_BASE_ID;

  if (!ACCESS_TOKEN || !BASE_ID) {
    console.error("❌ Missing Airtable credentials:", { 
      hasToken: !!ACCESS_TOKEN, 
      hasBaseId: !!BASE_ID 
    });
    return NextResponse.json({ 
      message: "Server configuration error: Missing Airtable credentials" 
    }, { status: 500 });
  }

  const base = new Airtable({ apiKey: ACCESS_TOKEN }).base(BASE_ID);

  // Generate or fetch ULID
  try {
    console.log(`🔑 Fetching ULID for email: ${email}`);
    
    const ulidResponse = await fetch(`${baseUrl}/api/init_ulid`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // Forward important headers for internal requests
        ...(req.headers.get("x-forwarded-for") && {
          "x-forwarded-for": req.headers.get("x-forwarded-for")
        })
      },
      body: JSON.stringify({ email }),
    });

    console.log('this is the response from init ULID \n', ulidResponse); 

    if (!ulidResponse.ok) {
      const errorText = await ulidResponse.text();
      console.error(`❌ ULID API error: ${ulidResponse.status}`, errorText);
      throw new Error(`ULID API returned ${ulidResponse.status}`);
    }

    const data = await ulidResponse.json();
    global_ULID = data?.payload?.user_ulid || ulid();
    console.log("✅ Generated/fetched ULID:", global_ULID);
  } catch (error) {
    console.error("❌ Error generating ULID:", error.message);
    // Generate fallback ULID instead of failing
    global_ULID = ulid();
    console.log("⚠️ Using fallback ULID:", global_ULID);
  }

  // Capture consent
  try {
    const consentPayload = {
      user_id: global_ULID,
      name,
      email,
      IP_ADDRESS: ip,
      result_consent: JSON.stringify(resultChecked),
      email_consent: JSON.stringify(checked),
      subscribed: JSON.stringify(subscribed),
    };

    console.log("📝 Consent payload prepared");

    // Save consent status to Airtable
    const airtableResponse = await fetch(`${baseUrl}/api/capture_consent_status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consentPayload }),
    });

    if (!airtableResponse.ok) {
      const errorText = await airtableResponse.text();
      console.error(`❌ Consent API error: ${airtableResponse.status}`, errorText);
      throw new Error(`Consent API returned ${airtableResponse.status}: ${errorText}`);
    }

    airtableResp = await airtableResponse.json();
    console.log("✅ Consent captured successfully");
  } catch (error) {
    console.error("❌ Failed to capture consent:", error.message);
    return NextResponse.json({ 
      message: "Failed to save consent",
      error: error.message,
      details: error.stack 
    }, { status: 500 });
  }

  // Save results if resultChecked
  if (resultChecked) {
    try {
      const resultPayload = {
        user_id: global_ULID,
        answers,
        ageRange,
        score,
        readingScore,
        writingScore,
        memoryScore,
        examResultsScore,
        organisationalScore,
      };
      

      console.log("💾 Saving results...");

      const resultResponse = await fetch(`${baseUrl}/api/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultPayload }),
      });

      if (!resultResponse.ok) {
        const errorText = await resultResponse.text();
        console.error(`❌ Create API error: ${resultResponse.status}`, errorText);
        throw new Error(`Create API returned ${resultResponse.status}: ${errorText}`);
      }

      const resultData = await resultResponse.json();
      console.log("✅ Results saved successfully");
    } catch (error) {
      console.error("❌ Could not save results:", error.message);
      // Log error but don't fail the entire request
      console.warn("⚠️ Continuing despite results save failure");
    }
  } else {
    console.log("ℹ️ Skipping results save (resultChecked = false)");
  }

  return NextResponse.json(
    {
      success: true,
      message: "Successfully saved consent + IP",
      ip,
      global_ULID,
      airtableRecord: airtableResp,
    },
    { status: 200 }
  );
}