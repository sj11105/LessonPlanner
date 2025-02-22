This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


# Lesson Planner

This project generates lesson planner using Gemini Api which is used by teachers or educators to help them plan their lesson by  providing some inputs about the topic and subject .
## API Reference
How I Integrated the Gemini API
I have integrated Google's Gemini API to generate lesson plans based on user inputs (topic, grade level, subject, etc.).
The integration consists of the following steps:

1️⃣ Obtain an API Key

Go to Google AI Studio
Generate an API key for Gemini
Add it to .env.local in the project
2️⃣ Set Up API Request in GeminiAPI.ts

We make an API request to Gemini using fetch
We send a structured prompt with user inputs
We receive AI-generated content in response
3️⃣ Use API Response in the App

The response is stored in the component state
The lesson plan is displayed in the UI
The user can edit and download it as a PDF


#### Get Generated Plan

 Generate a detailed lesson plan in the following format:

    **Lesson Plan**
    **Topic:** ${formData.topic}
    **Subject:** ${formData.subject}
    **Grade Level:** ${formData.grade}
    **Materials Needed:** [List of Materials]
    **Learning Objectives:** [Objectives]

    **Lesson Outline:**
    | Duration | Activity | Notes |
    |----------|---------|-------|
    | xx mins  | Springboard Activity | [Details] |
    | xx mins  | Discussion | [Details] |



## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/lesson-plan-generator.git
cd lesson-plan-generator

 Install Dependencies
 npm install

 Set Up Environment Variables
 NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

Run the Development Server
npm run dev
You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


