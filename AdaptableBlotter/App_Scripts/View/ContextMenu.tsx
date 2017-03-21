/// <reference path="../../typings/index.d.ts" />
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { Helper } from '../Core/Helper'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';

interface ContextMenuComponentProps extends React.ClassAttributes<ContextMenuComponent> {
}

class ContextMenuComponent extends React.Component<ContextMenuComponentProps, {}> {

    render() {
        return <div>toto</div>
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

export let ContextMenu = connect(mapStateToProps, mapDispatchToProps)(ContextMenuComponent);

export const ContextMenuReact = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <ContextMenu />
</Provider>;