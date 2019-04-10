import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ICategoryChartDefinition, IPieChartDefinition, IChartData } from "../Interface/BlotterObjects/IChartDefinition";
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
