function showDialog(message) {
  document.getElementById("dialog-message").textContent = message;
  document.getElementById("custom-dialog").classList.remove("hidden");
}

document.getElementById("dialog-btn").addEventListener("click", () => {
  document.getElementById("custom-dialog").classList.add("hidden");
});
