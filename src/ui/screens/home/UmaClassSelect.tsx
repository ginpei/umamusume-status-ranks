import { UmaClass, umaClasses } from "../../../data/RaceEntry";
import { VRadioGroup } from "../../stable/VRadioGroup";
import styles from "./UmaClassSelect.module.scss";

export type OnUmaClassChange = (name: string, value: UmaClass) => void;

export const UmaClassSelect: React.FC<{
  disabled: boolean;
  name: string;
  onChange: OnUmaClassChange;
  value: UmaClass;
}> = ({ disabled, name, onChange, value }) => {
  const labels = umaClasses.map((v) => String(v));
  return (
    <VRadioGroup
      disabled={disabled}
      LabelWrapper={({ children }) => (
        <span className={styles.label}>{children}</span>
      )}
      labels={labels}
      name={name}
      onChange={onChange}
      options={umaClasses}
      value={value}
    />
  );
};
