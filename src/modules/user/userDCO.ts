export type GetUserDCO = {
  id: number;
  password: string | null;
  firstName: string;
  lastName: string | null;
  email: string;
  role: UserRole;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
};
