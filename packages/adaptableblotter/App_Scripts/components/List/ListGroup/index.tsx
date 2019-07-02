import * as React from 'react';
import { ReactComponentLike } from 'prop-types';
import join from '../../utils/join';
import { HTMLProps } from 'react';

type TypeProps = HTMLProps<HTMLDivElement> & {};

const baseClassName = 'ab-ListGroup';

const ListGroup = (props: TypeProps) => {
  const { className, ...domProps } = props;

  const result = <div {...domProps} className={join(className, baseClassName)}></div>;

  return result;
};
export default ListGroup;
