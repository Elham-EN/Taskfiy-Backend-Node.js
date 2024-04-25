import express from "express";
import admin from "firebase-admin";
import "dotenv/config";
import { serverPort, serviceAccountId, serviceAccountKey } from "./constant";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";

// Initialize the admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  serviceAccountId: serviceAccountId,
});

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});
