import { ICellValidationRule } from '../../../Strategy/Interface/ICellValidationStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { CellValidationActionWizard } from './CellValidationActionWizard'
import { CellValidationSelectColumnWizard } from './CellValidationSelectColumnWizard'
import { CellValidationExpressionWizard } from './CellValidationExpressionWizard'
import { CellValidationRulesWizard } from './CellValidationRulesWizard'
import { CellValidationSelectQueryWizard } from './CellValidationSelectQueryWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface CellValidationWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CellValidationWizard> {
 }

export class CellValidationWizard extends React.Component<CellValidationWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Choose Action", "Create Rules", "Add Query", "Build Query"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyNames.CellValidationStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <CellValidationSelectColumnWizard  cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <CellValidationActionWizard  cssClassName={this.props.cssClassName} StepName={stepNames[1]} Columns={this.props.Columns} />,
                    <CellValidationRulesWizard  cssClassName={this.props.cssClassName} StepName={stepNames[2]} Columns={this.props.Columns} />,
                    <CellValidationSelectQueryWizard  cssClassName={this.props.cssClassName} StepName={stepNames[3]} Columns={this.props.Columns} />,
                    <CellValidationExpressionWizard  cssClassName={this.props.cssClassName} StepName={stepNames[4]} Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }

}

