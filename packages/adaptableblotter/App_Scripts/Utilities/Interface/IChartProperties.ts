import { ChartType, ChartCrosshairsMode, AxisLabelsLocation, HorizontalAlignment, LabelVisibility, ChartSize, ToolTipType, AxisAngle } from '../ChartEnums';
export interface IChartProperties {
  // General
  ChartType?: ChartType;
  ChartSize?: ChartSize;
  ChartCrosshairsMode?: ChartCrosshairsMode;
  EnableFinalValueAnnotations?: boolean;
  SpanCrossHairsToData?: boolean;
  EnableCrosshairsAnnotations?: boolean;
  ToolTipType: ToolTipType;
  // Y Axis
  YAxisLabelLocation?: AxisLabelsLocation;
  YAxisLabelVisibility?: LabelVisibility;
  YAxisTitle?: string;
  YAxisLabelColor?: string;
  YAxisTitleColor?: string;
  YAxisMinimumValue?: number;
  // x Axis
  XAxisLabelVisibility?: LabelVisibility;
  XAxisLabelColor?: string;
  XAxisTitle?: string;
  XAxisTitleColor?: string;
  XAxisGap?: number;
  XAxisAngle?: AxisAngle;
  // Misc
  EnableTransitions?: boolean;
  TransitionInDuration?: number;
  TitleAlignment?: HorizontalAlignment;
  SubTitleAlignment?: HorizontalAlignment;
  EnableSeriesHighlighting?: boolean;
  EnableCategoryHighlighting?: boolean;
  EnableItemHighlighting?: boolean;
}
