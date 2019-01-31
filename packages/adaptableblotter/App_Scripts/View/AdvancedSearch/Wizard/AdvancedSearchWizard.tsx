import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard'
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard'
import { AdvancedSearchSummaryWizard } from './AdvancedSearchSummaryWizard'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdvancedSearch } from "../../../Utilities/Interface/BlotterObjects/IAdvancedSearch";

export class AdvancedSearchWizard extends React.Component<IAdaptableBlotterObjectExpressionAdaptableWizardProps<AdvancedSearchWizard>, {}> {

    render() {
        let stepNames: string[] = ["Query", "Name", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.AdvancedSearchStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    <AdvancedSearchExpressionWizard
                        StepName={stepNames[0]}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        cssClassName={this.props.cssClassName} 
                        />,
                    <AdvancedSearchSettingsWizard StepName={stepNames[1]} AdvancedSearches={this.props.ConfigEntities as IAdvancedSearch[]} />,
                    < AdvancedSearchSummaryWizard StepName={stepNames[2]} UserFilters={this.props.UserFilters} />

                ]}
                Data={this.props.EditedAdaptableBlotterObject as IAdvancedSearch}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()}
                canFinishWizard={() => this.props.canFinishWizard()} />
        </div>
    }

}

