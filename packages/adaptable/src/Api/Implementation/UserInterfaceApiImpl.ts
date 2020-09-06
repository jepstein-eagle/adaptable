import * as UserInterfaceRedux from '../../Redux/ActionsReducers/UserInterfaceRedux';
import { ApiBase } from './ApiBase';
import { UserInterfaceApi } from '../UserInterfaceApi';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import {
  UserInterfaceState,
  EditLookUpItem,
  RowStyle,
  UserMenuItem,
  PermittedValuesItem,
} from '../../PredefinedConfig/UserInterfaceState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { AdaptableScope } from '../../PredefinedConfig/Common/AdaptableScope';

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

  private getPermittedValuesItemsWithColumnScope(): PermittedValuesItem[] | undefined {
    return this.getAllPermittedValuesItems().filter(pv => {
      return 'ColumnIds' in pv.Scope == true;
    });
  }

  private getPermittedValuesItemsWithDataTypeScope(): PermittedValuesItem[] | undefined {
    return this.getAllPermittedValuesItems().filter(pv => {
      return 'DataTypes' in pv.Scope == true;
    });
  }

  private getPermittedValuesItemsWithAllScope(): PermittedValuesItem[] | undefined {
    return this.getAllPermittedValuesItems().filter(pv => {
      return 'All' in pv.Scope == true;
    });
  }

  private getPermittedValuesForScope(column: AdaptableColumn): PermittedValuesItem | undefined {
    let permittedValuesItem: PermittedValuesItem;

    this.getPermittedValuesItemsWithColumnScope().forEach(pv => {
      if (!permittedValuesItem) {
        if (this.adaptable.api.scopeApi.isColumnInScope(column, pv.Scope)) {
          permittedValuesItem = pv;
        }
      }
    });

    if (permittedValuesItem) {
      return permittedValuesItem;
    }

    this.getPermittedValuesItemsWithDataTypeScope().forEach(pv => {
      if (!permittedValuesItem) {
        if (this.adaptable.api.scopeApi.isColumnInScope(column, pv.Scope)) {
          permittedValuesItem = pv;
        }
      }
    });

    if (permittedValuesItem) {
      return permittedValuesItem;
    }

    this.getPermittedValuesItemsWithAllScope().forEach(pv => {
      if (!permittedValuesItem) {
        if (this.adaptable.api.scopeApi.isColumnInScope(column, pv.Scope)) {
          permittedValuesItem = pv;
        }
      }
    });

    if (permittedValuesItem) {
      return permittedValuesItem;
    }

    return undefined;
  }

  public getPermittedValuesForColumn(column: AdaptableColumn): any[] | undefined {
    if (ArrayExtensions.IsNullOrEmpty(this.getAllPermittedValuesItems())) {
      return undefined;
    }
    let permittedValuesColumn: PermittedValuesItem = this.getPermittedValuesForScope(column);
    if (!permittedValuesColumn) {
      return undefined;
    }

    // return any hard-coded permitted values if they have been set
    if (ArrayExtensions.IsNotNull(permittedValuesColumn.PermittedValues)) {
      return permittedValuesColumn.PermittedValues;
    }

    // then try the function if that has been set
    if (StringExtensions.IsNotNullOrEmpty(permittedValuesColumn.GetColumnValuesFunction)) {
      if (column) {
        const fn = this.adaptable.getUserFunctionHandler(
          'GetColumnValuesFunction',
          permittedValuesColumn.GetColumnValuesFunction
        );
        let values = fn(column);
        return values;
      }
    }
    return undefined;
  }

  public setPermittedValuesItem(scope: AdaptableScope, permittedValues: string[]): void {
    let permittedColumnValues: PermittedValuesItem = {
      Scope: scope,
      PermittedValues: permittedValues,
    };
    this.dispatchAction(UserInterfaceRedux.PermittedValuesColumnSet(permittedColumnValues));
  }

  public deletePermittedValuesItem(permittedValuesItem: PermittedValuesItem): void {
    this.dispatchAction(UserInterfaceRedux.PermittedValuesColumnDelete(permittedValuesItem));
  }

  public getAllEditLookUpItems(): EditLookUpItem[] {
    return this.getAdaptableState().UserInterface.EditLookUpItems;
  }

  public getEditLookUpItemForColumnId(columnId: string): EditLookUpItem | undefined {
    const abColumn: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(columnId);
    let editLookUpItem: EditLookUpItem;
    let editLookUpItems: EditLookUpItem[] = this.getAllEditLookUpItems();

    // first we get any for the column as that is lower level
    editLookUpItem = editLookUpItems
      .filter(pv => {
        return 'ColumnIds' in pv.Scope == true;
      })
      .find(pv => {
        this.adaptable.api.scopeApi.isColumnInScope(abColumn, pv.Scope);
      });
    if (editLookUpItem) {
      return editLookUpItem;
    }

    // then we get any for the DataType
    editLookUpItem = editLookUpItems
      .filter(pv => {
        return 'DataTypes' in pv.Scope == true;
      })
      .find(pv => {
        this.adaptable.api.scopeApi.isColumnInScope(abColumn, pv.Scope);
      });
    if (editLookUpItem) {
      return editLookUpItem;
    }
    // then we get any for All
    editLookUpItem = editLookUpItems
      .filter(pv => {
        return 'All' in pv.Scope == true;
      })
      .find(pv => {
        this.adaptable.api.scopeApi.isColumnInScope(abColumn, pv.Scope);
      });
    if (editLookUpItem) {
      return editLookUpItem;
    }

    return undefined;
  }

  public getEditLookUpValuesForEditLookUpItem(
    editLookUpItem: EditLookUpItem,
    columnId: string
  ): any[] | undefined {
    if (!editLookUpItem) {
      return undefined;
    }

    // return any hard-coded look up values if they have been set
    if (ArrayExtensions.IsNotNull(editLookUpItem.LookUpValues)) {
      return editLookUpItem.LookUpValues;
    }

    // then call the function if that has been set
    if (StringExtensions.IsNotNullOrEmpty(editLookUpItem.GetColumnValuesFunction)) {
      const abColumn: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(columnId);
      if (abColumn) {
        const fn = this.adaptable.getUserFunctionHandler(
          'GetColumnValuesFunction',
          editLookUpItem.GetColumnValuesFunction
        );
        let values = fn(abColumn);
        return values;
      }
    }

    // if no hard-coded values or function provided then just get the distinct values for the column
    // this will use the columnapi method that first looks for permitted values and then distinct values
    return this.adaptable.api.columnApi.getDistinctDisplayValuesForColumn(columnId);
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
