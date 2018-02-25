import * as React from "react";
import { connect } from 'react-redux';
import * as Redux from "redux";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as MenuRedux from '../../Redux/ActionsReducers/MenuRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as ColumnChooserRedux from '../../Redux/ActionsReducers/ColumnChooserRedux'
import { Dropdown, Glyphicon, MenuItem, Button, OverlayTrigger, Tooltip, Checkbox, DropdownButton, SplitButton } from 'react-bootstrap';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, EntitlementsState } from '../../Redux/ActionsReducers/Interface/IState';
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { IMenuItem } from '../../Core/Interface/IMenu'
import { IColumn, IEntitlement } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helpers/Helper'

interface HomeToolbarComponentProps extends ToolbarStrategyViewPopupProps<HomeToolbarControlComponent> {
    MenuState: MenuState,
    // EntitlementsState: EntitlementsState,
    Columns: IColumn[]
    onNewColumnListOrder: (VisibleColumnList: IColumn[]) => ColumnChooserRedux.SetNewColumnListOrderAction
}

class HomeToolbarControlComponent extends React.Component<HomeToolbarComponentProps, {}> {

    constructor(props: HomeToolbarComponentProps) {
        super(props);
        this.state = { configMenuItems: [] }
    }
    render() {

        // dropdown menu items
        let menuItems = this.props.MenuState.MenuItems.filter(x =>
            x.IsVisible && x.StrategyId != StrategyIds.AboutStrategyId
        ).map((menuItem: IMenuItem) => {
            return <MenuItem disabled={this.props.IsReadOnly} key={menuItem.Label} onClick={() => this.onClick(menuItem)}>
                <Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}
            </MenuItem>
        });

        // columns
        let colItems = this.props.Columns.map((col: IColumn, index) => {
            return <div style={divStyle} key={index}>
                <Checkbox value={col.ColumnId} key={col.ColumnId} checked={col.Visible} onChange={(e) => this.onSetColumnVisibility(e)} > {col.FriendlyName}</Checkbox>
            </div>
        });

         // shortcuts
        let shortcutsArray: string[] = this.props.DashboardControl.ControlConfiguration
        let shortcuts: any
        if (shortcutsArray) {
            shortcuts = shortcutsArray.map(x => {
                let menuItem = this.props.MenuState.MenuItems.find(y => y.IsVisible && y.Label == x)
                if (menuItem) {
                    return <OverlayTrigger key={x} overlay={<Tooltip id="tooltipButton" > {menuItem.Label}</Tooltip >}>
                        <Button bsSize={"small"} disabled={this.props.IsReadOnly} onClick={() => this.onClick(menuItem)}>
                            <Glyphicon glyph={menuItem.GlyphIcon} />
                        </Button>
                    </OverlayTrigger >
                }
            })
        }

        const functionsGlyph: any = <OverlayTrigger key={"functionsOverlay"} overlay={<Tooltip id="functionsTooltipButton" > {"Functions"}</Tooltip >}>
            <Glyphicon glyph={"cog"} />
        </OverlayTrigger>
        const colsGlyph: any = <OverlayTrigger key={"colsOverlay"} overlay={<Tooltip id="colsTooltipButton" > {"Columns"}</Tooltip >}>
            <Glyphicon glyph={"list"} />
        </OverlayTrigger>


        return <PanelDashboard headerText={StrategyIds.HomeStrategyId} glyphicon={StrategyGlyphs.FunctionsGlyph} onClose={() => this.props.onClose(this.props.DashboardControl)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>

            <DropdownButton bsStyle={"default"}
                bsSize={"small"}
                title={functionsGlyph}
                key={"dropdown-functions"}
                id={"dropdown-functions"}>
                {menuItems}
            </DropdownButton>

             {shortcuts}
            <DropdownButton bsStyle={"default"}
                bsSize={"small"}
                title={colsGlyph}
                key={"dropdown-cols"}
                id={"dropdown-cols"}>
                {colItems}
            </DropdownButton>
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
        DashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.HomeStrategyId),
        MenuState: state.Menu,
        //  EntitlementsState: state.Entitlements,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClick: (action: Redux.Action) => dispatch(action),
        onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl.Strategy, false)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.HomeButtonsPopup, isReadOnly)),
        onNewColumnListOrder: (VisibleColumnList: IColumn[]) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList)),
    };
}

export let HomeToolbarControl = connect(mapStateToProps, mapDispatchToProps)(HomeToolbarControlComponent);

let divStyle: React.CSSProperties = {
    'marginLeft': '5px',
    'padding': '2px'
}