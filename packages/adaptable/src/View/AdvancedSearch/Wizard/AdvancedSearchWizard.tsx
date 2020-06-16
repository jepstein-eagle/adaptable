import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard';
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard';
import { AdvancedSearchSummaryWizard } from './AdvancedSearchSummaryWizard';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdvancedSearch } from '../../../PredefinedConfig/AdvancedSearchState';

export class AdvancedSearchWizard extends React.Component<
  AdaptableObjectExpressionAdaptableWizardProps<AdvancedSearchWizard>,
  {}
> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.AdvancedSearchStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Query Builder',
              Index: 0,
              Element: <AdvancedSearchExpressionWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Name',
              Index: 1,
              Element: (
                <AdvancedSearchSettingsWizard
                  AdvancedSearches={this.props.ConfigEntities as AdvancedSearch[]}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <AdvancedSearchSummaryWizard Api={this.props.Api} />,
            },
          ]}
          Data={this.props.EditedAdaptableObject as AdvancedSearch}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
