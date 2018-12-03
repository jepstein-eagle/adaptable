import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from "../../Wizard/Interface/IAdaptableWizard";
import { IGridSort } from "../../../api/Interface/IAdaptableBlotterObjects";
export interface LayoutWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<LayoutWizard> {
    GridSorts: IGridSort[];
}
export declare class LayoutWizard extends React.Component<LayoutWizardProps, {}> {
    render(): JSX.Element;
}
