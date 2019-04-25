import { ICategoryChartDefinition, IPieChartDefinition } from "../../Interface/BlotterObjects/Charting/IChartDefinition";
import { IChartData } from "../../Interface/BlotterObjects/Charting/IChartData";
import { IColumn } from "../../Interface/IColumn";
export interface IChartService {
    BuildCategoryChartData(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): IChartData;
    BuildPieChartData(chartDefinition: IPieChartDefinition): IChartData;
}
