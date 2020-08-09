import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
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

interface AdvancedSearchToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<AdvancedSearchToolPanelComponent> {
  CurrentAdvancedSearchName: string;
  onChangeAdvancedSearch: (expression: string) => AdvancedSearchRedux.AdvancedSearchChangeAction;
}

interface AdvancedSearchToolPanelComponentState {
  IsMinimised: boolean;
}

class AdvancedSearchToolPanelComponent extends React.Component<
  AdvancedSearchToolPanelComponentProps,
  AdvancedSearchToolPanelComponentState
> {
  constructor(props: AdvancedSearchToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

  render() {
    let content = (
      <Flex
        flexDirection="column"
        alignItems="stretch"
        width="100%"
        className="ab-ToolPanel__AdvancedSearch__wrap"
      >
        <Flex
          flexDirection="row"
          alignItems="stretch"
          className="ab-ToolPanel__AdvancedSearch__wrap"
        ></Flex>
        <Flex
          flexDirection="row"
          alignItems="stretch"
          className="ab-ToolPanel__AdvancedSearch__wrap"
        ></Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__AdvancedSearch"
        headerText={StrategyConstants.AdvancedSearchStrategyFriendlyName}
        // glyphicon={StrategyConstants.AdvancedSearchGlyph}
        //  onClose={() => this.props.onClose(StrategyConstants.AdvancedSearchStrategyId)}
        onConfigure={() => this.props.onConfigure()}
        onClose={() => this.props.onClose('AdvancedSearch')}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
    );
  }

  onSelectedSearchChanged(searchName: string) {
    this.props.onChangeAdvancedSearch(searchName);
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<AdvancedSearchToolPanelComponentProps> {
  return {
    CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<AdvancedSearchToolPanelComponentProps> {
  return {
    onChangeAdvancedSearch: (expression: string) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchChange(expression)),

    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.AdvancedSearchStrategyId,
          ScreenPopups.AdvancedSearchPopup
        )
      ),
  };
}

export let AdvancedSearchToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchToolPanelComponent);
