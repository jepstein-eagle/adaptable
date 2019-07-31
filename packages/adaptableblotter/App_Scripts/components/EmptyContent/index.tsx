import * as React from 'react';
import { HTMLProps } from 'react';
import { Flex, FlexProps } from 'rebass';
import join from '../utils/join';

type EmptyContentProps = HTMLProps<HTMLElement> & FlexProps & {};

const baseClassName = 'ab-EmptyContent';

const EmptyContent = ({ children, className, style, ...flexProps }: EmptyContentProps) => {
  if (typeof children === 'string') {
    children = <p>{children}</p>;
  }
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      padding={4}
      fontSize={'var(--ab__font-size)'}
      {...flexProps}
      className={join(baseClassName, className)}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, ...style }}
    >
      {children}
    </Flex>
  );
};

export default EmptyContent;
