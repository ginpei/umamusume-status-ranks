import { Link } from "react-router-dom";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { loginPagePath } from "../login/LoginPage";
import { raceListPagePath } from "../raceList/RaceListPage";
import { registerPagePath } from "../register/RegisterPage";
import { umaListPagePath } from "../umaList/UmaListPage";

export const HomePage: React.FC = () => {
  return (
    <BasicLayout title="ウマ娘評価">
      <h1>HomePage</h1>
      <p>
        <Link to={loginPagePath()}>ログイン</Link>
      </p>
      <p>
        <Link to={registerPagePath()}>追加</Link>
      </p>
      <p>
        <Link to={umaListPagePath()}>ウマ娘一覧</Link>
      </p>
      <p>
        <Link to={raceListPagePath()}>レース一覧</Link>
      </p>
    </BasicLayout>
  );
};
