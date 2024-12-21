export type GenericObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export enum UserRoleEnum {
  PARTICIPANT = 'participant',
  USER = 'user',
  ADMIN = 'admin',
}
