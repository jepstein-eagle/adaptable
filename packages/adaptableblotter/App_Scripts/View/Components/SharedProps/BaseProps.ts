import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { ColumnFilter } from '../../../PredefinedConfig/ColumnFilterState';
import { IAdaptable } from '../../../BlotterInterfaces/IAdaptable';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { NamedFilter } from '../../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';

export interface BaseProps<View> extends React.ClassAttributes<View> {
  AccessLevel: AccessLevel;

  Columns: AdaptableColumn[];
  UserFilters: UserFilter[];
  SystemFilters: string[];
  NamedFilters: NamedFilter[];
  ColumnCategories: ColumnCategory[];
  ColumnFilters: ColumnFilter[];
  ModalContainer: HTMLElement;
  ColorPalette: string[];

  Blotter: IAdaptable;
}
