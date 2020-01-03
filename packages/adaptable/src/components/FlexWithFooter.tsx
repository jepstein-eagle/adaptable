import * as React from 'react';
import { Flex, FlexProps } from 'rebass';

interface TypeProps extends FlexProps {
  footer: React.ReactNode;
  footerProps?: FlexProps;
}

const defaultStyle = {
  height: '100%',
  maxHeight: '90vh',

  width: '70vw',
  maxWidth: 800,
};
const FlexWithFooter = (props: TypeProps & React.HTMLProps<HTMLDivElement>) => {
  const { footer, footerProps, children, style, ...domProps } = props;
  return (
    <Flex flexDirection="column" {...domProps} style={{ ...defaultStyle, ...style }}>
      <Flex flexDirection="column" padding={0} flex={1}>
        <Flex flexDirection="column" flex={1}>
          {children}
        </Flex>
      </Flex>
      {footer ? (
        <Flex padding={2} backgroundColor="primary" {...footerProps}>
          {footer}
        </Flex>
      ) : null}
    </Flex>
  );
};

export default FlexWithFooter;
