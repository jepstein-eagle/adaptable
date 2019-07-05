import * as React from 'react';
import { SingleListBox } from '../Components/ListBox/SingleListBox';
import Panel from '../../components/Panel';
import { DistinctCriteriaPairValue, SelectionMode } from '../../PredefinedConfig/Common/Enums';

export interface ExpressionBuilderColumnValuesProps
  extends React.ClassAttributes<ExpressionBuilderColumnValues> {
  SelectedValues: Array<any>;
  ColumnValues: Array<any>;
  onColumnValuesChange: (SelectedValues: Array<any>) => void;
  cssClassName: string;
}

export class ExpressionBuilderColumnValues extends React.Component<
  ExpressionBuilderColumnValuesProps,
  {}
> {
  render() {
    let cssClassName: string = this.props.cssClassName + '__querycolumnvalues';
    return (
      <div className={cssClassName}>
        <Panel
          className="ab_no-padding-anywhere-panel ab_small-padding-panel-header"
          style={divStyle}
          bodyProps={{
            style: { border: 'none' },
          }}
        >
          <SingleListBox
            Values={this.props.ColumnValues}
            cssClassName={cssClassName}
            UiSelectedValues={this.props.SelectedValues}
            DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
            ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
            SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
            onSelectedChange={list => this.props.onColumnValuesChange(list)}
            SelectionMode={SelectionMode.Multi}
          />
        </Panel>
      </div>
    );
  }
}

let divStyle: React.CSSProperties = {
  overflowY: 'auto',
  // height: '350px',
};
