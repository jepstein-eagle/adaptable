import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { Flex } from 'rebass';
import Input from '../../components/Input';
import DropdownButton from '../../components/DropdownButton';
import SimpleButton from '../../components/SimpleButton';
import { Icon } from '@mdi/react';
import {
  mdiViewColumn,
  mdiContentSave,
  mdiFolderOpen,
  mdiClose,
  mdiMagnify,
  mdiArrowExpand,
  mdiHistory,
  mdiCheck,
  mdiAlert,
} from '@mdi/js';
import FieldWrap from '../../components/FieldWrap';
import * as parser from '../../parser/src';
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import Dropdown from '../../components/Dropdown';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonRunQuery } from '../Components/Buttons/ButtonRunQuery';
import { ButtonExpand } from '../Components/Buttons/ButtonExpand';
import { ButtonInvalid } from '../Components/Buttons/ButtonInvalid';

interface QueryToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<QueryToolbarControlComponent> {
  CurrentQuery: string;
  SharedQueries: SharedQuery[];
  onChangeCurrentQuery: (expression: string) => QueryRedux.CurrentQueryChangeAction;
  onShowSharedQueries: (value: string) => PopupRedux.PopupShowScreenAction;
  onExpand: (value: string) => void;
}

interface QueryToolbarControlComponentState {
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
      expression: this.props.CurrentQuery || '',
      history: [],
    };
  }
  componentDidUpdate(prevProps: QueryToolbarControlComponentProps) {
    if (prevProps.CurrentQuery !== this.props.CurrentQuery) {
      this.setState({
        expression: this.props.CurrentQuery,
      });
    }
  }
  render() {
    const isExpressionValid = parser.validateBoolean(this.state.expression);

    let sortedSharedQueries: SharedQuery[] = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Asc,
      this.props.SharedQueries,
      'Name'
    );

    let availableSearches: any[] = [
      {
        label: 'Save Query',
        icon: <Icon size="1.1rem" path={mdiContentSave} />,
        onClick: () => this.props.onShowSharedQueries(this.state.expression),
      },
      { separator: true },
      ...sortedSharedQueries.map(expression => {
        return {
          label: expression.Name,
          icon:
            expression.Expression === this.props.CurrentQuery ? (
              <Icon size="1.1rem" path={mdiCheck} />
            ) : null,
          onClick: () => this.runQuery(expression.Expression),
        };
      }),
      ...(this.state.history.length ? [{ separator: true }] : []),
      ...this.state.history
        .slice(-5)
        .reverse()
        .map(item => ({
          label: `Query at ${item.time.toLocaleTimeString('en-US')}`,
          icon: <Icon size="1.1rem" path={mdiHistory} />,
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
          {this.props.CurrentQuery !== '' && (
            <ButtonClear
              onClick={() => this.props.onChangeCurrentQuery('')}
              tooltip="Clear Query"
              AccessLevel={'Full'}
            />

            //
          )}
          {isExpressionValid ? (
            <ButtonRunQuery
              onClick={() => this.runQuery()}
              tooltip="Run Query"
              AccessLevel={'Full'}
              variant="text"
              tone="neutral"
              marginRight={1}
            />
          ) : (
            <ButtonInvalid variant="text" tone="neutral" tooltip="Invalid Query" marginRight={1} />
          )}
        </FieldWrap>
        <DropdownButton
          variant="text"
          items={availableColumns}
          marginRight={1}
          tooltip="Pick Columns"
        >
          <Icon size="1.1rem" path={mdiViewColumn} />
        </DropdownButton>
        <DropdownButton
          variant="text"
          items={availableSearches}
          marginRight={1}
          tooltip="Load Query"
        >
          <Icon size="1.1rem" path={mdiFolderOpen} />
        </DropdownButton>
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__Query"
        headerText={StrategyConstants.QueryStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
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
  };
}

export let QueryToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryToolbarControlComponent);
