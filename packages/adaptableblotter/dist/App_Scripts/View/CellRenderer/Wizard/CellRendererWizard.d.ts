import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface CellRendererWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CellRendererWizard> {
    ColorPalette: Array<string>;
}
export declare class CellRendererWizard extends React.Component<CellRendererWizardProps, {}> {
    render(): JSX.Element;
}
