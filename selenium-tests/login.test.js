const { Builder, By, until } = require('selenium-webdriver');
const readline = require('readline');

// Funksion për të marrë input nga përdoruesi në terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function testLogin() {
  let email = await ask("Shkruaj email-in: ");
  let password = await ask("Shkruaj fjalëkalimin: ");
  rl.close();

  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/login');

    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('loginButton')).click();

    // Prisni ridrejtim ose sukses
    await driver.wait(until.urlContains('/survey'), 5000);

    console.log('✅ Login me sukses!');
  } catch (err) {
    console.log('❌ Login i dështuar:', err.message);
  } finally {
    await driver.quit();
  }
}

testLogin();
