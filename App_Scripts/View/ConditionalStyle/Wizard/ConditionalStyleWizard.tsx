import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ConditionalStyleStyleWizard } from './ConditionalStyleStyleWizard'
import { ConditionalStyleScopeWizard } from './ConditionalStyleScopeWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { ConditionalStyleSummaryWizard } from './ConditionalStyleSummaryWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface ConditionalStyleWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
      ColorPalette: string[],
      StyleClassNames: string[]
  }

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Scope", "Create Style", "Build Query"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyNames.ConditionalStyleStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <ConditionalStyleScopeWizard  cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <ConditionalStyleStyleWizard  cssClassName={this.props.cssClassName} StepName={stepNames[1]} ColorPalette={this.props.ColorPalette} StyleClassNames={this.props.StyleClassNames} />,
                    <ConditionalStyleExpressionWizard
                         cssClassName={this.props.cssClassName} StepName={stepNames[2]}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    />,
                    < ConditionalStyleSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} Columns={this.props.Columns} UserFilters={this.props.UserFilters}/>

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