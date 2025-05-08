from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Setup Chrome Driver
chrome_path = "C:/Program Files/Google/Chrome/Application/chrome.exe"
chromedriver_path = "C:/Users/VF/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe"

options = Options()
options.binary_location = chrome_path
service = Service(chromedriver_path)
driver = webdriver.Chrome(service=service, options=options)

# Constants
LOGIN_URL = "http://localhost:3000/login"
SUCCESS_PATH = "/survey"  # Update this if your app redirects elsewhere

def run_login_test(email, password, expected_success, description):
    try:
        driver.get(LOGIN_URL)

        wait = WebDriverWait(driver, 10)
        email_input = wait.until(EC.presence_of_element_located((By.ID, "email")))
        password_input = wait.until(EC.presence_of_element_located((By.ID, "password")))

        email_input.clear()
        password_input.clear()

        email_input.send_keys(email)
        password_input.send_keys(password)

        # Locate and click the login button
        login_button = wait.until(EC.element_to_be_clickable((By.ID, "loginButton")))
        login_button.click()

        time.sleep(3)  # wait for redirect

        if expected_success:
            if SUCCESS_PATH in driver.current_url:
                print(f"✅ {description} passed.")
            else:
                print(f"❌ {description} failed: Not redirected to expected path.")
        else:
            if SUCCESS_PATH in driver.current_url:
                print(f"❌ {description} failed: Unexpected redirect.")
            else:
                print(f"✅ {description} passed.")
    except Exception as e:
        print(f"❌ {description} failed: {e}")

# === Run Test Cases ===
print("=== Running Login Tests ===")

run_login_test("valira@gmail.com", "vali123", True, "Valid Login")           # Make sure this user exists!
run_login_test("valira@gmail.com", "wrongpass", False, "Wrong Password")
run_login_test("", "vali123", False, "Empty Email")
run_login_test("valira@gmail.com", "", False, "Empty Password")
run_login_test("", "", False, "Empty Fields")

driver.quit()



