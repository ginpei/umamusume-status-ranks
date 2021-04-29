import { useEffect, useState } from "react";
import { auth } from "../../../gp-firebase/firebase";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { LoginForm } from "./LoginForm";

export function loginPagePath(): string {
  return `${rootPath()}login`;
}

export const LoginPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setLoggedIn(user !== null);
    });
  }, []);

  return (
    <BasicLayout>
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
