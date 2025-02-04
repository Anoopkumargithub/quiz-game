let questions = [];
let currentQuestion = 0;
let score = 0;

async function fetchQuestions() {
  try {
    const response = await fetch("/questions");
    questions = await response.json();
    document.getElementById("total-questions").textContent = questions.length;
    displayQuestion();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function displayQuestion() {
  if (currentQuestion >= questions.length) {
    const finalScore = (score / questions.length) * 100;
    alert(
      `Quiz completed!\nFinal score: ${score}/${questions.length} (${finalScore.toFixed(2)}%)`,
    );
    if (confirm("Would you like to restart the quiz?")) {
      resetQuiz();
    }
    return;
  }

  // Update question counter
  document.getElementById("current-question").textContent = currentQuestion + 1;

  const question = questions[currentQuestion];
  document.getElementById("question").textContent = question.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.onclick = () => selectOption(index);
    optionsContainer.appendChild(button);
  });
}

function selectOption(index) {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => option.classList.remove("selected"));
  options[index].classList.add("selected");
}

function updateScore() {
  document.getElementById("current-score").textContent = score;
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  updateScore();
  displayQuestion();
}

document.getElementById("submit").addEventListener("click", () => {
  const selectedOption = document.querySelector(".option.selected");

  if (!selectedOption) {
    alert("Please select an answer!");
    return;
  }

  const selectedIndex = Array.from(
    document.querySelectorAll(".option"),
  ).indexOf(selectedOption);

  if (selectedIndex === questions[currentQuestion].correctAnswer) {
    score++;
    updateScore();
    alert("Correct Answer! 🎉");
  } else {
    alert(
      "Wrong Answer! The correct answer was: " +
        questions[currentQuestion].options[
          questions[currentQuestion].correctAnswer
        ],
    );
  }

  currentQuestion++;
  displayQuestion();
});

window.onload = () => {
  score = 0;
  currentQuestion = 0;
  updateScore();
  fetchQuestions();
};
