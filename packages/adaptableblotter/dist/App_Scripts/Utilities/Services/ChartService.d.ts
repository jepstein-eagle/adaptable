import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
import { IChartDefinition } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../Api/Interface/IColumn';
export declare class ChartService implements IChartService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any;
    private buildGroupedTotal;
    private getAdditionalColumnValues;
}
