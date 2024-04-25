import express from "express";
import { loginHandler } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", loginHandler);

export default authRouter;
