import { useFocusRing } from "@react-aria/focus";
import { useListBox, useOption } from "@react-aria/listbox";
import { mergeProps } from "@react-aria/utils";
import { Item } from "@react-stately/collections";
import { ListProps, ListState, useListState } from "@react-stately/list";
import { useRef } from "react";
import { Node, Selection } from "../../misc/react-types-shared";
import styles from "./NiceListBox.module.scss";

export interface NiceListBoxProps extends SelectionOptions {
  onChange: SymbolSelectionChangeHandler;
  options: NiceListBoxOption[];
  value: string;
  width?: string;
}

export interface NiceListBoxOption {
  name: string;
  value: string;
}

export type SymbolSelectionChangeHandler = (option: string | undefined) => void;

interface SelectionOptions {
  label: string;
  width?: string;
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
  width,
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
        width={width}
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
    <div className={styles.Select} style={{ width: props.width }}>
      <div {...labelProps} className={styles.Select_label}>
        {props.label}
      </div>
      <ul {...listBoxProps} className={styles.Select_list} ref={ref}>
        {Array.from(state.collection).map((item) => (
          <Option key={item.key} item={item} state={state} />
        ))}
      </ul>
    </div>
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
      className={styles.Option}
      data-focusable={isFocusVisible}
      data-selected={isSelected}
      ref={ref}
    >
      {item.rendered}
    </li>
  );
}
