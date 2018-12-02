import * as React from "react";
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface UserFilterWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<UserFilterWizard> {
    SelectedColumnId: string;
}
export declare class UserFilterWizard extends React.Component<UserFilterWizardProps, {}> {
    render(): JSX.Element;
}
