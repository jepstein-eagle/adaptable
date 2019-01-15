import { IChartProperties } from './Interface/IAdaptableBlotterObjects';
import { ChartType, ChartCrosshairsMode, AxisLabelsLocation, HorizontalAlignment, LabelVisibility, ChartSize } from '../Utilities/ChartEnums';

export const DefaultChartProperties: IChartProperties = {
    // General
    ChartType: ChartType.Column,
    ChartSize: ChartSize.Medium,
    ChartCrosshairsMode: ChartCrosshairsMode.None,
    EnableFinalValueAnnotations: false,
    SpanCrossHairsToData: false,
    EnableCrosshairsAnnotations: false,
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
    // Misc
    EnableTransitions: false,
    TransitionInDuration: undefined,
    TitleAlignment: HorizontalAlignment.Center,
    SubTitleAlignment: HorizontalAlignment.Center,
}

