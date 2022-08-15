import { ISignPayload } from '../../helpers/types/token.types';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: ISignPayload;
}
export interface ISuccessResponse {
  success: string;
}
