import {IStrategyActionReturn,IStrategy} from './IStrategy';



export interface IExcelExportStrategy extends IStrategy {
    ExportToExcel(fileName: string, allPages: boolean) : void;
}


