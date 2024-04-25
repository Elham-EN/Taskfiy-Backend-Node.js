import fetch from "node-fetch";
import { firebaseApiKey } from "../constant";
import { FirebaseError } from "firebase-admin";
import { response } from "express";

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
    const response = await fetch(`${BaseURL}:signInWithPassword?key=${API_KEY}`, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = (await response.json()) as LoginResData;
    return data;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.log("Failed to login", firebaseError);
    throw firebaseError;
  }
}
