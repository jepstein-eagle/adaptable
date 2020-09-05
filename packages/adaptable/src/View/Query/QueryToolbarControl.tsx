import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Flex } from 'rebass';
import Input from '../../components/Input';
import DropdownButton from '../../components/DropdownButton';
import { Icon } from '../../components/icons';
import FieldWrap from '../../components/FieldWrap';
import * as parser from '../../parser/src';
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonExpand } from '../Components/Buttons/ButtonExpand';
import { ButtonInvalid } from '../Components/Buttons/ButtonInvalid';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonPlay } from '../Components/Buttons/ButtonPlay';

interface QueryToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<QueryToolbarControlComponent> {
  CurrentQuery: string;
  SharedQueries: SharedQuery[];
  onChangeCurrentQuery: (expression: string) => QueryRedux.CurrentQueryChangeAction;
  onShowSharedQueries: (value: string) => PopupRedux.PopupShowScreenAction;
  onExpand: (value: string) => void;
}

interface QueryToolbarControlComponentState {
  isAdaptableReady: boolean;
  expression: string;
  history: {
    expression: string;
    time: Date;
  }[];
}

class QueryToolbarControlComponent extends React.Component<
  QueryToolbarControlComponentProps,
  QueryToolbarControlComponentState
> {
  constructor(props: QueryToolbarControlComponentProps) {
    super(props);
    this.state = {
      isAdaptableReady: false,
      expression: this.props.CurrentQuery || '',
      history: [],
    };
  }
  componentDidMount() {
    this.props.api.eventApi.on('AdaptableReady', () => {
      this.setState({ isAdaptableReady: true });
    });
  }
  componentDidUpdate(prevProps: QueryToolbarControlComponentProps) {
    if (prevProps.CurrentQuery !== this.props.CurrentQuery) {
      this.setState({
        expression: this.props.CurrentQuery,
      });
    }
  }
  render() {
    if (this.state.isAdaptableReady === false) {
      return null;
    }

    const isExpressionValid: boolean = parser.validateBoolean(this.state.expression);

    const isExpressionSharedQuery: boolean =
      this.props.SharedQueries.find(sq => sq.Expression == this.state.expression) != null;

    let sortedSharedQueries: SharedQuery[] = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Asc,
      this.props.SharedQueries,
      'Name'
    );

    let availableSearches: any[] = [
      ...sortedSharedQueries.map(expression => {
        return {
          label: expression.Name,
          icon: expression.Expression === this.props.CurrentQuery ? <Icon name={'check'} /> : null,
          onClick: () => this.runQuery(expression.Expression),
        };
      }),
      ...(this.state.history.length ? [{ separator: true }] : []),
      ...this.state.history
        .slice(-5)
        .reverse()
        .map(item => ({
          label: `Query at ${item.time.toLocaleTimeString('en-US')}`,
          icon: <Icon name={'history'} />,
          onClick: () => this.props.onChangeCurrentQuery(item.expression),
        })),
    ];

    let availableColumns: any[] = this.props.api.columnApi.getColumns().map(col => {
      return {
        label: col.FriendlyName,
        onClick: () => this.setState({ expression: this.state.expression + `[${col.ColumnId}]` }),
      };
    });

    let content = (
      <Flex flexDirection="row" alignItems="stretch" className="ab-DashboardToolbar__Query__wrap">
        <FieldWrap marginRight={1} width={600}>
          <ButtonExpand
            variant="text"
            tone="neutral"
            onClick={() => this.props.onExpand(this.state.expression)}
            tooltip="Expand"
            marginLeft={1}
          />
          <Input
            type="text"
            placeholder="Query"
            spellCheck={false}
            value={this.state.expression}
            onChange={(x: any) => this.setState({ expression: x.target.value })}
            style={{ fontFamily: 'monospace', fontSize: 12 }}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter') {
                this.runQuery();
              }
            }}
          />
          {isExpressionValid ? (
            <ButtonPlay
              onClick={() => this.runQuery()}
              tooltip="Run Query"
              accessLevel={'Full'}
              variant="text"
              tone="neutral"
              disabled={this.state.expression == ''}
              marginRight={1}
            />
          ) : (
            <ButtonInvalid variant="text" tone="neutral" tooltip="Invalid Query" marginRight={1} />
          )}{' '}
          {this.props.CurrentQuery !== '' && (
            <ButtonClear
              onClick={() => this.props.onChangeCurrentQuery('')}
              tooltip="Clear Query"
              accessLevel={'Full'}
            />
          )}
        </FieldWrap>

        <ButtonSave
          onClick={() => this.saveQuery()}
          tooltip="Save as New Query"
          accessLevel={'Full'}
          disabled={!isExpressionValid || isExpressionSharedQuery || this.state.expression == ''}
          variant="text"
          tone="neutral"
          marginRight={1}
        />

        <DropdownButton
          variant="text"
          items={availableColumns}
          marginRight={1}
          tooltip="Pick Columns"
        >
          <Icon name={'list'} />
        </DropdownButton>
        <DropdownButton
          disabled={ArrayExtensions.IsNullOrEmpty(availableSearches)}
          variant="text"
          items={availableSearches}
          marginRight={1}
          tooltip="Load Query"
          icon="folder-open"
        ></DropdownButton>
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__Query"
        headerText={StrategyConstants.QueryStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onClose={() => this.props.onClose('Query')}
      >
        {content}
      </PanelDashboard>
    );
  }

  saveQuery(): void {
    this.props.onShowSharedQueries(this.state.expression);
  }

  onSelectedSearchChanged(searchName: string) {
    this.props.onChangeCurrentQuery(searchName);
  }

  runQuery(expression: string = this.state.expression) {
    if (!parser.validateBoolean(expression)) {
      return;
    }

    this.setState({
      history: [
        ...this.state.history,
        {
          expression: this.state.expression,
          time: new Date(),
        },
      ],
    });
    this.props.onChangeCurrentQuery(expression);
  }
}

function mapStateToProps(state: AdaptableState): Partial<QueryToolbarControlComponentProps> {
  return {
    CurrentQuery: state.Query.CurrentQuery,
    SharedQueries: state.Query.SharedQueries,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<QueryToolbarControlComponentProps> {
  return {
    onChangeCurrentQuery: (expression: string) =>
      dispatch(QueryRedux.CurrentQueryChange(expression)),
    onShowSharedQueries: value =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.QueryStrategyId, ScreenPopups.QueryPopup, {
          action: 'New',
          source: 'Toolbar',
          value,
        })
      ),
    onExpand: (value: string) =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.QueryStrategyId,
          ScreenPopups.ExpandedQueryPopup,
          {
            source: 'Toolbar',
            value,
          },
          {
            footer: null,
          }
        )
      ),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.QueryStrategyId, ScreenPopups.QueryPopup)
      ),
    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardCloseToolbar(toolbar)),
  };
}

export let QueryToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryToolbarControlComponent);
