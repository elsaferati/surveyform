const { Builder, By, until } = require('selenium-webdriver');
const prompt = require('prompt-sync')();

async function testRegister() {
  let driver = await new Builder().forBrowser('chrome').build();

  // Merr input nga përdoruesi
  const name = prompt("Shkruaj emrin e plotë: ");
  const email = prompt("Shkruaj emailin: ");
  const password = prompt("Shkruaj fjalëkalimin: ");
  const confirmPassword = prompt("Konfirmo fjalëkalimin: ");

  try {
    await driver.get('http://localhost:3000/register');

    // Plotëso fushat me inputet që dhatë
    await driver.findElement(By.id('name')).sendKeys(name);
    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('confirmPassword')).sendKeys(confirmPassword);

    await driver.findElement(By.id('registerButton')).click();

    // Prisni mesazhin në <p> (për sukses ose gabim)
    await driver.wait(until.elementLocated(By.css('p')), 5000);
    const message = await driver.findElement(By.css('p')).getText();

    console.log("💬 Përgjigjja nga sistemi:", message);

  } catch (error) {
    console.error("❌ Gabim gjatë testimit të regjistrimit:", error);
  } finally {
    await driver.quit();
  }
}

testRegister();
