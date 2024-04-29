import { firebaseApiKey } from "../constant";
import { FirebaseError } from "firebase-admin";
import axios from "axios";

const API_KEY = firebaseApiKey;
const BaseURL = "https://identitytoolkit.googleapis.com/v1/accounts";

interface LoginResData {
  idToken: string;
  email: string;
}

/**
 * sign in a user with an email and password by issuing an HTTP
 * POST request to the Auth verifyPassword endpoint
 * @param email
 * @param password
 * @returns  Login Response Data: idToken & email
 */
export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${BaseURL}:signInWithPassword?key=${API_KEY}`, {
      email: email,
      password: password,
    });
    console.log("auth service", response.data.error);
    return response.data;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.log("Failed to login", firebaseError.message);
    throw firebaseError;
  }
}
