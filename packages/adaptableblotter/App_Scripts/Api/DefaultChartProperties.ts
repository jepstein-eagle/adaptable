import { IChartProperties } from './Interface/IAdaptableBlotterObjects';
import { ChartType, ChartCrosshairsMode, AxisLabelsLocation, HorizontalAlignment } from '../Utilities/ChartEnums';

export const DefaultChartProperties: IChartProperties = {
    // General
    ChartType: ChartType.Column,
    ChartCrosshairsMode: ChartCrosshairsMode.None,
    EnableFinalValueAnnotations: false,
    SpanCrossHairsToData: false,
    EnableCrosshairsAnnotations: false,
    // Y Axis
    YAxisLabelLocation: AxisLabelsLocation.OutsideLeft,
    YAxisLabelTextColor: "",
    YAxisMinimumValue: undefined,
    // X Axis
    XAxisLabelTextColor: "",
    // Misc
    EnableTransitions: false,
    TransitionInDuration: undefined,
    TitleAlignment: HorizontalAlignment.Center,
    SubTitleAlignment: HorizontalAlignment.Center,
}

