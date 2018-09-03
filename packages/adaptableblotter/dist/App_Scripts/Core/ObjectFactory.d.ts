import { IAdvancedSearch, ICalculatedColumn, IPlusMinusRule, ICustomSort, IRange, IGridSort, ICellValidationRule, IUserFilter, IFlashingCell, IShortcut, IConditionalStyle, IFormatColumn, ILayout, IReport, IStyle, IAlertDefinition, IChartDefinition } from './Api/Interface/AdaptableBlotterObjects';
import { IColumn } from './Interface/IColumn';
import { IAdaptableBlotter } from './Interface/IAdaptableBlotter';
import { KeyValuePair } from '../View/UIInterfaces';
import { ISelectedCellSummmary } from '../Strategy/Interface/ISelectedCellsStrategy';
export declare module ObjectFactory {
    function CreateEmptyCustomSort(): ICustomSort;
    function CreateEmptyChartDefinition(): IChartDefinition;
    function CreateEmptyCalculatedColumn(): ICalculatedColumn;
    function CreateEmptyPlusMinusRule(): IPlusMinusRule;
    function CreateEmptyAlertDefinition(): IAlertDefinition;
    function CreateEmptyAdvancedSearch(): IAdvancedSearch;
    function CreateEmptyRange(): IRange;
    function CreateEmptyGridSort(): IGridSort;
    function CreateEmptyCellValidation(): ICellValidationRule;
    function CreateEmptyUserFilter(): IUserFilter;
    function CreateEmptyReport(): IReport;
    function CreateDefaultFlashingCell(column: IColumn): IFlashingCell;
    function CreateEmptyShortcut(): IShortcut;
    function CreateCellValidationMessage(CellValidation: ICellValidationRule, blotter: IAdaptableBlotter, showIntro?: boolean): string;
    function CreateEmptyConditionalStyle(): IConditionalStyle;
    function CreateEmptyFormatColumn(): IFormatColumn;
    function CreateLayout(columns: IColumn[], gridSorts: IGridSort[], vendorGridInfo: KeyValuePair[], name: string): ILayout;
    function CreateEmptyStyle(): IStyle;
    function CreateEmptySelectedCellSummmary(): ISelectedCellSummmary;
}
