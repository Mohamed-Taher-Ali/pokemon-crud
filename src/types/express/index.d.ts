import { ICustomRequestAttrs } from "./customRequestAttrs";

export {};

declare global {
  namespace Express {
    export interface Request extends ICustomRequestAttrs {}
  }
}
