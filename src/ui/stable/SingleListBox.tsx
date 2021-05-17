import { ListBox } from "@react-spectrum/listbox";

export type SpectrumListBoxProps = Parameters<typeof ListBox>[0];

export type SelectionChangeHandler = SpectrumListBoxProps["onSelectionChange"];

export type SingleListOriginalProps = {
  onSelectionChange: (value: string) => void;
  selectedKey: string;
};

export type SingleListBoxProp = Omit<
  SpectrumListBoxProps,
  keyof SingleListOriginalProps | "selectionMode" | "selectedKeys"
> &
  SingleListOriginalProps;

export const SingleListBox = ({
  onSelectionChange,
  selectedKey,
  ...props
}: SingleListBoxProp): ReturnType<typeof ListBox> => {
  const onChange: SelectionChangeHandler = (keys) => {
    if (!(keys instanceof Set) || keys.size > 1) {
      throw new Error("Invalid keys selected");
    }
    const value = String(Array.from(keys.values())[0]);
    onSelectionChange(value);
  };

  return (
    <ListBox
      selectionMode="single"
      onSelectionChange={onChange}
      selectedKeys={[selectedKey]}
      width="100%"
      {...props}
    ></ListBox>
  );
};
