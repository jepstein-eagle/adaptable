import * as React from 'react';
import { BoxProps, Box, Flex } from 'rebass';

import SizedContainer from '../SizedContainer';
import { ReactNode } from 'react';

export interface ChartContainerProps {
  chart: React.ReactElement;
  title?: ReactNode;
  button?: ReactNode;
  settingsPanel?: ReactNode;
  minHeight?: string | number;
}
const ChartContainer = (props: ChartContainerProps) => {
  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column" flex={1} style={{ textAlign: 'center' }}>
        {props.button}
        {props.title}
        <SizedContainer style={{ minHeight: props.minHeight || '60vh' }}>
          {({ width, height }) =>
            React.cloneElement(props.chart, { height: `${height}px`, width: `${width}px` })
          }
        </SizedContainer>
      </Flex>

      {props.settingsPanel}
    </Flex>
  );
};

export default ChartContainer;
