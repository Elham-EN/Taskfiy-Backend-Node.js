import express from "express";
import admin from "firebase-admin";
import "dotenv/config";
import { serverPort, serviceAccountKey } from "./constant";

// Initialize the SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const app = express();

app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});
