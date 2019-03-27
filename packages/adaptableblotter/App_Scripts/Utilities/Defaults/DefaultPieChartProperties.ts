import { IPieChartProperties } from '../Interface/BlotterObjects/IChartDefinition';
import { PieChartOthersCategoryType } from '../Enums';
import { PieChartLabelPosition, SliceLabelOption, SliceSortOption } from '../ChartEnums';

export const DefaultPieChartProperties: IPieChartProperties = {
    OthersCategoryThreshold: 2,
    OthersCategoryType: PieChartOthersCategoryType.Percent,

    PieChartLabelPosition: PieChartLabelPosition.OutsideEnd,
    SliceValuesMapping: SliceLabelOption.Value,
    SliceLabelsMapping: SliceLabelOption.Name,
    SliceLegendMapping: SliceLabelOption.ValueAndName,
    ShowAsDoughnut: true
}

