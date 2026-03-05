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
      Generate a structured 8-week learning roadmap for someone who wants to learn ${skill}.
      This person is a ${personalityType} learner who ${learningStyle}.
      
      For each week provide:
      - Week number and title
      - Main topics to cover
      - Recommended resources that match their learning style
      - A small practical task or milestone
      
      Make the roadmap specific, actionable and tailored to a ${personalityType} learner.
      Format the response in a clean readable way.
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
    const roadmapText = response.choices[0].message.content;

    return roadmapText;

  } catch (err) {
    throw new Error("Failed to generate roadmap: " + err.message);
  }
}

module.exports = { generateRoadmap };