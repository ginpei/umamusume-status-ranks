import { Link } from "react-router-dom";
import styles from "./GpBasicNavBar.module.scss";

export type GpBasicNavBarProps = {
  appName: string;
  homePath: string;
};

export const GpBasicNavBar: React.FC<GpBasicNavBarProps> = ({
  appName,
  homePath,
}) => {
  return (
    <div className={styles.root}>
      <div className="u-container">
        <Link to={homePath}>{appName}</Link>
      </div>
    </div>
  );
};
