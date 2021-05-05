import { ChangeEventHandler, ReactElement } from "react";

export type GpCheckboxProps<T> = {
  checked: boolean;
  label: string;
  name: string;
  onChange: GpCheckboxChangeHandler<T>;
  value: T;
};

export type GpCheckboxChangeHandler<T> = (data: {
  checked: boolean;
  name: string;
  value: T;
}) => void;

export function GpCheckbox<T>(props: GpCheckboxProps<T>): ReactElement {
  const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget;
    props.onChange({
      checked,
      name: props.name,
      value: props.value,
    });
  };

  return (
    <label className="u-checkbox">
      <input
        name={props.name}
        onChange={onCheckboxChange}
        type="checkbox"
        value={String(props.value)}
      />
      {props.label}
    </label>
  );
}
