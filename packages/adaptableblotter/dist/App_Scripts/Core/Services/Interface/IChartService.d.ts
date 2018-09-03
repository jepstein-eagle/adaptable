import { IChartDefinition } from "../../Api/Interface/AdaptableBlotterObjects";
import { IColumn } from "../../Interface/IColumn";
export interface IChartService {
    BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any;
}
