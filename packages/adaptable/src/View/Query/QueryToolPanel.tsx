import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';

import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';

import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';

import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';

interface QueryToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<QueryToolPanelComponent> {
  CurrentQuery: string;
  onChangeCurrentQuery: (expression: string) => QueryRedux.CurrentQueryChangeAction;
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

  render() {
    let content = (
      <Flex
        flexDirection="column"
        alignItems="stretch"
        width="100%"
        className="ab-ToolPanel__Query__wrap"
      >
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Query__wrap"></Flex>
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Query__wrap"></Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__Query"
        headerText={StrategyConstants.QueryStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onClose={() => this.props.onClose('Query')}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
    );
  }

  onSelectedSearchChanged(searchName: string) {
    this.props.onChangeCurrentQuery(searchName);
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<QueryToolPanelComponentProps> {
  return {
    CurrentQuery: state.Query.CurrentQuery,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<QueryToolPanelComponentProps> {
  return {
    onChangeCurrentQuery: (expression: string) =>
      dispatch(QueryRedux.CurrentQueryChange(expression)),

    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.QueryStrategyId, ScreenPopups.QueryPopup)
      ),
  };
}

export let QueryToolPanel = connect(mapStateToProps, mapDispatchToProps)(QueryToolPanelComponent);
