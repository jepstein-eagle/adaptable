import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from "../SharedProps/StrategyViewPopupProps";
import { IAdaptableBlotterToolPanelContext } from "../../../Utilities/Interface/IAdaptableBlotterToolPanelContext";

interface AdaptableBlotterToolPanelProps extends StrategyViewPopupProps<AdaptableBlotterToolPanelComponent> {
}

export interface AdaptableBlotterToolPanelState {
}

class AdaptableBlotterToolPanelComponent extends React.Component<AdaptableBlotterToolPanelProps, AdaptableBlotterToolPanelState> {

    constructor(props: AdaptableBlotterToolPanelProps) {
        super(props);

        this.state = {
        };
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

export let AdaptableBlotterToolPanel = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterToolPanelComponent);

export const AdaptableBlotterToolPanelReact = (toolPanelContext: IAdaptableBlotterToolPanelContext) => <Provider store={toolPanelContext.Blotter.AdaptableBlotterStore.TheStore}>
    <AdaptableBlotterToolPanel
        Blotter={toolPanelContext.Blotter}
         TeamSharingActivated={false}
    />
</Provider>;
