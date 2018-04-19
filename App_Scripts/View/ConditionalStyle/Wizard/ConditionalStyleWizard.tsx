import { IConditionalStyle } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ConditionalStyleStyleWizard } from './ConditionalStyleStyleWizard'
import { ConditionalStyleScopeWizard } from './ConditionalStyleScopeWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { IUserFilter, ISystemFilter } from '../../../Strategy/Interface/IUserFilterStrategy'
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
        let stepNames: string[] = ["Select Scopre", "Create Style", "Build Query"]
        return <div className="adaptable_blotter_style_wizard_conditionalstyle">
            <AdaptableWizard
                FriendlyName={StrategyNames.ConditionalStyleStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                Steps={[
                    <ConditionalStyleScopeWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <ConditionalStyleStyleWizard StepName={stepNames[1]} ColorPalette={this.props.ColorPalette} StyleClassNames={this.props.StyleClassNames} />,
                    <ConditionalStyleExpressionWizard
                        StepName={stepNames[2]}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    />
                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }
}