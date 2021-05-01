import { Link } from "react-router-dom";
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
      FooterContent={<FooterContent />}
      homePath={rootPath()}
      title={title}
    />
  );
};

const FooterContent: React.FC = () => {
  return (
    <div className="FooterContent">
      <Link to={rootPath()}>ウマ娘評価</Link>
    </div>
  );
};
