import { User } from "../models/User";

// logjika e thjeshtë për kontrollin e login-it
export function handleLogin(username, password) {
  const user = new User(username, password);

  if (user.username === "admin" && user.password === "1234") {
    return { success: true };
  }

  return { success: false, message: "Username ose password gabim." };
}
