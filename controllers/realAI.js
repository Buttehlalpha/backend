import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🧠 LOCAL FALLBACK AI
const fallbackAI = (modules, sessions) => {
  if (!sessions || sessions.length === 0) {
    return "Start your first study session today 📚";
  }

  const total = sessions.length;

  if (total < 3) {
    return "You're just getting started — try studying 1–2 hours today.";
  }

  if (total < 6) {
    return `Good progress! Focus more on ${modules[0]} today.`;
  }

  return "You're on track 🚀 Keep your momentum!";
};

export const getAISuggestion = async (req, res) => {
  try {
    const { modules, sessions } = req.body;

    const prompt = `
You are a smart study planner.

Student modules: ${modules}
Study sessions: ${JSON.stringify(sessions)}

Give a short actionable suggestion.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return res.json({
      suggestion: response.choices[0].message.content,
    });

  } catch (err) {
    console.log("❌ OpenAI failed, using fallback");

    // ✅ USE FALLBACK
    const suggestion = fallbackAI(req.body.modules, req.body.sessions);

    return res.json({ suggestion });
  }
};