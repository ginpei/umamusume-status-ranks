import { Helmet } from "react-helmet-async";
import { GpBasicNavBar, GpBasicNavBarProps } from "./GpBasicNavBar";

export type GpBasicLayoutProps = GpBasicNavBarProps & {
  title: string;
};

export const GpBasicLayout: React.FC<GpBasicLayoutProps> = ({
  appName,
  children,
  homePath,
  title,
}) => {
  return (
    <div className="BasicLayout">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <GpBasicNavBar {...{ appName, homePath }} />
      <div className="u-container">{children}</div>
    </div>
  );
};
