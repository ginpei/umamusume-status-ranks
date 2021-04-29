import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./components/screens/home/HomePage";
import { LoginPage, loginPagePath } from "./components/screens/login/LoginPage";
import { NotFoundScreen } from "./components/screens/misc/NotFoundScreen";
import {
  RegisterPage,
  registerPagePath,
} from "./components/screens/register/RegisterPage";
import { rootPath } from "./misc";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={rootPath()} component={HomePage} />
        <Route exact={true} path={loginPagePath()} component={LoginPage} />
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
