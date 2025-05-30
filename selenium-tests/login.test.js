const { Builder, By, until } = require('selenium-webdriver');

async function testLogin() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Hap faqen e login
    await driver.get('http://localhost:3000/login'); // Ndrysho URL sipas nevojës

    // --- Testimi me kredenciale të sakta ---
    await driver.findElement(By.id('email')).sendKeys('elsa@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('passwordiSakte123'); // Vendos passwordin e saktë
    await driver.findElement(By.id('loginButton')).click();

    // Prisni derisa të ridrejtoheni ose të shfaqet element i dashboard-it
    await driver.wait(until.urlContains('/survey'), 5000);

    console.log('Testimi me kredenciale të sakta: ✅ Kaluar');

    // --- Testimi me kredenciale të gabuara ---
    await driver.get('http://localhost:3000/login'); // Rifresko faqen

    await driver.findElement(By.id('email')).clear();
    await driver.findElement(By.id('email')).sendKeys('user@example.com');
    await driver.findElement(By.id('password')).clear();
    await driver.findElement(By.id('password')).sendKeys('passwordGabim');
    await driver.findElement(By.id('loginButton')).click();

    // Prisni për alert me gabim ose për mesazh gabimi në faqe
    // Ja një shembull me alert browser (nëse e përdor)
    await driver.wait(until.alertIsPresent(), 5000);

    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log('Mesazhi i gabimit:', alertText);
    await alert.accept();

    console.log('Testimi me kredenciale të gabuara: ✅ Kaluar');

  } catch (error) {
    console.error('Gabim gjatë testimit:', error);
  } finally {
    await driver.quit();
  }
}

testLogin();
