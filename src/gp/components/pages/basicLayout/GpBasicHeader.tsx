import { Link } from "react-router-dom";
import styles from "./GpBasicHeader.module.scss";

export type GpBasicHeaderProps = {
  appName: string;
  homePath: string;
};

export const GpBasicHeader: React.FC<GpBasicHeaderProps> = ({
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
