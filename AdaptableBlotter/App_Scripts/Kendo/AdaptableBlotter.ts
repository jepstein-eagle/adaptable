/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import {AdaptableBlotterApp} from '../View/AdaptableBlotterView';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import {IAdaptableBlotterStore} from '../Redux/Store/Interface/IAdaptableStore'
import {AdaptableBlotterStore} from '../Redux/Store/AdaptableBlotterStore'
import {CustomSortStrategy} from './Strategy/CustomSortStrategy'
import {SmartEditStrategy} from './Strategy/SmartEditStrategy'
import {ShortcutStrategy} from './Strategy/ShortcutStrategy'
import {UserDataManagementStrategy} from './Strategy/UserDataManagementStrategy'
import {PlusMinusStrategy} from './Strategy/PlusMinusStrategy'
import {ColumnChooserStrategy} from './Strategy/ColumnChooserStrategy'
import * as StrategyIds from '../Core/StrategyIds'
import {IMenuItem, IStrategy} from '../Core/Interface/IStrategy';
import {IEvent} from '../Core/Interface/IEvent';
import {EventDispatcher} from '../Core/EventDispatcher'
import {Helper} from '../Core/Helper';
import {ColumnType} from '../Core/Enums'
import {ICalendarService} from '../Core/Services/Interface/ICalendarService'
import {CalendarService} from '../Core/Services/CalendarService'

import {IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn} from '../Core/Interface/IAdaptableBlotter'


export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore

    public CalendarService: ICalendarService


    constructor(private grid: kendo.ui.Grid, private container: HTMLElement) {
        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        // create the services
        this.CalendarService = new CalendarService();

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStrategy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this))
        this.Strategies.set(StrategyIds.ColumnChooserStrategyId, new ColumnChooserStrategy(this))

        ReactDOM.render(AdaptableBlotterApp(this), this.container);

        //not sure if there is a difference but I prefer the second method since you get correct type of arg at compile time
        //grid.table.bind("keydown",
        grid.table.keydown((event) => {
            this._onKeyDown.Dispatch(this, event)
        })
        //WARNING: this event is not raised when reordering columns programmatically!!!!!!!!! 
        grid.bind("columnReorder", () => {
            // we want to fire this after the DOM manipulation. 
            // Why the fuck they don't have the concept of columnReordering and columnReordered is beyond my understanding
            // http://www.telerik.com/forums/column-reorder-event-delay
            setTimeout(() => this.SetColumnIntoStore(), 5);
        });
    }

    public SetColumnIntoStore() {
        let columns: IColumn[] = this.grid.columns.map(x => {
            return {
                ColumnId: x.field,
                ColumnFriendlyName: x.title,
                ColumnType: this.getColumnType(x.field),
                Visible: x.hasOwnProperty('hidden') ? !x.hidden : true
            }
        });

        this.AdaptableBlotterStore.TheStore.dispatch<GridRedux.SetColumnsAction>(GridRedux.SetColumns(columns));
    }

    private _onKeyDown: EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> = new EventDispatcher<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>();
    OnKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent> {
        return this._onKeyDown;
    }


    public CreateMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => menuItems.push(...x.getMenuItems()));

        //let menuItems = [].concat(this.strategies.values.(strat: IStrategy => strat.getMenuItems()[0]));
        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
    }

    public onMenuClicked(menuItem: IMenuItem): void {
        this.Strategies.get(menuItem.StrategyId).onAction(menuItem.Action);
    }

    public gridHasCurrentEditValue(): boolean {
        var currentEditCell = this.getcurrentEditedCell();
        return currentEditCell.length > 0;
    }

    public getCurrentCellEditValue(): any {
        return this.getcurrentEditedCell().val();
    }

    private getcurrentEditedCell(): JQuery {
        // hopefully there is a way to do this without using jquery, or which is less brittle
        return $(".k-edit-cell .k-input").not(".k-formatted-value");
    }

    //this method will returns selected cells only if selection mode is cells or multiple cells. If the selection mode is row it will returns fuck all
    public getSelectedCells(): ISelectedCells {

        let selectionMap: Map<string, { columnID: string, value: any }[]> = new Map<string, { columnID: string, value: any }[]>();
        var selected = this.grid.select().not("tr");
        selected.each((i, element) => {
            var row = $(element).closest("tr");
            var item = this.grid.dataItem(row);
            var uuid = item.uid;
            var idx = $(element).index();
            var col = <string>(this.grid.options.columns[idx].field);
            var value = item.get(col);
            var valueArray = selectionMap.get(uuid);
            if (valueArray == undefined) {
                valueArray = []
                selectionMap.set(uuid, valueArray);
            }
            valueArray.push({ columnID: col, value: value });
        });

        return {
            Selection: selectionMap
        };
    }

    public getColumnType(columnId: string): ColumnType {
        if (!this.grid.dataSource.options.schema.hasOwnProperty('model') || !this.grid.dataSource.options.schema.model.hasOwnProperty('fields')) {
            console.log('There is no Schema model for the grid. Defaulting to type string for column ' + columnId)
            return ColumnType.String;
        }
        let type = this.grid.dataSource.options.schema.model.fields[columnId].type;
        switch (type) {
            case 'string':
                return ColumnType.String;
            case 'number':
                return ColumnType.Number;
            case 'boolean':
                return ColumnType.Boolean;
            case 'date':
                return ColumnType.Date;
            case 'object':
                return ColumnType.Object;
            default:
                break;
        }
    }

    public setValue(id: any, columnId: string, value: any): void {
        this.grid.dataSource.getByUid(id).set(columnId, value);
    }

    public setValueBatch(batchValues: { id: any, columnId: string, value: any }[]): void {
        for (var item of batchValues) {
            let model: any = this.grid.dataSource.getByUid(item.id);
            model[item.columnId] = item.value;
        }
        this.grid.dataSource.sync();
    }

    public selectCells(cells: { id: any, columnId: string }[]): void {
        let selectorQuery: JQuery
        for (let cell of cells) {
            var foundrow = this.grid.table.find("tr[data-uid='" + cell.id + "']"); //use that to find the row
            let columnIndex = this.grid.columns.findIndex(x => x.field == cell.columnId);
            let tdIndex = columnIndex + 1;
            //we use the context of Jquery instead of parent/children so we improve performance drastically!
            let cellSelect = $("td:nth-child(" + tdIndex + ")", foundrow);
            if (selectorQuery == null) {
                selectorQuery = cellSelect
            }
            else {
                selectorQuery = selectorQuery.add(cellSelect)
            }
        }
        this.grid.select(selectorQuery);
    }

    public getColumnHeader(columnId: string): string {
        let column = this.grid.columns.find(x => x.field == columnId);
        if (column) {
            return column.title
        }
        else {
            return "";
        }
    }

    public isColumnReadonly(columnId: string): boolean {
        if (!this.grid.dataSource.options.schema.hasOwnProperty('model') || !this.grid.dataSource.options.schema.model.hasOwnProperty('fields')) {
            //field cannot be readonly in that scenario
            return false;
        }
        let column = this.grid.dataSource.options.schema.model.fields[columnId];
        if (column) {
            if (column.hasOwnProperty('editable')) {
                return !column.editable
            }
            else {
                return false
            }
        }
        else {
            return true;
        }
    }

    public setCustomSort(columnId: string, comparer: Function): void {
        let column = this.grid.columns.find(x => x.field == columnId);

        if (column) {
            column.sortable = { compare: comparer }
        }
        //TODO : Check if we can optimize that since we will call it for all custom sort
        this.ReInitGrid();
    }

    public removeCustomSort(columnId: string): void {
        let column = this.grid.columns.find(x => x.field == columnId);

        if (column) {
            column.sortable = {}
        }

        //TODO : Check if we can optimize that since we will call it for all custom sort
        this.ReInitGrid();
    }

    private ReInitGrid() {
        this.grid.setDataSource(this.grid.dataSource);

    }

    public getColumnValueString(columnId: string): Array<string> {
        return this.grid.dataSource.data().map(x => (<any>x)[columnId]);
    }

    public SetNewColumnListOrder(VisibleColumnList: Array<IColumn>): void {
        VisibleColumnList.forEach((column, index) => {
            let col = this.grid.columns.find(x => x.field == column.ColumnId)
            //if not then not need to set it because it was already visible.........
            if (col.hasOwnProperty('hidden')) {
                this.grid.showColumn(col)
            }
            this.grid.reorderColumn(index, col);
        })
        this.grid.columns.filter(x => VisibleColumnList.findIndex(y => y.ColumnId == x.field) < 0).forEach((col => {
            this.grid.hideColumn(col)
        }))
        //if the event columnReorder starts to be fired when changing the order programmatically 
        //we'll need to remove that line
        this.SetColumnIntoStore();
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}

