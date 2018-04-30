import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { CustomSortColumnWizard } from './CustomSortColumnWizard'
import { CustomSortValuesWizard } from './CustomSortValuesWizard'
import { CustomSortSummaryWizard } from './CustomSortSummaryWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICustomSort } from "../../../Core/Api/Interface/AdaptableBlotterObjects";

export interface CustomSortWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CustomSortWizard> {
}

export class CustomSortWizard extends React.Component<CustomSortWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Create Sort Order", "Summary"]
        let customSorts: ICustomSort[] = this.props.ConfigEntities as ICustomSort[]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyNames.CustomSortStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <CustomSortColumnWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns.filter(x => !customSorts.find(y => y.ColumnId == x.ColumnId))} />,
                    <CustomSortValuesWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} Columns={this.props.Columns}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    < CustomSortSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} Columns={this.props.Columns}/>
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

