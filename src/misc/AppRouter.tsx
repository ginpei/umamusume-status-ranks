import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { rootPath } from "../misc";
import {
  EntryListPage,
  entryListPagePath,
} from "../ui/screens/entryList/EntryListPage";
import { HomePage } from "../ui/screens/home/HomePage";
import { LoginPage, loginPagePath } from "../ui/screens/loginPage/LoginPage";
import { NotFoundScreen } from "../ui/screens/notFound/NotFoundScreen";
import {
  RaceListPage,
  raceListPagePath,
} from "../ui/screens/raceList/RaceListPage";
import {
  RaceViewPage,
  raceViewPagePath,
} from "../ui/screens/raceView/RaceViewPage";
import {
  RegisterPage,
  registerPagePath,
} from "../ui/screens/register/RegisterPage";

export const AppRouter: React.FC = () => {
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
        <Route
          exact={true}
          path={raceListPagePath()}
          component={RaceListPage}
        />
        <Route
          exact={true}
          path={raceViewPagePath(":raceTitle")}
          component={RaceViewPage}
        />
        <Route
          exact={true}
          path={entryListPagePath(":raceTitle")}
          component={EntryListPage}
        />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
};
