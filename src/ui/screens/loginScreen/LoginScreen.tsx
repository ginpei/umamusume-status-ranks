import React, { useEffect, useState } from "react";
import { auth } from "../../../gp-firebase/firebase";
import { LoginForm } from "../../stateful/LoginForm";
import { LogoutForm } from "../../stateful/LogoutForm";
import { BasicLayout } from "../basicLayout/BasicLayout";

export const LoginScreen: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setLoggedIn(user !== null);
    });
  }, []);

  return (
    <BasicLayout title="ログイン">
      <h1>ログイン</h1>
      <div className="u-margin">
        {loggedIn ? <LogoutForm /> : <LoginForm />}
      </div>
    </BasicLayout>
  );
};
