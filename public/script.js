let questions = [];
let currentQuestion = 0;
let score = 0;

async function fetchQuestions() {
  try {
    const response = await fetch("/questions");
    questions = await response.json();
    document.getElementById("total-questions").textContent = questions.length;
    displayQuestion();
    console.log("Fetched questions:", questions); // For debugging
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

  document.getElementById("current-question").textContent = currentQuestion + 1;

  const question = questions[currentQuestion];
  document.getElementById("question").textContent = question.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.setAttribute("data-index", index); // Add index as data attribute
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

  const selectedIndex = parseInt(selectedOption.getAttribute("data-index"));
  const correctAnswer = questions[currentQuestion].answer; // Correct answer text

  console.log("Selected Index:", selectedIndex); // For debugging
  console.log("Correct Answer:", correctAnswer); // For debugging
  console.log("Current Question:", questions[currentQuestion]); // For debugging

  // Check if answer is correct by comparing text instead of index
  if (questions[currentQuestion].options[selectedIndex] === correctAnswer) {
    score++;
    updateScore();
  } 

  // Move to next question
  currentQuestion++;
  displayQuestion();
});


// Initialize the quiz
window.onload = () => {
  score = 0;
  currentQuestion = 0;
  updateScore();
  fetchQuestions();
};
