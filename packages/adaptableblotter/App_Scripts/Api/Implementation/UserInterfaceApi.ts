import * as UserInterfaceRedux from '../../Redux/ActionsReducers/UserInterfaceRedux';
import { ApiBase } from './ApiBase';
import { IUserInterfaceApi } from '../Interface/IUserInterfaceApi';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import {
  UserInterfaceState,
  PermittedColumnValues,
  EditLookUpColumn,
  RowStyle,
} from '../../PredefinedConfig/DesignTimeState/UserInterfaceState';

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

  public getAllEditLookUpColumns(): EditLookUpColumn[] {
    return this.getBlotterState().UserInterface.EditLookUpColumns;
  }

  public getEditLookUpColumnForColumn(columnId: string): EditLookUpColumn {
    let editLookUpColumns: EditLookUpColumn[] = this.getAllEditLookUpColumns();
    if (ArrayExtensions.IsNotNullOrEmpty(editLookUpColumns)) {
      return editLookUpColumns.find(pc => pc.ColumnId == columnId);
    }
    return undefined;
  }

  public isEditLookUpColumn(columnId: string): boolean {
    let editLookUpColumnIds: string[] = this.getAllEditLookUpColumns().map(c => c.ColumnId);
    return ArrayExtensions.ContainsItem(editLookUpColumnIds, columnId);
  }

  public clearRowStyles(): void {
    this.dispatchAction(UserInterfaceRedux.RowStylesClear());
    this.blotter.clearRowStyles();
    this.blotter.redraw();
  }

  public setRowStyles(rowStyles: RowStyle[]): void {
    this.dispatchAction(UserInterfaceRedux.RowStylesSet(rowStyles));
    this.blotter.setUpRowStyles();
    this.blotter.redraw();
  }
}
