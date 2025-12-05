import jwt from 'jsonwebtoken';

// --- Utils ---

function filterSensitiveUserData(user) {
  const { password, ...rest } = user;
  return rest;
}

async function verifyPassword(inputPassword: string, storedPassword: string) {
  const isMatch = await passwordHasher.compare(inputPassword, storedPassword);
  if (!isMatch) {
    const error = new Error('Unauthorized');
    (error as any).status = 401;
    throw error;
  }
}

// --- Auth Functions ---

export async function getUser(email: string, password: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    const error = new Error('Unauthorized');
    (error as any).status = 401;
    throw error;
  }

  await verifyPassword(password, user.password);

  return filterSensitiveUserData(user);
}

export function createToken(user: { id: number; email: string }) {
  const payload = { userId: user.id };
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, process.env.JWT_SECRET as string, options);
}

// --- User Service (Singleton) ---

export default class UserService {
  private static instance: UserService;

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  getUser(id: number): string {
    return `User ${id}`;
  }
}
