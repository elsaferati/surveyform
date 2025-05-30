const { Builder, By, until } = require('selenium-webdriver');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function testSurveyForm() {
  // Merr të dhënat nga përdoruesi
  const name = await ask("Shkruaj emrin e plotë: ");
  const email = await ask("Shkruaj email-in: ");
  const question1 = await ask("Q1: Çfarë mendoni për shërbimin tonë? ");
  const question2 = await ask("Q2: Çfarë mund të përmirësojmë? ");
  const question3 = await ask("Q3 (Yes/No/Maybe): Do të na rekomandoje? ");
  const rating = await ask("Jep një vlerësim (1–5): ");
  const ageGroup = await ask("Zgjedh grupmoshën (18-25, 26-35, 36-45, 46+): ");
  const feedbackType = await ask("Lloji i feedback (Positive/Neutral/Negative): ");
  rl.close();

  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/surveyform'); // Ndrysho URL nëse e ke ndryshe

    await driver.findElement(By.name('name')).sendKeys(name);
    await driver.findElement(By.name('email')).sendKeys(email);
    await driver.findElement(By.name('question1')).sendKeys(question1);
    await driver.findElement(By.name('question2')).sendKeys(question2);

    await driver.findElement(By.css(`input[type="radio"][value="${question3}"]`)).click();

    await driver.findElement(By.xpath(`//button[text()="${rating}"]`)).click();

    await driver.findElement(By.name('ageGroup')).sendKeys(ageGroup);
    await driver.findElement(By.name('feedbackType')).sendKeys(feedbackType);

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/thank-you'), 5000);
    console.log("✅ Anketa u dërgua me sukses!");

  } catch (err) {
    console.error("❌ Dështim gjatë dërgimit:", err.message);
  } finally {
    await driver.quit();
  }
}

testSurveyForm();
