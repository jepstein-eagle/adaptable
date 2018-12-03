import * as React from "react";
import { IColumn } from '../../../api/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ConditionalStyleStyleWizard } from './ConditionalStyleStyleWizard'
import { ConditionalStyleScopeWizard } from './ConditionalStyleScopeWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { ConditionalStyleSummaryWizard } from './ConditionalStyleSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import {  IColumnCategory } from "../../../api/Interface/Interfaces";

export interface ConditionalStyleWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
    ColorPalette: string[],
    StyleClassNames: string[]
    ColumnCategories: IColumnCategory[]
}

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Scope", "Create Style", "Build Query", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ConditionalStyleStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <ConditionalStyleScopeWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} ColumnCategories={this.props.ColumnCategories} />,
                    <ConditionalStyleStyleWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} ColorPalette={this.props.ColorPalette} StyleClassNames={this.props.StyleClassNames} />,
                    <ConditionalStyleExpressionWizard
                        cssClassName={this.props.cssClassName} StepName={stepNames[2]}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        />,
                    < ConditionalStyleSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} Columns={this.props.Columns} UserFilters={this.props.UserFilters} />

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