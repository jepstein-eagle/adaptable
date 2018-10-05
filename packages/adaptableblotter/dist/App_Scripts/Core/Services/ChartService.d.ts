import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IChartService } from './Interface/IChartService';
import { IChartDefinition } from '../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Interface/IColumn';
export declare class ChartService implements IChartService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any;
    private buildGroupedTotal;
    private getAdditionalColumnValues;
}
