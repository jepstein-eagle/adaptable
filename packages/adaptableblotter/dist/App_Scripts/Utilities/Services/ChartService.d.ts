import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IChartDefinition } from "../Interface/BlotterObjects/IChartDefinition";
import { IColumn } from '../Interface/IColumn';
export declare class ChartService implements IChartService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any;
    private buildTotal;
    private getXAxisColumnValues;
    private getXSegmentColumnValues;
}
