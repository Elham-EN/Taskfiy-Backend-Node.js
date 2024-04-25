import admin, { auth, FirebaseError } from "firebase-admin";
import CreateUserData from "../models/user.model";
import { generateToken } from "../utils/token";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

/**
 * Create a new Firebase Authentication user.
 * @param userData - accept object containing the profile information
 * @returns The new user's custom token, or null if creation failed.
 */
export async function createUser(userData: CreateUserData): Promise<string | null> {
  try {
    let userExist: UserRecord | null;
    try {
      // Try to retrieve user by email to check existence
      userExist = await admin.auth().getUserByEmail(userData.email);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === "auth/user-not-found") {
        userExist = null;
      } else {
        throw error;
      }
    }
    if (userExist) {
      // If user exists, throw an exception or handle accordingly
      throw new Error("User already exists with that email");
    }
    // Creare user record
    const userRecord = await admin.auth().createUser({
      displayName: userData.fullname,
      email: userData.email,
      password: userData.password,
    });
    console.log("User Successfully Created", userRecord.uid);
    // create custom token and send back to client
    const token = generateToken(userRecord.uid);
    return token;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.error("Failed to create user:", firebaseError);
    throw firebaseError;
  }
}

/**
 *  Modifying an existing user's data
 * @param userId - current user id
 * @param userData - accept object containing the profile information
 */
export async function updateUser(userId: string, userData: any) {
  await admin.auth().updateUser(userId, userData);
}

/**
 * Fetching the profile information of users by their uid
 * @param userId - current user id
 */
export async function getUserData(userId: string) {
  await admin.auth().getUser(userId);
}
/**
 * Deleting existing users by their uid
 * @param userId - current user id
 */
export async function deleteUser(userId: string) {
  await admin.auth().deleteUser(userId);
}
