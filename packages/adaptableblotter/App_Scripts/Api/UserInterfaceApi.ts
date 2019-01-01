import * as UserInterfaceRedux from '../Redux/ActionsReducers/UserInterfaceRedux'
import { ApiBase } from "./ApiBase";
import { IPermittedColumnValues } from './Interface/Interfaces';

export interface IUserInterfaceApi {

  SetColorPalette(colorPalette: string[]): void
  AddColorsToPalette(colorPalette: string[]): void
  AddStyleClassNames(styleClassNames: string[]): void
  SetColumnPermittedValues(column: string, permittedValues: string[]): void
  ClearColumnPermittedValues(column: string): void
}


export class UserInterfaceApi extends ApiBase implements IUserInterfaceApi {

  // user interface api methods
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