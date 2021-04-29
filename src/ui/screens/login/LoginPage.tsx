import { rootPath } from "../../../misc";
import { LoginScreen } from "../misc/LoginScreen";

export function loginPagePath(): string {
  return `${rootPath()}login`;
}

export const LoginPage: React.FC = () => {
  return <LoginScreen />;
};
