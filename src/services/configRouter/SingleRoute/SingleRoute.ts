import { ISingleRoute } from './ISingleRoute';

export class SingleRoute implements ISingleRoute {
  constructor(
    public method: ISingleRoute['method'],
    public path: ISingleRoute['path'],
    public routeHandler: ISingleRoute['routeHandler'],
    public middlewares?: ISingleRoute['middleWares']
  ) {}

  public get routeData() {
    return {
      method: this.method,
      path: this.path,
      routeHandler: this.routeHandler,
      middleWares: this.middlewares,
    };
  }
}
