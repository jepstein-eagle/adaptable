import * as React from 'react';
import { BoxProps, Box } from 'rebass';
import NotifyResize from '../NotifyResize';
import { ReactNode } from 'react';

interface SizedContainerProps extends Omit<BoxProps, 'children'> {
  children: (size: { width: number; height: number }) => ReactNode;
}

const SizedContainer = (props: SizedContainerProps) => {
  const { ...domProps } = props;
  const [size, onResize] = React.useState<{ width: number; height: number } | null>(null);

  const sizeFn: any = props.children;

  return (
    <Box {...domProps} style={{ flex: 1, ...domProps.style, position: 'relative' }}>
      <Box
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
        data-width={size ? size.width : null}
        data-height={size ? size.height : null}
      >
        <NotifyResize onResize={onResize} />
        {size ? sizeFn(size) : null}
      </Box>
    </Box>
  );
};

export default SizedContainer;
