import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from "../SharedProps/StrategyViewPopupProps";
import { IAdaptableBlotterToolPanelContext } from "../../../Utilities/Interface/IAdaptableBlotterToolPanelContext";
import { IToolPanelComp, IToolPanelParams } from "ag-grid-community";
import { render } from "react-dom";

interface AdaptableBlotterToolPanelProps extends StrategyViewPopupProps<AdaptableBlotterToolPanelComponent> {
}

export interface AdaptableBlotterToolPanelState {
}

class AdaptableBlotterToolPanelComponent extends React.Component<AdaptableBlotterToolPanelProps, AdaptableBlotterToolPanelState> {
    constructor(props: AdaptableBlotterToolPanelProps) {
        super(props);
        this.state = {};
        // we got agGrid api from props
        // console.log(this.props.api);
        console.log(this.props);
    }

    render(): any {
        return <div>Hello from the Container if it works</div>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
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
          console.log('Model updated', newModel);
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
