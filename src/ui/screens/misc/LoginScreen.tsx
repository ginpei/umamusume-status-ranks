import React, { useEffect, useState } from "react";
import { auth } from "../../../gp-firebase/firebase";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { LoginForm } from "../login/LoginForm";

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

const LogoutForm: React.FC = () => {
  const [dirty, setDirty] = useState(false);

  const onClick = async () => {
    setDirty(true);
    await auth.signOut();
  };

  return (
    <div className="LogoutForm">
      <button disabled={dirty} onClick={onClick}>
        ログアウト
      </button>
    </div>
  );
};
