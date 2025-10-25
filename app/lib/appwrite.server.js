import {Client, Databases, ID } from 'node-appwrite'; 


export function getDatabases() {
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const project = process.env.APPWRITE_PROJECT_ID;

  if (!endpoint || !project) {
    throw new Error("Missing Appwrite environment variables");
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project);

  return new Databases(client);
}

export { ID };

