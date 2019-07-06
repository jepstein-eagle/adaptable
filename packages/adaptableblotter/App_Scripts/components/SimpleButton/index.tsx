import * as React from 'react';

import { Button, ButtonProps } from 'rebass';
import { ReactNode, HTMLProps } from 'react';
import join from '../utils/join';

import icons from '../icons';

import { ReactComponentLike } from 'prop-types';
import Tooltip from '../Tooltip';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';

export const baseClassName = 'ab-SimpleButton';

export type SimpleButtonProps = HTMLProps<HTMLElement> & {
  tooltip?: string;
  variant?: 'text' | 'outlined' | 'raised' | 'unelevated';
  tone?: 'success' | 'error' | 'neutral';
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  disabled?: boolean;
  bsStyle?: any;
  AccessLevel?: AccessLevel;
} & ButtonProps;

const SimpleButton = (props: SimpleButtonProps) => {
  let {
    children,
    disabled,
    variant = 'outlined',
    tone = 'neutral',
    iconPosition = 'start',
    className,
    icon,
    tooltip,
    ...buttonProps
  } = props;

  if (typeof icon === 'string' && icons[icon]) {
    const IconCmp = icons[icon] as ReactComponentLike;
    icon = <IconCmp />;
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

  // the current implementation of tooltip does not allow responding to blur events on the element
  // return tooltip ? <Tooltip label={tooltip}>{btn}</Tooltip> : btn;
  return btn;
};

export default SimpleButton;
