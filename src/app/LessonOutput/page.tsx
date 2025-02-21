"use client";
export interface LessonOutputProps {
  content: string;
}

export default function LessonOutput({ content }: LessonOutputProps) {
  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center">Lesson Plan</h2>

      <div
        id="lesson-content"
        className="bg-gray-100 p-3 rounded-md whitespace-pre-line"
      >
        {content ? content : "No lesson generated yet."}
      </div>
    </div>
  );
}
