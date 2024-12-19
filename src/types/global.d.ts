declare global {
  type UserRole = "participant" | "user" | "admin";
  interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  }
}
export {};
