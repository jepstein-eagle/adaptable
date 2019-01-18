import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface PlusMinusWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<PlusMinusWizard> {
    SelectedColumnId: string;
}
export declare class PlusMinusWizard extends React.Component<PlusMinusWizardProps, {}> {
    render(): JSX.Element;
}
