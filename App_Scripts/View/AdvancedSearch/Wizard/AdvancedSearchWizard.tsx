import * as React from "react";
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard'
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard'
import { AdvancedSearchSummaryWizard } from './AdvancedSearchSummaryWizard'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IAdvancedSearch } from "../../../Core/Api/Interface/AdaptableBlotterObjects";

export class AdvancedSearchWizard extends React.Component<IAdaptableBlotterObjectExpressionAdaptableWizardProps<AdvancedSearchWizard>, {}> {

    render() {
        let stepNames: string[] = ["Build Query", "Create Name", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyNames.AdvancedSearchStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <AdvancedSearchExpressionWizard
                        Columns={this.props.Columns}
                        cssClassName={this.props.cssClassName} StepName={stepNames[0]}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    <AdvancedSearchSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} AdvancedSearches={this.props.ConfigEntities as IAdvancedSearch[]} />,
                    < AdvancedSearchSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} Columns={this.props.Columns} UserFilters={this.props.UserFilters} />

                ]}
                Data={this.props.EditedAdaptableBlotterObject as IAdvancedSearch}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()}
                canFinishWizard={() => this.props.canFinishWizard()} />
        </div>
    }

}

