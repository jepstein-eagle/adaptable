import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterApp } from '../../View/AdaptableBlotterView';
import * as MenuRedux from '../../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as ColumnChooserRedux from '../../Redux/ActionsReducers/ColumnChooserRedux'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { AdaptableBlotterStore } from '../../Redux/Store/AdaptableBlotterStore'
import { IMenuItem, IStrategy, IUIError, IUIConfirmation, ICellInfo } from '../../Core/Interface/IStrategy';
import { ICalendarService } from '../../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../../Core/Services/CalendarService'
import { IAuditService } from '../../Core/Services/Interface/IAuditService'
import { AuditService } from '../../Core/Services/AuditService'
import { ISearchService } from '../../Core/Services/Interface/ISearchService'
import { ThemeService } from '../../Core/Services/ThemeService'
import { SearchServiceHyperGrid } from '../../Core/Services/SearchServiceHypergrid'
import { AuditLogService } from '../../Core/Services/AuditLogService'
import * as StrategyIds from '../../Core/StrategyIds'
import { CustomSortStrategy } from '../../Strategy/CustomSortStrategy'
import { SmartEditStrategy } from '../../Strategy/SmartEditStrategy'
import { ShortcutStrategy } from '../../Strategy/ShortcutStrategy'
import { UserDataManagementStrategy } from '../../Strategy/UserDataManagementStrategy'
import { PlusMinusStrategy } from '../../Strategy/PlusMinusStrategy'
import { ColumnChooserStrategy } from '../../Strategy/ColumnChooserStrategy'
import { ExportStrategy } from '../../Strategy/ExportStrategy'
import { FlashingCellsHypergridStrategy } from '../../Strategy/FlashingCellsHypergridStrategy'
import { CalendarStrategy } from '../../Strategy/CalendarStrategy'
import { ConditionalStyleHypergridStrategy } from '../../Strategy/ConditionalStyleHypergridStrategy'
import { PrintPreviewStrategy } from '../../Strategy/PrintPreviewStrategy'
import { QuickSearchStrategy } from '../../Strategy/QuickSearchStrategy'
import { AdvancedSearchStrategy } from '../../Strategy/AdvancedSearchStrategy'
import { FilterStrategy } from '../../Strategy/FilterStrategy'
import { CellValidationStrategy } from '../../Strategy/CellValidationStrategy'
import { LayoutStrategy } from '../../Strategy/LayoutStrategy'
import { ThemeStrategy } from '../../Strategy/ThemeStrategy'
import { DashboardStrategy } from '../../Strategy/DashboardStrategy'
import { TeamSharingStrategy } from '../../Strategy/TeamSharingStrategy'
import { IColumnFilter, IColumnFilterContext } from '../../Core/Interface/IFilterStrategy';
import { ICellValidationRule, ICellValidationStrategy } from '../../Core/Interface/ICellValidationStrategy';
import { IEvent } from '../../Core/Interface/IEvent';
import { EventDispatcher } from '../../Core/EventDispatcher'
import { Helper } from '../../Core/Helper';
import { DataType, LeafExpressionOperator, SortOrder, QuickSearchDisplayType, DistinctCriteriaPairValue, CellValidationMode } from '../../Core/Enums'
import { IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn, IRawValueDisplayValuePair, IAdaptableBlotterOptions } from '../../Core/Interface/IAdaptableBlotter'
import { Expression } from '../../Core/Expression/Expression';
import { CustomSortDataSource } from './CustomSortDataSource'
import { FilterAndSearchDataSource } from './FilterAndSearchDataSource'
import { FilterFormReact } from '../../View/FilterForm';
import { IDataChangingEvent, IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ILayout } from '../../Core/Interface/ILayoutStrategy';
import { LayoutState } from '../../Redux/ActionsReducers/Interface/IState'
import { DefaultAdaptableBlotterOptions } from '../../Core/DefaultAdaptableBlotterOptions'
import { ContextMenuReact } from '../../View/ContextMenu'

//icon to indicate toggle state
const UPWARDS_BLACK_ARROW = '\u25b2' // aka '▲'
const DOWNWARDS_BLACK_ARROW = '\u25bc' // aka '▼'

export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService
    public AuditService: IAuditService
    public SearchService: ISearchService
    public ThemeService: ThemeService
    public AuditLogService: AuditLogService
    private filterContainer: HTMLDivElement
    private contextMenuContainer: HTMLDivElement
    public BlotterOptions: IAdaptableBlotterOptions

    constructor(private grid: any, private container: HTMLElement, options?: IAdaptableBlotterOptions) {
        //we init with defaults then overrides with options passed in the constructor
        this.BlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, options)

        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService(this);
        this.AuditService = new AuditService(this);
        this.SearchService = new SearchServiceHyperGrid(this);
        this.ThemeService = new ThemeService(this)
        this.AuditLogService = new AuditLogService(this);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this, false))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))
        //this.Strategies.set(StrategyIds.ExcelExportStrategyId, new ExcelExportStrategy(this))
        this.Strategies.set(StrategyIds.FlashingCellsStrategyId, new FlashingCellsHypergridStrategy(this))
        this.Strategies.set(StrategyIds.CalendarStrategyId, new CalendarStrategy(this))
        this.Strategies.set(StrategyIds.AdvancedSearchStrategyId, new AdvancedSearchStrategy(this))
        this.Strategies.set(StrategyIds.ConditionalStyleStrategyId, new ConditionalStyleHypergridStrategy(this))
        //this.Strategies.set(StrategyIds.PrintPreviewStrategyId, new PrintPreviewStrategy(this))
        this.Strategies.set(StrategyIds.QuickSearchStrategyId, new QuickSearchStrategy(this))
        this.Strategies.set(StrategyIds.FilterStrategyId, new FilterStrategy(this))
        this.Strategies.set(StrategyIds.ThemeStrategyId, new ThemeStrategy(this))
        this.Strategies.set(StrategyIds.CellValidationStrategyId, new CellValidationStrategy(this))
        this.Strategies.set(StrategyIds.LayoutStrategyId, new LayoutStrategy(this))
        this.Strategies.set(StrategyIds.DashboardStrategyId, new DashboardStrategy(this))
        this.Strategies.set(StrategyIds.TeamSharingStrategyId, new TeamSharingStrategy(this))

        this.filterContainer = this.container.ownerDocument.createElement("div")
        this.filterContainer.id = "filterContainer"
        this.filterContainer.style.position = 'absolute'
        this.filterContainer.style.visibility = "hidden"
        this.container.ownerDocument.body.appendChild(this.filterContainer)

        this.contextMenuContainer = this.container.ownerDocument.createElement("div")
        this.contextMenuContainer.id = "contextMenuContainer"
        this.contextMenuContainer.style.position = 'absolute'
        this.container.ownerDocument.body.appendChild(this.contextMenuContainer)
        ReactDOM.render(ContextMenuReact(this), this.contextMenuContainer);

        ReactDOM.render(AdaptableBlotterApp(this), this.container);

        grid.addEventListener("fin-keydown", (e: any) => {
            //we assume that the primitive event to a fin-keydown event will always be a keyboard event.
            //like that we avoid the need to have different logic for different grids....
            this._onKeyDown.Dispatch(this, e.detail.primitiveEvent)
        });

        //we'll see if we need to handle differently keydown when in edit mode internally or not....
        //I think we don't need to but hey.... you never know
        grid.addEventListener("fin-editor-keydown", (e: any) => {
            //we assume that the primitive event to a fin-keydown event will always be a keyboard event.
            //like that we avoid the need to have different logic for different grids....
            this._onKeyDown.Dispatch(this, e.detail.keyEvent)
        });

        //we hide the filterform if scrolling on the x axis
        grid.addEventListener('fin-scroll-x', (e: any) => {
            if (this.filterContainer.style.visibility == 'visible') {
                this.hideFilterForm()
            }
        }
        )

        grid.addEventListener('fin-click', (e: any) => {
            if (this.filterContainer.style.visibility == 'visible') {
                this.hideFilterForm()
            }
            if (e.detail.primitiveEvent.isHeaderCell) {
                //try to check if we are clicking on the filter icon
                //we remove the scroll as get boundscell look at visible columns only
                let scrolledX = e.detail.gridCell.x - this.grid.getHScrollValue()
                let y = e.detail.gridCell.y
                let headerBounds = this.grid.getBoundsOfCell({ x: scrolledX, y: y })
                let mouseCoordinate = e.detail.primitiveEvent.primitiveEvent.detail.mouse
                let iconPadding = this.grid.properties.iconPadding
                let filterIndex = this.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters.findIndex(x => x.ColumnId == e.detail.primitiveEvent.column.name);
                let filterIconWidth = (<any>window).fin.Hypergrid.images.filter(filterIndex >= 0).width
                if (mouseCoordinate.x > (headerBounds.corner.x - filterIconWidth - iconPadding)) {
                    let filterContext: IColumnFilterContext = {
                        Column: this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == e.detail.primitiveEvent.column.name),
                        Blotter: this,
                        ColumnValueType: DistinctCriteriaPairValue.DisplayValue
                    };
                    this.filterContainer.style.visibility = 'visible'
                    this.filterContainer.style.top = e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientY + 'px'
                    this.filterContainer.style.left = e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientX + 'px'
                    ReactDOM.render(FilterFormReact(filterContext), this.filterContainer);
                }
                e.preventDefault()
            }
        });

        grid.addEventListener("fin-context-menu", (e: any) => {
            if (e.detail.primitiveEvent.isHeaderCell) {
                this.AdaptableBlotterStore.TheStore.dispatch(
                    MenuRedux.ShowColumnContextMenu(
                        e.detail.primitiveEvent.column.name,
                        e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientX,
                        e.detail.primitiveEvent.primitiveEvent.detail.primitiveEvent.clientY))
            }
        });

        grid.addEventListener("fin-before-cell-edit", (event: any) => {
            let dataChangedEvent: IDataChangingEvent
            //there is a bug in hypergrid 07/02/16 and the row object on the event is the row below the one currently edited
            //so we use our methods....
            // var visibleRow = grid.renderer.visibleRows[event.detail.input.event.visibleRow.rowIndex];
            //they now attached correct row somewhere else....
            let row = this.grid.behavior.dataModel.getRow(event.detail.input.event.visibleRow.rowIndex)
            dataChangedEvent = { ColumnId: event.detail.input.column.name, NewValue: event.detail.newValue, IdentifierValue: this.getPrimaryKeyValueFromRecord(row) }

            let failedRules: ICellValidationRule[] = this.AuditService.CheckCellChanging(dataChangedEvent);
            if (failedRules.length > 0) { // we have at least one failure or warning
                let cellValidationStrategy: ICellValidationStrategy = this.Strategies.get(StrategyIds.CellValidationStrategyId) as ICellValidationStrategy;

                // first see if its an error = should only be one item in array if so
                if (failedRules[0].CellValidationMode == CellValidationMode.Prevent) {
                    let errorMessage: string = ObjectFactory.CreateCellValidationMessage(failedRules[0], this);
                    let error: IUIError = {
                        ErrorMsg: errorMessage
                    }
                    this.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowErrorAction>(PopupRedux.PopupShowError(error));
                    event.preventDefault();
                } else {
                    let warningMessage: string = "";
                    failedRules.forEach(f => {
                        warningMessage = warningMessage + ObjectFactory.CreateCellValidationMessage(f, this) + "\n";
                    })
                    let cellInfo: ICellInfo = {
                        Id: dataChangedEvent.IdentifierValue,
                        ColumnId: dataChangedEvent.ColumnId,
                        Value: dataChangedEvent.NewValue
                    }
                    let confirmation: IUIConfirmation = {
                        CancelText: "Cancel",
                        ConfirmationTitle: "Do you want to continue?",
                        ConfirmationMsg: warningMessage,
                        ConfirmationText: "Bypass Rule",
                        CancelAction: null,
                        ConfirmAction: GridRedux.SetValueLikeEdit(cellInfo, (row)[dataChangedEvent.ColumnId])
                    }
                    this.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowConfirmationAction>(PopupRedux.PopupShowConfirmation(confirmation));
                    //we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
                    event.preventDefault();
                }
            }
            //no failed validation so we raise the edit auditlog
            else {
                this.AuditLogService.AddEditCellAuditLog(dataChangedEvent.IdentifierValue,
                    dataChangedEvent.ColumnId,
                    (row)[dataChangedEvent.ColumnId], dataChangedEvent.NewValue)
            }
        });

        //We call Reindex so functions like CustomSort, Search and Filter are reapplied
        grid.addEventListener("fin-after-cell-edit", (e: any) => {
            this.grid.behavior.reindex();
        });

        this.sortOrder = SortOrder.Unknown
        //this is used so the grid displays sort icon when sorting....
        grid.behavior.dataModel.getSortImageForColumn = (columnIndex: number) => {
            var icon = '';
            if (grid.properties.columnIndexes[this.sortColumnGridIndex] == columnIndex) {
                if (this.sortOrder == SortOrder.Ascending) {
                    icon = UPWARDS_BLACK_ARROW;
                }
                else if (this.sortOrder == SortOrder.Descending) {
                    icon = DOWNWARDS_BLACK_ARROW;
                }
            }
            return icon;
        }

        grid.behavior.dataModel.getCell = (config: any, declaredRendererName: string) => {
            if (config.isHeaderRow && !config.isHandleColumn) {
                let filterIndex = this.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters.findIndex(x => x.ColumnId == config.name);
                config.value = [null, config.value, (<any>window).fin.Hypergrid.images.filter(filterIndex >= 0)];
            }
            if (config.isDataRow) {
                var x = config.dataCell.x;
                var y = config.dataCell.y;
                let row = this.grid.behavior.dataModel.dataSource.getRow(y)
                let column = this.grid.behavior.getActiveColumns().find((col: any) => col.index == x)
                if (column && row) {
                    this.AuditService.CreateAuditEvent(this.getPrimaryKeyValueFromRecord(row), row[column.name], column.name)
                    // this.AuditService.CreateAuditEvent(this.getPrimaryKeyValueFromRecord(row), config.value, column.name)
                }
                let flashColor = this.grid.behavior.getCellProperty(x, y, 'flashBackgroundColor')
                let csBackgroundColorColumn = this.grid.behavior.getCellProperty(x, y, 'csBackgroundColorColumn')
                let csForeColorColumn = this.grid.behavior.getCellProperty(x, y, 'csForeColorColumn')
                let csBackgroundColorRow = this.grid.behavior.getCellProperty(x, y, 'csBackgroundColorRow')
                let csForeColorRow = this.grid.behavior.getCellProperty(x, y, 'csForeColorRow')
                let quickSearchBackColor = this.grid.behavior.getCellProperty(x, y, 'quickSearchBackColor')
                if (flashColor) {
                    config.backgroundColor = flashColor;
                }
                else if (quickSearchBackColor) {
                    config.backgroundColor = quickSearchBackColor;
                }
                else if (csBackgroundColorColumn ) {
                    config.backgroundColor = csBackgroundColorColumn;
                }
                else if ( csForeColorColumn) {
                    config.color = csForeColorColumn;
                }
                else if (csBackgroundColorRow ) {
                    config.backgroundColor = csBackgroundColorRow;
                 }
                else if ( csForeColorRow) {
                    config.color = csForeColorRow;
                }
            }
            return this.grid.cellRenderers.get(declaredRendererName);
        };

        grid.addEventListener('fin-column-sort', (e: any) => {
            this.toggleSort(e.detail.column)
            //in case we want multi column
            //keys =  event.detail.keys;
        });

        //We add our sorter pipe last into the existing pipeline
        let currentDataSources = grid.behavior.dataModel.DataSources;
        currentDataSources.push(FilterAndSearchDataSource(this))
        currentDataSources.push(CustomSortDataSource(this))

        grid.setPipeline(currentDataSources, {
            stash: 'default',
            apply: false //  Set the new pipeline without calling reindex. We might need to reindex.... Not sure yet
        });

        grid.addEventListener("fin-column-changed-event", () => {
            setTimeout(() => this.setColumnIntoStore(), 5);
        });
    }

    public setColumnIntoStore() {
        // let columns: IColumn[] = this.grid.behavior.columns.map((x: any) => {
        let activeColumns: IColumn[] = this.grid.behavior.getActiveColumns().map((x: any, index: number) => {
            return {
                ColumnId: x.name ? x.name : "Unknown Column",
                FriendlyName: x.header ? x.header : (x.name ? x.name : "Unknown Column"),
                DataType: this.getColumnDataType(x),
                Visible: true,
                Index: index
            }
        });
        let hiddenColumns: IColumn[] = this.grid.behavior.getHiddenColumns().map((x: any) => {
            return {
                ColumnId: x.name ? x.name : "Unknown Column",
                FriendlyName: x.header ? x.header : (x.name ? x.name : "Unknown Column"),
                DataType: this.getColumnDataType(x),
                Visible: false,
                Index: -1
            }
        });
        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.SetColumnsAction>(GridRedux.SetColumns(activeColumns.concat(hiddenColumns)));
    }

    public hideFilterForm() {
        ReactDOM.unmountComponentAtNode(this.filterContainer)
        this.filterContainer.style.visibility = 'hidden'
    }

    public setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
        VisibleColumnList.forEach((column, index) => {
            //we use allcolumns so we can show previously hidden columns
            let oldcolindex = this.grid.behavior.allColumns.findIndex((x: any) => x.name == column.ColumnId)
            this.grid.behavior.showColumns(false, oldcolindex, index, false)
            //this.grid.swapColumns(index, oldcolindex);
        })
        this.grid.behavior.getActiveColumns().filter((x: any) => VisibleColumnList.findIndex(y => y.ColumnId == x.name) < 0).forEach(((col: any) => {
            this.grid.behavior.hideColumns(false, this.grid.behavior.allColumns.indexOf(col))
        }))
        this.grid.behavior.changed()
        //if the event columnReorder starts to be fired when changing the order programmatically 
        //we'll need to remove that line
        this.setColumnIntoStore();
    }

    private _onKeyDown: EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> = new EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>();
    public onKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> {
        return this._onKeyDown;
    }

    private _onGridDataBound: EventDispatcher<IAdaptableBlotter, IAdaptableBlotter> = new EventDispatcher<IAdaptableBlotter, IAdaptableBlotter>();
    public onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter> {
        return this._onGridDataBound;
    }

    public createMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => menuItems.push(...x.getMenuItems()));

        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
    }

    public sortColumnGridIndex: number = -1
    public sortColumnName: string = ""
    public sortOrder: SortOrder
    public toggleSort(gridColumnIndex: number) {
        //Toggle sort one column at a time
        if (this.sortColumnGridIndex === gridColumnIndex) {
            if (this.sortOrder == SortOrder.Descending) {
                this.sortColumnGridIndex = -1;
            }
            else {
                this.sortOrder = SortOrder.Descending
            }
        } else {
            this.sortOrder = SortOrder.Ascending
            this.sortColumnGridIndex = gridColumnIndex;
            this.sortColumnName = this.grid.behavior.getActiveColumns()[gridColumnIndex].name
        }
        this.grid.behavior.reindex();
    }

    public getPrimaryKeyValueFromRecord(record: any): any {
        return record[this.BlotterOptions.primaryKey]
    }

    public gridHasCurrentEditValue(): boolean {
        return this.grid.cellEditor;
    }

    public getCurrentCellEditValue(): any {
        if (this.grid.cellEditor) {
            return this.grid.cellEditor.getEditorValue()
        }
        return "";
    }

    getActiveCell(): ICellInfo {
        let currentCell = this.grid.selectionModel.getLastSelection();

        if (currentCell) {
            let column = this.grid.behavior.getActiveColumns()[currentCell.origin.x]
            let row = this.grid.behavior.dataModel.dataSource.getRow(currentCell.origin.y)
            let primaryKey = this.getPrimaryKeyValueFromRecord(row)

            //this function needs the column.index from the schema
            // let value = this.grid.behavior.dataModel.dataSource.getValue(currentCell.origin.x, currentCell.origin.y)
            let value = this.grid.behavior.dataModel.dataSource.getValue(column.index, currentCell.origin.y)
            return { Id: primaryKey, ColumnId: column.name, Value: value }
        }
        return null
    }

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns fuck all
    public getSelectedCells(): ISelectedCells {
        let selectionMap: Map<string, { columnID: string, value: any }[]> = new Map<string, { columnID: string, value: any }[]>();
        var selected: Array<any> = this.grid.selectionModel.getSelections();
        for (let rectangle of selected) {
            //we don't use firstSelectedCell and lastSelectedCell as they keep the order of the click. i.e. firstcell can be below lastcell....
            //for (let columnIndex = rectangle.firstSelectedCell.x; columnIndex <= rectangle.lastSelectedCell.x; columnIndex++) {
            for (let columnIndex = rectangle.origin.x; columnIndex <= rectangle.origin.x + rectangle.width; columnIndex++) {
                let column = this.grid.behavior.getActiveColumns()[columnIndex]
                for (let rowIndex = rectangle.origin.y; rowIndex <= rectangle.origin.y + rectangle.height; rowIndex++) {
                    // for (let rowIndex = rectangle.firstSelectedCell.y; rowIndex <= rectangle.lastSelectedCell.y; rowIndex++) {
                    let row = this.grid.behavior.dataModel.dataSource.getRow(rowIndex)
                    let primaryKey = this.getPrimaryKeyValueFromRecord(row)
                    //this function needs the column.index from the schema
                    // let value = this.grid.behavior.dataModel.dataSource.getValue(columnIndex, rowIndex)
                    let value = this.grid.behavior.dataModel.dataSource.getValue(column.index, rowIndex)
                    //this line is pretty much doing the same....just keeping it for the record
                    //maybe we could get it directly from the row..... dunno wht's best
                    // let value = column.getValue(rowIndex)
                    let valueArray = selectionMap.get(primaryKey);
                    if (valueArray == undefined) {
                        valueArray = []
                        selectionMap.set(primaryKey, valueArray);
                    }
                    valueArray.push({ columnID: column.name, value: value });
                }
            }
        }

        return {
            Selection: selectionMap
        };
    }



    public getColumnDataType(column: any): DataType {
        //Some columns can have no ID or Title. we return string as a consequence but it needs testing
        if (!column) {
            console.log('columnId is undefined returning String for Type')
            return DataType.String;
        }

        if (column) {
            if (!column.hasOwnProperty('type')) {
                console.log('There is no defined type. Defaulting to type of the first value for column ' + column.name)
                switch (column.getType()) {
                    case 'string':
                        return DataType.String;
                    case 'number':
                    case 'int':
                    case 'float':
                        return DataType.Number;
                    case 'boolean':
                        return DataType.Boolean;
                    case 'date':
                        return DataType.Date;
                    case 'object':
                        return DataType.Object;
                    default:
                        break;
                }
            }
            return DataType.String;
        }
        let type = column.type;
        switch (type) {
            case 'string':
                return DataType.String;
            case 'number':
                return DataType.Number;
            case 'boolean':
                return DataType.Boolean;
            case 'date':
                return DataType.Date;
            case 'object':
                return DataType.Object;
            default:
                break;
            //  }
        }
        console.log('columnId does not exist')
        return DataType.String;
    }

    public setValue(cellInfo: ICellInfo): void {
        //there is a bug in hypergrid 15/12/16 and the row object on the cellEditor is the row below the one currently edited
        //so we just close editor for now even if not the one where we set the value
        //if(this.gridHasCurrentEditValue() && this.getPrimaryKeyValueFromRecord(this.grid.cellEditor.row) == id)
        this.cancelEdit()

        let row = this.grid.behavior.dataModel.dataSource.findRow(this.BlotterOptions.primaryKey, cellInfo.Id)
        let oldValue = row[cellInfo.ColumnId]
        row[cellInfo.ColumnId] = cellInfo.Value;

        this.AuditLogService.AddEditCellAuditLog(cellInfo.Id,
            cellInfo.ColumnId,
            oldValue, cellInfo.Value)

        //the grid will eventually pick up the change but we want to force the refresh in order to avoid the weird lag
        this.ReindexAndRepaint()
    }

    public setValueBatch(batchValues: ICellInfo[]): void {
        //no need to have a batch mode so far.... we'll see in the future performance
        for (let element of batchValues) {
            let row = this.grid.behavior.dataModel.dataSource.findRow(this.BlotterOptions.primaryKey, element.Id)
            let oldValue = row[element.ColumnId]
            row[element.ColumnId] = element.Value
            this.AuditLogService.AddEditCellAuditLog(element.Id,
                element.ColumnId,
                oldValue, element.Value)
        }
        //the grid will eventually pick up the change but we want to force the refresh in order to avoid the weird lag
        this.ReindexAndRepaint()
    }

    public cancelEdit() {
        this.grid.abortEditing()
    }

    public getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any {
        if (type == "getColumnValue") {
            let record = this.grid.behavior.dataModel.dataSource.findRow(this.BlotterOptions.primaryKey, id)
            return (columnName: string) => { return record[columnName]; }
        }
        else {
            return (columnName: string) => { return this.getDisplayValue(id, columnName); }
        }
    }

    public selectCells(cells: ICellInfo[]): void {
    }

    public getColumnHeader(columnId: string): string {
        let column = this.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId);
        if (column) {
            return column.FriendlyName
        }
        else {
            return "";
        }
    }

    public getColumnIndex(columnName: string): number {
        //be carefull this returns the index y of the cell. Not the actual index in the collection
        let activeColumn: any = this.grid.behavior.getActiveColumns().find((x: any) => x.name == columnName);
        return (activeColumn) ? activeColumn.index : -1;
    }


    public isColumnReadonly(columnId: string): boolean {
        //TODO : implement the logic when the editor is looked up at runtime when overriding getCellEditorAt
        let colprop = this.grid.behavior.getColumnProperties(this.getColumnIndex(columnId))
        if (colprop.editor) {
            return false;
        }
        else {
            return true
        }
    }

    public setCustomSort(columnId: string, comparer: Function): void {
        //nothing to do except the reindex so the CustomSortSource does it's job if needed
        this.ReindexAndRepaint()
    }

    public removeCustomSort(columnId: string): void {
        //nothing to do except the reindex so the CustomSortSource does it's job if needed
        this.ReindexAndRepaint()
    }

    public ReindexAndRepaint() {
        this.grid.behavior.reindex();
        this.grid.repaint();
    }

    public getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair> {
        let returnMap = new Map<string, IRawValueDisplayValuePair>();
        //We bypass the whole DataSource Stuff as we need to get ALL the data
        let data = this.grid.behavior.dataModel.getData()
        for (var index = 0; index < data.length; index++) {
            var element = data[index]
            let displayString = this.getDisplayValueFromRecord(element, columnId)
            let rawValue = element[columnId]
            if (distinctCriteria == DistinctCriteriaPairValue.RawValue) {
                returnMap.set(rawValue, { RawValue: rawValue, DisplayValue: displayString });
            }
            else if (distinctCriteria == DistinctCriteriaPairValue.DisplayValue) {
                returnMap.set(displayString, { RawValue: rawValue, DisplayValue: displayString });
            }
        }
        return Array.from(returnMap.values());
    }



    public exportBlotter(): void {
    }

    public getDisplayValue(id: any, columnId: string): string {
        let row = this.grid.behavior.dataModel.dataSource.findRow(this.BlotterOptions.primaryKey, id)
        return this.getDisplayValueFromRecord(row, columnId)
    }

    public getDisplayValueFromRecord(row: any, columnId: string) {
        let column = this.grid.behavior.allColumns.find((x: any) => x.name == columnId)
        let formatter = column.getFormatter()
        return formatter(row[columnId])
    }

    public addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void {
        throw 'Not implemented for hypergrid see addCellStyleHypergrid';
    }

    public addCellStyleHypergrid(rowIdentifierValue: any, columnIndex: number, style: CellStyleHypergrid, timeout?: number): void {
        //here we don't call Repaint as we consider that we already are in the repaint loop
        let rowIndex = this.getRowIndexHypergrid(rowIdentifierValue)
        if (rowIndex >= 0) {
            if (style.flashBackColor) {
                this.grid.behavior.setCellProperty(columnIndex, rowIndex, 'flashBackgroundColor', style.flashBackColor)
                if (timeout) {
                    setTimeout(() => this.removeCellStyleByIndex(columnIndex, rowIndex, 'flash'), timeout);
                }
            }
            if (style.quickSearchBackColor) {
                this.grid.behavior.setCellProperty(columnIndex, rowIndex, 'quickSearchBackColor', style.quickSearchBackColor)
            }
            //There is never a timeout for CS
            // we have a bug where if the forecolor is not selected (as is now possible) it defaults to using white?  not sure why it doenst ignore it. 
            if (style.csBackColorColumn) {
                this.grid.behavior.setCellProperty(columnIndex, rowIndex, 'csBackgroundColorColumn', style.csBackColorColumn)
            }
            if (style.csForeColorColumn) {
                this.grid.behavior.setCellProperty(columnIndex, rowIndex, 'csForeColorColumn', style.csForeColorColumn)
            }
        }
    }

    public addRowStyleHypergrid(rowIdentifierValue: any, style: CellStyleHypergrid, timeout?: number): void {
        let rowIndex = this.getRowIndexHypergrid(rowIdentifierValue)
        if (rowIndex >= 0) {
            for (var index = 0; index < this.grid.behavior.getActiveColumns().length; index++) {
                //here we don't call Repaint as we consider that we already are in the repaint loop
                //There is never a timeout for CS
                if (style.csBackColorRow) {
                    this.grid.behavior.setCellProperty(index, rowIndex, 'csBackgroundColorRow', style.csBackColorRow)
                }
                if (style.csForeColorRow) {
                    this.grid.behavior.setCellProperty(index, rowIndex, 'csForeColorRow', style.csForeColorRow)
                }
            }
        }
    }

    public getRowIndexHypergrid(rowIdentifierValue: any): number {
        //11/01/17 We cannot use findRow as it returns the rowIndex from the original DataSource
        //I leave the getIndexedData for now but we would need to optimize that.... since we create a big array every iteration
        // let row = this.grid.behavior.dataModel.dataSource.findRow(this.primaryKey, rowIdentifierValue)
        // let rowIndex = this.grid.behavior.dataModel.dataSource.getProperty('foundRowIndex')
        // return rowIndex
        let rowIndex = this.grid.behavior.dataModel.getIndexedData().findIndex((x: any) => x[this.BlotterOptions.primaryKey] == rowIdentifierValue)
        return rowIndex
    }

    public addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void {
        throw 'Not implemented for hypergrid see addRowStyleHypergrid';
    }

    public removeAllCellStylesWithRegex(regex: RegExp): void {
    }

    public removeAllRowStylesWithRegex(regex: RegExp): void {
    }


    public removeCellStyleByIndex(x: number, y: number, style: 'flash' | 'csColumn' | 'csRow' | 'QuickSearch'): void {
        if (style == 'flash') {
            this.grid.behavior.setCellProperty(x, y, 'flashBackgroundColor', undefined)
            this.grid.repaint()
        }
        if (style == 'csColumn') {
            this.grid.behavior.setCellProperty(x, y, 'csBackgroundColorColumn', undefined)
            this.grid.behavior.setCellProperty(x, y, 'csForeColorColumn', undefined)
            this.grid.repaint()
        }
        if (style == 'csRow') {
            this.grid.behavior.setCellProperty(x, y, 'csBackgroundColorRow', undefined)
            this.grid.behavior.setCellProperty(x, y, 'csForeColorRow', undefined)
            this.grid.repaint()
        }
        if (style == 'QuickSearch') {
            this.grid.behavior.setCellProperty(x, y, 'quickSearchBackColor', undefined)
        }
    }

    public removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void {
    }

    public removeRowStyle(rowIdentifierValue: any, style: string): void {
    }

    public getAllRowIds(): string[] {
        let ds = this.grid.behavior.dataModel.dataSource
        let count = ds.getRowCount();
        let result = new Array(count);
        for (var y = 0; y < count; y++) {
            result[y] = ds.getRow(y)[this.BlotterOptions.primaryKey];
        }
        return result
    }

    public hideRows(rowIds: string[]): void {
    }

    public showRows(rowIds: string[]): void {

    }

    public getDirtyValueForColumnFromDataSource(columnName: string, identifierValue: any): any {
    }

    public isGridPageable(): boolean {
        return false
    }

    public printGrid(): void {

    }

    public applyColumnFilters(): void {
        this.ReindexAndRepaint()
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }


    public getQuickSearchRowIds(rowIds: string[]): string[] {
        return null
    }
}

interface CellStyleHypergrid {
    csForeColorColumn?: string,
    csBackColorColumn?: string,
    csForeColorRow?: string,
    csBackColorRow?: string,
    flashBackColor?: string,
    quickSearchBackColor?: string
}