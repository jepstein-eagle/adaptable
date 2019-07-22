import { useRef, MutableRefObject } from 'react';
import useProperty from '../utils/useProperty';

export type PositionInfo = {
  where: 'top' | 'bottom';
  side: 'left' | 'right';
  maxHeight: number | string;
  maxWidth: number | string;
};

export type ExpandedProps = {
  expanded?: boolean;
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
    where: 'bottom',
    side: 'right',
  });

  const updatePosition = () => {
    const positionRect = positionerRef.current.getBoundingClientRect();

    let maxHeight;
    let maxWidth;
    const bottom = Math.round(
      ((global as unknown) as ({ innerHeight: number })).innerHeight - positionRect.bottom
    );
    const right = Math.round(
      ((global as unknown) as ({ innerWidth: number })).innerWidth - positionRect.right
    );

    let side: 'left' | 'right' = 'right';

    if (positionRect.left > right) {
      side = 'left';
      maxWidth = Math.round(positionRect.left);
    } else {
      maxWidth = right;
    }

    if (positionRect.top > bottom) {
      maxHeight = Math.round(positionRect.top);
      positionInfoRef.current = {
        where: 'top',
        maxHeight,
        maxWidth,
        side,
      };
    } else {
      maxHeight = bottom;
      positionInfoRef.current = {
        where: 'bottom',
        maxHeight,
        maxWidth,
        side,
      };
    }
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
