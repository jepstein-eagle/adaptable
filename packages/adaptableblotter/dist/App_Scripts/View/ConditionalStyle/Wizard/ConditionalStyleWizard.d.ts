import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface ConditionalStyleWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
    ColorPalette: string[];
    StyleClassNames: string[];
}
export declare class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {
    render(): JSX.Element;
}
