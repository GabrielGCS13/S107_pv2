import IUser from '@interfaces/IUser';
import { Request } from 'express';

export default interface IGenericAuthenticatedRequest extends Request {
  user: IUser;
}
