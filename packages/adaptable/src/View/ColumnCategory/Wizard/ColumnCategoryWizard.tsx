import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ColumnCategorySettingsWizard } from './ColumnCategorySettingsWizard';
import { ColumnCategoryColumnsWizard } from './ColumnCategoryColumnsWizard';
import { ColumnCategorySummaryWizard } from './ColumnCategorySummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';

export interface ColumnCategoryWizardProps
  extends AdaptableObjectAdaptableWizardProps<ColumnCategoryWizard> {
  ColumnCategorys: ColumnCategory[];
}

export class ColumnCategoryWizard extends React.Component<ColumnCategoryWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ColumnCategoryStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Name',
              Index: 0,
              Element: (
                <ColumnCategorySettingsWizard
                  ColumnCategorys={this.props.ColumnCategorys}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Selected Columns',
              Index: 1,
              Element: (
                <ColumnCategoryColumnsWizard
                  ColumnCategorys={this.props.ColumnCategorys}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <ColumnCategorySummaryWizard Api={this.props.Api} />,
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
