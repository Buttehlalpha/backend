import axios from "axios";
import Task from "../models/Task.js";

export const generateTasks = async (assignment) => {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `
Break this assignment into daily tasks.

Title: ${assignment.title}
Deadline: ${assignment.deadline}

Return JSON:
[
  { "title": "...", "day": 1, "duration": 2 }
]
`
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  const tasks = JSON.parse(res.data.choices[0].message.content);

  for (let t of tasks) {
    await Task.create({
      userId: assignment.userId,
      assignmentId: assignment._id,
      title: t.title,
      duration: t.duration
    });
  }
};