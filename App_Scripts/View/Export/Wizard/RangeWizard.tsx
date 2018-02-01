import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { RangeColumnsWizard } from './RangeColumnsWizard'
import { RangeExpressionWizard } from './RangeExpressionWizard'
import { RangeNameWizard } from './RangeNameWizard'
import { IRange } from '../../../Strategy/Interface/IExportStrategy';
import { IConfigEntityExpressionAdaptableWizardProps } from './../../Wizard/Interface/IAdaptableWizard'

export class RangeWizard extends React.Component<IConfigEntityExpressionAdaptableWizardProps<RangeWizard>, {}> {

    render() {
        return <AdaptableWizard Steps={[
            <RangeColumnsWizard Columns={this.props.Columns} />,
            <RangeExpressionWizard ColumnList={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SelectedColumnId={null}
                getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
            <RangeNameWizard Ranges={this.props.ConfigEntities as IRange[]} />,
        ]}
            Data={this.props.EditedConfigEntity as IRange}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.onCloseWizard()}
            onFinish={() => this.props.onFinishWizard()} />
    }

}

