import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ColumnCategorySettingsWizard } from './ColumnCategorySettingsWizard';
import { ColumnCategoryColumnsWizard } from './ColumnCategoryColumnsWizard';
import { ColumnCategorySummaryWizard } from './ColumnCategorySummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';

export interface ColumnCategoryWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<ColumnCategoryWizard> {
  ColumnCategorys: ColumnCategory[];
}

export class ColumnCategoryWizard extends React.Component<ColumnCategoryWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ColumnCategoryStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
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
          Data={this.props.EditedAdaptableBlotterObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
