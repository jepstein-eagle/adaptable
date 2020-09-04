import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ConditionalStyleStyleWizard } from './ConditionalStyleStyleWizard';
import { ConditionalStyleScopeWizard } from './ConditionalStyleScopeWizard';
import { ConditionalStyleSummaryWizard } from './ConditionalStyleSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionWizard } from '../../Components/ExpressionWizard';
import { ConditionalStylePredicateWizard } from './ConditionalStylePredicateWizard';

export interface ConditionalStyleWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
  StyleClassNames: string[];
}

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.ConditionalStyleStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Style',
              Index: 0,
              Element: (
                <ConditionalStyleStyleWizard
                  StyleClassNames={this.props.StyleClassNames}
                  api={this.props.api}
                />
              ),
            },
            {
              StepName: 'Scope',
              Index: 1,
              Element: <ConditionalStyleScopeWizard api={this.props.api} />,
            },
            {
              StepName: 'Condition',
              Index: 2,
              Element: <ConditionalStylePredicateWizard api={this.props.api} />,
            },

            {
              StepName: 'Condition', // has to be conditional in a minute!
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
          data={this.props.editedAdaptableObject}
          stepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
