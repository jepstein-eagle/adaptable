import '../../Styles/stylesheets/adaptableblotter-style.css';
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore';
import { ICalendarService } from '../../Core/Services/Interface/ICalendarService';
import { IAuditService } from '../../Core/Services/Interface/IAuditService';
import { IValidationService } from '../../Core/Services/Interface/IValidationService';
import { AuditLogService } from '../../Core/Services/AuditLogService';
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher';
import { DataType, DistinctCriteriaPairValue } from '../../Core/Enums';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ICalculatedColumnExpressionService } from "../../Core/Services/Interface/ICalculatedColumnExpressionService";
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IAdaptableStrategyCollection, ICellInfo } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { ICalculatedColumn, IStyle } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
import { IBlotterApi } from '../../Core/Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from '../../Core/Api/Interface/IAdaptableBlotterOptions';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from '../../Core/Api/Interface/IStateEvents';
import * as _ from 'lodash';
import { IChartService } from '../../Core/Services/Interface/IChartService';
export declare class AdaptableBlotter implements IAdaptableBlotter {
    api: IBlotterApi;
    Strategies: IAdaptableStrategyCollection;
    AdaptableBlotterStore: IAdaptableBlotterStore;
    CalendarService: ICalendarService;
    AuditService: IAuditService;
    ValidationService: IValidationService;
    AuditLogService: AuditLogService;
    ChartService: IChartService;
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
    BlotterOptions: IAdaptableBlotterOptions;
    VendorGridName: any;
    EmbedColumnMenu: boolean;
    private cellStyleHypergridMap;
    private cellFlashIntervalHypergridMap;
    private abContainerElement;
    private hyperGrid;
    private filterContainer;
    isInitialised: boolean;
    constructor(blotterOptions: IAdaptableBlotterOptions, renderGrid?: boolean);
    private getState;
    InitAuditService(): void;
    private buildFontCSSShorthand;
    private buildFontCSSProperties;
    setColumnIntoStore(): void;
    hideFilterForm(): void;
    setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void;
    private _onKeyDown;
    onKeyDown(): IEvent<IAdaptableBlotter, KeyboardEvent | any>;
    private _onGridDataBound;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    private _onSelectedCellsChanged;
    onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    private _onRefresh;
    onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>;
    StateChanged: EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>;
    ColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    createMenu(): void;
    getPrimaryKeyValueFromRecord(record: any): any;
    gridHasCurrentEditValue(): boolean;
    getCurrentCellEditValue(): any;
    getActiveCell(): ICellInfo;
    debouncedSetSelectedCells: (() => void) & _.Cancelable;
    setSelectedCells(): void;
    getColumnDataType(column: any): DataType;
    setValue(cellInfo: ICellInfo): void;
    setValueBatch(batchValues: ICellInfo[]): void;
    private ClearSelection;
    cancelEdit(): void;
    forAllRecordsDo(func: (record: any) => any): any;
    forAllVisibleRecordsDo(func: (record: any) => any): void;
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any;
    getRecordIsSatisfiedFunctionFromRecord(record: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any;
    getColumnIndex(columnId: string): number;
    private isColumnReadonly;
    private isColumnSortable;
    setCustomSort(columnId: string): void;
    removeCustomSort(columnId: string): void;
    ReindexAndRepaint(): void;
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>;
    getDisplayValue(id: any, columnId: string): string;
    getDisplayValueFromRecord(row: any, columnId: string): any;
    getDisplayValueFromRawValue(colId: string, rawValue: any): any;
    getRawValueFromRecord(row: any, columnId: string): any;
    getColumnFormatter(columnId: string): any;
    addCellStyleHypergrid(rowIdentifierValue: any, columnId: string, style: CellStyleHypergrid, timeout?: number): void;
    addRowStyleHypergrid(rowIdentifierValue: any, style: CellStyleHypergrid): void;
    getRowIndexHypergrid(rowIdentifierValue: any): number;
    removeCellStyleHypergrid(rowIdentifierValue: any, columnId: string, style: 'flash' | 'csColumn' | 'csRow' | 'QuickSearch' | 'formatColumn'): void;
    removeAllCellStyleHypergrid(style: 'flash' | 'csColumn' | 'csRow' | 'QuickSearch' | 'formatColumn'): void;
    applyGridFiltering(): void;
    removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
    editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void;
    addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void;
    isGroupRecord(): boolean;
    getFirstRecord(): any;
    destroy(): void;
    private valOrFunc;
    getHypergridColumn(columnId: string): any;
    getIPPStyle(): IPPStyle;
    private initInternalGridLogic;
    getRowCount(): number;
    getColumnCount(): number;
    getVisibleRowCount(): number;
    getVisibleColumnCount(): number;
    selectColumn(columnId: string): void;
    onSortSaved(gridColumnIndex: number): void;
    setGridSort(): void;
    setGridData(data: any): void;
    getVendorGridState(): any;
    setVendorGridState(): void;
    isSelectable(): boolean;
    isSortable(): boolean;
    isFilterable(): boolean;
    applyLightTheme(): void;
    applyDarkTheme(): void;
    private applyAlternateRowStyle;
}
export interface CellStyleHypergrid {
    conditionalStyleColumn?: IStyle;
    conditionalStyleRow?: IStyle;
    flashBackColor?: string;
    quickSearchStyle?: IStyle;
    formatColumnStyle?: IStyle;
}
