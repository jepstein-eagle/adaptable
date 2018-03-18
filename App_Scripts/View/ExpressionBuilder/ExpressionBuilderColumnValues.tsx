import * as React from "react";
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import {  SelectionMode, DistinctCriteriaPairValue } from '../../Core/Enums'
import { SingleListBox } from "../Components/ListBox/SingleListBox";


export interface ExpressionBuilderColumnValuesProps extends React.ClassAttributes<ExpressionBuilderColumnValues> {
    SelectedValues: Array<any>
    ColumnValues: Array<any>
    onColumnValuesChange: (SelectedValues: Array<any>) => void
}

export class ExpressionBuilderColumnValues extends React.Component<ExpressionBuilderColumnValuesProps, {}> {

    render() {
        return <PanelWithButton headerText={"Values"} className="no-padding-panel"   bsStyle="info">
            <SingleListBox style={divStyle} Values={this.props.ColumnValues}
                UiSelectedValues={this.props.SelectedValues}
                DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
                onSelectedChange={(list) => this.props.onColumnValuesChange(list)}
                SelectionMode={SelectionMode.Multi}>
            </SingleListBox>
        </PanelWithButton>
    }
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '335px',
    'marginBottom': '0'
}
