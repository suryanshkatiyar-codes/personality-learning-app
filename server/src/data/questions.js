const questions = [
  {
    id: 1,
    question: "When learning something new, you prefer to:",
    options: [
      { text: "Watch a video tutorial", type: "VISUAL" },
      { text: "Read the official documentation", type: "READER" },
      { text: "Jump in and start building", type: "KINESTHETIC" },
      { text: "Join a study group or community", type: "SOCIAL" },
    ]
  },
  {
    id: 2,
    question: "When you get stuck on a problem, you:",
    options: [
      { text: "Search for a YouTube explanation", type: "VISUAL" },
      { text: "Read articles or Stack Overflow", type: "READER" },
      { text: "Try different approaches until it works", type: "KINESTHETIC" },
      { text: "Ask someone or post in a forum", type: "SOCIAL" },
    ]
  },
  {
    id: 3,
    question: "Your ideal learning resource is:",
    options: [
      { text: "A structured video course", type: "VISUAL" },
      { text: "A well-written book or guide", type: "READER" },
      { text: "A project-based challenge", type: "KINESTHETIC" },
      { text: "A bootcamp with peers", type: "SOCIAL" },
    ]
  },
  {
    id: 4,
    question: "You remember things best when you:",
    options: [
      { text: "See diagrams and visual examples", type: "VISUAL" },
      { text: "Take notes while reading", type: "READER" },
      { text: "Actually implement it yourself", type: "KINESTHETIC" },
      { text: "Explain it to someone else", type: "SOCIAL" },
    ]
  },
  {
    id: 5,
    question: "When starting a new project, you:",
    options: [
      { text: "Watch how others have done it first", type: "VISUAL" },
      { text: "Research and plan thoroughly", type: "READER" },
      { text: "Dive straight into coding", type: "KINESTHETIC" },
      { text: "Collaborate with others from the start", type: "SOCIAL" },
    ]
  },
  {
    id: 6,
    question: "Your perfect Saturday of learning looks like:",
    options: [
      { text: "Binge-watching a course on Udemy", type: "VISUAL" },
      { text: "Reading docs and taking notes", type: "READER" },
      { text: "Building a mini project from scratch", type: "KINESTHETIC" },
      { text: "Attending a hackathon or meetup", type: "SOCIAL" },
    ]
  },
  {
    id: 7,
    question: "You feel most confident after:",
    options: [
      { text: "Watching a clear visual breakdown", type: "VISUAL" },
      { text: "Reading and understanding theory", type: "READER" },
      { text: "Getting your code to actually work", type: "KINESTHETIC" },
      { text: "Getting feedback from peers", type: "SOCIAL" },
    ]
  },
  {
    id: 8,
    question: "When learning a new framework, you:",
    options: [
      { text: "Look for video walkthroughs", type: "VISUAL" },
      { text: "Read the official docs carefully", type: "READER" },
      { text: "Clone a starter repo and explore", type: "KINESTHETIC" },
      { text: "Find a mentor or study buddy", type: "SOCIAL" },
    ]
  },
  {
    id: 9,
    question: "You track your learning progress by:",
    options: [
      { text: "Completion % on video platforms", type: "VISUAL" },
      { text: "Notes and summaries you've written", type: "READER" },
      { text: "Projects you've built", type: "KINESTHETIC" },
      { text: "Feedback from your community", type: "SOCIAL" },
    ]
  },
  {
    id: 10,
    question: "When something finally clicks, it's usually because:",
    options: [
      { text: "You saw a great visual analogy", type: "VISUAL" },
      { text: "You read a perfect explanation", type: "READER" },
      { text: "You built it and it worked", type: "KINESTHETIC" },
      { text: "Someone explained it to you personally", type: "SOCIAL" },
    ]
  },
];

module.exports = questions;