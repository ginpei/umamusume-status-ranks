import { FocusEventHandler, useMemo } from "react";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const NiceInput: React.FC<InputProps> = ({ onFocus, ...props }) => {
  const onInputFocus = useMemo<FocusEventHandler<HTMLInputElement>>(() => {
    return (event) => {
      const el = event.currentTarget;
      if (el instanceof HTMLInputElement) {
        el.select();
      }
      onFocus?.(event);
    };
  }, [onFocus]);
  return <input onFocus={onInputFocus} {...props} />;
};
