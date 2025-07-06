const { Builder, By, until } = require('selenium-webdriver');

async function testRegisterAuto() {
  let driver = await new Builder().forBrowser('chrome').build();

  // Të dhënat automatike për regjistrim
  const name = "Elsa Testuese";
  const timestamp = Date.now(); // për të bërë email unik
  const email = `elsa${timestamp}@example.com`;
  const password = "TestPassword123";

  try {
    await driver.get('http://localhost:3000/register');

    // Plotëso fushat automatikisht
    await driver.findElement(By.id('name')).sendKeys(name);
    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('confirmPassword')).sendKeys(password);

    await driver.findElement(By.css('button[type="submit"]')).click();

    // Prisni përgjigjen e regjistrimit (psh. një paragraf me mesazh)
    await driver.wait(until.elementLocated(By.css('p')), 5000);
    const message = await driver.findElement(By.css('p')).getText();

    console.log("✅ Përgjigjja nga regjistrimi:", message);

  } catch (error) {
    console.error("❌ Gabim gjatë testimit të regjistrimit:", error);
  } finally {
    await driver.quit();
  }
}

testRegisterAuto();
