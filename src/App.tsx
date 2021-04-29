import { BrowserRouter, Switch } from "react-router-dom";
import { CurrentUserProvider } from "./data/CurrentUserContext";
import { useFirebaseCurrentUser } from "./data/useFirebaseCurrentUserHook";
import { auth } from "./gp-firebase/firebase";
import { AppRouter } from "./mist/AppRouter";

const App: React.FC = () => {
  const user = useFirebaseCurrentUser(auth);

  if (!user) {
    return <></>;
  }

  return (
    <CurrentUserProvider value={user}>
      <AppRouter />
    </CurrentUserProvider>
  );
};

export default App;
