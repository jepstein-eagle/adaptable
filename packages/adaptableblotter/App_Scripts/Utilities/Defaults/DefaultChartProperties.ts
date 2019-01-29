import { IChartProperties } from "../Interface/IChartProperties";
import { ChartType, ChartSize, ChartCrosshairsMode, ToolTipType, AxisLabelsLocation, LabelVisibility, HorizontalAlignment, AxisAngle } from '../ChartEnums';

export const DefaultChartProperties: IChartProperties = {
    // General
    ChartType: ChartType.Column,
    ChartSize: ChartSize.Small,
    ChartCrosshairsMode: ChartCrosshairsMode.None,
    EnableFinalValueAnnotations: false,
    SpanCrossHairsToData: false,
    EnableCrosshairsAnnotations: false,
    ToolTipType: ToolTipType.Default,
    // Y Axis
    YAxisLabelLocation: AxisLabelsLocation.OutsideLeft,
    YAxisLabelVisibility: LabelVisibility.Visible,
    YAxisTitle: "",
    YAxisLabelColor: "",
    YAxisTitleColor: "",
    YAxisMinimumValue: undefined,
    // X Axis
    XAxisLabelVisibility: LabelVisibility.Visible,
    XAxisLabelColor: "",
    XAxisTitle: "",
    XAxisTitleColor: "",
    XAxisGap: 0.5,
    XAxisAngle: AxisAngle.Diagonal,
    // Misc
    EnableTransitions: false,
    TransitionInDuration: undefined,
    TitleAlignment: HorizontalAlignment.Center,
    SubTitleAlignment: HorizontalAlignment.Center,
    EnableSeriesHighlighting: false,
    EnableCategoryHighlighting: false,
    EnableItemHighlighting: false

}

