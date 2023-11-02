import { ICreateRouter, ICreateRouterParams } from './ICreateRouter';
import { ISingleRoute } from '../SingleRoute/ISingleRoute';
import { Router, RouterOptions } from 'express';
import p from 'path';

export class CreateRouter implements ICreateRouter {
  private routes: ICreateRouterParams<ISingleRoute>[] = [];

  constructor(private baseUrl: string, private routerOptions?: RouterOptions) {}

  public get router() {
    const r = Router(this.routerOptions);

    this.routes.forEach(({ method, path, routeHandler, middleWares }) => {
      const fullPath = p.join(this.baseUrl, path);
      r[method](fullPath, middleWares || [], routeHandler);
    });

    return r;
  }

  appendRoute = (params: ICreateRouterParams<ISingleRoute>) => {
    this.routes.push(params);

    return {
      disable: () => {
        const { method, path } = params;
        this.routes = this.routes.filter(r => r.method != method && r.path != path);
      },
    };
  };
}
