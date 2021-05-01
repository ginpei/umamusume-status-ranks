import { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { GpBasicLayoutFooter } from "./GpBasicLayoutFooter";
import { GpBasicNavBar, GpBasicNavBarProps } from "./GpBasicNavBar";
import styles from "./GpBasicLayout.module.scss";

export type GpBasicLayoutProps = GpBasicNavBarProps & {
  title: string;
  FooterContent: ReactElement;
};

export const GpBasicLayout: React.FC<GpBasicLayoutProps> = ({
  appName,
  children,
  FooterContent,
  homePath,
  title,
}) => {
  return (
    <div className="BasicLayout">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <GpBasicNavBar {...{ appName, homePath }} />
      <div className={styles.main}>
        <div className="u-container">{children}</div>
      </div>
      <GpBasicLayoutFooter>{FooterContent}</GpBasicLayoutFooter>
    </div>
  );
};
