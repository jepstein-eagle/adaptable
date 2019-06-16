import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { CustomSortColumnWizard } from './CustomSortColumnWizard';
import { CustomSortValuesWizard } from './CustomSortValuesWizard';
import { CustomSortSummaryWizard } from './CustomSortSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICustomSort } from '../../../PredefinedConfig/IUserState/CustomSortState';

export interface CustomSortWizardProps
  extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CustomSortWizard> {}

export class CustomSortWizard extends React.Component<CustomSortWizardProps, {}> {
  render() {
    let customSorts: ICustomSort[] = this.props.ConfigEntities as ICustomSort[];
    return (
      <div className={this.props.cssClassName}>
        <AdaptableWizard
          FriendlyName={StrategyConstants.CustomSortStrategyName}
          ModalContainer={this.props.ModalContainer}
          cssClassName={this.props.cssClassName}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Column',
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
