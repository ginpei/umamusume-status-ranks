import { Link } from "react-router-dom";
import { useLoggedIn } from "../../../data/CurrentUserContext";
import { rootPath } from "../../../misc";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { LoginScreen } from "../loginScreen/LoginScreen";
import { LogoutForm } from "../../stateful/LogoutForm";
import { raceListPagePath } from "../raceList/RaceListPage";
import { LoginForm } from "../../stateful/LoginForm";

export function loginPagePath(): string {
  return `${rootPath()}login/`;
}

export const LoginPage: React.FC = () => {
  const loggedIn = useLoggedIn();

  if (!loggedIn) {
    return <LoginScreen />;
  }

  return (
    <BasicLayout title="ログイン">
      <h1>ログイン {loggedIn && "✅"}</h1>
      {loggedIn ? <Contents /> : <LoginForm />}
    </BasicLayout>
  );
};

const Contents: React.FC = () => {
  return (
    <div className="Contents">
      <ul>
        <li>
          <Link to={rootPath()}>ホーム</Link>
        </li>
        <li>
          <Link to={raceListPagePath()}>レース一覧</Link>
        </li>
      </ul>
      <h2>ログアウト</h2>
      <div className="u-margin">
        <LogoutForm />
      </div>
    </div>
  );
};
