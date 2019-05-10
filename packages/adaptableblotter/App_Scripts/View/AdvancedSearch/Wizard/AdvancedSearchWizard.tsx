import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard';
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard';
import { AdvancedSearchSummaryWizard } from './AdvancedSearchSummaryWizard';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IAdvancedSearch } from '../../../Utilities/Interface/BlotterObjects/IAdvancedSearch';

export class AdvancedSearchWizard extends React.Component<
  IAdaptableBlotterObjectExpressionAdaptableWizardProps<AdvancedSearchWizard>,
  {}
> {
  render() {
    return (
      <div className={this.props.cssClassName}>
        <AdaptableWizard
          FriendlyName={StrategyConstants.AdvancedSearchStrategyName}
          ModalContainer={this.props.ModalContainer}
          cssClassName={this.props.cssClassName}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Query',
              Index: 0,
              Element: (
                <AdvancedSearchExpressionWizard
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                  cssClassName={this.props.cssClassName}
                />
              ),
            },
            {
              StepName: 'Name',
              Index: 1,
              Element: (
                <AdvancedSearchSettingsWizard
                  AdvancedSearches={this.props.ConfigEntities as IAdvancedSearch[]}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <AdvancedSearchSummaryWizard UserFilters={this.props.UserFilters} />,
            },
          ]}
          Data={this.props.EditedAdaptableBlotterObject as IAdvancedSearch}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
