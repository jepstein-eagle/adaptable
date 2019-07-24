import * as React from 'react';
import { Flex, FlexProps } from 'rebass';
import join from '../utils/join';

const FieldWrap = (props: FlexProps) => {
  return <Flex {...props} className={join(props.className, 'ab-FieldWrap')} />;
};

FieldWrap.defaultProps = {
  flexDirection: 'row',
  alignItems: 'center',
};

export default FieldWrap;
