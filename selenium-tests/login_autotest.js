const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

(async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Hap faqen e login
    await driver.get('http://localhost:3000/login');

    // Gjej inputet dhe plotëso
    await driver.findElement(By.name('email')).sendKeys('test@example.com');
    await driver.findElement(By.name('password')).sendKeys('yourPassword123');

    // Kliko butonin Login (kontrollo id ose tekstin e saktë në HTML nëse ndryshon)
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Prit të navigojë ose të shfaqet një element që vërteton suksesin
    await driver.wait(until.urlContains('/dashboard'), 5000);

    console.log('✅ Testi u krye me sukses!');

  } catch (err) {
    console.error('❌ Testi dështoi:', err.message);
  } finally {
    await driver.quit();
  }
})();




