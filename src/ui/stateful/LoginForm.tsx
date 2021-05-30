import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../../gp-firebase/firebase";

const signInOptions = [
  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
];

// Twitter log in does not seem to work with emulator?
// I need another way
const withEmulator = process.env.REACT_APP_WITH_EMULATOR;
if (withEmulator) {
  signInOptions.push(firebase.auth.GithubAuthProvider.PROVIDER_ID);
}

const uiConfig: firebaseui.auth.Config = { signInOptions };

export const LoginForm: React.FC = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
};

export const LoginFormWithMessage: React.FC<{ message?: string }> = ({
  message = "ログインが必要です。",
}) => {
  return (
    <div>
      <p>{message}</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};
