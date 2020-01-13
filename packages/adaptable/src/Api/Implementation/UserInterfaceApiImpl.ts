import * as UserInterfaceRedux from '../../Redux/ActionsReducers/UserInterfaceRedux';
import { ApiBase } from './ApiBase';
import { UserInterfaceApi } from '../UserInterfaceApi';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import {
  UserInterfaceState,
  EditLookUpColumn,
  RowStyle,
  UserMenuItem,
  PermittedValuesColumn,
} from '../../PredefinedConfig/UserInterfaceState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import ColumnHelper from '../../Utilities/Helpers/ColumnHelper';

export class UserInterfaceApiImpl extends ApiBase implements UserInterfaceApi {
  public getUserInterfaceState(): UserInterfaceState {
    return this.getAdaptableState().UserInterface;
  }

  public getColorPalette(): string[] {
    return this.getAdaptableState().UserInterface.ColorPalette;
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

  public getAllPermittedValuesColumns(): PermittedValuesColumn[] {
    return this.getAdaptableState().UserInterface.PermittedValuesColumns;
  }

  public getPermittedValuesColumnForColumn(columnId: string): PermittedValuesColumn {
    let permittedValues: PermittedValuesColumn[] = this.getAllPermittedValuesColumns();
    if (ArrayExtensions.IsNotNullOrEmpty(permittedValues)) {
      return permittedValues.find(pc => pc.ColumnId == columnId);
    }
    return undefined;
  }

  public getPermittedValuesForColumn(columnId: string): any[] {
    let permittedValuesColumn: PermittedValuesColumn = this.getPermittedValuesColumnForColumn(
      columnId
    );
    if (!permittedValuesColumn) {
      return [];
    }

    if (typeof permittedValuesColumn.PermittedValues === 'function') {
      let column: AdaptableColumn = ColumnHelper.getColumnFromId(
        permittedValuesColumn.ColumnId,
        this.adaptable.api.gridApi.getColumns()
      );
      return permittedValuesColumn.PermittedValues(column);
    } else {
      return permittedValuesColumn.PermittedValues;
    }
  }

  public setColumnPermittedValues(column: string, permittedValues: string[]): void {
    let permittedColumnValues: PermittedValuesColumn = {
      ColumnId: column,
      PermittedValues: permittedValues,
    };
    this.dispatchAction(UserInterfaceRedux.PermittedValuesColumnSet(permittedColumnValues));
  }

  public clearColumnPermittedValues(column: string): void {
    this.dispatchAction(UserInterfaceRedux.PermittedValuesColumnDelete(column));
  }

  public getAllEditLookUpColumns(): EditLookUpColumn[] {
    return this.getAdaptableState().UserInterface.EditLookUpColumns;
  }

  public getEditLookUpColumnForColumn(columnId: string): EditLookUpColumn {
    let editLookUpColumns: EditLookUpColumn[] = this.getAllEditLookUpColumns();
    if (ArrayExtensions.IsNotNullOrEmpty(editLookUpColumns)) {
      return editLookUpColumns.find(pc => pc.ColumnId == columnId);
    }
    return undefined;
  }

  public getEditLookUpValuesForColumn(columnId: string): any[] {
    let editLookUpColumn: EditLookUpColumn = this.getEditLookUpColumnForColumn(columnId);
    if (!editLookUpColumn) {
      return [];
    }

    if (typeof editLookUpColumn.LookUpValues === 'function') {
      let column: AdaptableColumn = ColumnHelper.getColumnFromId(
        editLookUpColumn.ColumnId,
        this.adaptable.api.gridApi.getColumns()
      );
      return editLookUpColumn.LookUpValues(column);
    } else {
      return editLookUpColumn.LookUpValues;
    }
  }

  public isEditLookUpColumn(columnId: string): boolean {
    let editLookUpColumnIds: string[] = this.getAllEditLookUpColumns().map(c => c.ColumnId);
    return ArrayExtensions.ContainsItem(editLookUpColumnIds, columnId);
  }

  public clearRowStyles(): void {
    this.dispatchAction(UserInterfaceRedux.RowStylesClear());
    this.adaptable.clearRowStyles();
    this.adaptable.redraw();
  }

  public setRowStyles(rowStyles: RowStyle[]): void {
    this.dispatchAction(UserInterfaceRedux.RowStylesSet(rowStyles));
    this.adaptable.setUpRowStyles();
    this.adaptable.redraw();
  }

  public addContextMenuItem(contextMenuItem: UserMenuItem): void {
    this.dispatchAction(UserInterfaceRedux.ContextMenuItemAdd(contextMenuItem));
  }

  public createContextMenuItem(
    label: string,
    userMenuItemClickedFunction?: () => void,
    icon?: string,
    subMenuItems?: UserMenuItem[]
  ): void {
    let contextMenuItem: UserMenuItem = {
      Label: label,
      UserMenuItemClickedFunction: userMenuItemClickedFunction,
      Icon: icon,
      SubMenuItems: subMenuItems,
    };
    this.addContextMenuItem(contextMenuItem);
  }
}
