import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface CalculatedColumnWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CalculatedColumnWizard> {
    IsExpressionValid: (expression: string) => void;
    GetErrorMessage: () => string;
}
export declare class CalculatedColumnWizard extends React.Component<CalculatedColumnWizardProps, {}> {
    render(): JSX.Element;
}
