import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface ShortcutWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ShortcutWizard> {
    NumericKeysAvailable: Array<string>;
    DateKeysAvailable: Array<string>;
}
export declare class ShortcutWizard extends React.Component<ShortcutWizardProps, {}> {
    render(): JSX.Element;
}
