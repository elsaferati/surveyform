const { Builder, By, until } = require('selenium-webdriver');

(async function testLogin() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:8080'); // vendndodhja ku po ekzekutohet React app-i

    // Vendos emrat e saktë të inputëve sipas formës tënde React (ndrysho sipas HTML-it real)
    await driver.findElement(By.name('email')).sendKeys('valira@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('valira123');

    await driver.findElement(By.id('loginBtn')).click(); // ID ose class e butonit të login-it

    await driver.wait(until.elementLocated(By.id('successMessage')), 5000);

    const message = await driver.findElement(By.id('successMessage')).getText();
    console.log("Mesazhi i suksesit: ", message);

  } catch (err) {
    console.error("Testi dështoi: ", err.message);
  } finally {
    await driver.quit();
  }
})();
