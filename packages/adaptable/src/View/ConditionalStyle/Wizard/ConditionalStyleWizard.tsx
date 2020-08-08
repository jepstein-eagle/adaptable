import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ConditionalStyleStyleWizard } from './ConditionalStyleStyleWizard';
import { ConditionalStyleScopeWizard } from './ConditionalStyleScopeWizard';
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard';
import { ConditionalStyleSummaryWizard } from './ConditionalStyleSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import { SharedExpression } from '../../../PredefinedConfig/SharedExpressionState';
import * as SharedExpressionRedux from '../../../Redux/ActionsReducers/SharedExpressionRedux';

export interface ConditionalStyleWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
  StyleClassNames: string[];
  SharedExpressions: SharedExpression[];
  onSetNewSharedExpressionName: (newSharedExpressionName: string) => void;
}

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ConditionalStyleStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Scope',
              Index: 0,
              Element: <ConditionalStyleScopeWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Style',
              Index: 1,
              Element: (
                <ConditionalStyleStyleWizard
                  StyleClassNames={this.props.StyleClassNames}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Query Builder',
              Index: 2,
              Element: (
                <ConditionalStyleExpressionWizard
                  Api={this.props.Api}
                  SharedExpressions={this.props.SharedExpressions}
                  onSetNewSharedExpressionName={this.props.onSetNewSharedExpressionName}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: (
                <ConditionalStyleSummaryWizard
                  Api={this.props.Api}
                  SharedExpressions={this.props.SharedExpressions}
                />
              ),
            },
          ]}
          Data={this.props.EditedAdaptableObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
