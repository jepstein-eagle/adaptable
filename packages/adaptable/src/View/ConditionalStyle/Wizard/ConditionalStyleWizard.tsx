import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ConditionalStyleStyleWizard } from './ConditionalStyleStyleWizard';
import { ConditionalStyleScopeWizard } from './ConditionalStyleScopeWizard';
import { ConditionalStyleSummaryWizard } from './ConditionalStyleSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { SharedQuery } from '../../../PredefinedConfig/SharedQueryState';
import { ExpressionWizard } from '../../Components/ExpressionWizard';

export interface ConditionalStyleWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
  StyleClassNames: string[];
  SharedQueries: SharedQuery[];
  onSetNewSharedQueryName: (newSharedQueryName: string) => void;
  onSetUseSharedQuery: (useSharedQuery: boolean) => void;
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
                <ExpressionWizard
                  Api={this.props.Api}
                  SharedQueries={this.props.SharedQueries}
                  onSetNewSharedQueryName={this.props.onSetNewSharedQueryName}
                  onSetUseSharedQuery={this.props.onSetUseSharedQuery}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: (
                <ConditionalStyleSummaryWizard
                  Api={this.props.Api}
                  SharedQueries={this.props.SharedQueries}
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
