import * as DeepDiff from 'deep-diff';
import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import * as ColumnFilterRedux from '../../../Redux/ActionsReducers/ColumnFilterRedux';
import { Provider, connect } from 'react-redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import { IColumnFilterContext } from '../../../Utilities/Interface/IColumnFilterContext';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { ColumnFilter } from '../../../PredefinedConfig/ColumnFilterState';
import { Expression, QueryRange } from '../../../PredefinedConfig/Common/Expression';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { DataType, LeafExpressionOperator } from '../../../PredefinedConfig/Common/Enums';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { RangeHelper } from '../../../Utilities/Helpers/RangeHelper';
import Input from '../../../components/Input';
import { NamedFilter } from '../../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';

interface QuickFilterFormProps extends StrategyViewPopupProps<QuickFilterFormComponent> {
  CurrentColumn: AdaptableColumn;
  ColumnWidth: number;
  Adaptable: IAdaptable;
  Columns: AdaptableColumn[];
  UserFilters: UserFilter[];
  SystemFilters: string[];
  NamedFilters: NamedFilter[];
  ColumnCategories: ColumnCategory[];
  ColumnFilters: ColumnFilter[];
  onAddColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterAddAction;
  onEditColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterEditAction;
  onClearColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
}

export interface QuickFilterFormState {
  quickFilterFormText: string;
  filterExpression: Expression;
  numberOperatorPairs: KeyValuePair[];
  stringOperatorPairs: KeyValuePair[];
  dateOperatorPairs: KeyValuePair[];
  booleanOperatorPairs: KeyValuePair[];
  placeholder: string;
}

class QuickFilterFormComponent extends React.Component<QuickFilterFormProps, QuickFilterFormState> {
  constructor(props: QuickFilterFormProps) {
    super(props);
    this.state = {
      quickFilterFormText: '',
      filterExpression: ExpressionHelper.CreateEmptyExpression(),
      numberOperatorPairs: RangeHelper.GetNumberOperatorPairs(),
      stringOperatorPairs: RangeHelper.GetStringOperatorPairs(),
      dateOperatorPairs: RangeHelper.GetDateOperatorPairs(),
      booleanOperatorPairs: RangeHelper.GetBooleanOperatorPairs(),
      placeholder: '',
    };
  }

  componentDidUpdate(prevProps: any, prevState: QuickFilterFormState) {
    this.reconcileFilters();
  }

  componentDidMount() {
    this.reconcileFilters();
  }

  reconcileFilters(): void {
    let existingColumnFilter: ColumnFilter = this.props.ColumnFilters.find(
      cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
    );
    if (existingColumnFilter) {
      // first check to see if we have an expression
      if (ExpressionHelper.IsEmptyExpression(this.state.filterExpression)) {
        // if we have no placeholder then set one - together with the placeholder
        let expressionDescription = ExpressionHelper.ConvertExpressionToString(
          existingColumnFilter.Filter,
          this.props.Columns,
          false
        );
        this.doUpdate({
          filterExpression: existingColumnFilter.Filter,
          placeholder: expressionDescription,
        });
      } else {
        // we have an expression also - but if its not the same as the new one then update it to the new one
        let diff = DeepDiff.diff(existingColumnFilter.Filter, this.state.filterExpression);
        if (diff) {
          let expressionDescription = ExpressionHelper.ConvertExpressionToString(
            existingColumnFilter.Filter,
            this.props.Columns,
            false
          );
          this.doUpdate({
            filterExpression: existingColumnFilter.Filter,
            placeholder: expressionDescription,
            quickFilterFormText: '',
          });
        }
      }
    } else {
      // no filter so make sure our stuff is clear
      if (this.state.placeholder != 'TEMP') {
        if (
          ExpressionHelper.IsNotNullOrEmptyExpression(this.state.filterExpression) ||
          StringExtensions.IsNotNullOrEmpty(this.state.placeholder) ||
          StringExtensions.IsNotNullOrEmpty(this.state.quickFilterFormText)
        ) {
          this.clearState();
        }
      }
    }
  }

  render(): any {
    let controlType: string =
      this.props.CurrentColumn && this.props.CurrentColumn.DataType == DataType.Date
        ? 'date'
        : 'text';

    return this.props.CurrentColumn &&
      this.props.CurrentColumn.Filterable &&
      this.props.CurrentColumn.DataType != DataType.Unknown ? (
      <Input
        style={{
          width: this.props.ColumnWidth,
          padding: 0,
          margin: 'auto',

          minHeight: 20,
          maxHeight: 20,
          fontSize: 'var(--ab-font-size-1)',
        }}
        className="ab-QuickFilterFormInput"
        autoFocus={false}
        type={controlType}
        placeholder={this.state.placeholder}
        value={this.state.quickFilterFormText}
        onChange={(x: any) => this.OnTextChange((x.target as HTMLInputElement).value)}
      />
    ) : null;
  }

  OnTextChange(searchText: string) {
    // as soon as anything changes clear existing column filter
    if (searchText.trim() != this.state.quickFilterFormText.trim()) {
      //   this.clearExistingColumnFilter();
    }

    // if text is empty then clear our state
    if (StringExtensions.IsNullOrEmpty(searchText.trim())) {
      this.clearState();
      this.clearExistingColumnFilter();
      return;
    }

    // otherwise handle the change
    this.handleFilterChange(searchText);
  }

  clearExistingColumnFilter(): void {
    let existingColumnFilter: ColumnFilter = this.props.ColumnFilters.find(
      cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
    );
    if (existingColumnFilter) {
      this.props.onClearColumnFilter(existingColumnFilter);
    }
  }

  createColumnFilter(expression: Expression, searchText: string): void {
    let columnFilter: ColumnFilter = this.props.ColumnFilters.find(
      cf => cf.ColumnId == this.props.CurrentColumn.ColumnId
    );
    if (columnFilter == null) {
      columnFilter = ObjectFactory.CreateColumnFilter(
        this.props.CurrentColumn.ColumnId,
        expression
      );
    } else {
      columnFilter.Filter = expression;
    }

    this.setState({
      quickFilterFormText: searchText,
      filterExpression: expression,
      placeholder: '',
    });
    if (this.props.ColumnFilters.find(cf => cf.ColumnId == columnFilter.ColumnId)) {
      this.props.onEditColumnFilter(columnFilter);
    } else {
      this.props.onAddColumnFilter(columnFilter);
    }
  }

  createRangeExpression(operatorKVP: KeyValuePair, searchText: string): void {
    if (searchText.trim() == operatorKVP.Key) {
      if (RangeHelper.IsStandaloneOperator(operatorKVP.Value)) {
        let range: QueryRange = RangeHelper.CreateValueRange(
          operatorKVP.Value,
          undefined,
          undefined
        );
        let expression: Expression = ExpressionHelper.CreateSingleColumnExpression(
          this.props.CurrentColumn.ColumnId,
          [],
          [],
          [],
          [range]
        );
        this.createColumnFilter(expression, searchText);
      } else {
        // its operator only so do nothing (but set placeholder to ensure not wiped)
        this.clearExpressionState(searchText);
      }
    } else {
      let operand1 = searchText.replace(operatorKVP.Key, '');
      let operand2 = null;
      if (operatorKVP.Value == LeafExpressionOperator.Between) {
        let values: any[] = searchText.trim().split(operatorKVP.Key);
        if (!this.isValidBetweenValues(values)) {
          this.clearExpressionState(searchText);
          return;
        }
        operand1 = values[0];
        operand2 = values[1];
      }
      let range: QueryRange = RangeHelper.CreateValueRange(operatorKVP.Value, operand1, operand2);
      let expression: Expression = ExpressionHelper.CreateSingleColumnExpression(
        this.props.CurrentColumn.ColumnId,
        [],
        [],
        [],
        [range]
      );
      this.createColumnFilter(expression, searchText);
    }
  }

  handleFilterChange(searchText: string): void {
    // first check for existing operators and handle those
    let isRangeExpression: boolean = false;

    let operators: KeyValuePair[];
    switch (this.props.CurrentColumn.DataType) {
      case DataType.Number:
        operators = this.state.numberOperatorPairs;
        break;
      case DataType.String:
        operators = this.state.stringOperatorPairs;
        break;
      case DataType.Date:
        operators = this.state.dateOperatorPairs;
        break;
      case DataType.Boolean:
        operators = this.state.booleanOperatorPairs;
        break;
      default:
        operators = [];
        break;
    }

    operators.forEach(op => {
      if (!isRangeExpression) {
        if (searchText.includes(op.Key)) {
          this.createRangeExpression(op, searchText);
          isRangeExpression = true; // set to true so dont do >= and then later >
        }
      }
    });

    if (!isRangeExpression) {
      // next check to see if it has a ';' - if so then create an "In" for all values; not sure if raw or display...
      if (searchText.includes(';')) {
        let values: string[] = searchText.split(';').map(v => v.trim());
        let expression: Expression = ExpressionHelper.CreateSingleColumnExpression(
          this.props.CurrentColumn.ColumnId,
          values,
          [],
          [],
          []
        );
        this.createColumnFilter(expression, searchText);
      } else {
        // if just a single, non-operator, value then do an "Equals" range
        let equalOperatorPair: KeyValuePair = this.state.numberOperatorPairs.find(
          op => op.Value == LeafExpressionOperator.Contains
        );
        this.createRangeExpression(equalOperatorPair, searchText);
      }
    }
  }

  doUpdate(state: Partial<QuickFilterFormState>): void {
    if (JSON.stringify(state) === JSON.stringify(this.state)) {
      return;
    }

    this.setState(state as QuickFilterFormState);
  }

  clearState(): void {
    this.doUpdate({
      quickFilterFormText: '',
      filterExpression: ExpressionHelper.CreateEmptyExpression(),
      placeholder: '',
    });
  }

  clearExpressionState(searchText: string): void {
    this.setState({
      quickFilterFormText: searchText,
      filterExpression: ExpressionHelper.CreateEmptyExpression(),
      placeholder: 'TEMP',
    });
  }

  isValidBetweenValues(values: any[]): boolean {
    if (values.length != 2) {
      return false;
    }
    if (StringExtensions.IsNullOrEmpty(values[0]) || StringExtensions.IsNullOrEmpty(values[1])) {
      return false;
    }
    return true;
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<QuickFilterFormProps> {
  return {
    CurrentColumn: ownProps.CurrentColumn,
    Adaptable: ownProps.Adaptable,
    Columns: state.Grid.Columns,
    UserFilters: state.UserFilter.UserFilters,
    SystemFilters: state.SystemFilter.SystemFilters,
    NamedFilters: state.NamedFilter.NamedFilters,
    ColumnFilters: state.ColumnFilter.ColumnFilters,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<QuickFilterFormProps> {
  return {
    onAddColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterAdd(columnFilter)),
    onEditColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterEdit(columnFilter)),
    onClearColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter)),
  };
}

export let QuickFilterForm = connect(mapStateToProps, mapDispatchToProps)(QuickFilterFormComponent);

export const QuickFilterFormReact = (FilterContext: IColumnFilterContext) => (
  <Provider store={FilterContext.Adaptable.AdaptableStore.TheStore}>
    <ThemeProvider theme={theme}>
      <QuickFilterForm
        Adaptable={FilterContext.Adaptable}
        CurrentColumn={FilterContext.Column}
        TeamSharingActivated={false}
        ColumnWidth={FilterContext.ColumnWidth}
        EmbedColumnMenu={FilterContext.Adaptable.embedColumnMenu}
      />
    </ThemeProvider>
  </Provider>
);
