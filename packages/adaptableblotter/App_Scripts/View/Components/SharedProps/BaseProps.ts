import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { UserFilter } from '../../../PredefinedConfig/IUserState/UserFilterState';
import { ColumnFilter } from '../../../PredefinedConfig/IUserState/ColumnFilterState';
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';

export interface BaseProps<View> extends React.ClassAttributes<View> {
  cssClassName: string;
  AccessLevel: AccessLevel;

  Columns: IColumn[];
  UserFilters: UserFilter[];
  SystemFilters: string[];
  ColumnFilters: ColumnFilter[];
  ModalContainer: HTMLElement;
  ColorPalette: string[];

  Blotter: IAdaptableBlotter;
}
