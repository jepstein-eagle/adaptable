import * as React from 'react';
import { Flex } from 'rebass';

import { ReactNode } from 'react';
import SizedContainer from '../SizedContainer';

export interface ChartContainerProps {
  chart: React.ReactElement;
  style?: React.CSSProperties;
  title?: ReactNode;
  button?: ReactNode;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  sizeAsString?: boolean;
  settingsPanel?: ReactNode;
  minHeight?: string | number;
}
const ChartContainer = (props: ChartContainerProps) => (
  <Flex
    flexDirection={props.flexDirection || 'row'}
    className="ab-ChartContainer"
    style={props.style}
  >
    <Flex flexDirection="column" flex={1} style={{ textAlign: 'center' }}>
      {props.button}
      {props.title}
      <SizedContainer style={{ minHeight: props.minHeight || '60vh' }}>
        {({ width, height }) => {
          height = Math.round(height);
          width = Math.round(width);

          return React.cloneElement(props.chart, {
            height: props.sizeAsString !== false ? `${height}px` : height,
            width: props.sizeAsString !== false ? `${width}px` : width,
          });
        }}
      </SizedContainer>
    </Flex>

    {props.settingsPanel}
  </Flex>
);

export default ChartContainer;
