import { User } from '@/modules/users/users.entity';
import { Request } from 'express';

export interface ExtendedRequest extends Request {
  user?: any; 
}