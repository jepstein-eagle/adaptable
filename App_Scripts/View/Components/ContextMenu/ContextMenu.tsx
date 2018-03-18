import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import * as ReactDataMenu from 'react-data-menu';
import { IAdaptableBlotter } from '../../../Core/Interface/IAdaptableBlotter';
import { IContextMenu } from '../../../Core/Interface/IMenu';
import * as MenuRedux from '../../../Redux/ActionsReducers/MenuRedux'
import { ContextMenuCustomRenderer } from './ContextMenuCustomRenderer'

interface ContextMenuComponentProps extends React.ClassAttributes<ContextMenuComponent> {
    ContextMenu: IContextMenu,
    closeContextMenu: () => MenuRedux.HideColumnContextMenuAction
    dipatchClickedMenu: (action: Redux.Action) => Redux.Action
}

class ContextMenuComponent extends React.Component<ContextMenuComponentProps, {}> {
    render() {
        let position = {
            x: this.props.ContextMenu.PositionX,
            y: this.props.ContextMenu.PositionY
        }

        let items = [{
            type: 'label',
            title: 'Adaptable Blotter Menu'
        }, '-'/*, {
            title: 'Menu item 1-1',
            items: [{ // sub-menu
                title: 'Menu Popup 2'
            }, '-', {
                title: 'Menu item 2-1',
            }]
        }*/]

        let realItems = this.props.ContextMenu.Items.map(item => {
            return {
                type: 'ContextMenuCustomRenderer',
                menuitem: item,
                title: item.Label,
                callback: (e: any) => {
                    this.props.dipatchClickedMenu(item.Action)
                }
            }
        })

        let allItems = [].concat(items, realItems)

        let renderers = {
            'ContextMenuCustomRenderer': ContextMenuCustomRenderer
        }

        return this.props.ContextMenu.IsVisible && <div className="adaptable_blotter_style_contextmenu" >
            <ReactDataMenu.Menu.default items={allItems} renderers={renderers} classPrefix={'adaptable_blotter_'} position={position} onClose={() => this.onMenuClose()} />
        </div>
    }

    onMenuClose() {
        this.props.closeContextMenu()
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ContextMenu: state.Menu.ContextMenu
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        closeContextMenu: () => dispatch(MenuRedux.HideColumnContextMenu()),
        dipatchClickedMenu: (action: Redux.Action) => dispatch(action)
    };
}

export let ContextMenu = connect(mapStateToProps, mapDispatchToProps)(ContextMenuComponent);

export const ContextMenuReact = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <ContextMenu />
</Provider>;