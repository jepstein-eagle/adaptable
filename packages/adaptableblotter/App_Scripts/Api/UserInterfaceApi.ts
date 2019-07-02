import * as UserInterfaceRedux from '../Redux/ActionsReducers/UserInterfaceRedux';
import { ApiBase } from './ApiBase';
import { IUserInterfaceApi } from './Interface/IUserInterfaceApi';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import {
  UserInterfaceState,
  PermittedColumnValues,
} from '../PredefinedConfig/DesignTimeState/UserInterfaceState';

export class UserInterfaceApi extends ApiBase implements IUserInterfaceApi {
  public getUserInterfaceState(): UserInterfaceState {
    return this.getBlotterState().UserInterface;
  }

  public setColorPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteSet(colorPalette));
  }

  public addColorsToPalette(colorPalette: string[]): void {
    this.dispatchAction(UserInterfaceRedux.ColorPaletteAdd(colorPalette));
  }

  public addStyleClassNames(styleClassNames: string[]): void {
    this.dispatchAction(UserInterfaceRedux.StyleClassNamesAdd(styleClassNames));
  }

  public getAllPermittedValues(): PermittedColumnValues[] {
    return this.getBlotterState().UserInterface.PermittedColumnValues;
  }

  public getPermittedValuesForColumn(columnId: string): PermittedColumnValues {
    let permittedValues: PermittedColumnValues[] = this.getAllPermittedValues();
    if (ArrayExtensions.IsNotNullOrEmpty(permittedValues)) {
      return permittedValues.find(pc => pc.ColumnId == columnId);
    }
    return undefined;
  }

  public setColumnPermittedValues(column: string, permittedValues: string[]): void {
    let permittedColumnValues: PermittedColumnValues = {
      ColumnId: column,
      PermittedValues: permittedValues,
    };
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesSet(permittedColumnValues));
  }

  public clearColumnPermittedValues(column: string): void {
    this.dispatchAction(UserInterfaceRedux.PermittedColumnValuesDelete(column));
  }
}
