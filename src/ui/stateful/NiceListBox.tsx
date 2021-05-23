import { useFocusRing } from "@react-aria/focus";
import { useListBox, useOption } from "@react-aria/listbox";
import { mergeProps } from "@react-aria/utils";
import { Item } from "@react-stately/collections";
import { ListProps, ListState, useListState } from "@react-stately/list";
import { useRef } from "react";
import { Node, Selection } from "../../misc/react-types-shared";

export interface NiceListBoxProps extends SelectionOptions {
  onChange: SymbolSelectionChangeHandler;
  options: NiceListBoxOption[];
  value: string;
}

export interface NiceListBoxOption {
  name: string;
  value: string;
}

export type SymbolSelectionChangeHandler = (option: string | undefined) => void;

interface SelectionOptions {
  label: string;
}

interface OptionProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

export const NiceListBox: React.VFC<NiceListBoxProps> = ({
  label,
  onChange,
  options,
  value,
}) => {
  const onSelectionChange = (selection: Selection) => {
    if (!(selection instanceof Set)) {
      return;
    }

    const { value: selectedValue } = selection.keys().next();
    onChange(selectedValue);
  };

  return (
    <>
      <Select
        label={label}
        onSelectionChange={onSelectionChange}
        selectedKeys={[value]}
        selectionMode="single"
      >
        {options.map(({ name, value: v }) => (
          <Item key={v}>{name}</Item>
        ))}
      </Select>
    </>
  );
};

function Select<T extends Record<string, unknown>>(
  props: ListProps<T> & SelectionOptions
): JSX.Element {
  const state = useListState(props);
  const ref = useRef() as React.RefObject<HTMLUListElement>;
  const { listBoxProps, labelProps } = useListBox(props, state, ref);

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <ul
        {...listBoxProps}
        ref={ref}
        style={{
          padding: 0,
          margin: "5px 0",
          listStyle: "none",
          border: "1px solid gray",
          maxWidth: 250,
        }}
      >
        {Array.from(state.collection).map((item) => (
          <Option key={item.key} item={item} state={state} />
        ))}
      </ul>
    </>
  );
}

function Option<T>({ item, state }: OptionProps<T>) {
  // Get props for the option element
  const ref = useRef() as React.RefObject<HTMLLIElement>;
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
    },
    state,
    ref
  );

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      style={{
        background: isSelected ? "blueviolet" : "transparent",
        color: isSelected ? "white" : undefined,
        padding: "2px 5px",
        outline: isFocusVisible ? "2px solid orange" : "none",
      }}
    >
      {item.rendered}
    </li>
  );
}
