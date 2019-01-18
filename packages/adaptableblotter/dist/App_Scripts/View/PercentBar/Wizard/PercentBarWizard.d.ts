import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface PercentBarWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<PercentBarWizard> {
    ColorPalette: Array<string>;
}
export declare class PercentBarWizard extends React.Component<PercentBarWizardProps, {}> {
    render(): JSX.Element;
}
