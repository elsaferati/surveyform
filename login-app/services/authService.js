export async function loginUser(username, password) {
    const response = await fetch("https://your-api.com/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
  
    return await response.json();
  }
  