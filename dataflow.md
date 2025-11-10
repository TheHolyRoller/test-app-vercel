# 🧩 ivvi Dyslexia Screener 

> A free Dyslexia Screener

---

## 📘 1. Project Overview 
- Clear easy way of telling probability of dyslexia 
- Quiz questions
- Dyslexia probability calculation
- Not an official diagnosis 
- Appwrite as backend, Airtable for storage, Resend for emails & Vercel for hosting 

---

## 🔄 2. Data Flow

**User Data Flow:**
1. User visits website  
2. Goes through on boarding and takes screener quiz   
3. User responses are processed and scores are calculated 
4. User then sees results
5. Navigates to permissions page
6. Consents to storage & processing of results & email
7. Has results sent to email
8. Consent is officially recorded & stored in Airtable
9. Screener results are stored in Airtable
   

**Tip:**  
To include a flow diagram, you can add something like:
```mermaid
flowchart TD
    A[User] --> B[Frontend]
    B --> C[API Server]
    C --> D[Database]
    A --> B
    B --> C
    C --> D
    D --> B
    B --> A 
