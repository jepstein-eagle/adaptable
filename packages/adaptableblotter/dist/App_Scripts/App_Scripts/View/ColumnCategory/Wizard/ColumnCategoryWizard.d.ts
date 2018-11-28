import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from "../../Wizard/Interface/IAdaptableWizard";
import { IColumnCategory } from "../../../Core/Interface/Interfaces";
export interface ColumnCategoryWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ColumnCategoryWizard> {
    ColumnCategorys: IColumnCategory[];
}
export declare class ColumnCategoryWizard extends React.Component<ColumnCategoryWizardProps, {}> {
    render(): JSX.Element;
}
