import * as UserInterfaceRedux from '../Redux/ActionsReducers/UserInterfaceRedux'
import { ApiBase } from "./ApiBase";
import { IUserInterfaceApi } from './Interface/IUserInterfaceApi';
import { IPermittedColumnValues } from "../Utilities/Interface/IPermittedColumnValues";
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { UserInterfaceState } from '../Redux/ActionsReducers/Interface/IState';

export class UserInterfaceApi extends ApiBase implements IUserInterfaceApi {

  
  public GetState(): UserInterfaceState {
    return this.getBlotterState().UserInterface;
}

public SetColorPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette))
  }

  public AddColorsToPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette))
  }

  public AddStyleClassNames(styleClassNames: string[]): void {
    this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames))
  }

  public GetAllPermittedValues(): IPermittedColumnValues[] {
    return this.getBlotterState().UserInterface.PermittedColumnValues;
  }

  public GetPermittedValuesForColumn(columnId: string): IPermittedColumnValues {
    let permittedValues: IPermittedColumnValues[] = this.GetAllPermittedValues();
    if (ArrayExtensions.IsNotNullOrEmpty(permittedValues)) {
      return permittedValues.find(pc => pc.ColumnId == columnId);
    }
    return null;
  }

  public SetColumnPermittedValues(column: string, permittedValues: string[]): void {
    let permittedColumnValues: IPermittedColumnValues = { ColumnId: column, PermittedValues: permittedValues }
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesSet(permittedColumnValues))
  }

  public ClearColumnPermittedValues(column: string): void {
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesDelete(column))
  }

}