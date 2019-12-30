import * as React from 'react';
import { IgrSparklineModule } from 'igniteui-react-charts/ES5/igr-sparkline-module';
import { IgrSparkline } from 'igniteui-react-charts/ES5/igr-sparkline';
import { IgrSparklineCoreModule } from 'igniteui-react-charts/ES5/igr-sparkline-core-module';
import { DefaultSparklinesChartProperties } from '../../Utilities/Defaults/DefaultSparklinesChartProperties';
import { SparklineTypeEnum } from '../../PredefinedConfig/Common/ChartEnums';

IgrSparklineCoreModule.register();
IgrSparklineModule.register();

interface SparklineChartProps {
  values: number[];
  width?: number;
  height?: number;
  type?: SparklineTypeEnum;
  min?: number;
  max?: number;
  brush?: string;
  negativeBrush?: string;
  firstMarkerBrush?: string;
  lastMarkerBrush?: string;
  highMarkerBrush?: string;
  lowMarkerBrush?: string;
  negativeMarkerBrush?: string;
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

  const defaultSparklineProperties = DefaultSparklinesChartProperties;
  return (
    <div style={{ padding: '0px', margin: '0px' }}>
      <IgrSparkline
        {...minMax}
        /* the IgrSparkline chart does not respond to setting/unsetting min and max dynamically, so we have to use those as key in order to remount the cmp */
        key={`${props.min!!}-${props.max!!}`}
        dataSource={dataSource}
        valueMemberPath="value"
        labelMemberPath="label"
        displayType={props.type ? props.type : defaultSparklineProperties.DisplayType}
        height={props.height ? `${props.height}px` : undefined}
        width={props.width ? `${props.width}px` : undefined}
        // brush
        brush={props.brush ? props.brush : defaultSparklineProperties.Brush}
        negativeBrush={
          props.negativeBrush ? props.negativeBrush : defaultSparklineProperties.NegativeBrush
        }
        // showing markers

        // marker brushes
        firstMarkerBrush={
          props.firstMarkerBrush
            ? props.firstMarkerBrush
            : defaultSparklineProperties.FirstMarkerBrush
        }
        lastMarkerBrush={
          props.lastMarkerBrush ? props.lastMarkerBrush : defaultSparklineProperties.LastMarkerBrush
        }
        highMarkerBrush={
          props.highMarkerBrush ? props.highMarkerBrush : defaultSparklineProperties.HighMarkerBrush
        }
        lowMarkerBrush={
          props.lowMarkerBrush ? props.lowMarkerBrush : defaultSparklineProperties.LowMarkerBrush
        }
        negativeMarkerBrush={
          props.negativeMarkerBrush
            ? props.negativeMarkerBrush
            : defaultSparklineProperties.NegativeMarkerBrush
        }
      />
    </div>
  );
};

export default SparklineChart;
