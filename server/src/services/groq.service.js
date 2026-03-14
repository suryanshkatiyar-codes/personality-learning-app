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

    // revise it later
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

async function roadmapQuiz(skill, completedTopics) {
  try {
    const prompt = `
  You are an expert quiz generator.
  A user has been learning ${skill} and has completed the following topics: ${completedTopics.join(", ")}.
  
  Generate exactly ${completedTopics.length} quiz questions based ONLY on these topics.
  Mix between multiple choice (mcq) and true/false questions.
  
  Rules:
  - Base questions strictly on the provided topics only
  - For mcq: provide exactly 4 options
  - For truefalse: options must be exactly ["True", "False"]
  - Always include the correct answer in the answer field
  - Make questions specific and relevant, not vague
  
  Return ONLY a raw JSON array with no markdown, no explanation, no code fences:
  [
    {
      "question": "What is JSX in React?",
      "type": "mcq",
      "options": ["A way to write HTML in JS", "A database", "A CSS framework", "A testing tool"],
      "answer": "A way to write HTML in JS"
    },
    {
      "question": "React uses a virtual DOM",
      "type": "truefalse",
      "options": ["True", "False"],
      "answer": "True"
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
      max_tokens: 4096,
    });

    const text = response.choices[0].message.content;
    const clean = text.replace(/```json|```/g, "").trim();
    const quiz = JSON.parse(clean);

    return quiz;
  } catch (err) {
    throw new Error("Failed to generate quiz:", err.message);
  }

}

async function quote() {
  try {
    const prompt = `Give me a random quote for motivating me for keep going in life and doing the best i can keep it short precise and impactfull.
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

    const text = response.choices[0].message.content;

    return text;
  } catch (err) {
    throw new Error("Failed to generate quiz:", err.message);
  }

}

module.exports = { generateRoadmap, recommendedRoadmap, roadmapQuiz, quote };