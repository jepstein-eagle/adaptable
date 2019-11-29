import * as React from 'react';

import { Button, ButtonProps } from 'rebass';
import { ReactNode } from 'react';
import join from '../utils/join';

import icons from '../icons';

import { ReactComponentLike } from 'prop-types';
import Tooltip from '../Tooltip';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { IconProps } from '../icons/DefaultIcon';

export const baseClassName = 'ab-SimpleButton';

export interface SimpleButtonProps extends ButtonProps {
  tooltip?: string;
  variant?: 'text' | 'outlined' | 'raised' | 'unelevated';
  tone?: 'success' | 'error' | 'neutral' | 'none' | 'warning' | 'info' | 'accent';
  icon?: ReactNode;
  iconSize?: number;
  iconPosition?: 'start' | 'end';
  disabled?: boolean;
  AccessLevel?: AccessLevel;
  children?: ReactNode | ReactNode[];
}

const SimpleButton = (props: SimpleButtonProps & React.HTMLProps<HTMLButtonElement>) => {
  let {
    children,
    disabled,
    variant = 'outlined',
    tone = 'neutral',
    iconPosition = 'start',
    iconSize,
    className,
    icon,
    tooltip,
    AccessLevel: accessLevel,
    type,
    ...buttonProps
  } = props;

  if (typeof icon === 'string' && icons[icon]) {
    const IconCmp = icons[icon] as ReactComponentLike;
    const iconProps: IconProps = {};
    if (iconSize) {
      iconProps.size = iconSize;
    }
    icon = <IconCmp {...iconProps} />;
  }

  if (icon) {
    children =
      iconPosition === 'start' ? (
        <>
          {icon}
          {children}
        </>
      ) : (
        <>
          {children}
          {icon}
        </>
      );
  }

  if (buttonProps.as == 'div') {
    // we have some cases when we want to nest a SimpleButton inside an html Button
    // so the SimpleButton cannot render a <button> tag
    // so we want it to be a DIV tag
    // but still keep the same keyboard accessibility

    buttonProps.tabIndex = buttonProps.tabIndex === undefined ? 0 : buttonProps.tabIndex;

    buttonProps.role = buttonProps.role || 'button';

    const onKeyDown = buttonProps.onKeyDown;
    buttonProps.onKeyDown = (e: React.SyntheticEvent) => {
      const key = (e as any).key;
      if (buttonProps.onClick && key === 'Enter') {
        buttonProps.onClick(e as any);
      }
      if (onKeyDown) {
        onKeyDown(e as any);
      }
    };
  }

  if (!buttonProps.as || buttonProps.as === 'button') {
    (buttonProps as any).type = type ? type : 'button';
  }

  if (accessLevel === AccessLevel.Hidden) {
    return null;
  }

  if (accessLevel === AccessLevel.ReadOnly) {
    disabled = true;
  }

  tooltip = null;
  const btn = (
    <Button
      {...buttonProps}
      disabled={disabled}
      className={join(
        className,
        baseClassName,
        disabled ? `${baseClassName}--disabled` : '',
        `${baseClassName}--variant-${variant}`,
        `${baseClassName}--tone-${tone}`
      )}
    >
      {children}
    </Button>
  );

  return tooltip ? <Tooltip label={tooltip}>{btn}</Tooltip> : btn;
};

SimpleButton.defaultProps = {
  px: null,
  py: null,
  fontWeight: 'normal',
  m: null,
  borderRadius: null,
};
export default SimpleButton;
