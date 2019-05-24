import * as React from 'react';
import { Box, BoxProps } from 'rebass';
import { ReactNode, HTMLProps } from 'react';
import join from '../utils/join';

export const baseClassName = 'ab-panel';

export type PanelProps = HTMLProps<HTMLElement> & {
  header?: ReactNode | string;
  headerProps?: BoxProps;
  bodyProps?: BoxProps;
  bsStyle?: string;
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
    <div {...bodyProps} className={`${baseClassName}__body`}>
      {children}
    </div>
  );
};

const Panel = (props: PanelProps) => {
  const { className, header, children, headerProps, bodyProps, bsStyle, ...boxProps } = props;

  return (
    <Box {...boxProps} className={join(className, baseClassName)}>
      <Header {...headerProps} bsStyle={bsStyle}>
        {header}
      </Header>
      <Body {...bodyProps}>{children}</Body>
    </Box>
  );
};

export default Panel;
