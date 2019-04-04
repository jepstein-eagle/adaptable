import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { DataSourceSettingsWizard } from './DataSourceSettingsWizard'
import { DataSourceSummaryWizard } from './DataSourceSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IDataSource } from "../../../Utilities/Interface/BlotterObjects/IDataSource";

export interface DataSourceWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<DataSourceWizard> {
}

export class DataSourceWizard extends React.Component<DataSourceWizardProps, {}> {

    render() {
        let dataSources: IDataSource[] = this.props.ConfigEntities as IDataSource[]
         let dataSourceNames: string[] = dataSources.map(s => s.Name);
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.DataSourceStrategyName}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    {
                        StepName: "Settings",
                        Index: 0,
                        Element: <DataSourceSettingsWizard DataSourceNames={dataSourceNames} />,
                    },
                    {
                        StepName: "Summary",
                        Index: 1,
                        Element: < DataSourceSummaryWizard />
                    }
                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()}
                canFinishWizard={() => this.props.canFinishWizard()}
            />

        </div>
    }

}

