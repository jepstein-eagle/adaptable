import { useRef, MutableRefObject } from 'react';
import useProperty from '../utils/useProperty';
import getAvailableSizeInfo, { BoundingClientRect } from '../utils/getAvailableSizeInfo';
import { getConstrainRect, ConstrainToType } from '../OverlayTrigger';

export interface PositionInfo {
  verticalPosition: 'top' | 'bottom';
  horizontalPosition: 'left' | 'right';
  maxHeight: number | string;
  maxWidth: number | string;
}

export type ExpandedProps = {
  expanded?: boolean;
  constrainTo?: ConstrainToType;
  defaultExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  onExpandedChange?: (expanded: boolean) => void;
  onToggle?: (expanded: boolean) => void;
};

export default (props: ExpandedProps, positionerRef: MutableRefObject<HTMLDivElement>) => {
  const positionInfoRef = useRef<PositionInfo>({
    maxHeight: '50vh',
    maxWidth: '50vw',
    verticalPosition: 'bottom',
    horizontalPosition: 'right',
  });

  const updatePosition = () => {
    const positionRect: BoundingClientRect = positionerRef.current.getBoundingClientRect();

    positionInfoRef.current = getAvailableSizeInfo({
      constrainRect: getConstrainRect(positionerRef.current as HTMLElement, props.constrainTo),
      targetRect: positionRect,
      maxSizeOffset: 30,
    });
  };

  const [expanded, doSetExpanded] = useProperty(props, 'expanded', false, {
    onChange: (expanded: boolean) => {
      if (expanded) {
        if (props.onExpand) {
          props.onExpand();
        }
      } else if (props.onCollapse) {
        props.onCollapse();
      }

      if (props.onToggle) {
        props.onToggle(expanded);
      }
      if (props.onExpandedChange) {
        props.onExpandedChange(expanded);
      }
    },
  });

  const setExpanded = (newExpanded: boolean) => {
    // if (!newExpanded) {
    //   return;
    // }
    if (!expanded && newExpanded) {
      updatePosition();
    }
    doSetExpanded(newExpanded);
  };

  const toggle = () => {
    setExpanded(!expanded);
  };

  return {
    expanded,
    setExpanded,
    toggle,
    positionInfo: positionInfoRef.current,
  };
};
