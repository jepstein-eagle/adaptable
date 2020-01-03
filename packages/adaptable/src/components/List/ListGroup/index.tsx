import * as React from 'react';
import join from '../../utils/join';
import { Box, BoxProps } from 'rebass';

const baseClassName = 'ab-ListGroup';

export interface ListGroupProps extends BoxProps {}

const ListGroup = (props: ListGroupProps) => {
  const { className, ...domProps } = props;

  return <Box {...domProps} className={join(className, baseClassName)} />;
};
export default ListGroup;
