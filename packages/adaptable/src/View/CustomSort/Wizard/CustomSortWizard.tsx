import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { CustomSortColumnWizard } from './CustomSortColumnWizard';
import { CustomSortValuesWizard } from './CustomSortValuesWizard';
import { CustomSortSummaryWizard } from './CustomSortSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { CustomSort } from '../../../PredefinedConfig/CustomSortState';

export interface CustomSortWizardProps
  extends AdaptableObjectAdaptableWizardProps<CustomSortWizard> {}

export class CustomSortWizard extends React.Component<CustomSortWizardProps, {}> {
  render() {
    let customSorts: CustomSort[] = this.props.ConfigEntities as CustomSort[];
    return (
      <AdaptableWizard
        FriendlyName={StrategyConstants.CustomSortStrategyFriendlyName}
        ModalContainer={this.props.ModalContainer}
        Api={this.props.Api}
        Steps={[
          {
            StepName: 'Select Column',
            Index: 0,
            Element: (
              <CustomSortColumnWizard
                SortedColumns={this.props.Api.columnApi
                  .getColumns()
                  .filter(x => !customSorts.find(y => y.ColumnId == x.ColumnId))}
                CustomSorts={customSorts}
                Api={this.props.Api}
              />
            ),
          },
          {
            StepName: 'Sort Order',
            Index: 1,
            Element: <CustomSortValuesWizard Api={this.props.Api} />,
          },
          {
            StepName: 'Summary',
            Index: 2,
            Element: <CustomSortSummaryWizard Api={this.props.Api} />,
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
