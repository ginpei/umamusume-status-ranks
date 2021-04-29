import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CurrentUserProvider } from "./data/CurrentUserContext";
import { useFirebaseCurrentUser } from "./data/useFirebaseCurrentUserHook";
import { auth } from "./gp-firebase/firebase";
import { rootPath } from "./misc";
import { HomePage } from "./ui/screens/home/HomePage";
import { LoginPage, loginPagePath } from "./ui/screens/login/LoginPage";
import { NotFoundScreen } from "./ui/screens/misc/NotFoundScreen";
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
          <Route component={NotFoundScreen} />
        </Switch>
      </BrowserRouter>
    </CurrentUserProvider>
  );
};

export default App;
