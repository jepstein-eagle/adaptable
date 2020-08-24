import * as UserInterfaceRedux from '../../Redux/ActionsReducers/UserInterfaceRedux';
import { ApiBase } from './ApiBase';
import { UserInterfaceApi } from '../UserInterfaceApi';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import {
  UserInterfaceState,
  EditLookUpColumn,
  RowStyle,
  UserMenuItem,
  PermittedValuesItem,
} from '../../PredefinedConfig/UserInterfaceState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { Scope } from '../../PredefinedConfig/Common/Scope';

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

  public getAllPermittedValuesItems(): PermittedValuesItem[] {
    return this.getAdaptableState().UserInterface.PermittedValuesItems;
  }

  private getPermittedValuesForScope(column: AdaptableColumn): PermittedValuesItem | undefined {
    let permittedValuesItem: PermittedValuesItem;
    // first we get any for the column as that is lower level
    permittedValuesItem = this.getAllPermittedValuesItems().find(
      pv =>
        ArrayExtensions.IsNotNullOrEmpty(pv.Scope.ColumnIds) &&
        pv.Scope.ColumnIds.includes(column.ColumnId)
    );
    if (permittedValuesItem) {
      return permittedValuesItem;
    }
    // then we get any for the scope
    permittedValuesItem = this.getAllPermittedValuesItems().find(pv =>
      pv.Scope.DataTypes?.includes(column.DataType as any)
    );
    if (permittedValuesItem) {
      console.log('this one', permittedValuesItem);
      return permittedValuesItem;
    }

    return undefined;
  }

  public getPermittedValuesForColumn(columnId: string): any[] | undefined {
    if (ArrayExtensions.IsNullOrEmpty(this.getAllPermittedValuesItems())) {
      return undefined;
    }
    const abColumn: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(columnId);
    let permittedValuesColumn: PermittedValuesItem = this.getPermittedValuesForScope(abColumn);
    if (!permittedValuesColumn) {
      return undefined;
    }

    // return any hard-coded permitted values if they have been set
    if (ArrayExtensions.IsNotNull(permittedValuesColumn.PermittedValues)) {
      return permittedValuesColumn.PermittedValues;
    }

    // then try the function if that has been set
    if (StringExtensions.IsNotNullOrEmpty(permittedValuesColumn.PermittedValuesFetchFunction)) {
      if (abColumn) {
        const fn = this.adaptable.getUserFunctionHandler(
          'PermittedValuesFetchFunction',
          permittedValuesColumn.PermittedValuesFetchFunction
        );
        console.log('fn', fn);
        let values = fn(abColumn);
        return values;
      }
    }
    return undefined;
  }

  public setPermittedValuesItem(scope: Scope, permittedValues: string[]): void {
    let permittedColumnValues: PermittedValuesItem = {
      Scope: scope,
      PermittedValues: permittedValues,
    };
    this.dispatchAction(UserInterfaceRedux.PermittedValuesColumnSet(permittedColumnValues));
  }

  public deletePermittedValuesItem(permittedValuesItem: PermittedValuesItem): void {
    this.dispatchAction(UserInterfaceRedux.PermittedValuesColumnDelete(permittedValuesItem));
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
      let column: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(
        editLookUpColumn.ColumnId
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

  // TODO
  // public createContextMenuItem(
  //   label: string,
  //   userUserMenuItemClickedFunction?: () => void,
  //   icon?: string,
  //   subMenuItems?: UserMenuItem[]
  // ): void {
  //   let contextMenuItem: UserMenuItem = {
  //     Label: label,
  //     UserMenuItemClickedFunction: userUserMenuItemClickedFunction,
  //     Icon: icon,
  //     SubMenuItems: subMenuItems,
  //   };
  //   this.addContextMenuItem(contextMenuItem);
  // }
}
