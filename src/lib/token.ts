import jwt from 'jsonwebtoken';
import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
} from './constants';

// payload 타입 정의
interface JwtPayload {
  id: number;
}

// 토큰 생성 함수
export function generateTokens(userId: number) {
  const accessToken = jwt.sign({ id: userId }, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });
  
  return { accessToken, refreshToken };
}

// Access Token 검증
export function verifyAccessToken(token: string) {
 const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as JwtPayload;
 return { userId: decoded.id };
}

// Refresh Token 검증
export function verifyRefreshToken(token: string) {
  const decoded = jwt.verify(token, JWT_REFRESH_TOKEN_SECRET) as JwtPayload;
  return { userId: decoded.id };
}
