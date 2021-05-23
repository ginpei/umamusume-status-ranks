import { TextField as TextFieldOrig } from "@react-spectrum/textfield";
import { useState } from "react";
import { TextField } from "../../vendor/TextField";

export type TextListFieldProps = Parameters<typeof TextFieldOrig>[0] & {
  options: string[];
};
export const TextListField: React.FC<TextListFieldProps> = ({
  options,
  ...props
}) => {
  const [listId] = useState(`TextField-${generateId()}`);

  return (
    <>
      <TextField list={listId} {...props} />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </datalist>
    </>
  );
};

function generateId() {
  return Math.random().toFixed(32).slice(2);
}
