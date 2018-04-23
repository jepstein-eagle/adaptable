import { IPlusMinusRule } from '../../../Strategy/Interface/IPlusMinusStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { PlusMinusColumnWizard } from './PlusMinusColumnWizard'
import { PlusMinusSettingsWizard } from './PlusMinusSettingsWizard'
import { PlusMinusExpressionWizard } from './PlusMinusExpressionWizard'
import { PlusMinusSummaryWizard } from './PlusMinusSummaryWizard'
import { DistinctCriteriaPairValue, DataType } from '../../../Core/Enums'
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';


export interface PlusMinusWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<PlusMinusWizard> {
    SelectedColumnId: string
}

export class PlusMinusWizard extends React.Component<PlusMinusWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Settings", "Build Query", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyNames.PlusMinusStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={
                    [<PlusMinusColumnWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns.filter(x => x.DataType == DataType.Number)} />,
                    <PlusMinusSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} />,
                    <PlusMinusExpressionWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        SelectedColumnId={this.props.SelectedColumnId}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    < PlusMinusSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} Columns={this.props.Columns} UserFilters={this.props.UserFilters} />

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

