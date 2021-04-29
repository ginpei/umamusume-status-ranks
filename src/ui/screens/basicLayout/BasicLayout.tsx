import { GpBasicLayout } from "../../../gp/components/pages/basicLayout/GpBasicLayout";
import { rootPath } from "../../../misc";

export const BasicLayout: React.FC<{ title: string }> = ({
  children,
  title,
}) => {
  return (
    <GpBasicLayout
      appName="ウマ娘評価"
      children={children}
      homePath={rootPath()}
      title={title}
    />
  );
};
