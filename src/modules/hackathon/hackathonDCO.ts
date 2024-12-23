export type GetHackathonDCO = {
  id: number;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
  createdBy: number | null;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  isPublic: boolean | null;
  maxTeamSize: number | null;
  imageUrl: string | null;
};
