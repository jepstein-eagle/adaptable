import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { DataSourceSettingsWizard } from './DataSourceSettingsWizard';
import { DataSourceSummaryWizard } from './DataSourceSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { DataSource } from '../../../PredefinedConfig/DataSourceState';

export interface DataSourceWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<DataSourceWizard> {}

export class DataSourceWizard extends React.Component<DataSourceWizardProps, {}> {
  render() {
    let dataSources: DataSource[] = this.props.ConfigEntities as DataSource[];
    let dataSourceNames: string[] = dataSources.map(s => s.Name);
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.DataSourceStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Settings',
              Index: 0,
              Element: (
                <DataSourceSettingsWizard DataSourceNames={dataSourceNames} Api={this.props.Api} />
              ),
            },
            {
              StepName: 'Summary',
              Index: 1,
              Element: <DataSourceSummaryWizard Api={this.props.Api} />,
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
