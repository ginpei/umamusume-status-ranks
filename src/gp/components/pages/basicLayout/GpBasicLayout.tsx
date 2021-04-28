import { GpBasicHeader, GpBasicHeaderProps } from "./GpBasicHeader";

export const GpBasicLayout: React.FC<GpBasicHeaderProps> = ({
  appName,
  children,
  homePath,
}) => {
  return (
    <div className="BasicLayout">
      <GpBasicHeader {...{ appName, homePath }} />
      <div className="u-container">{children}</div>
    </div>
  );
};
