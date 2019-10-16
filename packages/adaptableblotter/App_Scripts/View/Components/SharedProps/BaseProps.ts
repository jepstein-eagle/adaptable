import * as React from 'react';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';
import { ColumnFilter } from '../../../PredefinedConfig/RunTimeState/ColumnFilterState';
import { IAdaptableBlotter } from '../../../BlotterInterfaces/IAdaptableBlotter';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { NamedFilter } from '../../../PredefinedConfig/RunTimeState/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/RunTimeState/ColumnCategoryState';

export interface BaseProps<View> extends React.ClassAttributes<View> {
  AccessLevel: AccessLevel;

  Columns: AdaptableBlotterColumn[];
  UserFilters: UserFilter[];
  SystemFilters: string[];
  NamedFilters: NamedFilter[];
  ColumnCategories: ColumnCategory[];
  ColumnFilters: ColumnFilter[];
  ModalContainer: HTMLElement;
  ColorPalette: string[];

  Blotter: IAdaptableBlotter;
}
