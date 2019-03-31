import { IPieChartProperties } from '../Interface/BlotterObjects/IChartDefinition';
import { PieChartLabelPosition, SliceLabelOption, SliceSortOption, PieChartOthersCategoryType } from '../ChartEnums';

export const DefaultPieChartProperties: IPieChartProperties = {
    OthersCategoryThreshold: 2,
    OthersCategoryType: PieChartOthersCategoryType.Percent,

    PieChartLabelPosition: PieChartLabelPosition.BestFit,
    SliceValuesMapping: SliceLabelOption.Value,
    SliceLabelsMapping: SliceLabelOption.Name,
    SliceLegendMapping: SliceLabelOption.ValueAndName,
    ShowAsDoughnut: true
}

