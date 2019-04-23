import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IGridSort } from "../Utilities/Interface/IGridSort";
import { ILayout } from "../Utilities/Interface/BlotterObjects/ILayout";
import { ApiBase } from "./ApiBase";
import { DEFAULT_LAYOUT } from "../Utilities/Constants/GeneralConstants";
import { IColumn } from "../Utilities/Interface/IColumn";
import { ObjectFactory } from "../Utilities/ObjectFactory";
import { ILayoutApi } from './Interface/ILayoutApi';
import { LayoutState } from '../Redux/ActionsReducers/Interface/IState';

export class LayoutApi extends ApiBase implements ILayoutApi {
  
   
  public GetState(): LayoutState {
    return this.getBlotterState().Layout;
}

public  Set(layoutName: string): void {
        let layout: ILayout = this.getBlotterState().Layout.Layouts.find(l => l.Name == layoutName);
        if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
            this.dispatchAction(LayoutRedux.LayoutSelect(layoutName))
        }
    }

    public  Clear(): void {
        this.dispatchAction(LayoutRedux.LayoutSelect(DEFAULT_LAYOUT))
    }

    public  GetCurrent(): ILayout {
        let layoutName = this.getBlotterState().Layout.CurrentLayout;
        return this.GetByName(layoutName);
    }

    public  GetCurrentName(): string {
       return this.getBlotterState().Layout.CurrentLayout;
    }

  public  GetByName(layoutName: string): ILayout{
     let layout : ILayout = this.getBlotterState().Layout.Layouts.find(l=>l.Name == layoutName);
       if (this.checkItemExists(layout, layoutName, StrategyConstants.LayoutStrategyName)) {
      return layout;
       }
  }


    public  GetAll(): ILayout[] {
        return this.getBlotterState().Layout.Layouts;
    }

    public  Save(): void {
        let currentLayoutName: string = this.getBlotterState().Layout.CurrentLayout
        if (currentLayoutName != DEFAULT_LAYOUT) {
            let currentLayoutObject: ILayout = this.getBlotterState().Layout.Layouts.find(l => l.Name == currentLayoutName)
            let currentLayoutIndex: number = this.getBlotterState().Layout.Layouts.findIndex(l => l.Name == currentLayoutName)
            if (currentLayoutIndex != -1) {
                let gridState: any = (currentLayoutObject) ? currentLayoutObject.VendorGridInfo : null
                let visibleColumns: IColumn[] = this.getBlotterState().Grid.Columns.filter(c => c.Visible);
                let gridSorts: IGridSort[] = this.getBlotterState().Grid.GridSorts;
                let layoutToSave = ObjectFactory.CreateLayout(visibleColumns, gridSorts, gridState, currentLayoutName)
                this.dispatchAction(LayoutRedux.LayoutPreSave(currentLayoutIndex, layoutToSave))
            }
        }
    }

}