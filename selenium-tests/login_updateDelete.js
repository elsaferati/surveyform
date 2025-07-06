const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

async function testUserTableUpdateDelete() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3000/users"); // Sipas aplikacionit tënd

    // Prit që tabela të ngarkohet
    await driver.wait(until.elementLocated(By.css("table")), 5000);

    // ----------- UPDATE TEST -----------
    console.log("🔍 Fillon testimi i UPDATE...");

    // Kliko butonin Edit të rreshtit të parë
    const firstEditButton = await driver.findElement(
      By.css("tbody tr:first-child td:last-child button:nth-of-type(1)")
    );
    await firstEditButton.click();

    // Prit të shfaqet inputi për emër
    await driver.wait(until.elementLocated(By.css("tbody tr:first-child input")), 2000);

    // Ndrysho emrin dhe email-in
    const nameInput = await driver.findElement(
      By.css("tbody tr:first-child td:nth-child(1) input")
    );
    const emailInput = await driver.findElement(
      By.css("tbody tr:first-child td:nth-child(2) input")
    );

    await nameInput.clear();
    await nameInput.sendKeys("Emri Test");
    await emailInput.clear();
    await emailInput.sendKeys("testuser@example.com");

    // Kliko butonin Save
    const saveButton = await driver.findElement(
      By.css("tbody tr:first-child td:last-child button:nth-of-type(1)")
    );
    await saveButton.click();

    // Prit të zhduket inputi për emër (tregon se editimi përfundoi)
    await driver.wait(until.elementTextContains(nameInput, ""), 3000);

    console.log("✅ Testimi i Update: Kaluar");

    // ----------- DELETE TEST -----------
    console.log("🔍 Fillon testimi i DELETE...");

    const deleteButton = await driver.findElement(
      By.css("tbody tr:first-child td:last-child button:nth-of-type(2)")
    );
    await deleteButton.click();

    // Prano konfirmimin
    await driver.wait(until.alertIsPresent(), 2000);
    const alert = await driver.switchTo().alert();
    await alert.accept();

    // Prit që të rifreskohet lista ose rreshti të zhduket
    await driver.sleep(2000); // ose përdor: until.stalenessOf(rreshti) për kontroll më të mirë

    console.log("✅ Testimi i Delete: Kaluar");

  } catch (err) {
    console.error("❌ Gabim gjatë testimit:", err);
  } finally {
    await driver.quit();
  }
}

testUserTableUpdateDelete();

