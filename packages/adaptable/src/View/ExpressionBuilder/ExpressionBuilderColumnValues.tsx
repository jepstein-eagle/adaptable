import * as React from 'react';
import { SingleListBox } from '../Components/ListBox/SingleListBox';
import { CellValueType, SelectionMode } from '../../PredefinedConfig/Common/Enums';

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
        DisplayMember={CellValueType[CellValueType.DisplayValue]}
        ValueMember={CellValueType[CellValueType.DisplayValue]}
        SortMember={CellValueType[CellValueType.RawValue]}
        onSelectedChange={list => this.props.onColumnValuesChange(list)}
        SelectionMode={SelectionMode.Multi}
        listStyle={{
          maxHeight: '50vh',
        }}
      />
    );
  }
}
