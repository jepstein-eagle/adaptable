import * as React from 'react';
import { SingleListBox } from '../Components/ListBox/SingleListBox';
import Panel from '../../components/Panel';
import { DistinctCriteriaPairValue, SelectionMode } from '../../PredefinedConfig/Common/Enums';

export interface ExpressionBuilderColumnValuesProps
  extends React.ClassAttributes<ExpressionBuilderColumnValues> {
  SelectedValues: Array<any>;
  ColumnValues: Array<any>;
  onColumnValuesChange: (SelectedValues: Array<any>) => void;
}

export class ExpressionBuilderColumnValues extends React.Component<
  ExpressionBuilderColumnValuesProps,
  {}
> {
  render() {
    return (
      <SingleListBox
        Values={this.props.ColumnValues}
        UiSelectedValues={this.props.SelectedValues}
        DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
        ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
        SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
        onSelectedChange={list => this.props.onColumnValuesChange(list)}
        SelectionMode={SelectionMode.Multi}
        listStyle={{
          maxHeight: '50vh',
        }}
      />
    );
  }
}

let divStyle: React.CSSProperties = {
  overflowY: 'auto',
  // height: '350px',
};
