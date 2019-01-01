import * as UserInterfaceRedux from '../Redux/ActionsReducers/UserInterfaceRedux'
import { ApiBase } from "./ApiBase";
import { Visibility, MathOperation } from '../Utilities/Enums';
import { IPermittedColumnValues } from './Interface/Interfaces';

export interface IUserInterfaceApi {
    


  // user interface api methods
  uiSetColorPalette(colorPalette: string[]): void
  uiAddColorsToPalette(colorPalette: string[]): void
  uiAddStyleClassNames(styleClassNames: string[]): void
  uiSetColumnPermittedValues(column: string, permittedValues: string[]): void
  uiClearColumnPermittedValues(column: string): void


}



export class UserInterfaceApi extends ApiBase implements IUserInterfaceApi {

     // user interface api methods
  public uiSetColorPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette))
  }

  public uiAddColorsToPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette))
  }

  public uiAddStyleClassNames(styleClassNames: string[]): void {
    this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames))
  }

  public uiSetColumnPermittedValues(column: string, permittedValues: string[]): void {
    let permittedColumnValues: IPermittedColumnValues = { ColumnId: column, PermittedValues: permittedValues }
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesSet(permittedColumnValues))
  }

  public uiClearColumnPermittedValues(column: string): void {
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesDelete(column))
  }

}