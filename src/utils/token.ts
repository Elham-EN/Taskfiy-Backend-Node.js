import jwt from "jsonwebtoken";

export function generateToken(userId: string): string {
  const secretKey = "secret";
  const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: "24h" });
  return token;
}

export function verifyToken(token: string): string | jwt.JwtPayload {
  const decoded = jwt.verify(token, "secret");
  return decoded;
}
