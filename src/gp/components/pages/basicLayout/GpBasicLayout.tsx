import { GpBasicNavBar, GpBasicNavBarProps } from "./GpBasicNavBar";

export const GpBasicLayout: React.FC<GpBasicNavBarProps> = ({
  appName,
  children,
  homePath,
}) => {
  return (
    <div className="BasicLayout">
      <GpBasicNavBar {...{ appName, homePath }} />
      <div className="u-container">{children}</div>
    </div>
  );
};
