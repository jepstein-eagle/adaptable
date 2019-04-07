import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ICategoryChartDefinition, IPieChartDefinition, IPieChartDataItem } from "../Interface/BlotterObjects/IChartDefinition";
import { IColumn } from '../Interface/IColumn';
export declare class ChartService implements IChartService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    BuildCategoryChartData(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): any;
    private buildYAxisTotal;
    private getXAxisColumnValues;
    BuildPieChartData(chartDefinition: IPieChartDefinition): IPieChartDataItem[];
    private createNonRangeDataItem;
    private shouldUseRange;
    private getGroupValueTotalForRow;
    private getSingleValueTotalForRow;
    private createPieChartErrorMessage;
}
