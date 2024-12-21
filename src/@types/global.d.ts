declare global {
  type UserRole = 'participant' | 'user' | 'admin';

  enum UserRoleEnum {
    PARTICIPANT = 'participant',
    USER = 'user',
    ADMIN = 'admin',
  }
  
  interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  }
}

export {};
