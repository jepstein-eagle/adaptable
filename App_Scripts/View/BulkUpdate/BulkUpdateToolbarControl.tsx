import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { ButtonToolbar, Col, InputGroup, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { Helper } from '../../Core/Helpers/Helper';
import { ButtonApply } from '../Components/Buttons/ButtonApply';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { IPreviewInfo } from "../../Core/Interface/IPreviewResult";
import { IColumn } from "../../Core/Interface/IColumn";
import { IUIConfirmation } from "../../Core/Interface/IMessage";
import { PreviewHelper } from "../../Core/Helpers/PreviewHelper";
import { ColumnValueSelector } from "../Components/Selectors/ColumnValueSelector";
import { ISelectedCells, ISelectedCellInfo } from "../../Core/Interface/Interfaces";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { IEvent } from "../../Core/Interface/IEvent";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { IUserFilter } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { AdaptablePopover } from "../AdaptablePopover";
import { PopoverType, StatusColour } from "../../Core/Enums";
import { PreviewResultsPanel } from "../Components/PreviewResultsPanel";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";

interface BulkUpdateToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<BulkUpdateToolbarControlComponent> {
    BulkUpdateValue: string;
    PreviewInfo: IPreviewInfo;
    Columns: IColumn[];
    UserFilters: IUserFilter[];
    onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
    onBulkUpdateCheckSelectedCells: () => BulkUpdateRedux.BulkUpdateCheckCellSelectionAction;
    onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}

interface BulkUpdateToolbarControlComponentState {
    SelectedColumnId: string
    Disabled: boolean
    SubFunc: any
  }

class BulkUpdateToolbarControlComponent extends React.Component<BulkUpdateToolbarControlComponentProps, BulkUpdateToolbarControlComponentState> {
    constructor(props: BulkUpdateToolbarControlComponentProps) {
        super(props);
        this.state = {
            SelectedColumnId: "",
            Disabled: true,
            SubFunc: (sender: IAdaptableBlotter, event: IAdaptableBlotter) => {
                this.onSelectionChanged(event)
            }
        }
    }
    public componentDidMount() {
        if (this.props.AdaptableBlotter) {
            this.props.AdaptableBlotter.onSelectedCellsChanged().Subscribe(this.state.SubFunc)
        }
    }

    public componentWillUnmount() {
        if (this.props.AdaptableBlotter) {
            this.props.AdaptableBlotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc)
        }
    }


    render() {

        let statusColour:StatusColour = this.getStatusColour()
        // missing datatype validation for time being

        // we dont want to show the panel in the form but will need to appear in a popup....
        let cssClassName: string = this.props.cssClassName + "__bulkupdate";

        let visibleButton = this.state.Disabled ?
            <Button style={{ marginRight: "3px" }} onClick={() => this.onDisabledChanged()} bsStyle="default" bsSize="small">Off</Button>
            : <Button style={{ marginRight: "3px" }} onClick={() => this.onDisabledChanged()} bsStyle="primary" bsSize="small">On</Button>

        let selctedColumn = ColumnHelper.getColumnFromId(this.state.SelectedColumnId, this.props.Columns);
        let previewPanel =
            <PreviewResultsPanel
                cssClassName={cssClassName}
                UpdateValue={this.props.BulkUpdateValue}
                PreviewInfo={this.props.PreviewInfo}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                SelectedColumn={selctedColumn}
                ShowPanel={true}
            />

        let content = <span>
            <div className={this.props.IsReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <InputGroup>
                    <InputGroup.Button>
                        {visibleButton}
                    </InputGroup.Button>

                    <ColumnValueSelector
                        style={{ minWidth: "120px", maxWidth: "120px" }}
                        cssClassName={cssClassName}
                        disabled={StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)}
                        bsSize={"small"}
                        SelectedColumnValue={this.props.BulkUpdateValue}
                        SelectedColumn={this.props.Columns.find(c => c.ColumnId == this.state.SelectedColumnId)}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                        onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)} />

                    {StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) &&

                        <InputGroup.Button>
                            <ButtonApply cssClassName={cssClassName}
                                style={{ marginLeft: "3px" }}
                                onClick={() => this.onApplyClick()}
                                size={"small"}
                                glyph={this.getGlyphForApplyButton(statusColour)}
                                bsStyle={this.getStyleForApplyButton(statusColour)}
                                overrideTooltip="Apply Bulk Update"
                                overrideDisableButton={StringExtensions.IsNullOrEmpty(this.props.BulkUpdateValue) || (this.props.PreviewInfo != null && this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent)}
                                DisplayMode="Glyph" />
                        </InputGroup.Button>
                    }
                    {statusColour == StatusColour.Red &&
                        <AdaptablePopover cssClassName={cssClassName} headerText="Validation Erorrs" bodyText={[previewPanel]} popoverType={PopoverType.Error} triggerAction={"click"} />
                    }
                    {statusColour == StatusColour.Amber &&
                        <AdaptablePopover cssClassName={cssClassName} headerText="Validation Warning" bodyText={[previewPanel]} popoverType={PopoverType.Warning} triggerAction={"click"} />
                    }


                </InputGroup>
            </div>
        </span>

        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyNames.BulkUpdateStrategyName} glyphicon={StrategyGlyphs.BulkUpdateGlyph} onClose={() => this.props.onClose(StrategyIds.BulkUpdateStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            {content}
        </PanelDashboard>
    }
    private onColumnValueSelectedChanged(selectedColumnValue: any) {
        this.props.onBulkUpdateValueChange(selectedColumnValue);
    }

    private onSelectionChanged(blotter: IAdaptableBlotter): void {
        if (!this.state.Disabled) {
            this.getSelectedCells(blotter);
        }
    }

    private getSelectedCells(blotter: IAdaptableBlotter) {
        let selectedCells: ISelectedCells = blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCells
        let selectedColumnId: string = null
        if (selectedCells != null && selectedCells.Selection != null) {
            if (selectedCells.Selection.size > 0) {
                let selectedRows: ISelectedCellInfo[] = selectedCells.Selection.values().next().value
                if (selectedRows.length == 1 && !selectedRows[0].readonly) {
                    selectedColumnId = selectedRows[0].columnId;
                }
            }
        }
        this.props.onBulkUpdateValueChange("");
        if (selectedColumnId != this.state.SelectedColumnId) {
            this.setState({ SelectedColumnId: selectedColumnId });
        }

    }

    private getStatusColour(): StatusColour {
        if (StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && this.props.PreviewInfo) {
            if (this.props.PreviewInfo.PreviewValidationSummary.HasOnlyValidationPrevent) {
                return StatusColour.Red;
            }
            if (this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning || this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent) {
                return StatusColour.Amber;
            }
        }
        return StatusColour.Green;
    }

    private getStyleForApplyButton(statusColour: StatusColour): string {
        switch (statusColour) {
            case StatusColour.Red:
                return "danger"
            case StatusColour.Amber:
                return "warning";
            case StatusColour.Green:
                return "success";
        }
    }

    private getGlyphForApplyButton(statusColour: StatusColour): string {
        switch (statusColour) {
            case StatusColour.Red:
                return "remove"
            case StatusColour.Amber:
                return "warning-sign";
            case StatusColour.Green:
                return "ok";
        }
    }

    onDisabledChanged() {
        let newDisabledState: boolean = !this.state.Disabled
        if (newDisabledState) {
            this.setState({ SelectedColumnId: "" });
        } else {
            this.getSelectedCells(this.props.AdaptableBlotter)
        }
        this.setState({ Disabled: newDisabledState });

    }

    private onApplyClick(): void {
        this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning ?
            this.onConfirmWarningCellValidation() :
            this.onApplyBulkUpdate()
    }

    private onConfirmWarningCellValidation() {
        let confirmation: IUIConfirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Cell Validation Failed",
            ConfirmationMsg: "Do you want to continue?",
            ConfirmationText: "Bypass Rule",
            CancelAction: BulkUpdateRedux.BulkUpdateApply(false),
            ConfirmAction: BulkUpdateRedux.BulkUpdateApply(true),
            ShowCommentBox: true
        }
        this.props.onConfirmWarningCellValidation(confirmation)
    }

    onApplyBulkUpdate(): any {
        this.props.onApplyBulkUpdate()
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
        PreviewInfo: state.Popup.PreviewInfo,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onBulkUpdateValueChange: (value: string) => dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value)),
        onBulkUpdateCheckSelectedCells: () => dispatch(BulkUpdateRedux.BulkUpdateCheckCellSelection()),
        onApplyBulkUpdate: () => dispatch(BulkUpdateRedux.BulkUpdateApply(false)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardSetToolbarVisibility(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.BulkUpdatePopup, isReadOnly))
    };
}

export let BulkUpdateToolbarControl = connect(mapStateToProps, mapDispatchToProps)(BulkUpdateToolbarControlComponent);
