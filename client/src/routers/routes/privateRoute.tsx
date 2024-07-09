import { adminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";

export const privateRoutes = [...adminRoutes, ...userRoutes];
