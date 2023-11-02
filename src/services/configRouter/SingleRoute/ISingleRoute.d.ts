import { HttpMethod } from '../../../types';
import { RequestHandler } from 'express';

export interface ISingleRoute {
  middleWares?: RequestHandler[];
  routeHandler: RequestHandler;
  method: HttpMethod;
  path: string;
}
