import * as React from 'react';
import { ExpressionBuilderConditionSelector } from './ExpressionBuilderConditionSelector';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { Flex } from 'rebass';
import { AdaptableWizardStep } from '../Wizard/Interface/IAdaptableWizard';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { ExpressionBuilderPreview } from './ExpressionBuilderPreview';
import { ExpressionMode, QueryBuildStatus, QueryTab } from '../../PredefinedConfig/Common/Enums';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { Expression } from '../../PredefinedConfig/Common/Expression';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import SimpleButton from '../../components/SimpleButton';
import { NamedFilter } from '../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';

export interface ExpressionBuilderPageProps extends React.ClassAttributes<ExpressionBuilderPage> {
  ExpressionMode?: ExpressionMode;
  // these all need to be ptional because of wizard compatibility - todo: fix...
  UpdateGoBackState?(finish?: boolean): void;
  StepName?: string;
  Columns?: Array<AdaptableColumn>;
  Adaptable?: IAdaptable;
}

export interface ExpressionBuilderPageState {
  Expression: Expression;
  SelectedColumnId: string;
  SelectedTab: QueryTab;
}

export class ExpressionBuilderPage
  extends React.Component<ExpressionBuilderPageProps, ExpressionBuilderPageState>
  implements AdaptableWizardStep {
  render() {
    let queryBuildStatus: QueryBuildStatus = this.getQueryBuildStatus();

    let newButton = (
      <SimpleButton
        onClick={() => this.onSelectedColumnChanged()}
        disabled={
          this.props.ExpressionMode == ExpressionMode.SingleColumn ||
          queryBuildStatus == QueryBuildStatus.SelectFirstColumn ||
          queryBuildStatus == QueryBuildStatus.SelectFurtherColumn ||
          queryBuildStatus == QueryBuildStatus.SingleConditionsAdded
        }
        tooltip="Add Condition"
        variant="raised"
        kind="success"
        icon="plus"
        tone="accent"
        AccessLevel={'Full'}
      >
        Add Column Condition
      </SimpleButton>
    );

    return (
      <PanelWithButton
        button={newButton}
        headerText=""
        variant="default"
        bodyProps={{
          style: {
            display: 'flex',
            flexFlow: 'column',
            overflow: 'auto',
          },
        }}
        style={{ height: '100%' }}
      >
        <Flex flexDirection="row" style={{ height: '100%' }}>
          <ExpressionBuilderConditionSelector
            ColumnsList={this.props.Columns || []}
            QueryBuildStatus={queryBuildStatus}
            Expression={this.state.Expression}
            ExpressionMode={
              this.props.ExpressionMode != null
                ? this.props.ExpressionMode
                : ExpressionMode.MultiColumn
            }
            onExpressionChange={expression => this.onChangeExpression(expression)}
            onSelectedColumnChange={(columnId, tab) => this.onSelectedColumnChange(columnId, tab)}
            SelectedColumnId={this.state.SelectedColumnId}
            SelectedTab={this.state.SelectedTab}
            Adaptable={this.props.Adaptable!}
          />

          <ExpressionBuilderPreview
            Expression={this.state.Expression}
            Api={this.props.Adaptable.api}
            onSelectedColumnChange={(columnId, tab) => this.onSelectedColumnChange(columnId, tab)}
            ColumnsList={this.props.Columns || []}
            DeleteColumnValue={(columnId, value) => this.DeleteColumnValue(columnId, value)}
            DeleteUserFilterExpression={(columnId, index) =>
              this.DeleteUserFilterExpression(columnId, index)
            }
            DeleteRange={(columnId, index) => this.DeleteRange(columnId, index)}
            DeleteAllColumnExpression={columnId => this.DeleteAllColumnExpression(columnId)}
            ShowPanel={true}
          />
        </Flex>
      </PanelWithButton>
    );
  }

  getQueryBuildStatus(): QueryBuildStatus {
    // if no expression then assume its new  - fair?
    if (ExpressionHelper.IsNullOrEmptyExpression(this.state.Expression)) {
      if (StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
        return QueryBuildStatus.SelectFirstColumn; // you neeed to select a column
      } else {
        return QueryBuildStatus.ColumnSelected; // column is selected but you need to add some elements
      }
    } else {
      // we have an expression
      if (StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
        return QueryBuildStatus.SelectFurtherColumn; // you neeed to select another column
      } else {
        return this.props.ExpressionMode == ExpressionMode.SingleColumn
          ? QueryBuildStatus.SingleConditionsAdded
          : QueryBuildStatus.MultipleConditionsAdded; // do we need this status???
      }
    }
  }

  onSelectedColumnChanged() {
    this.setState({ SelectedColumnId: '' } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  DeleteColumnValue(columnId: string, value: any) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let columnValues = this.state.Expression.ColumnValueExpressions.find(
      x => x.ColumnId == columnId
    );
    let index = columnValues.ColumnDisplayValues.indexOf(value);
    columnValues.ColumnDisplayValues.splice(index, 1);
    columnValues.ColumnRawValues.splice(index, 1);
    if (columnValues.ColumnDisplayValues.length == 0) {
      let columnValuesIndex = this.state.Expression.ColumnValueExpressions.findIndex(
        x => x.ColumnId == columnId
      );
      this.state.Expression.ColumnValueExpressions.splice(columnValuesIndex, 1);
    }
    let newExpression: Expression = Object.assign({}, this.state.Expression);
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  DeleteUserFilterExpression(columnId: string, index: number) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let columnUserFilterExpressions = this.state.Expression.FilterExpressions.find(
      x => x.ColumnId == columnId
    );
    columnUserFilterExpressions.Filters.splice(index, 1);
    if (columnUserFilterExpressions.Filters.length == 0) {
      let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(
        x => x.ColumnId == columnId
      );
      this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1);
    }
    let newExpression: Expression = Object.assign({}, this.state.Expression);
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  DeleteRange(columnId: string, index: number) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let columnRanges = this.state.Expression.RangeExpressions.find(x => x.ColumnId == columnId);
    columnRanges.Ranges.splice(index, 1);
    if (columnRanges.Ranges.length == 0) {
      let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(
        x => x.ColumnId == columnId
      );
      this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1);
    }
    let newExpression: Expression = Object.assign({}, this.state.Expression);
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  DeleteAllColumnExpression(columnId: string) {
    //we assume that we manipulate a cloned object. i.e we are not mutating the state
    let columnValuesIndex: number = this.state.Expression.ColumnValueExpressions.findIndex(
      x => x.ColumnId == columnId
    );
    if (columnValuesIndex >= 0) {
      this.state.Expression.ColumnValueExpressions.splice(columnValuesIndex, 1);
    }

    let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(
      x => x.ColumnId == columnId
    );
    if (columnUserFilterExpressionIndex >= 0) {
      this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1);
    }

    let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(
      x => x.ColumnId == columnId
    );
    if (columnRangesIndex >= 0) {
      this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1);
    }

    let newExpression: Expression = Object.assign({}, this.state.Expression);
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  onChangeExpression(newExpression: Expression) {
    this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () =>
      this.props.UpdateGoBackState()
    );
  }

  onSelectedColumnChange(columnId: string, tab: QueryTab) {
    this.setState(
      { SelectedColumnId: columnId, SelectedTab: tab } as ExpressionBuilderPageState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return ExpressionHelper.IsNotEmptyOrInvalidExpression(this.state.Expression);
  }
  public canBack(): boolean {
    return this.props.ExpressionMode != ExpressionMode.SingleColumn;
  }
  public Next(): void {
    /*this.props.Data.Values = this.state.SelectedValues*/
  }
  public Back(): void {
    // todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
  public StepName = 'Build Expression';
}
