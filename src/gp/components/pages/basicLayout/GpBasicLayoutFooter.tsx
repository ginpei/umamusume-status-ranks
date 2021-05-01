import styles from "./GpBasicLayoutFooter.module.scss";

export const GpBasicLayoutFooter: React.FC = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className="u-container">{children}</div>
    </div>
  );
};
