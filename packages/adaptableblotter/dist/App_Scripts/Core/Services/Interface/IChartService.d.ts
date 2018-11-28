import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IColumn } from "../../Interface/IColumn";
export interface IChartService {
    BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any;
}
