import * as React from 'react';
import { ReactComponentLike } from 'prop-types';
import join from '../../utils/join';
import { HTMLProps } from 'react';
import { Box } from 'rebass';

type TypeProps = HTMLProps<HTMLDivElement> & {};

const baseClassName = 'ab-ListGroup';

const ListGroup = (props: TypeProps & BoxProps) => {
  const { className, ...domProps } = props;

  return <Box {...domProps} className={join(className, baseClassName)} />;
};
export default ListGroup;
