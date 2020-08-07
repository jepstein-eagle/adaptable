import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
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
import { SharedExpression } from '../../PredefinedConfig/SharedExpressionState';

interface AdvancedSearchToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<AdvancedSearchToolbarControlComponent> {
  CurrentAdvancedSearch: string;
  SharedExpressions: SharedExpression[];
  onChangeAdvancedSearch: (expression: string) => AdvancedSearchRedux.AdvancedSearchChangeAction;
  onNewSharedExpression: (value: string) => PopupRedux.PopupShowScreenAction;
  onExpand: (value: string) => void;
}

interface AdvancedSearchToolbarControlComponentState {
  expression: string;
  history: {
    expression: string;
    time: Date;
  }[];
}

class AdvancedSearchToolbarControlComponent extends React.Component<
  AdvancedSearchToolbarControlComponentProps,
  AdvancedSearchToolbarControlComponentState
> {
  constructor(props: AdvancedSearchToolbarControlComponentProps) {
    super(props);
    this.state = {
      expression: this.props.CurrentAdvancedSearch || '',
      history: [],
    };
  }
  componentDidUpdate(prevProps: AdvancedSearchToolbarControlComponentProps) {
    if (prevProps.CurrentAdvancedSearch !== this.props.CurrentAdvancedSearch) {
      this.setState({
        expression: this.props.CurrentAdvancedSearch,
      });
    }
  }
  render() {
    const isExpressionValid = parser.validateBoolean(this.state.expression);

    let sortedSharedExpressions: SharedExpression[] = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Ascending,
      this.props.SharedExpressions,
      'Name'
    );

    let availableSearches: any[] = [
      {
        label: 'Save Query',
        icon: <Icon size="1.1rem" path={mdiContentSave} />,
        onClick: () => this.props.onNewSharedExpression(this.state.expression),
      },
      { separator: true },
      ...sortedSharedExpressions.map(expression => {
        return {
          label: expression.Name,
          icon:
            expression.Expression === this.props.CurrentAdvancedSearch ? (
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
          onClick: () => this.props.onChangeAdvancedSearch(item.expression),
        })),
    ];

    let availableColumns: any[] = this.props.Api.gridApi.getColumns().map(col => {
      return {
        label: col.FriendlyName,
        onClick: () => this.setState({ expression: this.state.expression + `[${col.ColumnId}]` }),
      };
    });

    let content = (
      <Flex
        flexDirection="row"
        alignItems="stretch"
        className="ab-DashboardToolbar__AdvancedSearch__wrap"
      >
        <FieldWrap marginRight={1} width={600}>
          <SimpleButton
            variant="text"
            tone="neutral"
            onClick={() => this.props.onExpand(this.state.expression)}
            tooltip="Expand"
            marginLeft={1}
          >
            <Icon size="1.1rem" path={mdiArrowExpand} />
          </SimpleButton>
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
          {this.props.CurrentAdvancedSearch !== '' && (
            <SimpleButton
              variant="text"
              tone="neutral"
              onClick={() => this.props.onChangeAdvancedSearch('')}
              tooltip="Clear Query"
            >
              <Icon size="1.1rem" path={mdiClose} />
            </SimpleButton>
          )}
          {isExpressionValid ? (
            <SimpleButton
              variant="text"
              tone="neutral"
              onClick={() => this.runQuery()}
              tooltip="Run Query"
              marginRight={1}
            >
              <Icon size="1.1rem" path={mdiMagnify} />
            </SimpleButton>
          ) : (
            <SimpleButton variant="text" tone="neutral" tooltip="Invalid Query" marginRight={1}>
              <Icon size="1.1rem" path={mdiAlert} />
            </SimpleButton>
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
        className="ab-DashboardToolbar__AdvancedSearch"
        headerText={StrategyConstants.AdvancedSearchStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  onSelectedSearchChanged(searchName: string) {
    this.props.onChangeAdvancedSearch(searchName);
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
    this.props.onChangeAdvancedSearch(expression);
  }
}

function mapStateToProps(
  state: AdaptableState
): Partial<AdvancedSearchToolbarControlComponentProps> {
  return {
    CurrentAdvancedSearch: state.AdvancedSearch.CurrentAdvancedSearch,
    SharedExpressions: state.SharedExpression.SharedExpressions,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<AdvancedSearchToolbarControlComponentProps> {
  return {
    onChangeAdvancedSearch: (expression: string) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchChange(expression)),
    onNewSharedExpression: value =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.SharedExpressionStrategyId,
          ScreenPopups.SharedExpressionPopup,
          {
            action: 'New',
            source: 'Toolbar',
            value,
          }
        )
      ),
    onExpand: (value: string) =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.AdvancedSearchStrategyId,
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
        PopupRedux.PopupShowScreen(
          StrategyConstants.AdvancedSearchStrategyId,
          ScreenPopups.AdvancedSearchPopup
        )
      ),
  };
}

export let AdvancedSearchToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchToolbarControlComponent);
