declare global {
  type UserRole = 'participant' | 'user' | 'admin';

  interface User {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
}

export {};
