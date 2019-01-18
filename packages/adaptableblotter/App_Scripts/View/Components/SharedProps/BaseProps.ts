import * as React from "react";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { IUserFilter, IColumnFilter } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
import { AccessLevel } from "../../../Utilities/Enums";


export interface BaseProps<View> extends React.ClassAttributes<View> {
      cssClassName: string
    AccessLevel: AccessLevel,
                  
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    SystemFilters: string[],
    ColumnFilters: IColumnFilter[],
    ModalContainer: HTMLElement,
    ColorPalette: string[],
  
    Blotter: IAdaptableBlotter
}
