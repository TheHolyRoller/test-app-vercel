// lib/airtable.js
import Airtable from "airtable";

export function getAirtableBase() {
  // TO DO replace this with different access tokens 

  const token = process.env.IVVI_SUPPORT_AIRTABLE_PA_TOKEN;
  const baseId = process.env.IVVI_SUPPORT_CONSENT_BASE_ID;

  if (!token) throw new Error("Missing CONSENT_PERSONAL_ACCESS_TOKEN");
  if (!baseId) throw new Error("Missing CONSENT_BASE_ID");

  return new Airtable({ apiKey: token }).base(baseId);
}
