const data = {
  "Which animal is known as the 'King of the Jungle'?": "Lion",
  "Which bird is known for its colorful feathers and ability to mimic human speech?":
    "Parrot",
  "What do pandas mainly eat?": "Bamboo",
  "Which is the largest animal in the world?": "Blue Whale",
  "What is the fastest land animal?": "Cheetah",
  "Which mammal is capable of flying?": "Bat",
  "What is a group of lions called?": "A pride",
  "How many legs does a spider have?": "Eight",
  "Which animal is known to have the longest lifespan?": "Tortoise",
  "Which is the only continent where giraffes live in the wild?": "Africa",
  "Which sea creature has three hearts?": "Octopus",
  "What is the only mammal capable of true flight?": "Bat",
  "Which animal can sleep for up to three years?": "Snail",
  "What type of animal is a Komodo dragon?": "Lizard",
  "Which bird lays the largest eggs?": "Ostrich",
};

const questionField = document.getElementById("question");
const optionA = document.getElementById("A");
const optionB = document.getElementById("B");
const optionC = document.getElementById("C");
const optionD = document.getElementById("D");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next");

let currentQuestionIndex = 0;

// Make a question session {Could be improved}
function questionSession() {
  const questions = Object.keys(data);

  if (currentQuestionIndex < questions.length) {
    let currentQuestion = questions[currentQuestionIndex];
    let correctAnswer = data[currentQuestion];
    let wrongAnswers = Object.values(data);

    questionField.textContent = `Q${
      currentQuestionIndex + 1
    }.${currentQuestion}`;

    const index = wrongAnswers.indexOf(correctAnswer);
    wrongAnswers.splice(index, 1);

    let options = fourOptions(correctAnswer, wrongAnswers);

    optionA.textContent = options[0];
    optionB.textContent = options[1];
    optionC.textContent = options[2];
    optionD.textContent = options[3];

    // optionA.onclick = checkAnswer("A");
    // optionB.onclick = checkAnswer("B");
    // optionC.onclick = checkAnswer("C");
    // optionD.onclick = checkAnswer("D");
  }
}

// For randomly assigning options in a list {No need for improving}
function fourOptions(correctAnswer, wrongAnswers) {
  let options = [];

  // Select 3 unique wrong answers
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
    if (!options.includes(wrongAnswers[randomIndex])) {
      options.push(wrongAnswers[randomIndex]);
    } else {
      i--;
    }
  }

  // Add correct answer
  options.push(correctAnswer);

  //Shuffle using Fisher-Yates
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return options;
}

// For checking if answer is correct {In prototype form, needs big improvement}
//Alert not working!!!!!
// function checkAnswer(idChar) {
//   qs = Object.keys(data);
//   q = qs[currentQuestionIndex];
//   ans = data[q];

//   if (idChar === "A") {
//     if (optionA.textContent === ans) {
//       result.textContent = "Wow!";
//     }
//   } else if (idChar === "B") {
//     if (optionB.textContent === ans) {
//       result.textContent = "Wow";
//     }
//   } else if (idChar === "C") {
//     if (optionC.textContent === ans) {
//       result.textContent = "Wow";
//     }
//   } else if (idChar === "D") {
//     if (optionD.textContent === ans) {
//       result.textContent = "Wow";
//     }
//   } else {
//     result.textContent = "Wrong!";
//   }
// }

window.onload = questionSession;