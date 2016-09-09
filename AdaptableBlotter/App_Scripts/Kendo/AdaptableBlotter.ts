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
import * as StrategyIds from '../Core/StrategyIds'
import {IMenuItem, IStragegy} from '../Core/Interface/IStrategy';
import {IEvent} from '../Core/Interface/IEvent';
import {EventDispatcher} from '../Core/EventDispatcher'
import {Helper} from '../Core/Helper';
import {ColumnType} from '../Core/Enums'

import {IAdaptableBlotter, IAdaptableStrategyCollection, ISelectedCells, IColumn} from '../Core/Interface/IAdaptableBlotter'


export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore
    constructor(private grid: kendo.ui.Grid, private container: HTMLElement) {
        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        //we build the list of strategies
        //maybe we don't need to have a map and just an array is fine..... dunno'
        this.Strategies = new Map<string, IStragegy>();
        this.Strategies.set(StrategyIds.CustomSortStrategyId, new CustomSortStrategy(this))
        this.Strategies.set(StrategyIds.SmartEditStrategyId, new SmartEditStrategy(this))
        this.Strategies.set(StrategyIds.ShortcutStrategyId, new ShortcutStrategy(this))
        this.Strategies.set(StrategyIds.UserDataManagementStrategyId, new UserDataManagementStrategy(this))
        this.Strategies.set(StrategyIds.PlusMinusStrategyId, new PlusMinusStrategy(this))


        //we build the menus from all strategies and update redux store
        this.CreateMenu();
        this.SetColumnIntoStore();
        ReactDOM.render(AdaptableBlotterApp(this), this.container);

        //not sure if there is a difference but I prefer the second method since you get correct type of arg at compile time
        //grid.table.bind("keydown",
        grid.table.keydown((event) => {
            this._onKeyDown.Dispatch(this, event)
        })
    }

    public SetColumnIntoStore() {
        let columns: IColumn[] = this.grid.columns.map(x => {
            return {
                ColumnId: x.field,
                ColumnFriendlyName: x.title,
                ColumnType: this.getColumnType(x.field)
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

        //let menuItems = [].concat(this.strategies.values.(strat: IStragegy => strat.getMenuItems()[0]));
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
        // not a nice function by any means - there HAS to be a better way to get the current edited cell.
        // I will post to the forum to ask...

        var currentEditCell = this.getcurrentEditedCell();

        // var jqueryTest = $(test).closest('input.k-input');

        // Need to work out a JQuery way of getting the elemetnt we need. we know its second but dont want to use ordinal 
        // doing it not with jquery until I can work out how to do it properly
        var inputElement: HTMLInputElement = currentEditCell.toArray().find(x => x.className == 'k-input');

        // yet another complication (and another reason why this is horribly flaky) if we are doing a second edit then the classname is slighty different :()
        if (inputElement == undefined) {
            inputElement = currentEditCell.toArray().find(x => x.className == 'k-input k-valid');
        }

        return inputElement.value;
    }

    private getcurrentEditedCell(): JQuery {
        // hopefully there is a way to do this without using jquery, or which is less brittle
        return $(".k-edit-cell .k-input");
    }

    public getSelectedCells(): ISelectedCells {

        let selectionMap: Map<string, { columnID: string, value: any }[]> = new Map<string, { columnID: string, value: any }[]>();
        var selected = this.grid.select();
        selected.each((i, element) => {
            var row = $(element).closest("tr");
            var item = this.grid.dataItem(row);
            var uuid = item.uid;
            var idx = $(element).index();
            var col = <string>(this.grid.options.columns[idx].field);
            var value = item.get(col);
            this.grid.dataSource.options.schema.model.id
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
        //WARNING: in the doc the member is called fields not field 
        let type = this.grid.dataSource.options.schema.model.field[columnId].type;
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


    public getColumnHeader(columnId: string): string {
        let column = this.grid.columns.find(x => x.field == columnId);
        if (column) {
            return column.title
        }
        else {
            return "";
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

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}

