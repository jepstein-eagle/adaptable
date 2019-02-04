import * as UserInterfaceRedux from '../Redux/ActionsReducers/UserInterfaceRedux'
import { ApiBase } from "./ApiBase";
import { IUserInterfaceApi } from './Interface/IUserInterfaceApi';
import { IPermittedColumnValues } from "../Utilities/Interface/IPermittedColumnValues";

export class UserInterfaceApi extends ApiBase implements IUserInterfaceApi {

  public SetColorPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette))
  }

  public AddColorsToPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette))
  }

  public AddStyleClassNames(styleClassNames: string[]): void {
    this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames))
  }

  public SetColumnPermittedValues(column: string, permittedValues: string[]): void {
    let permittedColumnValues: IPermittedColumnValues = { ColumnId: column, PermittedValues: permittedValues }
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesSet(permittedColumnValues))
  }

  public ClearColumnPermittedValues(column: string): void {
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesDelete(column))
  }

}