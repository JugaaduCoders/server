import { GetUserDCO } from '../user/userDCO';

export type UserLoginDCO = {
  user: GetUserDCO;
  authToken: string;
};
