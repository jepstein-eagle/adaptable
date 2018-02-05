import { ICustomSort } from '../../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../../Core/Helpers/Helper';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { CustomSortColumnWizard } from './CustomSortColumnWizard'
import { CustomSortValuesWizard } from './CustomSortValuesWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import * as StrategyNames from '../../../Core/Constants/StrategyNames'

export interface CustomSortWizardProps extends React.ClassAttributes<CustomSortWizard> {
    EditedCustomSort: ICustomSort
    CustomSorts: Array<ICustomSort>
    Columns: Array<IColumn>
    WizardStartIndex: number
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    closeWizard: () => void
    onFinishWizard: () => void
}

export class CustomSortWizard extends React.Component<CustomSortWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Create Sort Order"]
        return <AdaptableWizard 
        FriendlyName={StrategyNames.CustomSortStrategyName}
        StepNames={stepNames}
      Steps={[
            <CustomSortColumnWizard  StepName={stepNames[0]} Columns={this.props.Columns.filter(x => !this.props.CustomSorts.find(y => y.ColumnId == x.ColumnId))} />,
            <CustomSortValuesWizard  StepName={stepNames[1]} Columns={this.props.Columns}
                getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />]}
            Data={this.props.EditedCustomSort}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.onFinishWizard()} >
        </AdaptableWizard>
    }

}

