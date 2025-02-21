import axios from "axios";

const GEMINI_API_KEY = "AIzaSyCl4oFBbckrlSYdPeye1t6qTERmEin_5Wc";

export async function fetchLessonPlan(formData: {
  topic: string;
  subject: string;
  grade: string;
}) {
  try {
    const requestBody = {
      model: "gemini-pro",
      contents: [
        {
          parts: [
            {
              text: `
📚 **LESSON PLAN**  

📝 **Topic:** ${formData.topic}  
____________________________________________________________________________________________________
📅 **Date:** [Insert Date]| 
📖 **Subject:** ${formData.subject}|  
🎓 **Grade Level:** ${formData.grade}| 
📌 **Main Topic or Unit:** [Main topic of the lesson]| 
🔍 **Subtopics or Key Concepts:** [List relevant subtopics]|
_____________________________________________________________________
---

### 📦 **Materials Needed**
✅ Any objects for demonstrating concepts or conducting a classroom activity  
✅ Reference books or online materials  
✅ Additional materials as needed  

### 🎯 **Learning Objectives**
- Identify at least two outcomes for students  
- Apply Bloom's Taxonomy to include a mix of lower and higher-order thinking skills  

---


### 📑 **Lesson Outline**
|⏳Duration|      📌 Activity               |         ✍ Remarks           |
|----------|---------------------------------|-------------------------------|
| xx mins  | Springboard question/activity   | Add reminders or prompts here |
| xx mins  | Introduction to new topic or continuation of previous lesson |  |
| xx mins  | Review of previous concepts     |                               |
| xx mins  | Main Discussion                 |                               |
| xx mins  | Guided or Independent Activities|                               |
| xx mins  | Assessment or Evaluation        |                               |
| xx mins  | Other Activities                |                               |

---

### 📝 **Notes**
🟢 Pre-lesson reminders  
🟢 Post-discussion observations  
🟢 Adjustments for the next lesson  
              `,
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Full API Response:", response.data);
    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI."
    );
  } catch (error: any) {
    console.error(
      "Error fetching lesson plan:",
      error.response?.data || error.message
    );
    return `❌ API Error: ${
      error.response?.data?.error?.message || "Unknown error occurred."
    }`;
  }
}
