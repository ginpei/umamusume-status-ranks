import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotFoundScreen } from "./components/misc/NotFoundScreen";
import { HomePage } from "./components/pages/home/HomePage";
import {
  RegisterPage,
  registerPagePath,
} from "./components/pages/register/RegisterPage";
import { rootPath } from "./misc";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={rootPath()} component={HomePage} />
        <Route
          exact={true}
          path={registerPagePath()}
          component={RegisterPage}
        />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
