import { ISingleRoute } from '../SingleRoute/ISingleRoute';
import { Router } from 'express';

type ICreateRouterParams<T> = T & {};

type IAppendRouteRet = {
  disable: () => void;
};

export interface ICreateRouter {
  router: Router;
  appendRoute: (routeParams: ICreateRouterParams<ISingleRoute>) => IAppendRouteRet;
}
