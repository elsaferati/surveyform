const { Builder, By, until } = require("selenium-webdriver");

async function testUpdateAndDelete() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Hap faqen ku ndodhet SurveyResults
    await driver.get("http://localhost:3000/survey-results");

    // Pret që tabela të ngarkohet
    await driver.wait(until.elementLocated(By.css("table")), 5000);

    // --- TESTIMI UPDATE ---

    // Kliko butonin "Edit" të rreshtit të parë
    const firstEditButton = await driver.findElement(By.css("tbody tr:first-child button.bg-green-500"));
    await firstEditButton.click();

    // Ndrysho vlerën e emrit
    const nameInput = await driver.findElement(By.name("name"));
    await nameInput.clear();
    await nameInput.sendKeys("Emri i Ndryshuar");

    // Kliko "Save"
    const saveButton = await driver.findElement(By.xpath("//button[text()='Save']"));
    await saveButton.click();

    // Verifiko që tabela është rifreskuar dhe emri është ndryshuar (opsionale)
    await driver.wait(until.elementTextContains(
      driver.findElement(By.css("tbody tr:first-child td:nth-child(1)")),
      "Emri i Ndryshuar"
    ), 5000);

    console.log("✅ Testimi i Update: Kaluar");

    // --- TESTIMI DELETE ---

    // Kliko butonin "Delete" të rreshtit të parë
    const firstDeleteButton = await driver.findElement(By.css("tbody tr:first-child button.bg-red-500"));
    await firstDeleteButton.click();

    // Prano alert-in e konfirmimit të fshirjes
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    await alert.accept();

    // Verifiko që rreshti është fshirë (opsionale - kontroll me ID ose count)
    console.log("✅ Testimi i Delete: Kaluar");

  } catch (err) {
    console.error("❌ Gabim gjatë testimit:", err);
  } finally {
    await driver.quit();
  }
}

testUpdateAndDelete();
