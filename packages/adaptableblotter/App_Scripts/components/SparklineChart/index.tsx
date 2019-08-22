import * as React from 'react';
import { IgrSparklineModule } from 'igniteui-react-charts/ES5/igr-sparkline-module';
import { IgrSparkline } from 'igniteui-react-charts/ES5/igr-sparkline';
import { IgrSparklineCoreModule } from 'igniteui-react-charts/ES5/igr-sparkline-core-module';

IgrSparklineCoreModule.register();
IgrSparklineModule.register();

interface SparklineChartProps {
  values: number[];
  width: number;
  height: number;
  type?: 'Line' | 'Column';
}
const SparklineChart = (props: SparklineChartProps) => {
  const dataSource = props.values.map(value => {
    return {
      value,
      label: value,
    };
  });
  return (
    <IgrSparkline
      dataSource={dataSource}
      valueMemberPath="value"
      displayType={props.type || 'Line'}
      height={`${props.height}px`}
      width={`${props.width}px`}
    />
  );
};

export default SparklineChart;
