import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../../../gp-firebase/firebase";

const uiConfig: firebaseui.auth.Config = {
  callbacks: {
    signInSuccessWithAuthResult() {
      return false;
    },
  },
  signInOptions: [
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export const LoginForm: React.FC = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
};
