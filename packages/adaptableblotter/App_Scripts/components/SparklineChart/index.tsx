import * as React from 'react';
import { IgrSparklineModule } from 'igniteui-react-charts/ES5/igr-sparkline-module';
import { IgrSparkline } from 'igniteui-react-charts/ES5/igr-sparkline';
import { IgrSparklineCoreModule } from 'igniteui-react-charts/ES5/igr-sparkline-core-module';

IgrSparklineCoreModule.register();
IgrSparklineModule.register();

interface SparklineChartProps {
  values: number[];
  width?: number;
  height?: number;
  type?: 'Line' | 'Column';
  min?: number;
  max?: number;
}
const SparklineChart = (props: SparklineChartProps) => {
  const dataSource = props.values.map(value => ({
    value,
    label: value,
  }));

  const minMax: { minimum?: number; maximum?: number } = {};

  if (props.min != null) {
    minMax.minimum = props.min;
  }
  if (props.max != null) {
    minMax.maximum = props.max;
  }
  return (
    <IgrSparkline
      {...minMax}
      dataSource={dataSource}
      valueMemberPath="value"
      displayType={props.type || 'Line'}
      height={props.height ? `${props.height}px` : undefined}
      width={props.width ? `${props.width}px` : undefined}
    />
  );
};

export default SparklineChart;
