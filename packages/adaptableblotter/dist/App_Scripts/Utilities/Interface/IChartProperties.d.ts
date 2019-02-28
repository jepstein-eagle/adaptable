import { ChartType, CrosshairDisplayMode, AxisLabelsLocation, HorizontalAlignment, LabelVisibility, ToolTipType, AxisAngle, AxisScale } from '../ChartEnums';
export interface ICalloutProperties {
    Type: string;
    Interval?: number;
}
export interface IChartProperties {
    ChartType?: ChartType;
    SeriesThickness?: number;
    MarkerType?: string;
    CalloutsType?: string;
    CalloutsInterval: number;
    EnableFinalValueAnnotations?: boolean;
    CrosshairDisplayMode?: CrosshairDisplayMode;
    CrosshairSnapToData?: boolean;
    CrosshairAnnotationEnabled?: boolean;
    ToolTipType: ToolTipType;
    YAxisLabelLocation?: AxisLabelsLocation;
    YAxisLabelVisibility?: LabelVisibility;
    YAxisLabelScale?: AxisScale;
    YAxisTitle?: string;
    YAxisLabelColor?: string;
    YAxisTitleColor?: string;
    YAxisMinimumValue?: number;
    YAxisMaximumValue?: number;
    YAxisIsLogarithmic?: boolean;
    YAxisInverted?: boolean;
    XAxisLabelLocation?: AxisLabelsLocation;
    XAxisLabelVisibility?: LabelVisibility;
    XAxisLabelColor?: string;
    XAxisTitle?: string;
    XAxisTitleColor?: string;
    XAxisGap?: number;
    XAxisOverlap: number;
    XAxisAngle?: AxisAngle;
    XAxisInverted?: boolean;
    EnableTransitions?: boolean;
    TransitionInDuration?: number;
    TitleAlignment?: HorizontalAlignment;
    SubTitleAlignment?: HorizontalAlignment;
    EnableSeriesHighlighting?: boolean;
    EnableCategoryHighlighting?: boolean;
    EnableItemHighlighting?: boolean;
}
