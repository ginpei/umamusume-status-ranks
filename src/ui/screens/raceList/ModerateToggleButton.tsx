import styled from "styled-components";

export type ModerateToggleButtonProps = ButtonProps & {
  on: boolean;
  onChange: (on: boolean) => void;
};

type ButtonProps = Parameters<typeof ModerateToggleButtonRoot>[0];

export const ModerateToggleButton: React.FC<ModerateToggleButtonProps> = ({
  on,
  onChange,
  ...props
}) => {
  const onClick = () => {
    onChange(!on);
  };

  return <ModerateToggleButtonRoot {...props} data-on={on} onClick={onClick} />;
};

const ModerateToggleButtonRoot = styled.button`
  background-color: var(--spectrum-global-color-gray-75);
  border-radius: var(
    --spectrum-alias-border-radius-regular,
    var(--spectrum-global-dimension-size-50)
  );
  border-style: none;
  border-width: var(
    --spectrum-alias-border-size-thin,
    var(--spectrum-global-dimension-static-size-10)
  );
  font-size: var(
    --spectrum-alias-font-size-default,
    var(--spectrum-global-dimension-font-size-100)
  );
  font-weight: var(
    --spectrum-alias-body-text-font-weight,
    var(--spectrum-global-font-weight-regular)
  );

  &:hover,
  &:active {
    border-style: solid;
  }

  &[data-on="true"] {
    background-color: var(--spectrum-global-color-gray-200);
  }
`;
