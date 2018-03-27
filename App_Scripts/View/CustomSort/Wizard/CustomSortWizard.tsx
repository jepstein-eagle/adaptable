import { ICustomSort } from '../../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { CustomSortColumnWizard } from './CustomSortColumnWizard'
import { CustomSortValuesWizard } from './CustomSortValuesWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface CustomSortWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CustomSortWizard> {
   }

export class CustomSortWizard extends React.Component<CustomSortWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Create Sort Order"]
        let customSorts:ICustomSort[] = this.props.ConfigEntities as ICustomSort[]
        return <div className="adaptable_blotter_style_wizard_customsort">
            <AdaptableWizard
                FriendlyName={StrategyNames.CustomSortStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                 Steps={[
                    <CustomSortColumnWizard StepName={stepNames[0]} Columns={this.props.Columns.filter(x => !customSorts.find(y => y.ColumnId == x.ColumnId))} />,
                    <CustomSortValuesWizard StepName={stepNames[1]} Columns={this.props.Columns}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }

}

