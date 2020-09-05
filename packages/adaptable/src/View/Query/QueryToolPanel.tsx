import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { Flex } from 'rebass';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';
import DropdownButton from '../../components/DropdownButton';
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import Input from '../../components/Input';
import { ButtonExpand } from '../Components/Buttons/ButtonExpand';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonRunQuery } from '../Components/Buttons/ButtonRunQuery';

interface QueryToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<QueryToolPanelComponent> {
  CurrentQuery: string;
  SharedQueries: SharedQuery[];
  onChangeCurrentQuery: (expression: string) => QueryRedux.CurrentQueryChangeAction;
  onShowSharedQueries: (value: string) => PopupRedux.PopupShowScreenAction;
  onExpand: (value: string) => void;
}

interface QueryToolPanelComponentState {
  IsMinimised: boolean;
}

class QueryToolPanelComponent extends React.Component<
  QueryToolPanelComponentProps,
  QueryToolPanelComponentState
> {
  constructor(props: QueryToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

  componentDidUpdate(prevProps: QueryToolPanelComponentProps) {
    if (prevProps.CurrentQuery !== this.props.CurrentQuery) {
      // do someting
    }
  }

  render() {
    let content = (
      <Flex
        flexDirection="column"
        alignItems="stretch"
        width="100%"
        className="ab-ToolPanel__Query__wrap"
      >
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Query__wrap">
          {' '}
          <Input
            type="text"
            placeholder="Query"
            spellCheck={false}
            //value={this.state.expression}
            value={'expression here'}
            //  onChange={(x: any) => this.setState({ expression: x.target.value })}
            style={{ fontFamily: 'monospace', fontSize: 12 }}
            //
            //   }}
          />
        </Flex>
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Query__wrap">
          {' '}
          <ButtonExpand
            variant="text"
            tone="neutral"
            // onClick={() => this.props.onExpand(this.state.expression)}
            tooltip="Expand"
            marginLeft={1}
          />
          <ButtonClear
            onClick={() => this.props.onChangeCurrentQuery('')}
            tooltip="Clear Query"
            accessLevel={'Full'}
          />
          <ButtonRunQuery
            // onClick={() => this.runQuery()}
            tooltip="Run Query"
            accessLevel={'Full'}
            variant="text"
            tone="neutral"
            marginRight={1}
          />
          <DropdownButton
            variant="text"
            //  items={availableSearches}
            marginRight={1}
            tooltip="Load Query"
            icon="folder-open"
          ></DropdownButton>
        </Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__Query"
        headerText={StrategyConstants.QueryStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        //    onClose={() => this.props.onClose('Query')} NEED to redo later
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
    );
  }
}

function mapStateToProps(state: AdaptableState): Partial<QueryToolPanelComponentProps> {
  return {
    CurrentQuery: state.Query.CurrentQuery,
    SharedQueries: state.Query.SharedQueries,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<QueryToolPanelComponentProps> {
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

    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
  };
}

export let QueryToolPanel = connect(mapStateToProps, mapDispatchToProps)(QueryToolPanelComponent);
