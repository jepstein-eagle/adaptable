import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { CellValidationActionWizard } from './CellValidationActionWizard'
import { CellValidationSelectColumnWizard } from './CellValidationSelectColumnWizard'
import { CellValidationExpressionWizard } from './CellValidationExpressionWizard'
import { CellValidationRulesWizard } from './CellValidationRulesWizard'
import { CellValidationSummaryWizard } from './CellValidationSummaryWizard'
import { CellValidationSelectQueryWizard } from './CellValidationSelectQueryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface CellValidationWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CellValidationWizard> {
}

export class CellValidationWizard extends React.Component<CellValidationWizardProps, {}> {

    render() {
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.CellValidationStrategyName}
                 ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: <CellValidationSelectColumnWizard />
                    },
                    {
                        StepName: "Action",
                        Index: 1,
                        Element: <CellValidationActionWizard />,
                    },
                    {
                        StepName: "Validation",
                        Index: 2,
                        Element: <CellValidationRulesWizard />,
                    },
                    {
                        StepName: "Query",
                        Index: 3,
                        Element: <CellValidationSelectQueryWizard />,
                    },
                    {
                        StepName: "Query",
                        Index: 4,
                        Element: <CellValidationExpressionWizard
                            UserFilters={this.props.UserFilters}
                            SystemFilters={this.props.SystemFilters}
                        />,
                    },
                    {
                        StepName: "Summary",
                        Index: 5,
                        Element: < CellValidationSummaryWizard UserFilters={this.props.UserFilters} />
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
