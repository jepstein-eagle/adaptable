/// <reference path="../../typings/index.d.ts" />
/// <reference path="../Core/Interface/IStrategy.d.ts" />
/// <reference path="../Core/Interface/IAdaptableBlotter.d.ts" />


import * as React from "react";
import * as ReactDOM from "react-dom";
import {AdaptableBlotterApp} from '../View/AdaptableBlotterView';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import {IAdaptableBlotterStore, AdaptableBlotterStore} from '../Redux/Store/AdaptableBlotterStore'
import {CustomSortStrategy} from './Strategy/CustomSortStrategy'
import {SmartEditStrategy} from './Strategy/SmartEditStrategy'

export interface IAdaptableBlotter {
    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection
    getSelectedCells(): ISelectedCells
    getColumnType(columnId: string): ColumnType
    getColumnHeader(columnId: string): string
     setValue(id: any, columnId:string, value: any) : void
}

interface ISelectedCells {
    //map of UUID with their associated values/columns
    Selection: Map<any, { columnID: string, value: any }[]>
}

export interface IAdaptableStrategyCollection extends Map<string, IStragegy> {

}

export class AdaptableBlotter implements IAdaptableBlotter {
    public Strategies: IAdaptableStrategyCollection
    public AdaptableBlotterStore: IAdaptableBlotterStore
    constructor(private grid: kendo.ui.Grid, private container: HTMLElement) {
        this.AdaptableBlotterStore = new AdaptableBlotterStore(this);

        //we build the list of strategies
        this.Strategies = new Map<string, IStragegy>();
        this.Strategies.set('CustomSort', new CustomSortStrategy(this))
        this.Strategies.set('SmartEdit', new SmartEditStrategy(this))


        //we build the menus from all strategies and update redux store
        this.CreateMenu();
        ReactDOM.render(AdaptableBlotterApp(this), this.container);
    }

    private CreateMenu() {
        let menuItems: IMenuItem[] = [];
        this.Strategies.forEach(x => menuItems.push(...x.getMenuItems()));

        //let menuItems = [].concat(this.strategies.values.(strat: IStragegy => strat.getMenuItems()[0]));
        this.AdaptableBlotterStore.TheStore.dispatch<MenuRedux.SetMenuItemsAction>(MenuRedux.SetMenuItems(menuItems));
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

    public setValue(id: any, columnId:string, value: any) : void{
        this.grid.dataSource.getByUid(id).set(columnId, value);
    }

    
    public getColumnHeader(columnId: string): string {
        return this.grid.columns.find(x=>x.field == columnId).title;
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}

export enum ColumnType {
    String,
    Number,
    Boolean,
    Date,
    Object
}