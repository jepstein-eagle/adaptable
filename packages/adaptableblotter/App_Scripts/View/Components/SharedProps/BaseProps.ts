import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { IUserFilter } from '../../../PredefinedConfig/IUserState/UserFilterState';
import { IColumnFilter } from '../../../PredefinedConfig/IUserState/ColumnFilterState';
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';

export interface BaseProps<View> extends React.ClassAttributes<View> {
  cssClassName: string;
  AccessLevel: AccessLevel;

  Columns: IColumn[];
  UserFilters: IUserFilter[];
  SystemFilters: string[];
  ColumnFilters: IColumnFilter[];
  ModalContainer: HTMLElement;
  ColorPalette: string[];

  Blotter: IAdaptableBlotter;
}
