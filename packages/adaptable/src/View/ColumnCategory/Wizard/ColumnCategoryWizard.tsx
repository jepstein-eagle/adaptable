import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ColumnCategorySettingsWizard } from './ColumnCategorySettingsWizard';
import { ColumnCategoryColumnsWizard } from './ColumnCategoryColumnsWizard';
import { ColumnCategorySummaryWizard } from './ColumnCategorySummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';

export interface ColumnCategoryWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<ColumnCategoryWizard> {
  ColumnCategorys: ColumnCategory[];
}

export class ColumnCategoryWizard extends React.Component<ColumnCategoryWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ColumnCategoryStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Adaptable={this.props.Adaptable}
          Steps={[
            {
              StepName: 'Name',
              Index: 0,
              Element: (
                <ColumnCategorySettingsWizard ColumnCategorys={this.props.ColumnCategorys} />
              ),
            },
            {
              StepName: 'Selected Columns',
              Index: 1,
              Element: <ColumnCategoryColumnsWizard ColumnCategorys={this.props.ColumnCategorys} />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <ColumnCategorySummaryWizard />,
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
