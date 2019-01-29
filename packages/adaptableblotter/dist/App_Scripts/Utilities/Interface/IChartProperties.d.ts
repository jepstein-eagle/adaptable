import { ChartType, ChartCrosshairsMode, AxisLabelsLocation, HorizontalAlignment, LabelVisibility, ChartSize, ToolTipType, AxisAngle } from '../ChartEnums';
export interface IChartProperties {
    ChartType?: ChartType;
    ChartSize?: ChartSize;
    ChartCrosshairsMode?: ChartCrosshairsMode;
    EnableFinalValueAnnotations?: boolean;
    SpanCrossHairsToData?: boolean;
    EnableCrosshairsAnnotations?: boolean;
    ToolTipType: ToolTipType;
    YAxisLabelLocation?: AxisLabelsLocation;
    YAxisLabelVisibility?: LabelVisibility;
    YAxisTitle?: string;
    YAxisLabelColor?: string;
    YAxisTitleColor?: string;
    YAxisMinimumValue?: number;
    XAxisLabelVisibility?: LabelVisibility;
    XAxisLabelColor?: string;
    XAxisTitle?: string;
    XAxisTitleColor?: string;
    XAxisGap?: number;
    XAxisAngle?: AxisAngle;
    EnableTransitions?: boolean;
    TransitionInDuration?: number;
    TitleAlignment?: HorizontalAlignment;
    SubTitleAlignment?: HorizontalAlignment;
    EnableSeriesHighlighting?: boolean;
    EnableCategoryHighlighting?: boolean;
    EnableItemHighlighting?: boolean;
}
