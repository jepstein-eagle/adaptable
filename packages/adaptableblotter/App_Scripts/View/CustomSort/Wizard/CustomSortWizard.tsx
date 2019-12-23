import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { CustomSortColumnWizard } from './CustomSortColumnWizard';
import { CustomSortValuesWizard } from './CustomSortValuesWizard';
import { CustomSortSummaryWizard } from './CustomSortSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { CustomSort } from '../../../PredefinedConfig/CustomSortState';

export interface CustomSortWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<CustomSortWizard> {}

export class CustomSortWizard extends React.Component<CustomSortWizardProps, {}> {
  render() {
    let customSorts: CustomSort[] = this.props.ConfigEntities as CustomSort[];
    return (
      <AdaptableWizard
        FriendlyName={StrategyConstants.CustomSortStrategyFriendlyName}
        ModalContainer={this.props.ModalContainer}
        Blotter={this.props.Blotter}
        Columns={this.props.Columns}
        Steps={[
          {
            StepName: 'Select Column',
            Index: 0,
            Element: (
              <CustomSortColumnWizard
                SortedColumns={this.props.Columns.filter(
                  x => !customSorts.find(y => y.ColumnId == x.ColumnId)
                )}
              />
            ),
          },
          {
            StepName: 'Sort Order',
            Index: 1,
            Element: <CustomSortValuesWizard />,
          },
          {
            StepName: 'Summary',
            Index: 2,
            Element: <CustomSortSummaryWizard />,
          },
        ]}
        Data={this.props.EditedAdaptableObject}
        StepStartIndex={this.props.WizardStartIndex}
        onHide={() => this.props.onCloseWizard()}
        onFinish={() => this.props.onFinishWizard()}
        canFinishWizard={() => this.props.canFinishWizard()}
      />
    );
  }
}
