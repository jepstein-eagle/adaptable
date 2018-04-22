import * as React from "react";
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import {  SelectionMode, DistinctCriteriaPairValue } from '../../Core/Enums'
import { SingleListBox } from "../Components/ListBox/SingleListBox";
import { Panel } from "react-bootstrap";


export interface ExpressionBuilderColumnValuesProps extends React.ClassAttributes<ExpressionBuilderColumnValues> {
    SelectedValues: Array<any>
    ColumnValues: Array<any>
    onColumnValuesChange: (SelectedValues: Array<any>) => void
    cssClassName: string

}

export class ExpressionBuilderColumnValues extends React.Component<ExpressionBuilderColumnValuesProps, {}> {

    render() {
        return <Panel className="ab_no-padding-anywhere-panel" style={divStyle}>
            <SingleListBox  Values={this.props.ColumnValues}
                UiSelectedValues={this.props.SelectedValues}
                DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
                onSelectedChange={(list) => this.props.onColumnValuesChange(list)}
                SelectionMode={SelectionMode.Multi}>
            </SingleListBox>
        </Panel>
    }
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '315px',
}
