import { Expression } from '../../Expression';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { CategoryChartType, CrosshairDisplayMode, ToolTipType, AxisLabelsLocation, LabelVisibility, AxisScale, AxisAngle, HorizontalAlignment, ChartType, SecondaryColumnOperation, PieChartLabelPosition, SliceLabelOption, SliceSortOption } from '../../ChartEnums';
import { PieChartOthersCategoryType } from '../../Enums';

// not too sure at the moment how we will break up these objects as we add data series, financial, pie, doughnut etc.
// trying to make it as flexible as possible though I suspeect some stuff will break as we go forward...

export interface IChartDefinition extends IAdaptableBlotterObject {
  Name: string;
  Description: string;
  ChartProperties: IChartProperties
  ChartType: ChartType
}

export interface IChartProperties extends IAdaptableBlotterObject {
  // still empty at this stage
}

export interface IPieChartDefinition extends IChartDefinition {
  PrimaryColumnId: string;
  SecondaryColumnId: string
  SecondaryColumnOperation: SecondaryColumnOperation;
  VisibleRowsOnly: boolean
}

export interface ICategoryChartDefinition extends IChartDefinition {
  YAxisColumnIds: string[];
  YAxisTotal: 'Sum' | 'Average';
  XAxisColumnId: string;
  XAxisExpression: Expression;
  // ChartProperties: ICategoryChartProperties;
}

export interface IPieChartProperties extends IChartProperties {
  OthersCategoryThreshold: number;
  OthersCategoryType: PieChartOthersCategoryType;

  PieChartLabelPosition: PieChartLabelPosition; 
  SliceLabelsMapping: SliceLabelOption;
  SliceValuesMapping: SliceLabelOption;
  SliceLegendMapping: SliceLabelOption;
  ShowAsDoughnut: boolean;

}

export interface ICalloutProperties {
  Type: string;
  Interval?: number;
}

export interface ICategoryChartProperties extends IChartProperties {
  // General
  CategoryChartType?: CategoryChartType;
  SeriesThickness?: number; // and bind it to

  MarkerType?: string; // using a string because chart expects a string or an array of MarkerType enums

  CalloutsType?: string; // using string because we need add non-numeric properties from data source in getCalloutTypeOptions()
  CalloutsInterval: number; // this controls how many callouts
  // Annotations:
  EnableFinalValueAnnotations?: boolean;
  CrosshairDisplayMode?: CrosshairDisplayMode;
  CrosshairSnapToData?: boolean;
  CrosshairAnnotationEnabled?: boolean;
  ToolTipType: ToolTipType;
  // Y Axis
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
  // x Axis
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
  // Misc
  EnableTransitions?: boolean;
  TransitionInDuration?: number;
  TitleAlignment?: HorizontalAlignment;
  SubTitleAlignment?: HorizontalAlignment;
  EnableSeriesHighlighting?: boolean;
  EnableCategoryHighlighting?: boolean;
  EnableItemHighlighting?: boolean;
}


export interface IPieChartDataItem {
  Name: string;
  Value: any; // ?? number?
  Ratio: number;
  ValueAndName? : string;
  RatioAndName?: string
}