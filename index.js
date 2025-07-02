const data = {
  "Which animal is known as the king of the jungle?": "Lion",
  "Which bird is known for its ability to mimic human speech?": "Parrot",
  "Which aquatic animal is the largest mammal on Earth?": "Blue Whale",
  "Which animal is famous for changing its color to blend with its surroundings?":
    "Chameleon",
  "Which animal has black and white stripes?": "Zebra",
  "Which flightless bird is native to New Zealand?": "Kiwi",
  "Which animal is the only marsupial found in North America?": "Opossum",
  "Which animal is known for its slow movement and lives in trees?": "Sloth",
  "Which sea creature has eight arms?": "Octopus",
  "Which animal is known to have the strongest bite force?": "Crocodile",
  "Which mammal lays eggs instead of giving birth to live young?": "Platypus",
  "Which animal uses echolocation to navigate and hunt in the dark?": "Bat",
  "Which bird is the fastest in a dive?": "Peregrine Falcon",
  "Which desert animal stores fat in its hump?": "Camel",
  "Which mammal is known to have the best memory?": "Elephant",
  "Which animal is known to laugh when tickled?": "Rat",
  "Which bear species is native only to China?": "Panda",
  "Which animal is capable of regenerating lost limbs?": "Starfish",
  "Which sea creature is known for its deadly sting and tentacles?":
    "Jellyfish",
  "Which big cat is the fastest land animal?": "Cheetah",
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
  result.style.display = "none";
  nextBtn.style.display = "none";

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

    document.querySelectorAll(".option").forEach((button) => {
      button.onclick = () => {
        const selected = button.dataset.option;
        checkAnswer(button, correctAnswer);
      };
    });
  }
}

// For randomly assigning options in a list
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

// For checking if answer is correct {could be improved}
function checkAnswer(button, ans) {
  if (button.textContent === ans) {
    result.textContent = "Correct answer";
    button.style.backgroundColor = "green";
  } else {
    result.textContent = "Wrong answer";
    button.style.backgroundColor = "red";
  }

  result.style.display = "block";
  nextBtn.style.display = "block";

  optionA.disabled = true;
  optionB.disabled = true;
  optionC.disabled = true;
  optionD.disabled = true;

  nextBtn.onclick = function () {
    currentQuestionIndex++;

    optionA.disabled = false;
    optionB.disabled = false;
    optionC.disabled = false;
    optionD.disabled = false;

    button.style.backgroundColor = "";

    questionSession();
  };
}

window.onload = questionSession;