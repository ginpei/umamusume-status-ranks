import { ReactElement } from "react";
import styles from "./VRadioGroup.module.scss";

type OnChangeHandler<T> = (name: string, value: T) => void;

export function VRadioGroup<T>({
  disabled,
  LabelWrapper = Noop,
  labels,
  name,
  onChange,
  options,
  value,
}: {
  disabled: boolean;
  LabelWrapper?: React.FC;
  labels: readonly string[];
  name: string;
  onChange: (name: string, value: T) => void;
  options: readonly T[];
  value: T;
}): ReactElement {
  return (
    <span className={styles.root}>
      {options.map((option, index) => (
        <Item
          {...{ disabled, LabelWrapper, name, onChange, option }}
          checked={option === value}
          key={String(option)}
          label={labels[index]}
        />
      ))}
    </span>
  );
}

export function Item<T>({
  disabled,
  checked,
  label,
  LabelWrapper,
  name,
  onChange,
  option,
}: {
  checked: boolean;
  disabled: boolean;
  label: string;
  LabelWrapper: React.FC;
  name: string;
  onChange: OnChangeHandler<T>;
  option: T;
}): ReactElement {
  const onInputChange = () => {
    onChange(name, option);
  };

  return (
    <label
      className={styles.Item}
      data-checked={checked}
      data-disabled={disabled}
      tabIndex={0}
    >
      <input
        checked={checked}
        className={styles.Item_input}
        disabled={disabled}
        name={name}
        onChange={onInputChange}
        type="radio"
        value={String(option)}
      />
      <LabelWrapper>{label}</LabelWrapper>
    </label>
  );
}

const Noop: React.FC = ({ children }) => {
  return <>{children}</>;
};
