import { NextResponse } from "next/server";
import { ulid } from "ulid";
import Airtable from "airtable";
import axios from "axios";

// Utility function to update Kajabi email list
const updateKajabiEmailList = async (email) => {
  if (!email) return null;

  try {
    const response = await axios.post("/api/kajabi_email_update", { email });
    console.log("Kajabi update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Kajabi update API error:", error.response?.data || error.message);
    throw new Error("Failed to update Kajabi email");
  }
};

export async function POST(req) {
  console.log("Incoming request to /api/fetchip");

  let body;
  let subscribed = false;
  let global_ULID;
  let airtableResp;

  try {
    body = await req.json();
    console.log("Parsed request body:", body);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const {
    answers,
    email,
    name,
    resultChecked,
    checked,
    score,
    memoryScore,
    writingScore,
    readingScore,
    examResultsScore,
    organisationalScore,
    ageRange: userAge,
  } = body;

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  if (checked) subscribed = true;

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim() ?? "IP not found";

  console.log("Client IP:", ip);

  // Airtable setup
  const ACCESS_TOKEN = process.env.IVVI_SUPPORT_AIRTABLE_PA_TOKEN;
  const BASE_ID = process.env.IVVI_SUPPORT_CONSENT_BASE_ID;
  const base = new Airtable({ apiKey: ACCESS_TOKEN }).base(BASE_ID);

  // Generate or fetch ULID
  try {
    const ulidResponse = await fetch("/api/init_ulid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await ulidResponse.json();
    global_ULID = data?.payload?.user_ulid || ulid(); // fallback to new ULID
    console.log("Generated/fetched ULID:", global_ULID);
  } catch (error) {
    console.error("Error generating ULID:", error);
    return NextResponse.json({ message: "Could not generate ULID" }, { status: 500 });
  }

  // Capture consent and optionally update Kajabi
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

    // TODO This should be added back in after soft launch 
    // if (subscribed) {
    //   try {
    //     const kajabiResponse = await updateKajabiEmailList(email);
    //     console.log("Kajabi update response:", kajabiResponse);
    //   } catch (error) {
    //     console.error("Could not update Kajabi:", error);
    //   }
    // }
    

    // Save consent status to Airtable
    const airtableResponse = await fetch("/api/capture_consent_status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consentPayload }),
    });
    airtableResp = await airtableResponse.json();
    console.log("Consent capture response:", airtableResp);
  } catch (error) {
    console.error("Failed to capture consent:", error);
  }

  // Save results if resultChecked
  if (resultChecked) {
    try {
      const resultPayload = {
        answers,
        ageRange: userAge,
        score,
        readingScore,
        writingScore,
        memoryScore,
        examResultsScore,
        organisationalScore,
      };

      const resultResponse = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultPayload }),
      });

      console.log("Results saved response:", await resultResponse.json());
    } catch (error) {
      console.error("Could not save results:", error);
      return NextResponse.json({ message: "Could not save results to Airtable" }, { status: 500 });
    }
  }

  return NextResponse.json(
    {
      message: "Successfully saved consent + IP",
      ip,
      global_ULID,
      airtableRecord: airtableResp,
    },
    { status: 200 }
  );
}
