import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { CalculatedColumnExpressionWizard } from './CalculatedColumnExpressionWizard';
import { CalculatedColumnSettingsWizard } from './CalculatedColumnSettingsWizard';
import { CalculatedColumnSummaryWizard } from './CalculatedColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface CalculatedColumnWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<CalculatedColumnWizard> {
  IsExpressionValid: (expression: string) => void;
  GetErrorMessage: () => string;
}

export class CalculatedColumnWizard extends React.Component<CalculatedColumnWizardProps, {}> {
  render() {
    return (
      <div className={this.props.cssClassName}>
        <AdaptableWizard
          FriendlyName={StrategyConstants.CalculatedColumnStrategyName}
          ModalContainer={this.props.ModalContainer}
          cssClassName={this.props.cssClassName}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Column',
              Index: 0,
              Element: <CalculatedColumnSettingsWizard />,
            },
            {
              StepName: 'Expression',
              Index: 1,
              Element: (
                <CalculatedColumnExpressionWizard
                  Columns={this.props.Columns}
                  GetErrorMessage={this.props.GetErrorMessage}
                  IsExpressionValid={this.props.IsExpressionValid}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <CalculatedColumnSummaryWizard />,
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
