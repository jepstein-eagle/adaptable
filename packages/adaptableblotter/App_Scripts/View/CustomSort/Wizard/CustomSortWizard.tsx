import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { CustomSortColumnWizard } from './CustomSortColumnWizard'
import { CustomSortValuesWizard } from './CustomSortValuesWizard'
import { CustomSortSummaryWizard } from './CustomSortSummaryWizard'
import * as StrategyIds from '../../../Core/Constants/StrategyIds'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICustomSort } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";

export interface CustomSortWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CustomSortWizard> {
}

export class CustomSortWizard extends React.Component<CustomSortWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Create Sort Order", "Summary"]
        let customSorts: ICustomSort[] = this.props.ConfigEntities as ICustomSort[]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyIds.CustomSortStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <CustomSortColumnWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns.filter(x => !customSorts.find(y => y.ColumnId == x.ColumnId))} />,
                    <CustomSortValuesWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} Columns={this.props.Columns} Blotter ={this.props.Blotter} />,
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

