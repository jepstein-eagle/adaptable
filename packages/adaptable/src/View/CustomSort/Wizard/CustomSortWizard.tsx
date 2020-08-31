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
    let customSorts: CustomSort[] = this.props.configEntities as CustomSort[];
    return (
      <AdaptableWizard
        friendlyName={StrategyConstants.CustomSortStrategyFriendlyName}
        modalContainer={this.props.modalContainer}
        api={this.props.api}
        steps={[
          {
            StepName: 'Select Column',
            Index: 0,
            Element: (
              <CustomSortColumnWizard
                SortedColumns={this.props.api.columnApi
                  .getColumns()
                  .filter(x => !customSorts.find(y => y.ColumnId == x.ColumnId))}
                CustomSorts={customSorts}
                api={this.props.api}
              />
            ),
          },
          {
            StepName: 'Sort Order',
            Index: 1,
            Element: <CustomSortValuesWizard api={this.props.api} />,
          },
          {
            StepName: 'Summary',
            Index: 2,
            Element: <CustomSortSummaryWizard api={this.props.api} />,
          },
        ]}
        data={this.props.editedAdaptableObject}
        stepStartIndex={this.props.wizardStartIndex}
        onHide={() => this.props.onCloseWizard()}
        onFinish={() => this.props.onFinishWizard()}
        canFinishWizard={() => this.props.canFinishWizard()}
      />
    );
  }
}
