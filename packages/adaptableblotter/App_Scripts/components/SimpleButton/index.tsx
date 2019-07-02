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
