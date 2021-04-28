import { GpBasicLayout } from "../../../gp/components/pages/basicLayout/GpBasicLayout";

export const BasicLayout: React.FC = ({ children }) => {
  return (
    <GpBasicLayout appName="ウマ娘評価" children={children} homePath="/" />
  );
};
