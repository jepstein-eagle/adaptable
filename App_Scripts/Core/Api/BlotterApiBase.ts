import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { IEvent } from "../Interface/IEvent";
import { IBlotterApi } from "./Interface/IBlotterApi";
import { ISearchChangedEventArgs } from "./Interface/ServerSearch";
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import { ILayout } from "./Interface/AdaptableBlotterObjects";
import { DEFAULT_LAYOUT } from "../Constants/GeneralConstants";

export abstract class BlotterApiBase implements IBlotterApi {

    constructor(protected blotter: IAdaptableBlotter) {
    }

    public setDataSource(dataSource: any): void {      // no implementation     
    }

    public setLayout(layoutName: string): void {
        let layout: ILayout = this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.Layouts.find(l => l.Name == layoutName);
        if (layout) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(layoutName))
        } else {
            this.blotter.ErrorService.LogError("No layout found with the name: " + layoutName)
        }
    }

    public clearLayout(): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT))
    }

    public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs> {
        return this.blotter.SearchedChanged;
    }

}