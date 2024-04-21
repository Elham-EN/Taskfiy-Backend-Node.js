import { Response, Request } from "express";
import CreateUserData from "../models/user.model";
import { createUser } from "../services/user.service";

export async function createUserHandler(req: Request, res: Response) {
  const createUserData = req.body as CreateUserData;
  try {
    const token = await createUser(createUserData);
    if (!token) {
      return res
        .status(400)
        .json({ message: "Failed to create a new user", token: null });
    }
    res.status(201).json({ message: "User successfully created", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", token: null });
  }
}
