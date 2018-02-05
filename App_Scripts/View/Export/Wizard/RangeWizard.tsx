import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { RangeColumnsWizard } from './RangeColumnsWizard'
import { RangeExpressionWizard } from './RangeExpressionWizard'
import { RangeNameWizard } from './RangeNameWizard'
import { IRange } from '../../../Strategy/Interface/IExportStrategy';
import { IConfigEntityExpressionAdaptableWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'

export class RangeWizard extends React.Component<IConfigEntityExpressionAdaptableWizardProps<RangeWizard>, {}> {

    render() {
        let stepNames: string[] = ["Select Columns", "Build Query", "Choose Name"]
        return <AdaptableWizard 
        FriendlyName={StrategyNames.ExportStrategyName}
        StepNames={stepNames}
      Steps={[
            <RangeColumnsWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
            <RangeExpressionWizard StepName={stepNames[1]} ColumnList={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SelectedColumnId={null}
                getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
            <RangeNameWizard StepName={stepNames[2]} Ranges={this.props.ConfigEntities as IRange[]} />,
        ]}
            Data={this.props.EditedConfigEntity as IRange}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.onCloseWizard()}
            onFinish={() => this.props.onFinishWizard()} />
    }

}

