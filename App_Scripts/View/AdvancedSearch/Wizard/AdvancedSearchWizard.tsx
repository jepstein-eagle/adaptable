import { IAdvancedSearch } from '../../../Strategy/Interface/IAdvancedSearchStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard'
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard'
import { IConfigEntityExpressionAdaptableWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'

export class AdvancedSearchWizard extends React.Component<IConfigEntityExpressionAdaptableWizardProps<AdvancedSearchWizard>, {}> {

    render() {
        let stepNames: string[] = ["Build Query", "Create Name"]
        return <AdaptableWizard
            FriendlyName={StrategyNames.AdvancedSearchStrategyName}
            StepNames={stepNames}
            Steps={[
                <AdvancedSearchExpressionWizard
                    ColumnList={this.props.Columns}
                    StepName={stepNames[0]}
                    UserFilters={this.props.UserFilters}
                    SelectedColumnId={null}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                <AdvancedSearchSettingsWizard StepName={stepNames[1]} AdvancedSearches={this.props.ConfigEntities as IAdvancedSearch[]} />

            ]}
            Data={this.props.EditedConfigEntity as IAdvancedSearch}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.onCloseWizard()}
            onFinish={() => this.props.onFinishWizard()} />
    }

}

