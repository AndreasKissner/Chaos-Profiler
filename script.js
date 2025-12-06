const userData = { name: "", age: "", gender: "" };  // Objekt bleibt, Werte ändern sich
let currentTheme = "";                                // ändert sich 
let questions = [];                                    // Inhalte ändern sich
let currentIndex = 0;                                  // zählt nach oben 
let totalScore = 0;                                    // sammelt Punkte

function startApp() {
  const nameInput = document.getElementById("user-name").value;
  const ageInput = document.getElementById("user-age").value;
  const genderInput = document.getElementById("user-gender").value;
 if (nameInput === "" || ageInput === "" || genderInput === "") {
  showDialog("Bitte alle Felder ausfüllen.");
  return;
}
  userData.name = nameInput;
  userData.age = ageInput;
  userData.gender = genderInput;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("theme-screen").classList.remove("hidden");
}

function chooseTheme(themeKey) {
  currentTheme = themeKey;
  document.getElementById("theme-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  loadQuestionsForTheme();
}

function resetToStart() {
  currentTheme = "";
  questions = [];
  currentIndex = 0;
  totalScore = 0;
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("theme-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
  document.getElementById("question-box").innerHTML = "";
  document.getElementById("result-box").innerHTML = "";
}

async function loadQuestionsForTheme() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Server hat nicht korrekt geantwortet.");
    }
    const data = await response.json();
    questions = data[currentTheme];
    currentIndex = 0;
    totalScore = 0;
    showQuestion();
  } catch (error) {
    console.error("Fehler beim Laden:", error);
    showDialog("Die Fragen konnten nicht geladen werden. Bitte versuche es erneut.");
  }
}

function showQuestion() {
  const questionBox = document.getElementById("question-box");
  if (currentIndex >= questions.length) {
    showResult();
    return;
  }
  const currentQuestion = questions[currentIndex];
  let html = `
    <h2>Question ${currentIndex + 1} of ${questions.length}</h2>
    <p>${currentQuestion.text}</p>
    <button class="primary-btn" onclick="answerQuestion('A')">${currentQuestion.a}</button>
    <button class="primary-btn" onclick="answerQuestion('B')">${currentQuestion.b}</button>
    <button class="primary-btn" onclick="answerQuestion('C')">${currentQuestion.c}</button>
  `;
  questionBox.innerHTML = html;
}

function answerQuestion(option) {
  const currentQuestion = questions[currentIndex];
  if (option === "A") {
    totalScore += currentQuestion.aPoints;
  } else if (option === "B") {
    totalScore += currentQuestion.bPoints;
  } else {
    totalScore += currentQuestion.cPoints;
  }
  currentIndex++;
  showQuestion();
}


function getLevel() {
  if (totalScore <= 8) {
    return "chaos";
  } else if (totalScore <= 14) {
    return "balance";
  }
  return "ordnung";
}