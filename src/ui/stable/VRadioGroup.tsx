import { ReactElement } from "react";
import styles from "./VRadioGroup.module.scss";

type OnChangeHandler<T> = (name: string, value: T) => void;

export function VRadioGroup<T>({
  disabled,
  labels,
  name,
  onChange,
  options,
  value,
}: {
  disabled: boolean;
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
          {...{ disabled, name, onChange, option }}
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
  name,
  onChange,
  option,
}: {
  checked: boolean;
  disabled: boolean;
  label: string;
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
      {label}
    </label>
  );
}
