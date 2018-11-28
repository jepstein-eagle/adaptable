import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface FormatColumnWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<FormatColumnWizard> {
    ColorPalette: string[];
    StyleClassNames: string[];
}
export declare class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {
    render(): JSX.Element;
}
