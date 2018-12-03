import { IChartDefinition } from "../../../api/Interface/IAdaptableBlotterObjects";
import { IColumn } from "../../../api/Interface/IColumn";
export interface IChartService {
    BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any;
}
