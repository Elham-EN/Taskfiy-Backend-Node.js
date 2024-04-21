import express from "express";
import admin from "firebase-admin";
import "dotenv/config";
import { serverPort, serviceAccountId, serviceAccountKey } from "./constant";
import userRouter from "./routes/user.route";

// Initialize the SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  serviceAccountId: serviceAccountId,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});
