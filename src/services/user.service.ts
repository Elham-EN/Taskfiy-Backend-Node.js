import admin from "firebase-admin";
import CreateUserData from "../models/user.model";

/**
 * Create a new Firebase Authentication user.
 * @param userData - accept object containing the profile information
 */
export async function createUser(userData: CreateUserData): Promise<string | null> {
  try {
    const userRecord = await admin.auth().createUser({
      displayName: userData.fullname,
      email: userData.email,
      password: userData.password,
    });
    console.log("User Successfully Created", userRecord.uid);
    // create custom token and send back to client
    const token = await admin.auth().createCustomToken(userRecord.uid);
    return token;
  } catch (error) {
    console.error("Failed to create user:", error);
    return null;
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
