import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "development_secret_key";

export function generateTokens(userId: number) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: number };
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: number };
}
