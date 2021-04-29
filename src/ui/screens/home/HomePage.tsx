import { Link } from "react-router-dom";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { loginPagePath } from "../login/LoginPage";
import { registerPagePath } from "../register/RegisterPage";

export const HomePage: React.FC = () => {
  return (
    <BasicLayout>
      <h1>HomePage</h1>
      <p>
        <Link to={loginPagePath()}>ログイン</Link>
      </p>
      <p>
        <Link to={registerPagePath()}>追加</Link>
      </p>
    </BasicLayout>
  );
};
