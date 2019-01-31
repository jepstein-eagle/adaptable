import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ConditionalStyleStyleWizard } from './ConditionalStyleStyleWizard'
import { ConditionalStyleScopeWizard } from './ConditionalStyleScopeWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { ConditionalStyleSummaryWizard } from './ConditionalStyleSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumnCategory } from "../../../Utilities/Interface/BlotterObjects/IColumnCategory";

export interface ConditionalStyleWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
    ColorPalette: string[],
    StyleClassNames: string[]
    ColumnCategories: IColumnCategory[]
}

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Scope", "Style", "Query", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ConditionalStyleStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    <ConditionalStyleScopeWizard StepName={stepNames[0]} ColumnCategories={this.props.ColumnCategories} />,
                    <ConditionalStyleStyleWizard StepName={stepNames[1]} ColorPalette={this.props.ColorPalette} StyleClassNames={this.props.StyleClassNames} />,
                    <ConditionalStyleExpressionWizard
                        StepName={stepNames[2]}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        />,
                    < ConditionalStyleSummaryWizard StepName={stepNames[3]} UserFilters={this.props.UserFilters} />

                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()}
                canFinishWizard={() => this.props.canFinishWizard()}
            />

        </div>
    }
}


