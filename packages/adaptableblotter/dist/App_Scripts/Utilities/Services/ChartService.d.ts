import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../../api/Interface/IAdaptableBlotter';
import { IChartDefinition } from '../../api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../api/Interface/IColumn';
export declare class ChartService implements IChartService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any;
    private buildGroupedTotal;
    private getAdditionalColumnValues;
}
