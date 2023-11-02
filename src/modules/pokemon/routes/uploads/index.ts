import { CreateRouter } from "../../../../services/configRouter/CreateRouter/CreateRouter";
import { seedExcelRoute } from "./seedExcel.route";

const uploadRouterObj = new CreateRouter("/uploads");
uploadRouterObj.appendRoute(seedExcelRoute.routeData);

export const uploadRouter = uploadRouterObj.router;
