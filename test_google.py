from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

# Set path to your chromedriver.exe
service = Service(service = Service("C:/Users/VF/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe"))  # ← Replace with actual path

# Start the Chrome browser
driver = webdriver.Chrome(service=service)

# Open Google
driver.get("https://www.google.com")

# Wait for 3 seconds
time.sleep(3)

# Find the search box and type a query
search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("Selenium testing")

# Submit the search form
search_box.submit()

# Wait to see results
time.sleep(5)

# Close the browser
driver.quit()
