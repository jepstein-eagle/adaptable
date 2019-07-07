import * as React from 'react';
import { Box, BoxProps } from 'rebass';
import { ReactNode, HTMLProps } from 'react';
import join from '../utils/join';

export const baseClassName = 'ab-Panel';

export type PanelProps = HTMLProps<HTMLElement> & {
  header?: ReactNode | string;
  headerProps?: BoxProps;
  bodyProps?: BoxProps;
  bsStyle?: string;
  bsSize?: string;
  border?: string | number;
  borderRadius?: string | number;
} & BoxProps;

const Header = ({
  children,
  bsStyle,
  ...headerProps
}: { bsStyle?: string; children?: ReactNode } & BoxProps) => {
  if (!children) {
    return null;
  }

  const style: { [key: string]: any } = {};
  let color;

  if (bsStyle === 'primary') {
    style.background = 'var(--ab-info-gradient)';
    color = 'almost-white';
  }

  return (
    <Box
      fontSize={2}
      color={color}
      {...headerProps}
      style={{ ...style, ...headerProps.style }}
      className={`${baseClassName}__header`}
    >
      {children}
    </Box>
  );
};

const Body = ({ children, ...bodyProps }: { children?: ReactNode } & BoxProps) => {
  if (!children) {
    return null;
  }

  return (
    <Box {...bodyProps} className={`${baseClassName}__body`}>
      {children}
    </Box>
  );
};

const Panel = (props: PanelProps) => {
  const {
    borderRadius,
    border,
    className,
    header,
    children,
    headerProps,
    bodyProps,
    bsStyle,
    ...boxProps
  } = props;

  const style: { [key: string]: any } = {};

  if (borderRadius !== undefined) {
    style['--ab-cmp-panel__border-radius'] = borderRadius;
  }

  const headerStyle = {
    border,
    ...(headerProps ? headerProps.style : null),
  };
  const bodyStyle = {
    border,
    ...(bodyProps ? bodyProps.style : null),
  };

  return (
    <Box
      {...boxProps}
      style={{ ...style, ...boxProps.style }}
      className={join(
        className,
        baseClassName,
        !header ? `${baseClassName}--no-header` : `${baseClassName}--with-header`
      )}
    >
      <Header {...headerProps} style={headerStyle} bsStyle={bsStyle}>
        {header}
      </Header>
      <Body {...bodyProps} style={bodyStyle}>
        {children}
      </Body>
    </Box>
  );
};

export default Panel;
