import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IColumn } from "../../../Core/Interface/IColumn";

export interface IChartService {
  BuildChartData(chartDefinition: IChartDefinition , columns: IColumn[]): any // to change
}