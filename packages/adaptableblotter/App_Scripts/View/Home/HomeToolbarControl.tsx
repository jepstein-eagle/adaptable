import * as React from "react";
import { connect } from 'react-redux';
import * as Redux from "redux";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import { Glyphicon, MenuItem, OverlayTrigger, Tooltip, Checkbox, DropdownButton } from 'react-bootstrap';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups'
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import { ButtonDashboard } from "../Components/Buttons/ButtonDashboard";
import { Visibility, StatusColour, MessageType, AccessLevel, DashboardSize } from "../../Utilities/Enums";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { ISystemStatus } from "../../Utilities/Interface/ISystemStatus";
import { IMenuItem } from "../../Utilities/Interface/IMenu";
import { IAdaptableAlert } from "../../Utilities/Interface/IMessage";
import { UIHelper } from "../UIHelper";


interface HomeToolbarComponentProps extends ToolbarStrategyViewPopupProps<HomeToolbarControlComponent> {
    MenuState: MenuState,
    DashboardState: DashboardState,
    Columns: IColumn[],
    SystemStatus: ISystemStatus,
    HeaderText: string,
    DashboardSize: DashboardSize;
    onNewColumnListOrder: (VisibleColumnList: IColumn[]) => SystemRedux.SetNewColumnListOrderAction
    onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction
    onSetToolbarVisibility: (strategyIds: string[]) => DashboardRedux.DashboardSetToolbarsAction
    onShowStatusMessage: (alert: IAdaptableAlert) => PopupRedux.PopupShowAlertAction
    onShowAbout: () => PopupRedux.PopupShowAboutAction
}

class HomeToolbarControlComponent extends React.Component<HomeToolbarComponentProps, {}> {

    constructor(props: HomeToolbarComponentProps) {
        super(props);
        this.state = { configMenuItems: [] }
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__home";
        let cssDropdownClassName: string = this.props.cssClassName + "__home__dropdown";


        const functionsGlyph: any = <OverlayTrigger key={"functionsOverlay"} overlay={<Tooltip id="functionsTooltipButton" > {"Functions"}</Tooltip >}>
            <Glyphicon glyph={"home"} />
        </OverlayTrigger>
        const colsGlyph: any = <OverlayTrigger key={"colsOverlay"} overlay={<Tooltip id="colsTooltipButton" > {"Columns"}</Tooltip >}>
            <Glyphicon glyph={"list"} />
        </OverlayTrigger>
        const toolbarsGlyph: any = <OverlayTrigger key={"toolbarsOverlay"} overlay={<Tooltip id="toolbarsTooltipButton" > {"Toolbars"}</Tooltip >}>
            <Glyphicon glyph={"align-justify"} />
        </OverlayTrigger>

        // List strategies that are allowed - i.e. are offered by the Blotter instance and are not Hidden Entitlement
        let strategyKeys: string[] = [...this.props.Blotter.strategies.keys()];
        let allowedMenuItems = this.props.MenuState.MenuItems.filter(x => x.IsVisible &&
            ArrayExtensions.NotContainsItem(strategyKeys, x)
        );

        // function menu items
        let menuItems = allowedMenuItems.map((menuItem: IMenuItem) => {
            return <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} key={menuItem.Label} onClick={() => this.onClick(menuItem)}>
                <Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}
            </MenuItem>
        });

        // column items
        let colItems: any = []
        colItems.push(<div key="colTitle">{' '}{' '}&nbsp;&nbsp;<b>{"Columns"}</b></div>);
        this.props.Columns.forEach((col: IColumn, index) => {
            colItems.push(<div className="ab_home_toolbar_column_list" key={index}>
                <Checkbox value={col.ColumnId} key={col.ColumnId} checked={col.Visible} onChange={(e) => this.onSetColumnVisibility(e)} > {col.FriendlyName}</Checkbox>
            </div>)
        });

        // toolbar items
        let toolbarItems: any = []
        let allowedMenuNames: string[] = allowedMenuItems.map(vm => {
            return vm.StrategyId;
        })
        toolbarItems.push(<div key="toolbarTitle">{' '}{' '}&nbsp;&nbsp;<b>{"Toolbars"}</b></div>);
        this.props.DashboardState.AvailableToolbars.forEach((toolbar: string, index) => {
            if (ArrayExtensions.ContainsItem(allowedMenuNames, toolbar)) {
                let isVisible: boolean = ArrayExtensions.ContainsItem(this.props.DashboardState.VisibleToolbars, toolbar);
                let functionName = StrategyConstants.getNameForStrategyId(toolbar);
                toolbarItems.push(<div className="ab_home_toolbar_column_list" key={index}>
                    <Checkbox value={toolbar} key={toolbar} checked={isVisible} onChange={(e) => this.onSetToolbarVisibility(e)} > {functionName}</Checkbox>
                </div>)
            }
        });


        // status button
        let statusButton = <OverlayTrigger key={"systemstatus"} overlay={<Tooltip id="tooltipButton" > {"System Status"}</Tooltip >}>
            <ButtonDashboard glyph={UIHelper.getGlyphForSystemStatusButton(this.props.SystemStatus.StatusColour as StatusColour)} cssClassName={cssClassName} bsStyle={UIHelper.getStyleForSystemStatusButton(this.props.SystemStatus.StatusColour as StatusColour)} DisplayMode={"Glyph"} bsSize={this.props.DashboardSize} ToolTipAndText={"Status: " + this.props.SystemStatus.StatusColour} overrideDisableButton={false} onClick={() => this.onClickStatus()} AccessLevel={AccessLevel.Full} />
        </OverlayTrigger >

        // about button
        let aboutButton = <OverlayTrigger key={"about"} overlay={<Tooltip id="tooltipButton" > {"About"}</Tooltip >}>
            <ButtonDashboard glyph={"info-sign"} cssClassName={cssClassName} bsStyle={"default"} DisplayMode={"Glyph"} bsSize={this.props.DashboardSize} ToolTipAndText={"About"} overrideDisableButton={false} onClick={() => this.onClickAbout()} AccessLevel={AccessLevel.Full} />
        </OverlayTrigger >

        // functions dropdown
        let functionsDropdown = <DropdownButton bsStyle={"default"}
            className={cssDropdownClassName}
            bsSize={this.props.DashboardSize}
            title={functionsGlyph}
            key={"dropdown-functions"}
            id={"dropdown-functions"}>
            {menuItems}
        </DropdownButton>

        // columns dropdown
        let columnsDropDown = <DropdownButton bsStyle={"default"}
            className={cssDropdownClassName}
            bsSize={this.props.DashboardSize}
            title={colsGlyph}
            key={"dropdown-cols"}
            id={"dropdown-cols"}>
            {colItems}
        </DropdownButton>

        // toolbars dropdown
        let toolbarsDropDown = <DropdownButton bsStyle={"default"}
            className={cssDropdownClassName}
            bsSize={this.props.DashboardSize}
            title={toolbarsGlyph}
            key={"dropdown-toolbars"}
            id={"dropdown-toolbars"}>
            {toolbarItems}
        </DropdownButton>

        // shortcuts
        let shortcutsArray: string[] = this.props.DashboardState.VisibleButtons
        let shortcuts: any
        if (shortcutsArray) {
            shortcuts = shortcutsArray.map(x => {
                let menuItem = this.props.MenuState.MenuItems.find(y => y.IsVisible && y.StrategyId == x)
                if (menuItem) {
                    return <OverlayTrigger key={x} overlay={<Tooltip id="tooltipButton" > {menuItem.Label}</Tooltip >}>
                        <ButtonDashboard glyph={menuItem.GlyphIcon} cssClassName={cssClassName} bsStyle={"default"} DisplayMode={"Glyph"} bsSize={this.props.DashboardSize} ToolTipAndText={menuItem.Label} overrideDisableButton={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.onClick(menuItem)} AccessLevel={AccessLevel.Full} />
                    </OverlayTrigger >
                }
            })
        }

        let toolbarTitle = this.props.DashboardState.HomeToolbarTitle
        if (StringExtensions.IsNullOrEmpty(toolbarTitle)) {
            toolbarTitle = this.props.Blotter.blotterOptions.blotterId;
            if (toolbarTitle == GeneralConstants.USER_NAME) {
                toolbarTitle = "Blotter "
            }
        }


        return <PanelDashboard cssClassName={cssClassName} useDefaultPanelStyle={this.props.UseSingleColourForButtons} showCloseButton={false} showMinimiseButton={true} onMinimise={() => this.props.onSetDashboardVisibility(Visibility.Minimised)}
            headerText={toolbarTitle} glyphicon={"home"} showGlyphIcon={false}
            onClose={() => this.props.onClose(StrategyConstants.HomeStrategyId)} onConfigure={() => this.props.onConfigure()}>

            {this.props.DashboardState.ShowFunctionsDropdown &&
                functionsDropdown
            }
            {this.props.DashboardState.ShowSystemStatusButton &&
                statusButton
            }
            {this.props.DashboardState.ShowAboutButton &&
                aboutButton
            }

            {shortcuts}

            {this.props.DashboardState.ShowColumnsDropdown &&
                columnsDropDown
            }

            {this.props.DashboardState.ShowToolbarsDropdown &&
                toolbarsDropDown
            }

        </PanelDashboard>
    }

    onClick(menuItem: IMenuItem) {
        this.props.onClick(menuItem.Action)
    }

    onClickStatus() {
        let statusColor: StatusColour = this.props.SystemStatus.StatusColour as StatusColour
        switch (statusColor) {
            case StatusColour.Green:
                let success: IAdaptableAlert = {
                    Header: "System Status",
                    Msg: StringExtensions.IsNotNullOrEmpty(this.props.SystemStatus.StatusMessage) ?
                        this.props.SystemStatus.StatusMessage :
                        "No issues",
                    MessageType: MessageType.Success,
                   ShowAsPopup: true 
                }
                this.props.onShowStatusMessage(success)
                return;
            case StatusColour.Blue:
                let info: IAdaptableAlert = {
                    Header: "System Status",
                    Msg: this.props.SystemStatus.StatusMessage,
                    MessageType: MessageType.Info,
                    ShowAsPopup: true 
                }
                this.props.onShowStatusMessage(info)
                return;
            case StatusColour.Amber:
                let warning: IAdaptableAlert = {
                    Header: "System Status",
                    Msg: this.props.SystemStatus.StatusMessage,
                    MessageType: MessageType.Warning,
                    ShowAsPopup: true 
                }
                this.props.onShowStatusMessage(warning)
                return;
            case StatusColour.Red:
                let error: IAdaptableAlert = {
                    Header: "System Status",
                    Msg: this.props.SystemStatus.StatusMessage,
                    MessageType: MessageType.Error,
                    ShowAsPopup: true 
                }
                this.props.onShowStatusMessage(error)
                return;
        }

    }
    onClickAbout() {
        this.props.onShowAbout()
    }

    onSetColumnVisibility(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let changedColumnn: IColumn = ColumnHelper.getColumnFromId(e.value, this.props.Columns);

        let columns: IColumn[] = [].concat(this.props.Columns);
        changedColumnn = Object.assign({}, changedColumnn, {
            Visible: !changedColumnn.Visible
        });
        let index = columns.findIndex(x => x.ColumnId == e.value)
        columns[index] = changedColumnn;
        this.props.onNewColumnListOrder(columns.filter(c => c.Visible))
    }

    onSetToolbarVisibility(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let strategy: string = this.props.DashboardState.AvailableToolbars.find(at => at == e.value);
        let visibleToolbars: string[] = [].concat(this.props.DashboardState.VisibleToolbars);
        if (e.checked) {
            visibleToolbars.push(strategy);
        } else {
            let index: number = visibleToolbars.findIndex(vt => vt == strategy)
            visibleToolbars.splice(index, 1);
        }
        this.props.onSetToolbarVisibility(visibleToolbars)
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        MenuState: state.Menu,
        DashboardState: state.Dashboard,
        Columns: state.Grid.Columns,
        SystemStatus: state.System.SystemStatus,
        DashboardSize: state.Dashboard.UseExtraSmallButtons ? DashboardSize.XSmall: DashboardSize.Small
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClick: (action: Redux.Action) => dispatch(action),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.HomeStrategyId, ScreenPopups.DashboardPopup)),
        onNewColumnListOrder: (VisibleColumnList: IColumn[]) => dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList)),
        onSetDashboardVisibility: (visibility: Visibility) => dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
        onSetToolbarVisibility: (strategyIds: string[]) => dispatch(DashboardRedux.DashboardSetToolbars(strategyIds)),
        onShowStatusMessage: (alert: IAdaptableAlert) => dispatch(PopupRedux.PopupShowAlert(alert)),
        onShowAbout: () => dispatch(PopupRedux.PopupShowAbout()),
    };
}

export const HomeToolbarControl = connect(mapStateToProps, mapDispatchToProps)(HomeToolbarControlComponent);

