import { Expression } from '../../Expression';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { ChartType, CrosshairDisplayMode, ToolTipType, AxisLabelsLocation, LabelVisibility, AxisScale, AxisAngle, HorizontalAlignment } from '../../ChartEnums';
export interface IChartDefinition extends IAdaptableBlotterObject {
    Name: string;
    Description: string;
    ChartProperties: IChartProperties;
}
export interface IChartProperties extends IAdaptableBlotterObject {
}
export interface ICategoryChartDefinition extends IChartDefinition {
    YAxisColumnIds: string[];
    YAxisTotal: 'Sum' | 'Average';
    XAxisColumnId: string;
    XAxisExpression: Expression;
}
export interface ICalloutProperties {
    Type: string;
    Interval?: number;
}
export interface ICategoryChartProperties extends IChartProperties {
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
    YAxisIntervalCustom?: boolean;
    YAxisIntervalValue?: number;
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
    XAxisIntervalCustom?: boolean;
    XAxisIntervalValue?: number;
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
