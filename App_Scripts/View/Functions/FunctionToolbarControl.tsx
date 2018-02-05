import * as React from "react";
import { connect } from 'react-redux';
import * as Redux from "redux";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as ColumnChooserRedux from '../../Redux/ActionsReducers/ColumnChooserRedux'
import { Dropdown, Glyphicon, MenuItem, Button, OverlayTrigger, Tooltip, Checkbox } from 'react-bootstrap';
import { IToolbarStrategyViewPopupProps } from '../../Core/Interface/IToolbarStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { IMenuItem } from '../../Core/Interface/IMenu'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';

interface FunctionControlComponentProps extends IToolbarStrategyViewPopupProps<FunctionToolbarControlComponent> {
    MenuState: MenuState,
    EntitlementsState: EntitlementsState,
    Columns: IColumn[]
    onNewColumnListOrder: (VisibleColumnList: IColumn[]) => ColumnChooserRedux.SetNewColumnListOrderAction
}

class FunctionToolbarControlComponent extends React.Component<FunctionControlComponentProps, {}> {

    render() {

        // functions
        var configMenuItems = this.props.MenuState.MenuItems.filter(x => {
            let accessLevel = this.props.EntitlementsState.FunctionEntitlements.find(entitlement => entitlement.FunctionName == x.StrategyId)
            if (accessLevel) {
                return accessLevel.AccessLevel != "Hidden"
            }
            return true;
        }).map((menuItem: IMenuItem) => {
            return <MenuItem disabled={this.props.IsReadOnly} key={menuItem.Label} onClick={() => this.onClick(menuItem)}>
                <Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}
            </MenuItem>
        });

        // columns
        var colItems = this.props.Columns.map((col: IColumn, index) => {
            return <div style={divStyle} key={index}>
                <Checkbox value={col.ColumnId} key={col.ColumnId} checked={col.Visible} onChange={(e) => this.onSetColumnVisibility(e)} > {col.FriendlyName}</Checkbox>
            </div>
        });

        // shortcuts
        let shortcutsArray: string[] = this.props.DashboardControl.ControlConfiguration
        let shortcuts: any
        if (shortcutsArray) {
            shortcuts = shortcutsArray.map(x => {
                let menuItem = this.props.MenuState.MenuItems.find(y => y.Label == x)
                if (menuItem) {
                    return <OverlayTrigger key={x} overlay={<Tooltip id="tooltipButton" > {menuItem.Label}</Tooltip >}>
                        <Button disabled={this.props.IsReadOnly} onClick={() => this.onClick(menuItem)}>
                            <Glyphicon glyph={menuItem.GlyphIcon} />
                        </Button>
                    </OverlayTrigger >
                }
            })
        }
        return <PanelDashboard headerText={StrategyIds.FunctionsStrategyId} glyphicon={StrategyGlyphs.FunctionsGlyph} onClose={() => this.props.onClose(this.props.DashboardControl)} onConfigure={() => this.props.onConfigure()}>
           <Dropdown id="dropdown-cols"  >
                <Dropdown.Toggle noCaret>
                    <Glyphicon glyph={"list"} />
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    {colItems}
                </Dropdown.Menu>
            </Dropdown>
             {shortcuts}
            <Dropdown id="dropdown-functions"  >
                <Dropdown.Toggle >
                    All
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    {configMenuItems}
                </Dropdown.Menu>
            </Dropdown>
            
        </PanelDashboard>
    }

    onClick(menuItem: IMenuItem) {
        this.props.onClick(menuItem.Action)
    }

    onSetColumnVisibility(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let changedColumnn: IColumn = this.props.Columns.find(c => c.ColumnId == e.value);

        let columns: IColumn[] = [].concat(this.props.Columns);
        changedColumnn = Object.assign({}, changedColumnn, {
            Visible: !changedColumnn.Visible
        });
        let index = columns.findIndex(x => x.ColumnId == e.value)
        columns[index] = changedColumnn;
        this.props.onNewColumnListOrder(columns.filter(c => c.Visible))
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.FunctionsStrategyId),
        MenuState: state.Menu,
        EntitlementsState: state.Entitlements,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClick: (action: Redux.Action) => dispatch(action),
        onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl.Strategy, false)),
        onConfigure: () => dispatch(PopupRedux.PopupShow(ScreenPopups.FunctionButtonsPopupPopup)),
        onNewColumnListOrder: (VisibleColumnList: IColumn[]) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList))
    };
}

export let FunctionToolbarControl = connect(mapStateToProps, mapDispatchToProps)(FunctionToolbarControlComponent);

let divStyle: React.CSSProperties = {
    'marginLeft': '5px',
    'padding': '2px'
}