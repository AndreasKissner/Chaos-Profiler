function resultTemplate(user, theme, score, maxScore, percent) {
  return `
    <h2>Your Order Profile</h2>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Age:</strong> ${user.age}</p>
    <p><strong>Gender:</strong> ${user.gender}</p>
    <p><strong>Theme:</strong> ${theme}</p>
    <p><strong>Points:</strong> ${score} of ${maxScore} (${percent}%)</p>
    <p>${getProfileText()}</p>
    <p><strong>Tips:</strong> ${getAdviceText()}</p>
  `;
}
