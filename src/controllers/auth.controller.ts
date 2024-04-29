import { Request, Response } from "express";
import UserLoginData from "../models/auth.model";
import { loginUser } from "../services/auth.service";
import { FirebaseError } from "firebase-admin";

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body as UserLoginData;
  try {
    const data = await loginUser(email, password);
    const token = data.idToken;
    res.status(201).json({ message: "User is now signed in", token: token });
  } catch (error) {
    const firebaseError = error as FirebaseError;
    res.status(400).json({ message: "Wrong user credentials", token: null });
  }
}
