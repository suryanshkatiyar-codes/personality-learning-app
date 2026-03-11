const Groq = require('groq-sdk');

// Initialize Groq with API key from .env
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Learning style descriptions to make the prompt smarter
const personalityDescriptions = {
  VISUAL: "learns best through videos, diagrams, and visual content",
  READER: "learns best through documentation, articles, and books",
  KINESTHETIC: "learns best through hands-on projects and building things",
  SOCIAL: "learns best through community, pair programming, and mentorship"
};

async function generateRoadmap(personalityType, skill) {
  try {
    // Get the description for this personality type
    const learningStyle = personalityDescriptions[personalityType];

    // Build a smart prompt tailored to the user's learning style
    const prompt = `
      You are an expert learning coach.Generate a 28 - day structured learning roadmap for someone who wants to learn ${skill}.
      This person is a ${personalityType} learner who ${learningStyle}.

      Rules:
        - Exactly 28 days, one object per day
        - Each day has one focused topic and 3 - 5 actionable subtasks
        - Subtasks must be specific and actionable, not vague
        - Progress from beginner to advanced naturally across 28 days
        - Tailor tasks to a ${personalityType} learner's style

      Return ONLY a raw JSON array with no markdown, no explanation, no code fences:
        [
          {
            "day": 1,
            "topic": "Topic name here",
            "subtasks": [
              "Specific actionable task 1",
              "Specific actionable task 2",
              "Specific actionable task 3"
            ]
          }
        ]
    `;

    // Send the prompt to Groq
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free and powerful model
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 8192,
    });

    const text = response.choices[0].message.content;
    const clean = text.replace(/```json|```/g, "").trim();
    const roadmap = JSON.parse(clean);

    const structuredRoadmap = roadmap.map(day => ({
      ...day,
      subtasks: day.subtasks.map(task => ({
        task: task,
        completed: false
      }))
    }));

    return structuredRoadmap;

  } catch (err) {
    throw new Error("Failed to generate roadmap: " + err.message);
  }
}

async function recommendedRoadmap(personalityType, skill) {
  try {

    // Build a smart prompt tailored to the user's learning style
    const prompt = `
      A user with ${personalityType} learning style has just completed learning ${skill}.
      Suggest 3 popular and trending skills they should learn next.
      Return ONLY a JSON array, no markdown, no explanation, just raw JSON like this:
      [
        {
          "skill": "skill name",
          "whatItDoes": "brief description of what it is",
          "whyLearn": "why this is a good next step"
        }
      ]
    `;

    // Send the prompt to Groq
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free and powerful model
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1024,
    });

    // Extract the text from Groq's response
    const text = response.choices[0].message.content;
    const clean = text.replace(/```json|```/g, "").trim();
    const recommendations = JSON.parse(clean);

    return recommendations;

  } catch (err) {
    throw new Error("Failed to generate roadmap: " + err.message);
  }
}

module.exports = { generateRoadmap, recommendedRoadmap };