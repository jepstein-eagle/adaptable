import { SparklineChartProperties } from '../../PredefinedConfig/ChartState';
import { SparklineTypeEnum } from '../../PredefinedConfig/Common/ChartEnums';

export const DefaultSparklinesChartProperties: SparklineChartProperties = {
  DisplayType: SparklineTypeEnum.Line,
  UseMaxStaticValue: false,
  UseMinStaticValue: false,
  // Brush -- want to use same colour as UI but cannot re-use the constants
  Brush: '#006400', /// should be:  getHexForName('DarkGreen'),
  NegativeBrush: '#8B0000', /// should be: getHexForName('Red'),

  // Marker Visibility
  HighMarkerVisibility: 'Visible',
  LowMarkerVisibility: 'Visible',
  FirstMarkerVisibility: 'Visible',
  LastMarkerVisibility: 'Visible',
  NegativeMarkerVisibility: 'Visible',
  MarkerVisibility: 'Collapsed',

  // Marker Brush
  FirstMarkerBrush: 'Gray',
  LastMarkerBrush: 'Gray',
  HighMarkerBrush: 'DarkBlue',
  LowMarkerBrush: 'Purple',
  NegativeMarkerBrush: 'Red',

  // markerSize={10}
  // firstMarkerSize={10}
  // lastMarkerSize={10}
  // lowMarkerSize={10}
  // highMarkerSize={10}
  // negativeMarkerSize={10}
};
