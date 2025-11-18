// lib/airtable.js
import Airtable from "airtable";

export function getAirtableBase() {
  // TO DO replace this with different access tokens 

  // TODO replace this temporarily with the old airtable consent base creds 
  const token = process.env.CONSENT_PERSONAL_ACCESS_TOKEN;
  const baseId = process.env.CONSENT_BASE_ID;

  if (!token) throw new Error("Missing CONSENT_PERSONAL_ACCESS_TOKEN");
  if (!baseId) throw new Error("Missing CONSENT_BASE_ID");

  return new Airtable({ apiKey: token }).base(baseId);
}