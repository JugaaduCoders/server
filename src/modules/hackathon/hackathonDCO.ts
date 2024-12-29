export type GetHackathonDCO = {
  id: number;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
  createdBy: number | null;
  registrationDeadline: Date;
  startDate: Date;
  endDate: Date;
  isPublic: boolean | null;
  maxTeamSize: number | null;
  imageUrl: string | null;
  overview: string;
};
