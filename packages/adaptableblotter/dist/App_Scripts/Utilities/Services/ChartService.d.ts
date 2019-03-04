import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ICategoryChartDefinition } from "../Interface/BlotterObjects/IChartDefinition";
import { IColumn } from '../Interface/IColumn';
export declare class ChartService implements IChartService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    BuildCategoryChartData(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): any;
    private buildTotal;
    private getXAxisColumnValues;
}
