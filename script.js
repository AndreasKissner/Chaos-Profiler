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
