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
  variant?: 'default' | 'primary';
  bsSize?: string;
  border?: string | number;
  borderRadius?: string | number;
  bodyScroll?: string | boolean;
} & BoxProps;

const Header = ({
  children,
  variant = 'default',
  ...headerProps
}: { variant?: 'default' | 'primary'; children?: ReactNode } & BoxProps) => {
  if (!children) {
    return null;
  }

  const style: { [key: string]: any } = {};

  return (
    <Box
      fontSize={2}
      {...headerProps}
      style={{ ...style, ...headerProps.style }}
      className={join(`${baseClassName}__header`, `${baseClassName}__header--variant-${variant}`)}
    >
      {children}
    </Box>
  );
};

const Body = ({
  children,
  bodyScroll,
  ...bodyProps
}: { children?: ReactNode; bodyScroll?: string | boolean } & BoxProps) => {
  if (!children) {
    return null;
  }

  if (bodyScroll === true) {
    bodyScroll = 'auto';
  }

  return (
    <Box
      {...bodyProps}
      className={join(`${baseClassName}__body`, `${baseClassName}__body--scroll-${bodyScroll}`)}
    >
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
    bodyScroll,
    variant = 'default',
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
        `${baseClassName}--variant-${variant}`,
        !header ? `${baseClassName}--no-header` : `${baseClassName}--with-header`
      )}
    >
      <Header {...headerProps} style={headerStyle} variant={variant}>
        {header}
      </Header>
      <Body {...bodyProps} style={bodyStyle} bodyScroll={bodyScroll}>
        {children}
      </Body>
    </Box>
  );
};

export default Panel;
