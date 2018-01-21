import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { Form, Dropdown, DropdownButton, Panel, FormControl, MenuItem, ControlLabel, Button, OverlayTrigger, Tooltip, FormGroup, Glyphicon, Label, Row } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IToolbarStrategyViewPopupProps } from '../../Core/Interface/IToolbarStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { IRange } from '../../Core/Interface/IExportStrategy'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IUIPrompt, IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/StrategyIds'
import * as ScreenPopups from '../../Core/ScreenPopups'
import { ExportDestination, SortOrder } from '../../Core/Enums';
import { RangeHelper } from "../../Core/Services/RangeHelper";
import { OpenfinHelper } from '../../Core/OpenfinHelper';
import { iPushPullHelper } from '../../Core/iPushPullHelper';
import { ILiveRange } from "../../Core/Interface/IExportStrategy";

interface ExportToolbarControlComponentProps extends IToolbarStrategyViewPopupProps<ExportToolbarControlComponent> {
    onApplyExport: (range: string, exportDestination: ExportDestination) => ExportRedux.ExportApplyAction;
    onSelectRange: (range: string) => RangeRedux.RangeSelectAction;
    onNewRange: () => PopupRedux.PopupShowAction;
    onEditRange: () => PopupRedux.PopupShowAction;
    onRangeStopLive: (range: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => RangeRedux.RangeStopLiveAction;
    Columns: IColumn[],
    Ranges: IRange[];
    CurrentRange: string;
    LiveRanges: ILiveRange[];
 }

class ExportToolbarControlComponent extends React.Component<ExportToolbarControlComponentProps, {}> {
    componentWillReceiveProps(nextProps: ExportToolbarControlComponentProps, nextContext: any) {
        //if there was a selected search and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected text
        if (StringExtensions.IsNullOrEmpty(nextProps.CurrentRange) && StringExtensions.IsNotNullOrEmpty(this.props.CurrentRange)) {
            (this.refs.typeahead as any).getInstance().clear()
        }
    }
    render(): any {
        let savedRange: IRange = this.props.Ranges.find(s => s.Name == this.props.CurrentRange);
        let savedRangeIndex = this.props.Ranges.findIndex(s => s.Name == this.props.CurrentRange);
        let sortedRanges = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.Ranges, "Name")

        let currentRangeId = StringExtensions.IsNullOrEmpty(this.props.CurrentRange) ?
            "select" : this.props.CurrentRange

        let availableRanges = this.props.Ranges.map((x, index) => {
            return <option value={x.Name} key={index}>{x.Name}</option>
        })

        let csvMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onApplyExport(currentRangeId, ExportDestination.CSV)} key={"csv"}>{"CSV"}</MenuItem>
        let clipboardMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onApplyExport(currentRangeId, ExportDestination.Clipboard)} key={"clipboard"}> {"Clipboard"}</MenuItem>
        let openfinExcelMenuItem
        if (this.props.LiveRanges.find(x => x.Range == currentRangeId && x.ExportDestination == ExportDestination.OpenfinExcel)) {
            openfinExcelMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onRangeStopLive(currentRangeId, ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Stop Live Openfin Excel"}</MenuItem>
        }
        else {
            openfinExcelMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onApplyExport(currentRangeId, ExportDestination.OpenfinExcel)} key={"OpenfinExcel"}> {"Start Live Openfin Excel"}</MenuItem>
        }

        let iPushPullExcelMenuItem
        if (this.props.LiveRanges.find(x => x.Range == currentRangeId && x.ExportDestination == ExportDestination.iPushPull)) {
            iPushPullExcelMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onRangeStopLive(currentRangeId, ExportDestination.iPushPull)} key={"IPPExcel"}> {"Stop Sync with iPushPull"}</MenuItem>
        }
        else {
            iPushPullExcelMenuItem = <MenuItem disabled={this.props.IsReadOnly} onClick={() => this.props.onApplyExport(currentRangeId, ExportDestination.iPushPull)} key={"IPPExcel"}> {"Start Sync with iPushPull"}</MenuItem>
        }


        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <Typeahead className={"adaptable_blotter_typeahead_inline"} ref="typeahead" emptyLabel={"No Ranges found with that search"}
                    placeholder={"Select a Range"}
                    labelKey={"Name"}
                    filterBy={["Name"]}
                    clearButton={true}
                    selected={savedRange ? [savedRange] : []}
                    onChange={(selected) => { this.onSelectedRangeChanged(selected) }}
                    options={sortedRanges}
                />
                {' '}
                {currentRangeId != "select" &&
                    <DropdownButton bsStyle="default" title="Export" id="exportDropdown" disabled={currentRangeId == "select"} >
                        {csvMenuItem}
                        {clipboardMenuItem}
                        {
                            OpenfinHelper.isRunningInOpenfin() && OpenfinHelper.isExcelOpenfinLoaded() && openfinExcelMenuItem
                        }
                        {
                            iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem
                        }
                    </DropdownButton>
                }
                {' '}
                <ButtonEdit onClick={() => this.props.onEditRange()}
                    overrideTooltip="Edit Range"
                    ConfigEntity={savedRange}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonNew onClick={() => this.props.onNewRange()}
                    overrideTooltip="Create New Range"
                    DisplayMode="Glyph" />
                {' '}
                <ButtonDelete
                    overrideTooltip="Delete Range"
                    ConfigEntity={savedRange}
                    DisplayMode="Glyph"
                    ConfirmAction={RangeRedux.RangeDelete(savedRangeIndex)}
                    ConfirmationMsg={"Are you sure you want to delete '" + !savedRange ? "" : savedRange.Name + "'?"}
                    ConfirmationTitle={"Delete Range"} />
            </div>
        </span>

        return <PanelDashboard headerText="Export" glyphicon="export" onClose={ ()=> this.props.onClose(this.props.DashboardControl)} onConfigure={()=>this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }

    onSelectedRangeChanged(selected: IRange[]) {
        this.props.onSelectRange(selected.length > 0 ? selected[0].Name : "");
    }
 

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentRange: state.Range.CurrentRange,
        Ranges: state.Range.Ranges,
        Columns: state.Grid.Columns,
        LiveRanges: state.Range.CurrentLiveRanges,
        DashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.ExportStrategyId),
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyExport: (range: string, exportDestination: ExportDestination) => dispatch(ExportRedux.ApplyExport(range, exportDestination)),
        onSelectRange: (range: string) => dispatch(RangeRedux.RangeSelect(range)),
        onRangeStopLive: (range: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => dispatch(RangeRedux.RangeStopLive(range, exportDestination)),
        onNewRange: () => dispatch(PopupRedux.PopupShow("ExportAction", false, "New")),
        onEditRange: () => dispatch(PopupRedux.PopupShow("ExportAction", false, "Edit")),
        onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl.Strategy, false)),
        onConfigure: () => dispatch(PopupRedux.PopupShow(ScreenPopups.ExportActionPopup))
    };
}

export let ExportToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ExportToolbarControlComponent);

