import * as React from 'react';
import { ReactComponentLike } from 'prop-types';
import join from '../../utils/join';
import { HTMLProps } from 'react';
import { useSelectionEvent } from '../../SelectableList';

type TypeProps = HTMLProps<HTMLElement> & {
  factory?: string | ReactComponentLike;
  active?: boolean;
  index?: number;
  selectionId?: string | number;
};

const baseClassName = 'ab-ListGroupItem';

const ListGroupItem = React.forwardRef((props: TypeProps, ref) => {
  const { className, active, factory: Tag = 'button', ...domProps } = props;

  const onSelectionClick = useSelectionEvent();

  const result = (
    <Tag
      {...domProps}
      onClick={(event: React.SyntheticEvent) => {
        if (domProps.onClick) {
          domProps.onClick(event as any);
        }

        onSelectionClick(event, { index: props.index });
      }}
      ref={ref}
      className={join(
        className,
        baseClassName,
        `${baseClassName}--${active ? 'active' : 'not-active'}`
      )}
    ></Tag>
  );

  return result;
});
export default ListGroupItem;
