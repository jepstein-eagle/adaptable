import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { DataSourceSettingsWizard } from './DataSourceSettingsWizard';
import { DataSourceSummaryWizard } from './DataSourceSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { DataSource } from '../../../PredefinedConfig/DataSourceState';

export interface DataSourceWizardProps
  extends AdaptableObjectAdaptableWizardProps<DataSourceWizard> {}

export class DataSourceWizard extends React.Component<DataSourceWizardProps, {}> {
  render() {
    let dataSources: DataSource[] = this.props.configEntities as DataSource[];
    let dataSourceNames: string[] = dataSources.map(s => s.Name);
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.DataSourceStrategyFriendlyName}
          ModalContainer={this.props.modalContainer}
          Api={this.props.api}
          Steps={[
            {
              StepName: 'Settings',
              Index: 0,
              Element: (
                <DataSourceSettingsWizard DataSourceNames={dataSourceNames} api={this.props.api} />
              ),
            },
            {
              StepName: 'Summary',
              Index: 1,
              Element: <DataSourceSummaryWizard api={this.props.api} />,
            },
          ]}
          Data={this.props.editedAdaptableObject}
          StepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
