import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ICategoryChartDefinition, IPieChartDefinition } from "../Interface/BlotterObjects/Charting/IChartDefinition";
import { IChartData } from "../Interface/BlotterObjects/Charting/IChartData";
import { IColumn } from '../Interface/IColumn';
export declare class ChartService implements IChartService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    BuildCategoryChartData(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): IChartData;
    private buildYAxisTotal;
    private getXAxisColumnValues;
    private addXAxisFromExpression;
    BuildPieChartData(chartDefinition: IPieChartDefinition): IChartData;
    private createNonRangeDataItem;
    private shouldUseRange;
    private getGroupValueTotalForRow;
    private getSingleValueTotalForRow;
}
