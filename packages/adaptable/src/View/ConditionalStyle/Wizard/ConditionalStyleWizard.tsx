import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ConditionalStyleStyleWizard } from './ConditionalStyleStyleWizard';
import { ConditionalStyleScopeWizard } from './ConditionalStyleScopeWizard';
import { ConditionalStyleSummaryWizard } from './ConditionalStyleSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionWizard } from '../../Components/ExpressionWizard';

export interface ConditionalStyleWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
  StyleClassNames: string[];
}

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ConditionalStyleStrategyFriendlyName}
          ModalContainer={this.props.modalContainer}
          Api={this.props.api}
          Steps={[
            {
              StepName: 'Scope',
              Index: 0,
              Element: <ConditionalStyleScopeWizard api={this.props.api} />,
            },
            {
              StepName: 'Style',
              Index: 1,
              Element: (
                <ConditionalStyleStyleWizard
                  StyleClassNames={this.props.StyleClassNames}
                  api={this.props.api}
                />
              ),
            },
            {
              StepName: 'Query Builder',
              Index: 2,
              Element: (
                <ExpressionWizard
                  api={this.props.api}
                  onSetNewSharedQueryName={this.props.onSetNewSharedQueryName}
                  onSetUseSharedQuery={this.props.onSetUseSharedQuery}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <ConditionalStyleSummaryWizard api={this.props.api} />,
            },
          ]}
          Data={this.props.editedAdaptableObject}
          StepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
