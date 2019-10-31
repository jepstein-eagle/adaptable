import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import * as QuickSearchRedux from '../../../Redux/ActionsReducers/QuickSearchRedux';
import * as DashboardRedux from '../../../Redux/ActionsReducers/DashboardRedux';
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { IAdaptableBlotterToolPanelContext } from '../../../Utilities/Interface/IAdaptableBlotterToolPanelContext';
import { IToolPanelComp, IToolPanelParams } from 'ag-grid-community';
import { render } from 'react-dom';
import { Visibility } from '../../../PredefinedConfig/Common/Enums';
import Dropdown from '../../../components/Dropdown';
import EnumExtensions from '../../../Utilities/Extensions/EnumExtensions';
import { Text, Flex } from 'rebass';

interface AdaptableBlotterToolPanelProps
  extends StrategyViewPopupProps<AdaptableBlotterToolPanelComponent> {
  QuickSearchText: string | undefined;
  DashboardVisibility: Visibility;

  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
  onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
}

export interface AdaptableBlotterToolPanelState {
  EditedQuickSearchText: string;
  QuickSearchShowPanel: boolean;
  QuickSearchShowSettings: boolean;
}

class AdaptableBlotterToolPanelComponent extends React.Component<
  AdaptableBlotterToolPanelProps,
  AdaptableBlotterToolPanelState
> {
  constructor(props: AdaptableBlotterToolPanelProps) {
    super(props);
    this.state = {
      EditedQuickSearchText: this.props.QuickSearchText,
      QuickSearchShowPanel: false,
      QuickSearchShowSettings: false,
    };
    // we got agGrid api from props
    // console.log(this.props.api);
    // console.log(this.props);
  }

  debouncedRunQuickSearch = _.debounce(
    () => this.props.onRunQuickSearch(this.state.EditedQuickSearchText),
    0
  );

  render(): any {
    let visibilityOptions = EnumExtensions.getNames(Visibility).map(type => {
      return {
        value: type,
        label: type,
      };
    });

    return (
      <Flex flexDirection="column" justifyContent="center" padding={2} style={{ width: '100%' }}>
        <Text marginTop={3} marginBottom={2}>
          Dashboard{' '}
        </Text>
        <Dropdown
          placeholder="select"
          showEmptyItem={false}
          showClearButton={false}
          value={this.props.DashboardVisibility}
          onChange={(value: any) => this.onDashboardVisibilityChanged(value)}
          options={visibilityOptions}
        ></Dropdown>
      </Flex>
    );
  }

  onDashboardVisibilityChanged(visibility: any) {
    this.props.onSetDashboardVisibility(visibility);
  }

  onUpdateQuickSearchText(searchText: string) {
    this.setState({ EditedQuickSearchText: searchText });
    this.debouncedRunQuickSearch();
  }

  onMinimiseQuickSearch() {
    this.setState({ QuickSearchShowPanel: false });
  }

  onMaximiseQuickSearch() {
    this.setState({ QuickSearchShowPanel: true });
  }

  onShowQuickSearchSettings() {
    this.setState({ QuickSearchShowSettings: true });
  }

  onHideQuickSearchSettings() {
    this.setState({ QuickSearchShowSettings: false });
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    QuickSearchText: state.QuickSearch.QuickSearchText,
    DashboardVisibility: state.Dashboard.DashboardVisibility as Visibility,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onRunQuickSearch: (newQuickSearchText: string) =>
      dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
    onSetDashboardVisibility: (visibility: Visibility) =>
      dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
  };
}

export const ConnectedAdaptableBlotterToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdaptableBlotterToolPanelComponent);

export const AdaptableBlotterToolPanelBuilder = (ctx: IAdaptableBlotterToolPanelContext) =>
  class AdaptableBlotterToolPanel implements IToolPanelComp {
    public gui: HTMLElement;
    public ctx: IAdaptableBlotterToolPanelContext;

    public constructor() {
      this.ctx = ctx;
    }

    public init(params?: IToolPanelParams): void {
      this.gui = document.createElement('div');
      this.gui.id = 'adaptable-blotter-tool-panel_' + this.ctx.Blotter.blotterOptions.blotterId;
      render(
        <Provider store={this.ctx.Blotter.adaptableBlotterStore.TheStore}>
          <ConnectedAdaptableBlotterToolPanel
            Blotter={this.ctx.Blotter}
            TeamSharingActivated={false}
          />
        </Provider>,
        this.gui
      );

      if (params && params.api) {
        params.api.addEventListener('modelUpdated', () => {
          //    console.log('Model updated', newModel);
        });
      }
    }

    public getGui(): HTMLElement {
      if (!this.gui) {
        this.init();
      }
      return this.gui;
    }

    public refresh(): void {
      // no refresh logic needed
    }
  };
