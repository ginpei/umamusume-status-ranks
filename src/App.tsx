import { Provider as SpectrumProvider } from "@adobe/react-spectrum";
import { HelmetProvider } from "react-helmet-async";
import { CurrentUserProvider } from "./data/CurrentUserContext";
import { useFirebaseCurrentUser } from "./data/useFirebaseCurrentUserHook";
import { auth } from "./gp-firebase/firebase";
import { AppRouter } from "./misc/AppRouter";
import { appTheme } from "./misc/appTheme";

const App: React.FC = () => {
  const user = useFirebaseCurrentUser(auth);

  if (!user) {
    return <></>;
  }

  return (
    <HelmetProvider>
      <SpectrumProvider theme={appTheme}>
        <CurrentUserProvider value={user}>
          <AppRouter />
        </CurrentUserProvider>
      </SpectrumProvider>
    </HelmetProvider>
  );
};

export default App;
