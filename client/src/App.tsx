import Router from "./routers/Router";
import { getRoutes } from "./routers/routes";
import publicRoutes from "./routers/routes/publicRoute";

const App = () => {
  const allRoutes = getRoutes();
  return <Router allRoutes={[{ ...allRoutes }, ...publicRoutes]} />;
};

export default App;
