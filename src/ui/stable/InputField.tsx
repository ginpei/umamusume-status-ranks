import styles from "./InputField.module.scss";

export const InputField: React.FC<{ title: string }> = ({
  children,
  title,
}) => {
  return (
    <label className={styles.root}>
      <span className={styles.title}>{title}</span>
      <span className={styles.control}>{children}</span>
    </label>
  );
};

export const InputBlock: React.FC<{ title: string }> = ({
  children,
  title,
}) => {
  return (
    <span className={styles.root}>
      <span className={styles.title}>{title}</span>
      <span className={styles.control}>{children}</span>
    </span>
  );
};
