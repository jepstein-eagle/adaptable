import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IColumn } from "../../../Api/Interface/IColumn";
export interface IChartService {
    BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any;
}
