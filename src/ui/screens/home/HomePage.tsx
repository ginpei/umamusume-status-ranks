import { Link } from "react-router-dom";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { loginPagePath } from "../login/LoginPage";
import { raceListPagePath } from "../raceList/RaceListPage";
import { registerPagePath } from "../register/RegisterPage";

export const HomePage: React.FC = () => {
  return (
    <BasicLayout title="ウマ娘評価">
      <h1>コンテンツ</h1>
      <ul>
        <li>
          <Link to={raceListPagePath()}>レース一覧（出走記録を閲覧）</Link>
        </li>
        <li>
          <Link to={registerPagePath()}>出走記録を追加</Link>
        </li>
        <li>
          <Link to={loginPagePath()}>ログイン</Link>
        </li>
      </ul>
      <h1>外部リンク🚀</h1>
      <ul>
        <li>
          ゲーム公式：
          <a href="https://umamusume.jp/" target="_blank">
            ウマ娘 プリティーダービー 公式ポータルサイト｜Cygames
          </a>
        </li>
        <li>
          レース情報：
          <a
            href="https://docs.google.com/spreadsheets/d/1iNbk3SnfOGxE1NE-FYXQCK6DQ0VrAE2REVRbZ488CjY/edit#gid=360769166"
            target="_blank"
          >
            【ウマ娘】全レースカレンダー(ウマ娘目標付き) ver1.2.1 - Google
            Sheets
          </a>
        </li>
      </ul>
    </BasicLayout>
  );
};
