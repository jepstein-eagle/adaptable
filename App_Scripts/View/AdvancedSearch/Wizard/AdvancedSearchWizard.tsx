import { IAdvancedSearch } from '../../../Strategy/Interface/IAdvancedSearchStrategy';
import * as React from "react";
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard'
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'

export class AdvancedSearchWizard extends React.Component<IAdaptableBlotterObjectExpressionAdaptableWizardProps<AdvancedSearchWizard>, {}> {

    render() {
        let stepNames: string[] = ["Build Query", "Create Name"]
        return <div className="adaptable_blotter_style_wizard_advancedsearch">
            <AdaptableWizard
                FriendlyName={StrategyNames.AdvancedSearchStrategyName}
                StepNames={stepNames}
                Steps={[
                    <AdvancedSearchExpressionWizard
                        Columns={this.props.Columns}
                        StepName={stepNames[0]}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    <AdvancedSearchSettingsWizard StepName={stepNames[1]} AdvancedSearches={this.props.ConfigEntities as IAdvancedSearch[]} />

                ]}
                Data={this.props.EditedAdaptableBlotterObject as IAdvancedSearch}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }

}

