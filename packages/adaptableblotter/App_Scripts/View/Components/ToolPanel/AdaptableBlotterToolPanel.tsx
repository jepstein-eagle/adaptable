import * as React from "react";
import * as Redux from "redux";
import * as _ from 'lodash';
import * as QuickSearchRedux from '../../../Redux/ActionsReducers/QuickSearchRedux'
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from "../SharedProps/StrategyViewPopupProps";
import { IAdaptableBlotterToolPanelContext } from "../../../Utilities/Interface/IAdaptableBlotterToolPanelContext";
import { IToolPanelComp, IToolPanelParams } from "ag-grid-community";
import { render } from "react-dom";
import { AdaptableBlotterFormControlTextClear } from "../Forms/AdaptableBlotterFormControlTextClear";
import { ButtonMinimise } from "../Buttons/ButtonMinimise";
import { ButtonMaximise } from "../Buttons/ButtonMaximise";
import { Row, Table, Panel, Col } from "react-bootstrap";
import { ButtonGeneral } from "../Buttons/ButtonGeneral";
import { DEFAULT_BSSTYLE } from "../../../Utilities/Constants/StyleConstants";
import { PanelWithButton } from "../Panels/PanelWithButton";
import { ToolPanelSettingsPanel } from "../Panels/ToolPanelSettingsPanel";

interface AdaptableBlotterToolPanelProps extends StrategyViewPopupProps<AdaptableBlotterToolPanelComponent> {
  QuickSearchText: string;

  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;

}

export interface AdaptableBlotterToolPanelState {
  EditedQuickSearchText: string;
  QuickSearchShowPanel: boolean;
  QuickSearchShowSettings: boolean;
}

class AdaptableBlotterToolPanelComponent extends React.Component<AdaptableBlotterToolPanelProps, AdaptableBlotterToolPanelState> {
  constructor(props: AdaptableBlotterToolPanelProps) {
    super(props);
    this.state = {
      EditedQuickSearchText: this.props.QuickSearchText,
      QuickSearchShowPanel: false,
      QuickSearchShowSettings: false
    }
    // we got agGrid api from props
    // console.log(this.props.api);
    // console.log(this.props);
  }

  debouncedRunQuickSearch = _.debounce(() => this.props.onRunQuickSearch(this.state.EditedQuickSearchText), 0);

  render(): any {

    let minimiseQuickSearchButton = <ButtonMinimise
      cssClassName={''}
      size={"xs"}
      bsStyle={DEFAULT_BSSTYLE}
      DisplayMode={"Glyph"}
      hideToolTip={true}
      style={{ float: "left", marginLeft: "0px", marginRight: "20px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }}
      onClick={() => this.onMinimiseQuickSearch()} />

    let maximiseQuickSearchButton = <ButtonMaximise
      cssClassName={''}
      size={"xs"}
      bsStyle={DEFAULT_BSSTYLE}
      DisplayMode={"Glyph"}
      hideToolTip={true}
      useHoirzontalChevron={true}
      style={{ float: "left", marginLeft: "0px", marginRight: "20px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }}
      onClick={() => this.onMaximiseQuickSearch()} />

    let showGeneralSettingsButton =
      this.state.QuickSearchShowSettings ?
        <ButtonMinimise
          cssClassName={''}
          style={{ margin: '0px', padding: '0px' }}
          onClick={() => this.onHideQuickSearchSettings()}
          bsStyle={DEFAULT_BSSTYLE}
          size={"xs"}
          DisplayMode="Glyph"
          hideToolTip={true}
        />
        :
        <ButtonMaximise
          cssClassName={''}
          style={{ margin: '0px', padding: '0px' }}
          onClick={() => this.onShowQuickSearchSettings()}
          bsStyle={DEFAULT_BSSTYLE}
          size={"xs"}
          DisplayMode="Glyph"
          hideToolTip={true}
        />


    let settingsPanel = <ToolPanelSettingsPanel button={showGeneralSettingsButton}  >
      {this.state.QuickSearchShowSettings == true &&
        <span>stuff here</span>
      }
    </ToolPanelSettingsPanel>



    return <div>

      <span> Adaptable Blotter</span>
      <br />
      <br />

      <div >
        {this.state.QuickSearchShowPanel ?
          <div>
            <Row>
              <Col xs={12} >{minimiseQuickSearchButton}Quick Search</Col>
            </Row>
            <Row style={{ margin: '1px' }}>
              <Col xs={12}>
                <AdaptableBlotterFormControlTextClear
                  cssClassName={""}
                  bsSize={'sm'}
                  type="text"
                  placeholder="Search Text"
                  value={this.props.QuickSearchText}
                  OnTextChange={(x) => this.onUpdateQuickSearchText(x)} />
              </Col>
            </Row>
            <Row style={{ margin: '2px', marginTop: '10px' }}>
              <Col xs={12}> {settingsPanel}</Col>
            </Row>

          </div>
          :
          <Row>
            <Col xs={12}>{maximiseQuickSearchButton}Quick Search</Col>
          </Row>
        }

      </div>

    </div>
  }

  onUpdateQuickSearchText(searchText: string) {
    this.setState({ EditedQuickSearchText: searchText })
    this.debouncedRunQuickSearch();
  }

  onMinimiseQuickSearch() {
    this.setState({ QuickSearchShowPanel: false })
  }

  onMaximiseQuickSearch() {
    this.setState({ QuickSearchShowPanel: true })
  }

  onShowQuickSearchSettings() {
    this.setState({ QuickSearchShowSettings: true, })
  }

  onHideQuickSearchSettings() {
    this.setState({ QuickSearchShowSettings: false, })
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    QuickSearchText: state.QuickSearch.QuickSearchText
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onRunQuickSearch: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
  };
}

export const ConnectedAdaptableBlotterToolPanel = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterToolPanelComponent);

export const AdaptableBlotterToolPanelBuilder = (ctx: IAdaptableBlotterToolPanelContext) =>
  class AdaptableBlotterToolPanel implements IToolPanelComp {
    public gui: HTMLElement;
    public ctx: IAdaptableBlotterToolPanelContext;

    public constructor() {
      this.ctx = ctx;
    }

    public init(params?: IToolPanelParams): void {
      this.gui = document.createElement('div');
      render(
        (<Provider store={this.ctx.Blotter.AdaptableBlotterStore.TheStore}>
          <ConnectedAdaptableBlotterToolPanel Blotter={this.ctx.Blotter} TeamSharingActivated={false} />
        </Provider>),
        this.gui
      );

      if (params && params.api) {
        params.api.addEventListener('modelUpdated', (newModel: any) => {
          //    console.log('Model updated', newModel);
        });
      }
    }

    public getGui(): HTMLElement {
      if (!this.gui) { this.init(); }
      return this.gui;
    }

    public refresh(): void {
      // no refresh logic needed
    }
  }
