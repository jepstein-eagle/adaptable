import * as React from 'react';
import { ReactComponentLike } from 'prop-types';
import join from '../../utils/join';
import { HTMLProps } from 'react';

type TypeProps = HTMLProps<HTMLElement> & {
  factory: string | ReactComponentLike;
  active?: boolean;
};

const baseClassName = 'ab-ListGroupItem';

const ListGroupItem = (props: TypeProps) => {
  const { className, active, factory: Tag = 'button', ...domProps } = props;

  const result = (
    <Tag
      {...domProps}
      className={join(
        className,
        baseClassName,
        `${baseClassName}--(${active ? 'active' : 'not-active'})`
      )}
    ></Tag>
  );

  return result;
};
export default ListGroupItem;
