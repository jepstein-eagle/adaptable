import * as React from "react";
import { connect } from 'react-redux';
import * as Redux from "redux";
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as ColumnChooserRedux from '../../Redux/ActionsReducers/ColumnChooserRedux'
import { Glyphicon, MenuItem, OverlayTrigger, Tooltip, Checkbox, DropdownButton, NavbarCollapse } from 'react-bootstrap';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { MenuState, DashboardState } from '../../Redux/ActionsReducers/Interface/IState';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups'
import { IMenuItem } from '../../Api/Interface/IMenu'
import { IColumn } from '../../Api/Interface/IColumn';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import { ButtonDashboard } from "../Components/Buttons/ButtonDashboard";
import { Visibility, StatusColour, MessageType, AccessLevel } from "../../Utilities/Enums";
import { ISystemStatus } from "../../Api/Interface/Interfaces";
import { IAlert, } from "../../Api/Interface/IMessage";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { DANGER_BSSTYLE, SUCCESS_BSSTYLE, WARNING_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";


interface HomeToolbarComponentProps extends ToolbarStrategyViewPopupProps<HomeToolbarControlComponent> {
    MenuState: MenuState,
    DashboardState: DashboardState,
    Columns: IColumn[],
    SystemStatus: ISystemStatus,
    HeaderText: string,
    onNewColumnListOrder: (VisibleColumnList: IColumn[]) => ColumnChooserRedux.SetNewColumnListOrderAction
    onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction
    onSetToolbarVisibility: (strategyIds: string[]) => DashboardRedux.DashboardSetToolbarsAction
    onShowStatusMessage: (alert: IAlert) => PopupRedux.PopupShowAlertAction
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

        // function menu items
        let menuItems = this.props.MenuState.MenuItems.filter(x => x.IsVisible).map((menuItem: IMenuItem) => {
            return <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} key={menuItem.Label} onClick={() => this.onClick(menuItem)}>
                <Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}
            </MenuItem>
        });

        // column items
        let colItems: any = []
        colItems.push(<span>{' '}{' '}&nbsp;&nbsp;<b>{"Columns"}</b></span>);
        this.props.Columns.forEach((col: IColumn, index) => {
            colItems.push(<div className="ab_home_toolbar_column_list" key={index}>
                <Checkbox value={col.ColumnId} key={col.ColumnId} checked={col.Visible} onChange={(e) => this.onSetColumnVisibility(e)} > {col.FriendlyName}</Checkbox>
            </div>)
        });

        // toolbar items
        let toolbarItems: any = []
        toolbarItems.push(<span>{' '}{' '}&nbsp;&nbsp;<b>{"Toolbars"}</b></span>);
        this.props.DashboardState.AvailableToolbars.forEach((toolbar: string, index) => {
            let isVisible: boolean = ArrayExtensions.ContainsItem(this.props.DashboardState.VisibleToolbars, toolbar);
            let functionName = StrategyConstants.getNameForStrategyId(toolbar);
            toolbarItems.push(<div className="ab_home_toolbar_column_list" key={index}>
                <Checkbox value={toolbar} key={toolbar} checked={isVisible} onChange={(e) => this.onSetToolbarVisibility(e)} > {functionName}</Checkbox>
            </div>)
        });

        // status button
        let statusButton = <OverlayTrigger key={"systemstatus"} overlay={<Tooltip id="tooltipButton" > {"System Status"}</Tooltip >}>
            <ButtonDashboard glyph={this.getGlyphForSystemStatusButton()} cssClassName={cssClassName} bsStyle={this.getStyleForSystemStatusButton()} DisplayMode={"Glyph"} bsSize={"small"} ToolTipAndText={"Status: " + this.props.SystemStatus.StatusColour} overrideDisableButton={false} onClick={() => this.onClickStatus()} AccessLevel={AccessLevel.Full} />
        </OverlayTrigger >

        // about button
        let aboutButton = <OverlayTrigger key={"about"} overlay={<Tooltip id="tooltipButton" > {"About"}</Tooltip >}>
            <ButtonDashboard glyph={"info-sign"} cssClassName={cssClassName} bsStyle={"default"} DisplayMode={"Glyph"} bsSize={"small"} ToolTipAndText={"About"} overrideDisableButton={false} onClick={() => this.onClickAbout()} AccessLevel={AccessLevel.Full} />
        </OverlayTrigger >

        // functions dropdown
        let functionsDropdown = <DropdownButton bsStyle={"default"}
            className={cssDropdownClassName}
            bsSize={"small"}
            title={functionsGlyph}
            key={"dropdown-functions"}
            id={"dropdown-functions"}>
            {menuItems}
        </DropdownButton>

        // columns dropdown
        let columnsDropDown = <DropdownButton bsStyle={"default"}
            className={cssDropdownClassName}
            bsSize={"small"}
            title={colsGlyph}
            key={"dropdown-cols"}
            id={"dropdown-cols"}>
            {colItems}
        </DropdownButton>

        // toolbars dropdown
        let toolbarsDropDown = <DropdownButton bsStyle={"default"}
            className={cssDropdownClassName}
            bsSize={"small"}
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
                        <ButtonDashboard glyph={menuItem.GlyphIcon} cssClassName={cssClassName} bsStyle={"default"} DisplayMode={"Glyph"} bsSize={"small"} ToolTipAndText={menuItem.Label} overrideDisableButton={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.onClick(menuItem)} AccessLevel={AccessLevel.Full} />
                    </OverlayTrigger >
                }
            })
        }

        let toolbarTitle = this.props.DashboardState.HomeToolbarTitle
        if (StringExtensions.IsNullOrEmpty(toolbarTitle)) {
            toolbarTitle = this.props.Blotter.BlotterOptions.blotterId;
            if (toolbarTitle == GeneralConstants.USER_NAME) {
                toolbarTitle = "Blotter "
            }
        }


        return <PanelDashboard cssClassName={cssClassName} showCloseButton={false} showMinimiseButton={true} onMinimise={() => this.props.onSetDashboardVisibility(Visibility.Minimised)}
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
                let info: IAlert = {
                    Header: "System Status",
                    Msg: StringExtensions.IsNotNullOrEmpty(this.props.SystemStatus.StatusMessage) ?
                        this.props.SystemStatus.StatusMessage :
                        "No issues",
                    MessageType: MessageType.Info
                }
                this.props.onShowStatusMessage(info)
                return;
            case StatusColour.Amber:
                let warning: IAlert = {
                    Header: "System Status",
                    Msg: this.props.SystemStatus.StatusMessage,
                    MessageType: MessageType.Warning
                }
                this.props.onShowStatusMessage(warning)
                return;
            case StatusColour.Red:
                let error: IAlert = {
                    Header: "System Status",
                    Msg: this.props.SystemStatus.StatusMessage,
                    MessageType: MessageType.Error
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

    getStyleForSystemStatusButton(): string {
        let statusColor: StatusColour = this.props.SystemStatus.StatusColour as StatusColour
        switch (statusColor) {
            case StatusColour.Green:
                return SUCCESS_BSSTYLE
            case StatusColour.Amber:
                return WARNING_BSSTYLE
            case StatusColour.Red:
                return DANGER_BSSTYLE
        }
    }

    getGlyphForSystemStatusButton(): string {
        let statusColor: StatusColour = this.props.SystemStatus.StatusColour as StatusColour
        switch (statusColor) {
            case StatusColour.Green:
                return "ok-circle"
            case StatusColour.Amber:
                return "ban-circle"
            case StatusColour.Red:
                return "remove-circle"
        }
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        MenuState: state.Menu,
        DashboardState: state.Dashboard,
        Columns: state.Grid.Columns,
        SystemStatus: state.System.SystemStatus,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClick: (action: Redux.Action) => dispatch(action),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.HomeStrategyId, ScreenPopups.HomeButtonsPopup)),
        onNewColumnListOrder: (VisibleColumnList: IColumn[]) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList)),
        onSetDashboardVisibility: (visibility: Visibility) => dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
        onSetToolbarVisibility: (strategyIds: string[]) => dispatch(DashboardRedux.DashboardSetToolbars(strategyIds)),
        onShowStatusMessage: (alert: IAlert) => dispatch(PopupRedux.PopupShowAlert(alert)),
        onShowAbout: () => dispatch(PopupRedux.PopupShowAbout()),
    };
}

export const HomeToolbarControl = connect(mapStateToProps, mapDispatchToProps)(HomeToolbarControlComponent);

