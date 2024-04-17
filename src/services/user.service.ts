import admin from "firebase-admin";

/**
 * Create a new Firebase Authentication user.
 * @param userData - accept object containing the profile information
 */
export async function createUser(userData: any) {
  await admin.auth().createUser({});
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
