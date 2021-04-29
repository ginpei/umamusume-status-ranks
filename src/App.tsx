import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CurrentUserProvider } from "./data/CurrentUserContext";
import { useFirebaseCurrentUser } from "./data/useFirebaseCurrentUserHook";
import { auth } from "./gp-firebase/firebase";
import { rootPath } from "./misc";
import {
  EntryListPage,
  entryListPagePath,
} from "./ui/screens/entryList/EntryListPage";
import { HomePage } from "./ui/screens/home/HomePage";
import { LoginPage, loginPagePath } from "./ui/screens/login/LoginPage";
import { NotFoundScreen } from "./ui/screens/misc/NotFoundScreen";
import {
  RaceListPage,
  raceListPagePath,
} from "./ui/screens/raceList/RaceListPage";
import {
  RegisterPage,
  registerPagePath,
} from "./ui/screens/register/RegisterPage";

const App: React.FC = () => {
  const user = useFirebaseCurrentUser(auth);

  if (!user) {
    return <></>;
  }

  return (
    <CurrentUserProvider value={user}>
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
            path={entryListPagePath(":raceTitle")}
            component={EntryListPage}
          />
          <Route component={NotFoundScreen} />
        </Switch>
      </BrowserRouter>
    </CurrentUserProvider>
  );
};

export default App;
