"use client";
import { useState } from "react";
import { jsPDF } from "jspdf";
import { fetchLessonPlan } from "@/app/Geminiapi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LessonPlanForm() {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [lessonOutline, setLessonOutline] = useState("");
  const [error, setError] = useState("");
  const [lessonPlan, setLessonPlan] = useState("");
  const [editableLessonPlan, setEditableLessonPlan] = useState("");

  const handleGenerateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = {
      topic,
      grade,
      subject,
      materialsNeeded,
      learningObjectives,
      lessonOutline,
    };

    try {
      const result = await fetchLessonPlan(formData);
      if (result.startsWith("API Error:")) {
        setError(result);
      } else {
        setLessonPlan(result);
        setEditableLessonPlan(result);
      }
    } catch (err) {
      setError("An error occurred while generating the lesson plan.");
    }
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFont("helvetica", "normal");

    const content = `
      📚 Lesson Plan
      
      📝 Topic: ${topic}
      🎓 Grade Level: ${grade}
      📖 Main Concept & Subtopics: ${subject}
      📦 Materials Needed: ${materialsNeeded}
      🎯 Learning Objectives: ${learningObjectives}
      📝 Lesson Outline: ${lessonOutline}
      
      ------------------------------
      
      ${editableLessonPlan}
    `;

    const textContent: string = content.toString();

    const lines: string[] = pdf.splitTextToSize(textContent, 180);

    let y = 10;

    lines.forEach((line: string) => {
      if (y > 280) {
        pdf.addPage();
        y = 10;
      }

      pdf.text(line, 10, y);
      y += 7;
    });

    pdf.save("Lesson_Plan.pdf");
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-8 max-w-lg w-full bg-white border border-gray-300 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Lesson Plan Generator
        </h1>
        <form onSubmit={handleGenerateLesson}>
          <input
            type="text"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="p-3 w-full border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Grade Level"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            className="p-3 w-full border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Main Concept & Subtopics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="p-3 w-full border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Materials Needed"
            value={materialsNeeded}
            onChange={(e) => setMaterialsNeeded(e.target.value)}
            required
            className="p-3 w-full border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Learning Objectives"
            value={learningObjectives}
            onChange={(e) => setLearningObjectives(e.target.value)}
            required
            className="p-3 w-full border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Lesson Outline"
            value={lessonOutline}
            onChange={(e) => setLessonOutline(e.target.value)}
            required
            className="p-3 w-full border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Generate Lesson Plan
          </button>
        </form>
        {lessonPlan && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Generated Lesson Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full min-h-[400px] p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={editableLessonPlan}
                onChange={(e) => setEditableLessonPlan(e.target.value)}
                rows={12}
              />
              <button
                onClick={handleDownloadPDF}
                className="mt-4 w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Download PDF
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
