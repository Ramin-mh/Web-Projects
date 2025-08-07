// question data
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

const questionField = document.querySelector(".question");
let optionlabels = document.querySelectorAll(".option");
let submitBtn = document.getElementById("submitBtn");
let nextBtn = document.getElementById("nextBtn");

const questions = Object.keys(data);

let currentQuestionIndex = 0;

function questionSession() {
  if (currentQuestionIndex < 10) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = data[currentQuestion];
    let wrongAnswers = Object.values(data);
    wrongAnswers.splice(wrongAnswers.indexOf(correctAnswer), 1);

    const options = fourOptions(correctAnswer, wrongAnswers);

    // Display the question
    renderQuestion(currentQuestion, options);

    // Clone buttons to clear old event listeners
    let newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    submitBtn = newSubmitBtn;

    let newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    nextBtn = newNextBtn;

    // Hide next button initially
    nextBtn.style.display = "none";

    const radios = [...document.querySelectorAll('input[name="q1"]')];

    attachHandlers(radios, correctAnswer, options);
  }
}

// return four options
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

  // Shuffle using Fisher-Yates
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return options;
}

// validate answer
function validate(iscorrect, correctIndex = null) {
  const rightStyle =
    "background-color: #d1fae5; border: 2px solid #10b981; color: #065f46; font-weight: bold;";
  const wrongStyle =
    "background-color: #fee2e2; border: 2px solid #ef4444; color: #991b1b; font-weight: bold;";

  const clickedLabelStyle = iscorrect ? rightStyle : wrongStyle;

  const selectedRadio = document.querySelector('input[name="q1"]:checked');
  if (!selectedRadio) return; // prevent crash if nothing is selected

  const selectedLabel = Array.from(optionlabels).find((label) =>
    label.contains(selectedRadio)
  );

  if (selectedLabel) {
    selectedLabel.style = clickedLabelStyle;
  }

  if (!iscorrect && correctIndex !== null) {
    optionlabels.forEach((label) => {
      const radioIndex = parseInt(label.querySelector("input").value);

      if (radioIndex === correctIndex) {
        label.style = rightStyle;
      }
    });
  }
}

// Render the question and it's options
function renderQuestion(currentQuestion, options) {
  questionField.textContent = `${currentQuestionIndex + 1}. ${currentQuestion}`;

  optionlabels.forEach((label, index) => {
    const radioInput = label.querySelector("input");
    const optionText = label.querySelector(".option-text");

    optionText.textContent = options[index];
    radioInput.checked = false; // make radio buttons initially unchecked
  });
}

function attachHandlers(radios, correctAnswer, options) {
  submitBtn.addEventListener("click", () => {
    const selected = radios.find((r) => r.checked);

    if (!selected) {
      alert("plese select an option!");
      return;
    }

    radios.forEach((radio) => (radio.disabled = true));

    const selectedIndex = parseInt(selected.value);
    const correctIndex = options.indexOf(correctAnswer);

    // Validate the submission
    if (selectedIndex === correctIndex) {
      validate(true);
    } else {
      validate(false, correctIndex);
    }

    nextBtn.style.display = "block";
  });

  nextBtn.addEventListener("click", () => {
    resetOptions(radios);

    currentQuestionIndex += 1;
    nextBtn.style.display = "none";

    questionSession(); // Move to next question
  });
}

// reset the options
function resetOptions(radios){
  optionlabels.forEach((label) => {
      label.removeAttribute("style");
    });

    radios.forEach((radio) => {
      radio.disabled = false;
      radio.checked = false;
    });
}

window.onload = questionSession;