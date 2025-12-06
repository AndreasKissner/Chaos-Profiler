const themeDisplayNames = {
  programmieren: "Programmieren",
  familie: "Familie",
  freizeit: "Freizeit",
  geld: "Geld",
  beruf: "Beruf",
  ernaehrung: "Ernährung",
  ki: "KI (Easter Egg )"
};

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

function getProfileText() {
  let level = getLevel();
  if (currentTheme === "programmieren") { return getProfileProgrammieren(level); }
  if (currentTheme === "familie") { return getProfileFamilie(level); }
  if (currentTheme === "freizeit") { return getProfileFreizeit(level); }
  if (currentTheme === "geld") { return getProfileGeld(level); }
  if (currentTheme === "beruf") { return getProfileBeruf(level); }
  if (currentTheme === "ernaehrung") { return getProfileErnaehrung(level); }
  if (currentTheme === "ki") { return getProfileKi(level); }
  return "Dein Verhältnis zu Ordnung spiegelt, wie du versuchst, dein inneres Chaos zu halten.";
}

function getProfileProgrammieren(level) {
  if (level === "chaos") {
    return "Dein Code zeigt, wie sehr du im Moment improvisierst. Ein Teil von dir sehnt sich nach mehr Klarheit, auch wenn du dich häufig durchs Projekt kämpfst. Vielleicht hilft dir eine App, die dir kleine Lernschritte strukturiert vorgibt. Empfehlung: Die Lern-App 'Mimo' – super für täglich kleine Coding-Bausteine.";
  }
  if (level === "balance") {
    return "Du lässt dir Raum für kreative Umwege, findest aber meist wieder zur Struktur zurück. Du spürst, wann der Punkt erreicht ist, an dem Unordnung dich bremst. Eine App, die Aufgaben in übersichtliche Blöcke teilt, könnte dich gut unterstützen. Empfehlung: 'Notion' – perfekt, um Code-Lernziele in klaren Modulen zu organisieren.";
  }
  return "Ordnung im Code ist für dich wie ein sicherer Boden. Wenn alles seinen Platz hat, kannst du mutig bauen, ohne ständig Angst vor Zusammenbruch zu haben. Eine App zur Projektplanung könnte dir helfen, diesen Flow zu halten. Empfehlung: 'Trello' – einfache, visuelle Karten für klare Code-Struktur.";
}

function getProfileFamilie(level) {
  if (level === "chaos") {
    return "Das Familienchaos erzählt von Überforderung und vielen Anforderungen. Dahinter steckt oft der Wunsch, endlich wieder Luft holen zu können und nicht alles allein tragen zu müssen. Eine Familien-Organisations-App kann dir helfen, Aufgaben fair zu verteilen. Empfehlung: 'Cozi Family Organizer' – einer der bekanntesten Familienplaner.";
  }
  if (level === "balance") {
    return "Du erlaubst deiner Familie Menschlichkeit und Unordnung, achtest aber darauf, dass ihr nicht in Dauerstress kippt. Du suchst nach einem Zuhause, das echt und trotzdem haltgebend ist. Eine einfache Kalender-App könnte euren Alltag spürbar entlasten. Empfehlung: 'Google Kalender' – schnell, geteilt, übersichtlich.";
  }
  return "Ordnung zu Hause ist für dich Schutzraum. Sie hilft dir, emotional präsent zu sein und nicht im Lärm des Alltags unterzugehen. Vielleicht stärkt eine gemeinsame To-Do-App eure Klarheit als Team. Empfehlung: 'Todoist' – perfekt für gemeinsame Aufgabenlisten.";
}

function getProfileFreizeit(level) {
  if (level === "chaos") {
    return "In deiner Freizeit verlierst du dich leicht zwischen Möglichkeiten und Müdigkeit. Ein Teil in dir ahnt, dass du dir selbst mehr echte, nährende Zeit schenken möchtest. Eine App für kleine Achtsamkeits-Impulse könnte dir guttun. Empfehlung: 'Headspace' – kurze Meditationen, die dich zurück zu dir bringen.";
  }
  if (level === "balance") {
    return "Du schwankst zwischen Planung und Spontanität, und das passt im Großen und Ganzen zu dir. Du spürst, wenn es Zeit ist, dich wieder bewusster um deine Wünsche zu kümmern. Eine App, die dir Ziele sanft erinnert, kann dabei helfen. Empfehlung: 'Fabulous' – motiviert dich mit kleinen, liebevollen Gewohnheiten.";
  }
  return "Du nimmst deine Freizeit ernst als Raum für Seele und Körper. Struktur ist für dich kein Käfig, sondern ein Versprechen an dich selbst, dich nicht wieder zu vergessen. Eine Routine-App könnte dich darin weiter bestärken. Empfehlung: 'Habitica' – macht deine Routinen zu einem kleinen Abenteuer.";
}

function getProfileGeld(level) {
  if (level === "chaos") {
    return "Beim Geld weicht Struktur oft Emotionen, Stress oder alten Mustern. Hinter dem Chaos steckt häufig die Angst, nicht zu genügen oder keine Kontrolle zu haben. Eine einfache Budget-App kann dir einen ersten sicheren Überblick geben. Empfehlung: 'Spendee' – super visuell und leicht für Einsteiger.";
  }
  if (level === "balance") {
    return "Du hältst dein Geldleben grob im Blick und merkst, dass du mit etwas mehr Klarheit innerlich ruhiger wärst. Sicherheit ist dir wichtig, auch wenn du sie nicht immer konsequent pflegst. Eine Ausgaben-Tracker-App könnte dir mehr Leichtigkeit schenken. Empfehlung: 'Wallet by BudgetBakers'.";
  }
  return "Du baust dir mit Ordnung beim Geld einen inneren Sicherheitsraum. Zahlen geben dir Orientierung und das Gefühl, dein Leben bewusst mitzugestalten. Eine Finanz-App kann dir helfen, dein gutes System noch stabiler zu machen. Empfehlung: 'YNAB – You Need A Budget' – perfekt für Strukturmenschen.";
}

function getProfileBeruf(level) {
  if (level === "chaos") {
    return "Im Job läufst du oft im Alarmmodus. Du funktionierst, aber bezahlst den Preis mit Anspannung. Ordnung fehlt dir nicht, weil du unfähig bist – sondern weil du zu viel trägst. Vielleicht hilft dir eine Aufgaben-App, die dir kleine Schritte sortiert. Empfehlung: 'Microsoft To Do' – angenehm simpel und stabil.";
  }
  if (level === "balance") {
    return "Du balancierst zwischen Struktur und spontaner Problemlösung. Andere verlassen sich auf dich, und manchmal merkst du, wie wichtig klare Grenzen für dich wären. Eine App für Arbeitszeiten oder Fokus-Blöcke könnte dich unterstützen. Empfehlung: 'Forest' – Fokus durch kleine Bäume, die während deiner Arbeit wachsen.";
  }
  return "Du brauchst Klarheit, um gut arbeiten zu können. Struktur ist für dich ein Zeichen von Respekt – für dich selbst, deine Zeit und deine Energie. Eine gute Projekt-App kann dir helfen, fokussiert zu bleiben. Empfehlung: 'Asana' – professionell, übersichtlich, ideal für strukturierte Arbeit.";
}

function getProfileErnaehrung(level) {
  if (level === "chaos") {
    return "Deine Ernährung zeigt, wie schwer es sein kann, sich selbst wichtig zu nehmen. Essen wird schnell zur Nebensache oder zum Trost, wenn das Leben zu laut wird. Eine einfache Essens-Tracker-App könnte dir Orientierung geben. Empfehlung: 'Lifesum' – visuell, freundlich, nicht überfordernd.";
  }
  if (level === "balance") {
    return "Du bewegst dich zwischen Genuss und Achtsamkeit. Du spürst, dass dein Körper dankbar reagiert, wenn du ihm etwas mehr liebevolle Struktur gibst. Eine Rezept- oder Meal-Planner-App könnte dich unterstützen. Empfehlung: 'Mealime' – zaubert einfache, gesunde Essensplanung.";
  }
  return "Du gehst sehr bewusst mit deinem Körper um. Ordnung beim Essen ist für dich kein Zwang, sondern eine leise Form von Selbstliebe. Eine Routine-App könnte deine gesunden Abläufe noch stabiler machen. Empfehlung: 'MyFitnessPal' – bewährt, genau, unterstützt gute Gewohnheiten.";
}

function getProfileKi(level) {
  if (level === "chaos") {
    return "Du und KI seid wie ein chaotisches Duo: Viele Ideen, wenig Ordner. Tief drin weißt du, dass selbst die klügste Maschine dein inneres Durcheinander nicht ganz sortieren kann. Eine Notizen-App könnte helfen, deine genialen Einfälle zu sammeln. Empfehlung: 'Google Keep' – schnell, simpel, perfekt für spontane Ideen.";
  }
  if (level === "balance") {
    return "Du spielst mit KI und nutzt sie gleichzeitig als Werkzeug. Du weißt, dass sie dir helfen kann – aber auch, dass sie deinen Humor und deine Eigenart nie ersetzen wird. Eine kleine Kreativ-App könnte dir zusätzlichen Spaß bringen. Empfehlung: 'Canva' – macht kreative Ideen sofort sichtbar.";
  }
  return "Du nutzt KI erstaunlich bewusst. Vielleicht bist du der Mensch, vor dem die Roboter irgendwann ehrfürchtig sagen: 'Bitte lehre uns, wie man aufräumt.' Eine Wissens-App könnte dein Potenzial weiter beflügeln. Empfehlung: 'Notion AI' – verbindet Ordnung, Kreativität und KI in einem System.";
}

function  getAdviceText() {
  let level = getLevel();
  if (currentTheme === "programmieren") { return getAdviceProgrammieren(level); }
  if (currentTheme === "familie") { return getAdviceFamilie(level); }
  if (currentTheme === "freizeit") { return getAdviceFreizeit(level); }
  if (currentTheme === "geld") { return getAdviceGeld(level); }
  if (currentTheme === "beruf") { return getAdviceBeruf(level); }
  if (currentTheme === "ernaehrung") { return getAdviceErnaehrung(level); }
  if (currentTheme === "ki") { return getAdviceKi(level); }
  return getAdviceAllgemein(level);
}

function getProfileProgrammieren(level) {
  if (level === "chaos") {
    return "Dein Code zeigt, wie sehr du im Moment improvisierst. Ein Teil von dir sehnt sich nach mehr Klarheit, auch wenn du dich häufig durchs Projekt kämpfst. Vielleicht hilft dir eine App, die dir kleine Lernschritte strukturiert vorgibt. Empfehlung: Die Lern-App 'Mimo' – kurze, geführte Coding-Sessions für jeden Tag.";
  }
  if (level === "balance") {
    return "Du lässt dir Raum für kreative Umwege, findest aber meist wieder zur Struktur zurück. Du spürst, wann der Punkt erreicht ist, an dem Unordnung dich bremst. Eine App, die Aufgaben in übersichtliche Blöcke teilt, könnte dich gut unterstützen. Empfehlung: 'Notion' – ideal, um Lernblöcke sauber zu strukturieren.";
  }
  return "Ordnung im Code ist für dich wie ein sicherer Boden. Wenn alles seinen Platz hat, kannst du mutig bauen, ohne ständig Angst vor Zusammenbruch zu haben. Eine App zur Projektplanung könnte dir helfen, diesen Flow zu halten. Empfehlung: 'Trello' – visuelles Projektboard für klare Software-Struktur.";
}

function getProfileFamilie(level) {
  if (level === "chaos") {
    return "Das Familienchaos erzählt von Überforderung und vielen Anforderungen. Dahinter steckt oft der Wunsch, endlich wieder Luft holen zu können und nicht alles allein tragen zu müssen. Eine Familien-Organisations-App kann dir helfen, Aufgaben fair zu verteilen. Empfehlung: 'Cozi Family Organizer' – einer der bekanntesten Familienplaner.";
  }
  if (level === "balance") {
    return "Du erlaubst deiner Familie Menschlichkeit und Unordnung, achtest aber darauf, dass ihr nicht in Dauerstress kippt. Du suchst nach einem Zuhause, das echt und trotzdem haltgebend ist. Eine einfache Kalender-App könnte euren Alltag spürbar entlasten. Empfehlung: 'Google Kalender' – leicht gemeinsam nutzbar.";
  }
  return "Ordnung zu Hause ist für dich Schutzraum. Sie hilft dir, emotional präsent zu sein und nicht im Lärm des Alltags unterzugehen. Vielleicht stärkt eine gemeinsame To-Do-App eure Klarheit als Team. Empfehlung: 'Todoist' – ideal für gemeinsame Haushaltslisten.";
}

function getProfileFreizeit(level) {
  if (level === "chaos") {
    return "In deiner Freizeit verlierst du dich leicht zwischen Möglichkeiten und Müdigkeit. Ein Teil in dir ahnt, dass du dir selbst mehr echte, nährende Zeit schenken möchtest. Eine App für kleine Achtsamkeits-Impulse könnte dir guttun. Empfehlung: 'Headspace' – sanfte, kurze Meditationen für tägliche Ruhe.";
  }
  if (level === "balance") {
    return "Du schwankst zwischen Planung und Spontanität, und das passt im Großen und Ganzen zu dir. Du spürst, wenn es Zeit ist, dich wieder bewusster um deine Wünsche zu kümmern. Eine App, die dir Ziele sanft erinnert, kann dabei helfen. Empfehlung: 'Fabulous' – motiviert dich mit kleinen Wohlfühl-Ritualen.";
  }
  return "Du nimmst deine Freizeit ernst als Raum für Seele und Körper. Struktur ist für dich kein Käfig, sondern ein Versprechen an dich selbst, dich nicht wieder zu vergessen. Eine Routine-App könnte dich darin weiter bestärken. Empfehlung: 'Habitica' – Gewohnheiten als spielerisches Abenteuer.";
}

function getProfileGeld(level) {
  if (level === "chaos") {
    return "Beim Geld weicht Struktur oft Emotionen, Stress oder alten Mustern. Hinter dem Chaos steckt häufig die Angst, nicht zu genügen oder keine Kontrolle zu haben. Eine einfache Budget-App kann dir einen ersten sicheren Überblick geben. Empfehlung: 'Spendee' – extrem einsteigerfreundlich und visuell.";
  }
  if (level === "balance") {
    return "Du hältst dein Geldleben grob im Blick und merkst, dass du mit etwas mehr Klarheit innerlich ruhiger wärst. Sicherheit ist dir wichtig, auch wenn du sie nicht immer konsequent pflegst. Eine Ausgaben-Tracker-App könnte dir mehr Leichtigkeit schenken. Empfehlung: 'Wallet by BudgetBakers'.";
  }
  return "Du baust dir mit Ordnung beim Geld einen inneren Sicherheitsraum. Zahlen geben dir Orientierung und das Gefühl, dein Leben bewusst mitzugestalten. Eine Finanz-App kann dir helfen, dein gutes System noch stabiler zu machen. Empfehlung: 'YNAB – You Need A Budget' – super für strukturierte Finanzen.";
}

function getProfileBeruf(level) {
  if (level === "chaos") {
    return "Im Job läufst du oft im Alarmmodus. Du funktionierst, aber bezahlst den Preis mit Anspannung. Ordnung fehlt dir nicht, weil du unfähig bist – sondern weil du zu viel trägst. Vielleicht hilft dir eine Aufgaben-App, die dir kleine Schritte sortiert. Empfehlung: 'Microsoft To Do' – simpel, klar, entlastend.";
  }
  if (level === "balance") {
    return "Du balancierst zwischen Struktur und spontaner Problemlösung. Andere verlassen sich auf dich, und manchmal merkst du, wie wichtig klare Grenzen für dich wären. Eine Fokus-App wie „Forest“ kann dir helfen, konzentriert zu bleiben. Empfehlung: 'Forest' – Fokus durch wachsende Bäume.";
  }
  return "Du brauchst Klarheit, um gut arbeiten zu können. Struktur ist für dich ein Zeichen von Respekt – für dich selbst, deine Zeit und deine Energie. Eine gute Projekt-App kann dir helfen, fokussiert zu bleiben. Empfehlung: 'Asana' – sehr professionell und strukturiert.";
}

function getProfileErnaehrung(level) {
  if (level === "chaos") {
    return "Deine Ernährung zeigt, wie schwer es sein kann, sich selbst wichtig zu nehmen. Essen wird schnell zur Nebensache oder zum Trost, wenn das Leben zu laut wird. Eine App wie „Yazio“ kann dir sanft Orientierung geben.";
  }
  if (level === "balance") {
    return "Du bewegst dich zwischen Genuss und Achtsamkeit. Du spürst, dass dein Körper dankbar reagiert, wenn du ihm etwas mehr liebevolle Struktur gibst. Eine App wie „Lifesum“ unterstützt dich beim bewussten Essen.";
  }
  return "Du gehst sehr bewusst mit deinem Körper um. Ordnung beim Essen ist für dich kein Zwang, sondern eine leise Form von Selbstliebe. Eine Gewohnheiten-App wie „Habit Tracker“ kann dir helfen, in Balance zu bleiben.";
}

function getProfileKi(level) {
  if (level === "chaos") {
    return "Du und KI seid wie ein chaotisches Duo: Viele Ideen, wenig Ordner. Tief drin weißt du, dass selbst die klügste Maschine dein inneres Durcheinander nicht ganz sortieren kann. Eine App wie „Notion“ eignet sich perfekt zum Sammeln deiner KI-Ideen.";
  }
  if (level === "balance") {
    return "Du spielst mit KI und nutzt sie gleichzeitig als Werkzeug. Du weißt, dass sie dir helfen kann – aber auch, dass sie deinen Humor und deine Eigenart nie ersetzen wird. Eine App wie „Obsidian“ kann dir helfen, deine Lernwege klar zu dokumentieren.";
  }
  return "Du nutzt KI erstaunlich bewusst. Vielleicht bist du der Mensch, vor dem die Roboter irgendwann ehrfürchtig sagen: 'Bitte lehre uns, wie man aufräumt.' Eine Wissens-App wie „Readwise“ unterstützt dich dabei, Klarheit zu behalten.";
}

function getAdviceProgrammieren(level) {
  if (level === "chaos") {
    return "Wähle eine Stelle im Code, die dir ständig Energie raubt, und schenke ihr bewusst Ordnung. Nicht perfekt – nur ein echtes Aufatmen für dein zukünftiges Ich. Eine App wie „Trello“ kann dir helfen, kleine Schritte klar zu strukturieren.";
  }
  if (level === "balance") {
    return "Plane kleine Refactoring-Inseln ein. Jede geklärte Funktion ist ein stilles Ja zu dir und deiner Arbeit. Tools wie „Notion“ können dir helfen, deine Projekte übersichtlich zu organisieren.";
  }
  return "Achte darauf, dich nicht im Perfektionismus zu verlieren. Manchmal reicht es, wenn der Code gut genug ist und du innerlich frei bleibst. Eine App wie „GitHub Issues“ kann dich unterstützen, Aufgaben realistisch zu priorisieren.";
}

function getAdviceFamilie(level) {
  if (level === "chaos") {
    return "Suche dir eine kleine Zone, die eurem Alltag Ruhe schenkt – ein Tisch, eine Ecke, ein Regal. Ordnung dort kann mehr verändern, als du denkst. Die App „Cozi Family Organizer“ hilft vielen Familien, Chaos gemeinsam zu sortieren.";
  }
  if (level === "balance") {
    return "Sprich offen darüber, was dir Halt gibt. Wenn die anderen verstehen, wie sehr dich Klarheit entlastet, entsteht oft mehr Kooperation als Widerstand. Ein gemeinsamer Kalender wie „Google Kalender“ kann Wunder wirken.";
  }
  return "Erlaube dir, nicht alles kontrollieren zu müssen. Manchmal ist gelebte Nähe wichtiger als der perfekt aufgeräumte Flur. Eine To-Do-App wie „Todoist“ kann euch helfen, Aufgaben fair zu verteilen.";
}

function getAdviceFreizeit(level) {
  if (level === "chaos") {
    return "Schreib dir eine kleine Liste mit drei Dingen, die dir wirklich gut tun. Baue jede Woche bewusst mindestens eines davon ein – als Geschenk an dich. Eine App wie „Headspace“ kann dich an kleine Achtsamkeitsmomente erinnern.";
  }
  if (level === "balance") {
    return "Schütze deine freien Zeiten vor fremden To-dos. Sie gehören dir, nicht nur dem Kalender. Die App „Google Tasks“ oder „TickTick“ hilft dir, klare Grenzen zu setzen.";
  }
  return "Achte darauf, dass deine Freizeit nicht nur aus Pflichten mit schöner Verpackung besteht. Plan auch Raum für reinen, zweckfreien Genuss. Eine Routine-App wie „Fabulous“ unterstützt dich dabei, echte Erholung zu kultivieren.";
}

function getAdviceGeld(level) {
  if (level === "chaos") {
    return "Setz dich einmal im Monat mit dir und deinen Zahlen hin, ohne dich zu verurteilen. Nur beobachten, als würdest du einem guten Freund zuhören. Eine App wie „Wallet“ oder „YNAB“ kann dir sanft helfen, Überblick zu bekommen.";
  }
  if (level === "balance") {
    return "Definiere ein kleines, klares Geldziel und verknüpfe es mit etwas, das dir wirklich am Herzen liegt. Ordnung bekommt so eine Seele. Eine Budget-App wie „MoneyCoach“ kann dich dabei unterstützen.";
  }
  return "Nutze deine Struktur nicht nur zum Sparen, sondern auch, um bewusst Freude zu finanzieren. Finanzielle Ordnung darf sich warm anfühlen. Eine App wie „Revolut“ macht es leicht, Geld übersichtlich zu organisieren.";
}

function getAdviceBeruf(level) {
  if (level === "chaos") {
    return "Starte den Tag mit drei wichtigsten Aufgaben. Jede bewusst gesetzte Grenze ist ein Schritt raus aus dem Dauer-Alarm in Richtung Selbstrespekt. Die App „Microsoft To Do“ hilft dir, deinen Tag klarer zu gestalten.";
  }
  if (level === "balance") {
    return "Überlege, welche Aufgaben wirklich deine sind. Wo du klarer Nein sagst, wird dein Ja wieder echter. Eine Fokus-App wie „Forest“ kann dir helfen, konzentriert zu bleiben.";
  }
  return "Sprich, wenn möglich, über deine Struktur. Andere profitieren von deiner Klarheit – und du musst sie nicht mehr alleine tragen. Tools wie „Asana“ können dein Arbeitsleben spürbar erleichtern.";
}

function getAdviceErnaehrung(level) {
  if (level === "chaos") {
    return "Nimm dir eine Mahlzeit am Tag, bei der du wirklich anwesend bist. Kein Perfekt, nur ein ehrlicher Moment mit dir und deinem Körper. Eine App wie „Yazio“ kann dich sanft begleiten.";
  }
  if (level === "balance") {
    return "Frage dich öfter: Tut mir das gerade gut oder fülle ich nur eine Lücke? Schon diese Frage verändert deine Entscheidungen leise. Eine App wie „Lifesum“ unterstützt dich dabei, bewusste Entscheidungen zu treffen.";
  }
  return "Achte darauf, freundlich mit dir zu bleiben, auch wenn du mal vom Plan abweichst. Dein Körper braucht Liebe, nicht Kontrolle. Eine Gewohnheiten-App wie „Habit Tracker“ kann dir helfen, in Balance zu bleiben.";
}

function getAdviceKi(level) {
  if (level === "chaos") {
    return "Erstelle einen einzigen Ordner oder Chat, in dem du alles sammelst, was dir wirklich hilft. Der Rest darf im digitalen Nirvana verschwinden. Eine App wie „Notion“ eignet sich perfekt zum Sortieren deiner KI-Ideen.";
  }
  if (level === "balance") {
    return "Baue dir kleine KI-Routinen: morgens Ideen, abends Reflektion. Und zwischendurch: unbedingt über dich selbst lachen. Eine App wie „Obsidian“ kann dir helfen, Klarheit zu behalten.";
  }
  return "Nutze KI, um dir das Leben leichter zu machen, nicht strenger. Lass sie Struktur liefern – aber du entscheidest, was zu dir passt. Eine Wissens-App wie „Readwise“ unterstützt dich langfristig im Denken.";
}

function getAdviceAllgemein(level) {
  if (level === "chaos") {
    return "Sieh dein Chaos nicht als Charakterfehler, sondern als Signal. Du hast viel getragen – Ordnung beginnt dort, wo du dir wieder selbst zuhörst. Apps wie „Calm“ können helfen, innere Ruhe zurückzugewinnen.";
  }
  if (level === "balance") {
    return "Du stehst schon auf einem soliden Mittelweg. Ein paar bewusste Entscheidungen können aus 'ganz okay' ein Leben machen, das sich stimmig anfühlt. Eine Entscheidungstagebuch-App wie „Daylio“ kann dich begleiten.";
  }
  return "Deine Ordnung ist eine Ressource, kein Urteil. Nutze sie, um dir selbst ein Leben zu bauen, in dem du dich innerlich sicher und lebendig fühlst. Eine Fokusroutine-App wie „Fabulous“ kann dich dabei unterstützen.";
}


function showResult() {
  const resultBox = document.getElementById("result-box");
  const maxScore = questions.length * 3;
  const percent = Math.round((totalScore / maxScore) * 100);
  const readableTheme = themeDisplayNames[currentTheme];
  const html = resultTemplate(
    userData,
    readableTheme,
    totalScore,
    maxScore,
    percent
  );
  document.getElementById("question-box").innerHTML = "";
  resultBox.innerHTML = html;
}

function downloadPdf() {
  const resultBox = document.getElementById("result-box");
  if (resultBox.innerHTML === "") {   
    showDialog("Bitte zuerst den Test abschließen.");
    return;
  }
  window.print();
}


/* Dialog */
window.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("first-dialog");
  const btn = document.getElementById("first-dialog-btn");
  const dialogSeen = localStorage.getItem("dialogSeen");

  if (dialogSeen === "true") {
    dialog.classList.add("hidden"); 
  }

  btn.onclick = () => {
    dialog.classList.add("hidden");
    localStorage.setItem("dialogSeen", "true"); 
  };
});
