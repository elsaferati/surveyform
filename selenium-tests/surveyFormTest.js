const { Builder, By, until } = require('selenium-webdriver');
const readline = require('readline');

// Funksion për marrjen e input-it nga përdoruesi në terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function testSurveyForm() {
  // Merr input nga përdoruesi
  const name = await ask("Shkruaj emrin (3-50 karaktere): ");
  const email = await ask("Shkruaj email-in: ");
  const question1 = await ask("Q1: Çfarë mendoni për shërbimin tonë? ");
  const question2 = await ask("Q2: Çfarë mund të përmirësojmë? ");
  const question3 = await ask("Q3: Koment (max 200 karaktere): ");
  const rating = await ask("Jep një vlerësim (1-5): ");
  const ageGroup = await ask("Zgjedh grupmoshën (18-25, 26-35, 36-45, 46+): ");
  const feedbackType = await ask("Lloji i feedback (Sugjerim, Ankesë, Kompliment): ");

  rl.close();

  // Start webdriver për Chrome
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/surveyform'); // Ndrysho URL sipas nevojës

    // Plotëso fushat
    await driver.findElement(By.name('name')).sendKeys(name);
    await driver.findElement(By.name('email')).sendKeys(email);
    await driver.findElement(By.name('question1')).sendKeys(question1);
    await driver.findElement(By.name('question2')).sendKeys(question2);
    await driver.findElement(By.name('question3')).sendKeys(question3);

    // Rating (input radio ose button me vlerën 1-5) - ndrysho sipas strukturës HTML të formës
    await driver.findElement(By.css(`input[name='rating'][value='${rating}']`)).click();

    // Age group - select dropdown ose input text
    await driver.findElement(By.name('ageGroup')).sendKeys(ageGroup);

    // Feedback type - select dropdown ose input text
    await driver.findElement(By.name('feedbackType')).sendKeys(feedbackType);

    // Submit form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Prisni derisa URL të ndryshojë (p.sh. /thank-you)
    await driver.wait(until.urlContains('/thank-you'), 5000);

    console.log("✅ Anketa u dërgua me sukses!");

  } catch (err) {
    console.error("❌ Dështim gjatë dërgimit të anketës:", err.message);
  } finally {
    await driver.quit();
  }
}

testSurveyForm();
